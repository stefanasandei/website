<script>
    import CoolLink from "./CoolLink.svelte";
    import SectionTitle from "./SectionTitle.svelte";

    export let projects;
</script>

<div>
    <SectionTitle>projects</SectionTitle>

    <p class="mb-6">
        There are the most relevant coding projects I've worked on.
    </p>

    <div class="border border-dotted p-4 border-border rounded-lg">
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

    <p class="mt-8">
        I am also actively contributing to AI competitions. List of published
        tasks:
    </p>
    <ul class="list list-inside list-disc">
        <li>
            CEOAI Practice Round 1:
            <a
                class="text-base font-semibold hover:underline text-primary hover:cursor-pointer transition-colors"
                target="_blank"
                href="https://judge.nitro-ai.org/competitions/ceoai/ceoai-2026-practice-1/3/view"
                >"Star Observatory"</a
            > (CV)
        </li>
        <li>
            PreOJIA 11-12, by Algolymp:
            <a
                class="text-base font-semibold hover:underline text-primary hover:cursor-pointer transition-colors"
                target="_blank"
                href="https://judge.nitro-ai.org/competitions/algolymp/algolymp-preojia-xi-xii/1/view"
                >"Lunar Craters"</a
            > (CV)
        </li>
    </ul>
</div>
