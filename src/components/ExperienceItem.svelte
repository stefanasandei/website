<script>
    export let company;
    export let subject = "";
    export let details;
    export let status;
    export let showSubject = false;
</script>

<div
    class={`grid ${showSubject ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"} gap-4 items-center px-2 py-2.5 text-sm leading-5 !text-foreground hover:bg-muted/50 transition-[background-color] duration-250 hover:duration-0`}
>
    <div class="font-medium !text-left">{company}</div>
    {#if showSubject}
        <div
            class="hidden sm:block text-xs uppercase tracking-wide text-muted-foreground"
        >
            {subject}
        </div>
    {/if}
    <div class="hidden sm:block text-xs text-muted-foreground">{details}</div>
    <div class="text-right font-medium">
        <span class="px-2 py-0.5">{status}</span>
    </div>
</div>
