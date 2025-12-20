<script>
    import CoolLink from "./CoolLink.svelte";
    import SectionTitle from "./SectionTitle.svelte";

    export let posts;
</script>

<div>
    <SectionTitle>blog</SectionTitle>

    <p class="mb-6">
        Explore my thoughts and insights on various topics in computer science
        and deep learning through my blog posts.
    </p>

    <p class="text-sm text-muted-foreground mb-4">
        {posts.length} posts:
    </p>

    <div class="space-y-3">
        {#each posts as post}
            <div class="flex justify-between items-start gap-4">
                <a
                    href="/blog/{post.id}"
                    class="hover:text-primary transition-colors duration-100"
                >
                    {post.data.title}
                </a>
                <span class="text-muted-foreground text-sm whitespace-nowrap">
                    {post.data.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </div>
        {/each}
    </div>

    <div class="flex flex-row justify-between">
        <CoolLink href="/blog">all posts</CoolLink>

        <div class="space-x-4">
            <CoolLink href="/blog?tag=ioai">IOAI prep. posts</CoolLink>
            <!-- <CoolLink href="#">IOAI prep. posts</CoolLink> -->
        </div>
    </div>
</div>
