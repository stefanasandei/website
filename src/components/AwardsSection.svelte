<script>
    import CoolLink from "./CoolLink.svelte";
    import ExperienceItem from "./ExperienceItem.svelte";
    import SectionTitle from "./SectionTitle.svelte";

    const experiences = [
        {
            company: "European Olympiad in AI",
            details: "2026, 🇷🇴 Romania",
            status: "🥈 Silver Medal",
        },
        {
            company: "Nitro NLP Hackathon",
            details: "2026, 🌍 Online",
            status: "🥇 1st Place",
        },
        {
            company: "International Olympiad in AI",
            details: "2025, Beijing, 🇨🇳 China",
            status: "🥉 Bronze Medal",
        },
        {
            company: "National AI Olympiad",
            details: "2025, Bucharest, 🇷🇴 Romania",
            status: "2nd Place and 🥇 Gold Medal",
        },

        {
            company: "FIRST World Championship",
            details: "2023, Houston, 🇺🇸 USA",
            status: "Motivate Award Finalist",
        },
    ];
</script>

<section>
    <SectionTitle>Awards</SectionTitle>

    <p class="mb-6">
        A collection of awards and achievements from various competitions and
        olympiads during my high school years (to be continued).
    </p>
    <div class="overflow-x-auto">
        <div class="min-w-0 sm:min-w-[480px]">
            <div
                class="grid grid-cols-2 sm:grid-cols-3 gap-4 px-2 py-2 text-xs font-semibold uppercase tracking-wider !text-muted-foreground border-border border-b-2"
            >
                <div class="!text-left">Contest</div>
                <div class="hidden sm:block">Date, Location</div>
                <div class="text-right">Prize</div>
            </div>

            {#each experiences as exp (exp.company)}
                <ExperienceItem {...exp} />
            {/each}
        </div>
    </div>

    <CoolLink href="/blog/high-school">all high school results</CoolLink>
</section>
