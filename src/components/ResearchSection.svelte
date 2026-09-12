<script>
    import SectionTitle from "./SectionTitle.svelte";

    export let publications = [];
</script>

<section class="space-y-4">
    <SectionTitle>research</SectionTitle>
    {#if publications && publications.length > 0}
        <ul class="space-y-5">
            {#each publications.slice(0, 3) as pub}
                <li class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div class="flex min-w-0 flex-col gap-1">
                        <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="font-medium text-foreground transition-colors hover:text-primary hover:underline"
                        >
                            {pub.title}
                        </a>
                        {#if pub.authors && pub.authors.length > 0}
                            <span class="text-sm text-muted-foreground">
                                <strong class="font-bold text-foreground">{pub.authors[0]}</strong>{#if pub.authors.length > 1}, {pub.authors.slice(1).join(", ")}{/if}
                            </span>
                        {/if}
                        {#if pub.year > 0}
                            <span class="text-sm text-muted-foreground/80">
                                <a
                                    href={pub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="transition-colors hover:text-primary hover:underline"
                                >arXiv:{pub.id}</a>{pub.primaryCategory ? ` [${pub.primaryCategory}]` : ""}, {pub.year}
                            </span>
                        {/if}
                    </div>
                    <div class="flex shrink-0 items-center gap-2 text-sm">
                        <a
                            href={pub.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-muted-foreground transition-colors hover:text-primary hover:underline"
                        >
                            [PDF]
                        </a>
                        {#if pub.code}
                            <a
                                href={pub.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-muted-foreground transition-colors hover:text-primary hover:underline"
                            >
                                [Code]
                            </a>
                        {/if}
                    </div>
                </li>
            {/each}
        </ul>
        <a
            href="/research"
            class="inline-flex group mt-2 text-primary underline-offset-4 hover:underline transition-colors"
        >
            view all
        </a>
    {/if}
</section>