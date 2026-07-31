<script lang="ts">
    import { onMount } from "svelte";

    interface Heading {
        depth: number;
        slug: string;
        text: string;
    }

    export let headings: Heading[] = [];
    export let variant: "sidebar" | "inline" = "sidebar";

    interface TocItem extends Heading {
        /** 1-based chapter number for h2 items, 0 for nested h3 */
        chapter: number;
    }

    // keep only h2/h3, number the h2 chapters (matches the CSS counters)
    function buildItems(hs: Heading[]): TocItem[] {
        let chapter = 0;
        return hs
            .filter((h) => h.depth === 2 || h.depth === 3)
            .map((h) => ({
                ...h,
                chapter: h.depth === 2 ? ++chapter : 0,
            }));
    }

    let items: TocItem[] = [];
    let activeSlug = "";
    let offsets: { slug: string; top: number }[] = [];
    let ticking = false;

    $: items = buildItems(headings);

    function measure() {
        offsets = items.map((item) => {
            const el = document.getElementById(item.slug);
            return {
                slug: item.slug,
                top: el
                    ? el.getBoundingClientRect().top + window.scrollY
                    : Number.POSITIVE_INFINITY,
            };
        });
    }

    function update() {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;

        if (offsets.length === 0) return;

        // at the very bottom, the last chapter is active
        if (max - scrollY < 48) {
            activeSlug = offsets[offsets.length - 1].slug;
            return;
        }

        let current = offsets[0].slug;
        for (const { slug, top } of offsets) {
            if (top <= scrollY + 140) current = slug;
            else break;
        }
        activeSlug = current;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                update();
                ticking = false;
            });
            ticking = true;
        }
    }

    function scrollTo(slug: string) {
        const el = document.getElementById(slug);
        if (!el) return;
        activeSlug = slug;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    onMount(() => {
        measure();
        update();
        // re-measure after fonts / KaTeX settle
        const t = setTimeout(() => {
            measure();
            update();
        }, 600);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            clearTimeout(t);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    });
</script>

{#if items.length > 0 && variant === "sidebar"}
    <nav
        class="border border-border bg-card/50 text-sm overflow-hidden"
        aria-label="Table of contents"
    >
        <div
            class="flex items-center justify-between px-3 py-2 border-b border-border"
        >
            <span
                class="text-sm font-bold tracking-[0.15em] text-muted-foreground"
                >contents</span
            >
        </div>
        <ol class="flex flex-col">
            {#each items as item (item.slug)}
                <li>
                    <button
                        on:click={() => scrollTo(item.slug)}
                        class="w-full text-left flex items-baseline gap-2 px-3 py-1.5 transition-colors border-l-2 {item.slug ===
                        activeSlug
                            ? 'border-primary bg-muted/60 text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40'} {item.depth ===
                        3
                            ? 'pl-7'
                            : ''}"
                        aria-current={item.slug === activeSlug
                            ? "location"
                            : undefined}
                    >
                        {#if item.chapter > 0}
                            <span
                                class="shrink-0 tabular-nums {item.slug ===
                                activeSlug
                                    ? 'text-primary'
                                    : ''}"
                            >
                                {String(item.chapter).padStart(2, "0")}
                            </span>
                        {/if}
                        <span class="leading-snug">{item.text}</span>
                    </button>
                </li>
            {/each}
        </ol>
    </nav>
{:else if items.length > 0}
    <details
        class="toc-inline border border-border rounded-lg bg-card text-sm !text-foreground overflow-hidden"
    >
        <summary
            class="cursor-pointer px-3 py-2 text-sm font-bold tracking-[0.15em] uppercase !text-foreground hover:!text-primary transition-colors select-none"
        >
            contents · {items.filter((i) => i.chapter > 0).length} chapters
        </summary>
        <ol class="flex flex-col border-t border-border py-1">
            {#each items as item (item.slug)}
                <li>
                    <a
                        href="#{item.slug}"
                        class="flex items-baseline gap-2 px-3 py-1.5 !text-foreground hover:!text-primary hover:bg-muted/40 transition-colors {item.depth ===
                        3
                            ? 'pl-7'
                            : ''}"
                    >
                        {#if item.chapter > 0}
                            <span class="shrink-0 tabular-nums text-primary">
                                {String(item.chapter).padStart(2, "0")}
                            </span>
                        {/if}
                        <span class="leading-snug !text-foreground"
                            >{item.text}</span
                        >
                    </a>
                </li>
            {/each}
        </ol>
    </details>
{/if}

<style>
    .toc-inline,
    .toc-inline summary,
    .toc-inline a,
    .toc-inline span:not(.text-primary) {
        color: var(--foreground) !important;
    }

    .toc-inline summary:hover,
    .toc-inline a:hover {
        color: var(--primary) !important;
    }
</style>
