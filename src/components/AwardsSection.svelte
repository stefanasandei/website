<script>
    import CoolLink from "./CoolLink.svelte";
    import ExperienceItem from "./ExperienceItem.svelte";
    import SectionTitle from "./SectionTitle.svelte";

    const experiences = [
        {
            company: "European Olympiad in AI",
            dates: "2026, 🇷🇴 Romania",
            status: "🥈 Silver Medal",
        },
        {
            company: "Nitro NLP Hackathon",
            dates: "2026, 🌍 Online",
            status: "🥇 1st Place",
        },
        {
            company: "International Olympiad in AI",
            dates: "2025, Beijing, 🇨🇳 China",
            status: "🥉 Bronze Medal",
        },
        {
            company: "National AI Olympiad",
            dates: "2025, Bucharest, 🇷🇴 Romania",
            status: "2nd Place and 🥇 Gold Medal",
        },

        {
            company: "FIRST World Championship",
            dates: "2023, Houston, 🇺🇸 USA",
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
        <div class="min-w-[480px]">
            <div
                class="grid grid-cols-3 gap-4 px-2 py-2 text-sm font-semibold !text-foreground border-border border-b-2"
            >
                <div>Contest</div>
                <div>Date, Location</div>
                <div class="text-right">Prize</div>
            </div>

            {#each experiences as exp (exp.company)}
                <ExperienceItem {...exp} />
            {/each}
        </div>
    </div>

    <CoolLink href="/blog/high-school">high school journey</CoolLink>
</section>
