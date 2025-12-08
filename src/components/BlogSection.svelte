<script>
    import SectionTitle from "./SectionTitle.svelte";

    const posts = [
        { title: "an intro to regularized learning", date: "nov 20, 2025" },
        { title: "retrieval algorithms for agents", date: "nov 20, 2025" },
        { title: "let's solve Wordle using GRPO", date: "nov 20, 2025" },
        {
            title: "comparison of attention variants as of 2025",
            date: "nov 20, 2025",
        },
        { title: "how i organise my life", date: "nov 20, 2025" },
    ];
</script>

<div class="space-y-6">
    <SectionTitle>blog</SectionTitle>

    <div class="space-y-3">
        {#each posts as post}
            <div class="flex justify-between items-start gap-4">
                <a href="#" class="hover:text-primary transition-colors">
                    {post.title}
                </a>
                <span class="text-muted-foreground text-sm whitespace-nowrap">
                    {post.date}
                </span>
            </div>
        {/each}
    </div>

    <a
        href="#"
        class="text-primary hover:text-primary/80 transition-colors inline-block mt-4"
    >
        all posts ↗
    </a>
</div>
