<script lang="ts">
    import { onMount } from "svelte";

    let isDark = $state(false);
    let mounted = $state(false);

    onMount(() => {
        isDark = document.documentElement.classList.contains("dark");
        mounted = true;
    });

    function toggle() {
        isDark = !isDark;
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        try {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (_) {}
    }
</script>

<button
    onclick={toggle}
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    class="px-2 py-1 hover:bg-primary/20 transition-colors inline-flex items-center justify-center"
>
    {#if !mounted}
        <span class="inline-block w-4 h-4" aria-hidden="true"></span>
    {:else if isDark}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="4" />
            <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
        </svg>
    {:else}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    {/if}
</button>
