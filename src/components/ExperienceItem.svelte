<script>
    export let company;
    export let dates;
    export let status;
</script>

<div
    class="grid grid-cols-3 gap-4 items-center px-2 py-2 hover:bg-muted/50 transition-[background-color] duration-250 hover:duration-0"
>
    <div class="font-bold">{company}</div>
    <div class="text-sm">{dates}</div>
    <div class="text-right">
        <span class="px-2 py-0.5 text-xs">{status}</span>
    </div>
</div>
