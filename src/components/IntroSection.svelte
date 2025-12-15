<script>
    import NewsSection from "./NewsSection.svelte";
</script>

<div
    class="flex md:flex-row flex-col space-y-4 items-center md:justify-between"
>
    <div class="space-y-6 flex justify-between flex-col pr-0 md:pr-6">
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl font-bold uppercase">Stefan Asandei</h1>
                <h2 class="text-lg text-muted-foreground uppercase mt-1">
                    Computer Science Student
                </h2>
            </div>

            <p class="text-base leading-relaxed text-justify">
                As a passionate computer science student, I am deeply interested
                in deep learning research, exploring the frontiers of artificial
                intelligence to solve complex problems and advance technology.
                My journey involves competitive programming, innovative
                projects, and sharing knowledge through writing.
            </p>
        </div>

        <NewsSection />
    </div>

    <!-- <img src="https://placehold.co/270x360" /> -->
    <img src="/public/pfp.jpg" class="w-[270px]" />
</div>
