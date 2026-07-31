<script lang="ts">
    let { title = "Show all", open = false } = $props();
</script>

<details {open} class="group border border-border !text-foreground">
    <summary
        class="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
    >
        <span>{title}</span>
        <span class="transition-transform duration-200 group-open:rotate-180"
            >▼</span
        >
    </summary>
    <div class="border-t border-border !text-foreground">
        <slot />
    </div>
</details>

<style>
    details :global(summary) {
        list-style: none;
    }
    details :global(summary::-webkit-details-marker) {
        display: none;
    }
</style>
