<script>
    import { tagColors } from "../lib/tags";

    export let tag;
    export let href = null;
    export let clear = false;
    export let colorIndex = null;

    $: colorClass =
        colorIndex !== null ? tagColors[colorIndex % tagColors.length] : null;
</script>

{#if href}
    <a
        {href}
        class="text-sm {colorClass ||
            'bg-secondary text-secondary-foreground'} px-2 py-1 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors inline-block"
    >
        #{tag}
    </a>
{:else if clear}
    <button
        on:click={() => window.history.pushState({}, "", "/blog")}
        class="text-sm {colorClass ||
            'bg-secondary text-secondary-foreground'} px-2 py-1 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors inline-block cursor-pointer"
    >
        #{tag}
    </button>
{:else}
    <span
        class="text-sm {colorClass ||
            'bg-secondary text-secondary-foreground'} px-2 py-1 rounded-md inline-block"
    >
        #{tag}
    </span>
{/if}
