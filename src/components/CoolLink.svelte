<script>
    export let href;
</script>

<a
    class="inline-flex items-center gap-1 mt-6 text-primary hover:text-primary/80 transition-colors group"
    {href}
>
    <span class="group-hover:underline"><slot /></span>
    <span
        class="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
        >↗</span
    >
</a>
