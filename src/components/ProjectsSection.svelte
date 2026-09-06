<script>
    import CoolLink from "./CoolLink.svelte";
    import SectionTitle from "./SectionTitle.svelte";
    import { tagColorIndex, tagColors } from "../lib/tags";

    export let projects;

    projects = projects
        .slice()
        .filter((project) => !project.data.hidden)
        .sort((a, b) => b.data.year - a.data.year)
        .slice(0, 2);
</script>

<div>
    <SectionTitle>Projects</SectionTitle>

    <div class="grid gap-4 sm:grid-cols-2">
        {#each projects as project}
            <div
                class="group flex min-w-0 flex-col border border-border bg-card/60 p-5 transition-colors hover:border-primary/40 hover:bg-card"
            >
                <div class="flex items-baseline justify-between gap-3">
                    <a
                        href="/projects/{project.id}"
                        class="min-w-0 font-semibold text-foreground transition-colors group-hover:text-primary"
                    >
                        {project.data.title}
                    </a>
                    <span
                        class="shrink-0 text-sm tabular-nums text-muted-foreground"
                    >
                        {project.data.year}
                    </span>
                </div>
                <p
                    class="mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground"
                >
                    {project.data.description}
                </p>
                {#if (project.data.tech && project.data.tech.length > 0) || project.data.links?.arxiv}
                    <div class="mt-auto flex items-end justify-between gap-3 pt-4">
                        {#if project.data.tech && project.data.tech.length > 0}
                            <div class="flex flex-wrap items-center gap-1">
                                {#each project.data.tech.slice(0, 3) as tech}
                                    <span
                                        class={`text-sm ${tagColors[tagColorIndex(tech)]} px-2 py-1 rounded-md inline-block`}
                                    >
                                        {tech}
                                    </span>
                                {/each}
                                {#if project.data.tech.length > 3}
                                    <span class="text-sm text-muted-foreground/80">
                                        +{project.data.tech.length - 3}
                                    </span>
                                {/if}
                            </div>
                        {/if}
                        {#if project.data.links?.arxiv}
                            <a
                                href={project.data.links.arxiv}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="shrink-0 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                                arxiv link
                            </a>
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <CoolLink href="/projects">all projects</CoolLink>
</div>