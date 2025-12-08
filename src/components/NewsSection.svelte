<script>
    const posts = [
        {
            title: "started the <a class='hover:text-primary transition-colors duration-100' href='https://ioai-community-contest.netlify.app/'>AI Community Contest</a>",
            date: "oct 25, 2025",
        },
        { title: "bronze medal at IOAI '25", date: "aug 8, 2025" },
    ];
</script>

<div class="space-y-3">
    <p>Personal news:</p>
    <div class="space-y-2">
        {#each posts as post}
            <div class="grid grid-cols-2 items-start gap-8">
                <!-- <a
                    href="#"
                    class="hover:text-primary transition-colors duration-100"
                >
                    {post.title}
                </a> -->
                <span>{@html post.title}</span>
                <span class="text-muted-foreground text-sm whitespace-nowrap">
                    {post.date}
                </span>
            </div>
        {/each}
    </div>
</div>
