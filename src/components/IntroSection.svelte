<script>
    import NewsSection from "./NewsSection.svelte";
</script>

<div class="flex md:flex-row justify-between">
    <div class="space-y-6 flex justify-between flex-col">
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl font-bold uppercase">Stefan Asandei</h1>
                <h2 class="text-lg text-muted-foreground uppercase mt-1">
                    Computer Science Student
                </h2>
            </div>

            <p>I am interested in deep learning research.</p>
        </div>

        <NewsSection />
    </div>

    <img src="https://placehold.co/270x360" />
</div>
