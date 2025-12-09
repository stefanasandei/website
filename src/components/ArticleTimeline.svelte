<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    export let contentSelector = ".prose";

    let timelineItems: Array<{
        id: string;
        text: string;
        element: HTMLElement;
    }> = [];
    let activeItem = "";
    let observer: IntersectionObserver;

    onMount(() => {
        // Find all H2 elements in the article content
        const contentElement = document.querySelector(contentSelector);
        if (!contentElement) return;

        const h2Elements = contentElement.querySelectorAll("h2");
        timelineItems = Array.from(h2Elements).map((h2, index) => {
            const id = h2.id || `section-${index}`;
            if (!h2.id) h2.id = id;

            return {
                id,
                text: h2.textContent || "",
                element: h2 as HTMLElement,
            };
        });

        // Set up intersection observer for scroll detection
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activeItem = entry.target.id;
                    }
                });
            },
            {
                rootMargin: "-20% 0px -70% 0px",
                threshold: 0,
            },
        );

        // Observe all H2 elements
        timelineItems.forEach((item) => {
            observer.observe(item.element);
        });

        // Set initial active item
        if (timelineItems.length > 0) {
            activeItem = timelineItems[0].id;
        }
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    });

    function scrollToSection(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            activeItem = id;
        }
    }
</script>

{#if timelineItems.length > 0}
    <nav class="timeline-container" aria-label="Article sections">
        <div class="timeline-header">
            <span class="timeline-title">SECTIONS</span>
        </div>

        {#each timelineItems as item}
            <button
                class="timeline-item"
                class:active={item.id === activeItem}
                on:click={() => scrollToSection(item.id)}
                aria-label={`Go to ${item.text}`}
            >
                <div class="timeline-connector"></div>
                <div class="timeline-marker">
                    <div class="timeline-dot"></div>
                </div>
                <span class="timeline-text">{item.text}</span>
            </button>
        {/each}
    </nav>
{/if}

<style>
    .timeline-container {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.5rem;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 0;
        font-family: var(--font-mono);
        box-shadow: var(--shadow-sm);
        backdrop-filter: none;
        min-width: 200px;
    }

    .timeline-container::after {
        content: "";
        position: absolute;
        left: 1rem;
        top: 2.5rem;
        bottom: 0.5rem;
        width: 1px;
        background: var(--border);
        opacity: 0.5;
    }

    .timeline-header {
        padding: 0.25rem 0.5rem;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid var(--border);
        text-align: center;
    }

    .timeline-title {
        font-size: 0.625rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        color: var(--muted-foreground);
        text-transform: uppercase;
    }

    .timeline-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.5rem 0.75rem 0.5rem 2rem;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
        opacity: 0.8;
        font-size: 0.8125rem;
        line-height: 1.4;
        border-left: 2px solid transparent;
    }

    .timeline-item:hover {
        opacity: 1;
        background: var(--accent);
        border-left-color: var(--primary);
    }

    .timeline-item.active {
        opacity: 1;
        background: var(--primary);
        color: var(--primary-foreground);
        border-left-color: var(--primary-foreground);
    }

    .timeline-item.active .timeline-text {
        color: var(--primary-foreground);
        font-weight: 600;
    }

    .timeline-item.active .timeline-dot {
        background: var(--primary-foreground);
        box-shadow: 0 0 6px var(--primary-foreground);
    }

    .timeline-marker {
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .timeline-dot {
        width: 6px;
        height: 6px;
        background: var(--muted-foreground);
        transition: all 0.2s ease;
        border-radius: 50%;
        transform: none;
    }

    .timeline-text {
        color: var(--foreground);
        font-size: 0.8125rem;
        line-height: 1.4;
        transition: all 0.2s ease;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        flex: 1;
        text-align: left;
    }

    /* Responsive design for smaller screens */
    @media (max-width: 1280px) {
        .timeline-container {
            display: none;
        }
    }
</style>
