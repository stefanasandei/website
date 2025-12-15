<script lang="ts">
    import { onMount } from "svelte";

    let mobileMenuOpen = false;
    let menuButton: HTMLButtonElement;
    let firstMenuItem: HTMLAnchorElement;

    const toggleMenu = () => {
        mobileMenuOpen = !mobileMenuOpen;

        if (mobileMenuOpen) {
            setTimeout(() => firstMenuItem?.focus(), 100);
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && mobileMenuOpen) {
            mobileMenuOpen = false;
            menuButton?.focus();
        }
    };

    onMount(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    });
</script>

<nav
    class="border-b sticky top-0 bg-background border-foreground/20 mb-8 py-2 font-mono text-sm z-50"
    aria-label="Main navigation"
>
    <div
        class="md:max-w-2xl lg:max-w-6xl mx-2 md:mx-auto flex items-center justify-between"
    >
        <a
            href="/"
            class="font-bold uppercase tracking-tight hover:bg-primary/20 px-2 py-2 transition-colors"
        >
            Stefan Asandei
        </a>

        <div class="hidden md:flex items-center gap-1">
            <a
                href="/blog"
                class="px-3 py-1 hover:bg-primary/20 transition-colors"
            >
                blog
            </a>
            <!-- <a
                href="/papers"
                class="px-3 py-1 hover:bg-primary/20 transition-colors"
            >
                papers
            </a> -->
            <a
                href="/projects"
                class="px-3 py-1 hover:bg-primary/20 transition-colors"
            >
                projects
            </a>
            <a
                href="/public/Asandei_CV.pdf"
                class="px-3 py-1 hover:bg-primary/20 transition-colors"
            >
                cv
            </a>
        </div>

        <button
            bind:this={menuButton}
            on:click={toggleMenu}
            class="md:hidden px-2 py-1 border border-foreground hover:bg-primary/20 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
        >
            {mobileMenuOpen ? "✕" : "≡"}
        </button>
    </div>

    {#if mobileMenuOpen}
        <div
            id="mobile-menu"
            class="md:hidden bg-accent/20 mt-4 pt-4 border-t border-foreground/20 flex flex-col gap-2"
        >
            <a
                bind:this={firstMenuItem}
                href="/blog"
                class="px-2 py-1 hover:bg-primary/20 transition-colors w-full"
            >
                blog
            </a>
            <!-- <a
                href="/papers"
                class="px-2 py-1 hover:bg-primary/20 transition-colors w-full"
            >
                papers
            </a> -->
            <a
                href="/projects"
                class="px-2 py-1 hover:bg-primary/20 transition-colors w-full"
            >
                projects
            </a>
            <a
                href="/cv"
                class="px-2 py-1 hover:bg-primary/20 transition-colors w-full"
            >
                cv
            </a>
        </div>
    {/if}
</nav>
