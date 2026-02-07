<script>
    export let bio =
        "I am a Computer Science student passionate about deep learning and artificial intelligence. Currently exploring the intersection of machine learning systems and cognitive architecture. I believe in building systems that not only perform well but also provide insights into the nature of intelligence itself. My work spans from theoretical foundations to practical implementations, always aiming to push the boundaries of what's possible with modern AI.";

    const researchInterests = [
        "Deep Learning",
        "Computer Vision",
        "Self Supervised Learning",
    ];
</script>

<section class="space-y-6">
    <!-- Hero Section with Profile -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <!-- Profile Image -->
        <img
            src="/pfp.jpg"
            alt="Stefan Asandei"
            class="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shadow-lg ring-2 ring-border/50 shrink-0"
        />

        <!-- Name and Title -->
        <div class="flex-1 min-w-0 self-stretch flex flex-col justify-between">
            <div>
                <h1
                    class="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
                >
                    Stefan-Alexandru Asandei
                </h1>
                <p
                    class="text-lg md:text-xl text-muted-foreground font-medium mt-1.5"
                >
                    Math & CS undergrad at École Polytechnique
                </p>
            </div>

            <!-- Research Interests Pills -->
            <div class="flex flex-wrap items-center gap-2.5 mt-4">
                <span
                    class="text-sm text-muted-foreground/80 font-normal shrink-0"
                    >Research interests:</span
                >
                {#each researchInterests as interest}
                    <span
                        class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-secondary/60 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default border border-border/40 hover:border-primary/50"
                    >
                        {interest}
                    </span>
                {/each}
            </div>
        </div>
    </div>

    <!-- Full-width Bio Section -->
    <div class="pt-2">
        <p
            class="text-base md:text-lg leading-relaxed text-foreground/90 text-justify max-w-none"
        >
            {bio}
        </p>
    </div>
</section>
