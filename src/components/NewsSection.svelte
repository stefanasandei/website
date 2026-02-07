<script>
    const linkStyles =
        "class='hover:text-primary transition-colors duration-100 underline decoration-muted-foreground/40 hover:decoration-primary' target='_blank'";
    const posts = [
        {
            title: `started the <a ${linkStyles} href='https://ioai-community-contest.netlify.app/'>AI Community Contest</a>`,
            date: "oct 25, 2025",
        },
        {
            title: `bronze medal at <a ${linkStyles} href='https://ioai-official.org/'>IOAI</a> '25`,
            date: "aug 8, 2025",
        },
    ];
</script>

<section class="space-y-4">
    <h3 class="text-lg font-semibold tracking-tight">personal news</h3>
    <div class="space-y-3">
        {#each posts as post}
            <div
                class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4"
            >
                <span
                    class="text-muted-foreground text-sm whitespace-nowrap min-w-[80px]"
                    >{post.date}</span
                >
                <span class="text-foreground">{@html post.title}</span>
            </div>
        {/each}
    </div>
</section>
