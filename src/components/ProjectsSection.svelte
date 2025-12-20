<script>
    import CoolLink from "./CoolLink.svelte";
    import SectionTitle from "./SectionTitle.svelte";

    export let projects;
</script>

<div>
    <SectionTitle>projects</SectionTitle>

    <p class="mb-6">There are the most relevant projects I've worked on.</p>

    <div class="space-y-8">
        {#each projects as project}
            <div class="space-y-2">
                <a
                    href="/projects/{project.id}"
                    class="text-base font-semibold hover:text-primary transition-colors"
                >
                    {project.data.title}
                </a>
                {#if project.data.links.github}
                    <a
                        href={project.data.links.github}
                        class="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >{project.data.links.github}</a
                    >
                {:else}
                    <p class="py-1"></p>
                {/if}
                <p class="text-sm leading-relaxed">
                    {project.data.description}
                </p>
            </div>
        {/each}
    </div>

    <CoolLink href="/projects">all projects</CoolLink>
</div>
