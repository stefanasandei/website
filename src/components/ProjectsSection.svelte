<script>
    import SectionTitle from "./SectionTitle.svelte";

    const projects = [
        {
            name: "AI Task Solutions",
            role: "https://github.com/stefanasandei/roai-solved",
            description:
                "TLDR: Solved and explained competitive AI tasks from IOAI, National Olympiads (Romania, Poland, Russia, etc.) and other contests.",
        },
        {
            name: "Orion: an agent for personal knowledge base management",
            role: "https://github.com/stefanasandei/orion",
            description:
                "TLDR: fullstack web application that uses vector RAG on personal documents to quickly answer & summarize content",
        },
    ];
</script>

<div class="space-y-6">
    <SectionTitle>projects</SectionTitle>

    <div class="space-y-8">
        {#each projects as project}
            <div class="space-y-2">
                <a
                    href="#"
                    class="text-base font-semibold hover:text-primary transition-colors"
                >
                    {project.name}
                </a>
                {#if project.role}
                    <p class="text-sm text-muted-foreground">{project.role}</p>
                {:else}
                    <p class="py-1"></p>
                {/if}
                <p class="text-sm leading-relaxed">{project.description}</p>
            </div>
        {/each}
    </div>

    <a
        href="#"
        class="text-primary hover:text-primary/80 transition-colors inline-block mt-4"
    >
        all projects ↗
    </a>
</div>
