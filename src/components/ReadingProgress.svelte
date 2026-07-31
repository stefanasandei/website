<script lang="ts">
    import { onMount } from "svelte";

    let progress = 0;
    let ticking = false;

    function update() {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                update();
                ticking = false;
            });
            ticking = true;
        }
    }

    onMount(() => {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    });
</script>

<div
    class="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
    aria-hidden="true"
>
    <div
        class="h-full bg-primary transition-[width] duration-75 ease-linear"
        style:width="{progress * 100}%"
    ></div>
</div>
