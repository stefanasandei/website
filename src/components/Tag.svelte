<script>
    export let tag;
    export let href = null;
    export let clear = false;
</script>

{#if href}
    <a
        {href}
        class="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors inline-block"
    >
        #{tag}
    </a>
{:else if clear}
    <button
        on:click={() => window.history.pushState({}, "", "/blog")}
        class="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors inline-block cursor-pointer"
    >
        #{tag}
    </button>
{:else}
    <span
        class="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-md inline-block"
    >
        #{tag}
    </span>
{/if}
