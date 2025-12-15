<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    // Configuration
    export let contentSelector = ".prose";
    export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;
    export let rootMargin = "-20% 0px -70% 0px";
    export let scrollDuration = 1000;
    export let threshold = 0;

    interface TimelineItem {
        id: string;
        text: string;
        element: HTMLElement;
    }

    let timelineItems: TimelineItem[] = [];
    let activeItem = "";
    let observer: IntersectionObserver | null = null;
    let isScrolling = false;

    onMount(() => {
        initializeTimeline();
    });

    onDestroy(() => {
        observer?.disconnect();
    });

    function initializeTimeline(): void {
        const contentElement = document.querySelector(contentSelector);
        if (!contentElement) return;

        const headingSelector = `h${headingLevel}`;
        const headingElements =
            contentElement.querySelectorAll(headingSelector);

        timelineItems = Array.from(headingElements).map((heading, index) => {
            const h = heading as HTMLElement;
            const id = h.id || `section-${index}`;

            if (!h.id) {
                h.id = id;
            }

            const text = sanitizeHeadingText(h.textContent || "");

            return { id, text, element: h };
        });

        setupObserver();

        if (timelineItems.length > 0) {
            activeItem = timelineItems[0].id;
        }
    }

    function sanitizeHeadingText(text: string): string {
        return text.replace(/^\*\s+/, "").trim();
    }

    function setupObserver(): void {
        observer = new IntersectionObserver(
            (entries) => {
                if (isScrolling) return;

                let mostVisibleEntry = entries.reduce((best, current) => {
                    if (!current.isIntersecting) return best;
                    return current.intersectionRatio >
                        (best?.intersectionRatio ?? 0)
                        ? current
                        : best;
                });

                if (mostVisibleEntry?.isIntersecting) {
                    activeItem = mostVisibleEntry.target.id;
                }
            },
            { rootMargin, threshold },
        );

        timelineItems.forEach((item) => observer?.observe(item.element));
    }

    function scrollToSection(id: string): void {
        const element = document.getElementById(id);
        if (!element) return;

        activeItem = id;
        isScrolling = true;

        element.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
            isScrolling = false;
        }, scrollDuration);
    }

    function getCurrentIndex(): number {
        const index = timelineItems.findIndex((item) => item.id === activeItem);
        return Math.max(0, index);
    }
</script>

{#if timelineItems.length > 0}
    <nav class="timeline" aria-label="Article sections">
        <div class="timeline-header">
            <span class="timeline-label">SECTIONS</span>
            <div class="timeline-counter">
                {getCurrentIndex() + 1}/{timelineItems.length}
            </div>
        </div>

        <div class="timeline-items">
            {#each timelineItems as item, index (item.id)}
                <button
                    class="timeline-item"
                    class:active={item.id === activeItem}
                    on:click={() => scrollToSection(item.id)}
                    aria-label={`Go to ${item.text}`}
                    aria-current={item.id === activeItem ? "page" : undefined}
                >
                    <span class="item-index">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span class="item-text">{item.text}</span>
                </button>
            {/each}
        </div>
    </nav>
{/if}

<style>
    .timeline {
        position: sticky;
        top: 5rem;
        width: 100%;
        max-height: calc(100vh - 8rem);
        display: flex;
        flex-direction: column;
        background: var(--background);
        border: 1px solid var(--border);
        font-family: var(--font-mono);
        font-size: 0.75rem;
        overflow: hidden;
    }

    .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border);
        background: var(--muted);
    }

    .timeline-label {
        font-size: 0.625rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        color: var(--muted-foreground);
        text-transform: uppercase;
    }

    .timeline-counter {
        font-size: 0.625rem;
        font-weight: 600;
        color: var(--foreground);
        font-variant-numeric: tabular-nums;
    }

    .timeline-items {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--border) transparent;
    }

    .timeline-items::-webkit-scrollbar {
        width: 4px;
    }

    .timeline-items::-webkit-scrollbar-track {
        background: transparent;
    }

    .timeline-items::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 2px;
    }

    .timeline-item {
        display: grid;
        grid-template-columns: 2.5rem 1fr;
        align-items: start;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: none;
        border: none;
        border-bottom: 1px solid var(--border);
        cursor: pointer;
        text-align: left;
        transition: all 0.15s ease;
        color: var(--foreground);
    }

    .timeline-item:last-child {
        border-bottom: none;
    }

    .timeline-item:hover {
        background: var(--muted);
    }

    .timeline-item.active {
        background: var(--primary);
        color: var(--primary-foreground);
    }

    .item-index {
        font-weight: 700;
        color: var(--muted-foreground);
        font-variant-numeric: tabular-nums;
        flex-shrink: 0;
    }

    .timeline-item.active .item-index {
        color: var(--primary-foreground);
    }

    .item-text {
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    @media (max-width: 1536px) {
        .timeline {
            display: none;
        }
    }
</style>
