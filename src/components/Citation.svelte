<script lang="ts">
    import { onMount } from "svelte";
    import type { HighlighterCore, ShikiTransformer } from "shiki";

    export let title: string;
    export let date: Date;
    export let path: string; // e.g. /blog/my-post
    export let author = "Asandei, Stefan-Alexandru";

    let url = path;
    let copied = false;
    let highlighted = "";

    onMount(() => {
        url = window.location.origin + path;
    });

    $: key = `asandei${date.getFullYear()}${path
        .split("/")
        .filter(Boolean)
        .pop()
        ?.replace(/[^a-z]/g, "")}`;

    $: bibtex = `@misc{${key},
  author       = {${author}},
  title        = {${title}},
  year         = {${date.getFullYear()}},
  howpublished = {\\url{${url}}},
  note         = {Blog post. Accessed ${new Date().toISOString().slice(0, 10)}}
}`;

    const astroCodeClass: ShikiTransformer = {
        name: "citation-astro-code",
        pre(node) {
            this.addClassToHast(node, "astro-code");
        },
    };

    let highlighterPromise: Promise<HighlighterCore> | null = null;

    function getHighlighter() {
        if (!highlighterPromise) {
            highlighterPromise = (async () => {
                const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] =
                    await Promise.all([
                        import("shiki/core"),
                        import("shiki/engine/javascript"),
                    ]);
                return createHighlighterCore({
                    themes: [
                        import("@shikijs/themes/github-light"),
                        import("@shikijs/themes/houston"),
                    ],
                    langs: [import("@shikijs/langs/bibtex")],
                    engine: createJavaScriptRegexEngine(),
                });
            })();
        }
        return highlighterPromise;
    }

    let highlightId = 0;
    async function highlight(code: string) {
        if (typeof window === "undefined") return;
        const id = ++highlightId;
        const highlighter = await getHighlighter();
        const html = highlighter.codeToHtml(code, {
            lang: "bibtex",
            themes: { light: "github-light", dark: "houston" },
            transformers: [astroCodeClass],
        });
        if (id === highlightId) highlighted = html;
    }

    $: if (typeof window !== "undefined") highlight(bibtex);

    async function copy() {
        try {
            await navigator.clipboard.writeText(bibtex);
        } catch (_) {
            // fallback for older browsers
            const ta = document.createElement("textarea");
            ta.value = bibtex;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        copied = true;
        setTimeout(() => (copied = false), 1500);
    }
</script>

<section class="text-sm">
    <div
        class="flex items-center justify-between px-3 py-2 border border-b-0 border-border bg-muted/50"
    >
        <span class="text-sm font-bold tracking-[0.15em] text-muted-foreground"
            >cite this post</span
        >
        <button
            on:click={copy}
            class="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
        >
            {copied ? "copied ✓" : "copy bibtex"}
        </button>
    </div>
    {#if highlighted}
        <div class="citation-code">{@html highlighted}</div>
    {:else}
        <pre
            class="m-0 px-3 py-2 border border-border bg-card/50 font-mono text-muted-foreground overflow-x-auto">{bibtex}</pre>
    {/if}
</section>
