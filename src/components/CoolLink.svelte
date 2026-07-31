<script>
    export let href;
</script>

<a
    class="inline-flex mt-6 text-primary underline-offset-4 hover:underline transition-colors"
    {href}
>
    <span><slot /></span>
</a>
