<script>
    export let haveBorder = true;
    export let large = false;
</script>

{#if haveBorder}
    <h2 class="text-lg font-bold mb-4 pb-2 border-b border-border">
        <span
            class={`text-primary font-extrabold ${large ? "text-4xl" : "text-2xl"}`}
            >*</span
        >
        <span class={`${large ? "text-4xl" : "text-2xl"}`}>
            <slot />
        </span>
    </h2>
{:else}
    <h2 class="text-lg font-bold pb-2">
        <span
            class={`text-primary font-extrabold ${large ? "text-4xl" : "text-2xl"}`}
            >*</span
        >
        <span class={`${large ? "text-4xl" : "text-2xl"}`}>
            <slot />
        </span>
    </h2>
{/if}
