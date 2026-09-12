<script>
    import SectionTitle from "./SectionTitle.svelte";

    const linkStyles =
        "class='text-primary  font-bold transition-colors hover:underline' target='_blank'";
    const posts = [
        {
            title: `🥈 silver medal at the <a ${linkStyles} href='https://euroai-official.org/2026'>European Olympiad in AI (EUROAI)</a>`,
            date: "jul 19, 2026",
        },
        {
            title: `🥇 gold medal at the <a ${linkStyles} href='https://www.kaggle.com/competitions/neoai-2026'>Northern Eurasia Olympiad in AI (NEOAI)</a>`,
            date: "may 4, 2026",
        },
        {
            title: `started the <a ${linkStyles} href='https://aicc-official.org/'>AI Community Contest (AICC)</a> (600+ members)`,
            date: "oct 25, 2025",
        },
        {
            title: `🥉 bronze medal at <a ${linkStyles} href='https://ioai-official.org/china-2025/'>International Olympiad in AI (IOAI)</a>`,
            date: "aug 8, 2025",
        },
    ];
</script>

<section class="space-y-4">
    <SectionTitle>news</SectionTitle>
    <div class="space-y-3">
        {#each posts as post}
            <div
                class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4"
            >
                <span
                    class="text-muted-foreground text-sm whitespace-nowrap min-w-20"
                    >{post.date}</span
                >
                <span class="text-foreground">{@html post.title}</span>
            </div>
        {/each}
    </div>
</section>
