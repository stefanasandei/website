<script lang="ts">
    import { onMount } from "svelte";

    export let title: string;
    export let date: Date;
    export let path: string; // e.g. /blog/my-post
    export let author = "Asandei, Stefan-Alexandru";

    let url = path;
    let copied = false;

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
    <pre
        class="m-0 px-3 py-2 border border-border bg-card/50 font-mono text-muted-foreground overflow-x-auto">{bibtex}</pre>
</section>
