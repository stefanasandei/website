<script>
    import CoolLink from "./CoolLink.svelte";
    import SectionTitle from "./SectionTitle.svelte";

    const projects = [
        {
            name: "AI Tasks Solutions",
            slug: "ai-tasks-solutions",
            github: "https://github.com/stefanasandei/roai-solved",
            description:
                "TLDR: Solved and explained competitive AI tasks from IOAI, National Olympiads (Romania, Poland, Russia, etc.) and other contests.",
        },
        {
            name: "Orion: an agent for personal knowledge base management",
            slug: "orion",
            github: "https://github.com/stefanasandei/orion",
            description:
                "TLDR: fullstack web application that uses vector RAG on personal documents to quickly answer & summarize content",
        },
    ];
</script>

<div>
    <SectionTitle>projects</SectionTitle>

    <div class="space-y-8">
        {#each projects as project}
            <div class="space-y-2">
                <a
                    href="/projects/{project.slug}"
                    class="text-base font-semibold hover:text-primary transition-colors"
                >
                    {project.name}
                </a>
                {#if project.github}
                    <a
                        href={project.github}
                        class="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >{project.github}</a
                    >
                {:else}
                    <p class="py-1"></p>
                {/if}
                <p class="text-sm leading-relaxed">{project.description}</p>
            </div>
        {/each}
    </div>

    <CoolLink href="/projects">all projects</CoolLink>
</div>
