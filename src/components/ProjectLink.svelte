<script lang="ts">
    import { siArxiv, siGithub, siHuggingface } from "simple-icons";
    import BookOpen from "@lucide/svelte/icons/book-open";
    import ExternalLink from "@lucide/svelte/icons/external-link";
    import FileText from "@lucide/svelte/icons/file-text";

    type LinkType =
        | "github"
        | "demo"
        | "paper"
        | "arxiv"
        | "huggingface"
        | "docs";

    export let href: string;
    export let label: string;
    export let type: LinkType;

    const brandIcons: Partial<Record<LinkType, string>> = {
        github: siGithub.path,
        arxiv: siArxiv.path,
        huggingface: siHuggingface.path,
    };

    const lineIcons = {
        demo: ExternalLink,
        paper: FileText,
        docs: BookOpen,
    } as const;
</script>

<a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-secondary/60 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer border border-border/40 hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
>
    {#if brandIcons[type]}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
            aria-hidden="true"
        >
            <path d={brandIcons[type]} />
        </svg>
    {:else}
        {@const Icon = lineIcons[type as keyof typeof lineIcons]}
        <Icon class="size-4" />
    {/if}
    <span>{label}</span>
</a>
