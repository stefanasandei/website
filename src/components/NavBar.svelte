<script lang="ts">
    import { onMount } from "svelte";
    import ThemeToggle from "./ThemeToggle.svelte";

    export let links = [
        { href: "/blog", text: "Blog" },
        { href: "/papers", text: "papers", disabled: true },
        { href: "/projects", text: "Projects" },
        { href: "/public/Asandei_CV.pdf", text: "CV" },
        // { href: "/webring", text: "webring" },
    ];

    let mobileMenuOpen = false;
    let menuButton: HTMLButtonElement;
    let firstMenuItem: HTMLAnchorElement | undefined;
    let currentPath = "";

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

    const isActive = (href: string) =>
        href !== "/" &&
        !href.includes(".pdf") &&
        (currentPath === href || currentPath.startsWith(href + "/"));

    const linkClass = (href: string, extra = "") =>
        `transition-colors ${extra} ${
            isActive(href)
                ? "bg-primary/15 text-primary font-semibold"
                : "hover:bg-primary/20"
        }`;

    onMount(() => {
        currentPath = window.location.pathname;
        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    });
</script>

<nav
    class="border-b sticky top-0 bg-background border-foreground/20 mb-8 py-2 text-sm z-50"
    aria-label="Main navigation"
>
    <div
        class="md:max-w-2xl lg:max-w-6xl mx-2 md:mx-auto flex items-center justify-between"
    >
        <a
            href="/"
            class="font-bold text-lg tracking-tight hover:bg-primary/20 px-2 py-1 transition-colors"
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
                            class={linkClass(link.href, "px-3 py-1")}
                            aria-current={isActive(link.href)
                                ? "page"
                                : undefined}
                        >
                            {link.text}
                        </a>
                    {:else}
                        <a
                            href={link.href}
                            class={linkClass(link.href, "px-3 py-1")}
                            aria-current={isActive(link.href)
                                ? "page"
                                : undefined}
                        >
                            {link.text}
                        </a>
                    {/if}
                {/if}
            {/each}
            <ThemeToggle />
        </div>

        <div class="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
                bind:this={menuButton}
                on:click={toggleMenu}
                class="px-2 py-1 border border-foreground hover:bg-primary/20 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
            >
                {mobileMenuOpen ? "✕" : "≡"}
            </button>
        </div>
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
                            class={linkClass(link.href, "px-2 py-1 w-full")}
                            aria-current={isActive(link.href)
                                ? "page"
                                : undefined}
                        >
                            {link.text}
                        </a>
                    {:else}
                        <a
                            href={link.href}
                            class={linkClass(link.href, "px-2 py-1 w-full")}
                            aria-current={isActive(link.href)
                                ? "page"
                                : undefined}
                        >
                            {link.text}
                        </a>
                    {/if}
                {/if}
            {/each}
        </div>
    {/if}
</nav>
