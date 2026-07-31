<script>
    export let haveBorder = true;
    export let large = false;
</script>

<h2
    class={`flex items-center gap-3 font-bold tracking-tight ${
        large ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
    } ${haveBorder ? "mb-6 border-b border-border pb-1" : "pb-1"}`}
>
    <span class="text-primary font-extrabold"><sup>*</sup></span>
    <slot />
</h2>
