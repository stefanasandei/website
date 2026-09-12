<script>
    const contactLinks = [
        {
            label: "Email",
            href: "mailto:asandei.stefanel@gmail.com",
            icon: "mail",
        },
        {
            label: "GitHub",
            href: "https://github.com/stefanasandei",
            icon: "github",
            external: true,
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com/in/stefan-asandei",
            icon: "linkedin",
            external: true,
        },
        {
            label: "Scholar",
            href: "https://scholar.google.com/citations?user=zfaGdIAAAAAJ",
            icon: "scholar",
            external: true,
        },
        {
            label: "CV",
            href: "/Asandei_CV.pdf",
            icon: "file",
            external: true,
        },
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

            <!-- Contact Pills -->
            <div class="mt-4 flex flex-col">
                <span
                    class="text-sm mb-1 text-muted-foreground/80 font-normal shrink-0"
                    >Contact:</span
                >
                <div class="flex flex-wrap items-center gap-2.5">
                    {#each contactLinks as contact}
                        <a
                            href={contact.href}
                            target={contact.external ? "_blank" : undefined}
                            rel={contact.external ? "noopener noreferrer" : undefined}
                            aria-label={contact.label}
                            class="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-secondary/60 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer border border-border/40 hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            {#if contact.icon === "mail"}
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    class="size-4"
                                >
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="m3 7 9 6 9-6" />
                                </svg>
                            {:else if contact.icon === "github"}
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="size-4"
                                >
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.292-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.096.81 2.214 0 1.598-.015 2.88-.015 3.273 0 .315.21.69.825.572C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                    />
                                </svg>
                            {:else if contact.icon === "linkedin"}
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="size-4"
                                >
                                    <path
                                        d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.3 9.4h3.8V21H3.3V9.4Zm6.2 0h3.6V11h.05c.5-.95 1.72-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-3.8v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9.5V9.4Z"
                                    />
                                </svg>
                            {:else if contact.icon === "scholar"}
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="size-4"
                                >
                                    <path d="m3 9 9-5 9 5-9 5-9-5Z" />
                                    <path d="M7 11.2V16c2.7 2.5 7.3 2.5 10 0v-4.8" />
                                    <path d="M21 9v6" />
                                </svg>
                            {:else}
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="size-4"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                                    <path d="M14 2v6h6M8 13h8M8 17h5" />
                                </svg>
                            {/if}
                            <span>{contact.label}</span>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <!-- Full-width Bio Section -->
    <div class="space-y-4">
        <p
            class="text-base md:text-lg leading-relaxed text-foreground/90 text-justify max-w-none"
        >
            Hello, I'm a bachelor student at École Polytechnique, passionate
            about deep learning, computer vision. If you want to
            collaborate on a project, feel free to <a
                href="mailto:asandei.stefanel@gmail.com"
                class="text-primary transition-colors hover:underline"
            >
                reach me
            </a>.
        </p>
        <!-- <p
            class="text-base md:text-lg leading-relaxed text-foreground/90 text-justify max-w-none"
        >
            I am a very ambitious, hard-working and driven person. I'm motivated
            by my curiosity to learn and understand as much as I can. Something
            cool I built:
            <a
                href="https://github.com/stefanasandei/patheon"
                class="text-primary  transition-colors underline"
                target="_blank"
            >
                github.com/stefanasandei/patheon
            </a>
        </p> -->
        <p
            class="text-base md:text-lg leading-relaxed text-foreground/90 text-justify max-w-none"
        >
            I'm an IOAI medalist and I'm actively contributing to this
            community. I am a <a
                href="/tasks"
                class="text-primary transition-colors hover:underline"
            >
                problem setter
            </a>
            for many competitions and I maintain a repository with
            <a
                href="https://github.com/stefanasandei/roai-solved"
                target="_blank"
                class="text-primary transition-colors hover:underline"
            >
                code solutions
            </a>
            to competitive AI tasks.
        </p>
    </div>
</section>
