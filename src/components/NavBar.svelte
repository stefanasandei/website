<script lang="ts">
    import { onMount } from "svelte";

    export let links = [
        { href: "/blog", text: "blog" },
        { href: "/papers", text: "papers", disabled: true },
        { href: "/projects", text: "projects" },
        { href: "/public/Asandei_CV.pdf", text: "cv" },
        { href: "/webring", text: "webring" },
    ];

    let mobileMenuOpen = false;
    let menuButton: HTMLButtonElement;
    let firstMenuItem: HTMLAnchorElement | undefined;

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
            {#each links as link (link.href)}
                {#if !link.disabled}
                    {#if link.href === "/blog"}
                        <a
                            bind:this={firstMenuItem}
                            href={link.href}
                            class="px-3 py-1 hover:bg-primary/20 transition-colors"
                        >
                            {link.text}
                        </a>
                    {:else}
                        <a
                            href={link.href}
                            class="px-3 py-1 hover:bg-primary/20 transition-colors"
                        >
                            {link.text}
                        </a>
                    {/if}
                {/if}
            {/each}
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
            {#each links as link (link.href)}
                {#if !link.disabled}
                    {#if link.href === "/blog"}
                        <a
                            bind:this={firstMenuItem}
                            href={link.href}
                            class="px-2 py-1 hover:bg-primary/20 transition-colors w-full"
                        >
                            {link.text}
                        </a>
                    {:else}
                        <a
                            href={link.href}
                            class="px-2 py-1 hover:bg-primary/20 transition-colors w-full"
                        >
                            {link.text}
                        </a>
                    {/if}
                {/if}
            {/each}
        </div>
    {/if}
</nav>
