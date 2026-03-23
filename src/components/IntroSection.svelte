<script>
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
                    Math & CS undergrad at <a
                        href="https://programmes.polytechnique.edu/en/bachelor/about-the-bachelor/bachelor-of-science"
                        target="_blank"
                        class="font-semibold text-primary hover:underline hover:cursor-pointer"
                        >École Polytechnique</a
                    >
                </p>
            </div>

            <!-- Research Interests Pills -->
            <div class="flex flex-wrap items-center gap-2.5 mt-4">
                <!-- <span
                    class="text-sm text-muted-foreground/80 font-normal shrink-0"
                    >Research interests:</span
                > -->
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
    <div class="space-y-4">
        <p
            class="text-base md:text-lg leading-relaxed text-foreground/90 text-justify max-w-none"
        >
            Hello, I'm an undergrad student at École Polytechnique, in Paris,
            passionate about mathematics, deep learning and astronomy. If you
            want to collaborate on a project, feel free to <a
                href="mailto:asandei.stefanel@gmail.com"
                class="text-primary hover:text-primary/70 transition-colors underline"
            >
                reach me
            </a>.
        </p>
        <p
            class="text-base md:text-lg leading-relaxed text-foreground/90 text-justify max-w-none"
        >
            I am a very ambitious, hard-working and driven person. I'm motivated
            by my curiosity to learn and understand as much as I can. Something
            cool I built:
            <a
                href="https://github.com/stefanasandei/patheon"
                class="text-primary hover:text-primary/70 transition-colors underline"
                target="_blank"
            >
                github.com/stefanasandei/patheon
            </a>
        </p>
        <p
            class="text-base md:text-lg leading-relaxed text-foreground/90 text-justify max-w-none"
        >
            I'm an IOAI medalist and I'm actively contributing to this
            community. I am a problem setter for many competitions and I
            maintain a repository with <a
                href="https://github.com/stefanasandei/roai-solved"
                target="_blank"
                class="text-primary hover:text-primary/70 transition-colors underline"
            >
                code solutions
            </a>
            to competitive AI tasks. I also write about AI on my blog.
        </p>
    </div>
</section>
