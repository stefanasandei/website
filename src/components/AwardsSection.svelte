<script>
    import CoolLink from "./CoolLink.svelte";
    import ExperienceItem from "./ExperienceItem.svelte";
    import SectionTitle from "./SectionTitle.svelte";

    const experiences = [
        {
            company: "International Olympiad in AI",
            dates: "2025, Beijing, China",
            status: "Bronze Medal",
        },
        {
            company: "National AI Olympiad",
            dates: "2025, Bucharest, Romania",
            status: "2nd Place and Gold Medal",
        },
        {
            company: "Infomatrix Web Contest",
            dates: "2024, Bucharest, Romania",
            status: "Gold Medal",
        },
        {
            company: "National CS Olympiad",
            dates: "2024, Bucharest, Romania",
            status: "Bronze Medal",
        },
        {
            company: "Infoeducatie Web Hackathon",
            dates: "2023, Focsani, Romania",
            status: "1st Place and Gold Medal",
        },
        {
            company: "FIRST World Championship",
            dates: "2023, Houston, USA",
            status: "Motivate Award Finalist",
        },
    ];
</script>

<section>
    <SectionTitle>awards</SectionTitle>

    <p class="mb-6">
        A collection of awards and achievements from various competitions and
        olympiads during my high school years (to be continued).
    </p>
    <div class="space-y-1">
        <div
            class="grid grid-cols-3 gap-4 px-2 py-2 text-sm font-semibold border-b"
        >
            <div>Contest</div>
            <div>Date, Location</div>
            <div class="text-right">Prize</div>
        </div>
        {#each experiences as exp (exp.company)}
            <ExperienceItem {...exp} />
        {/each}
    </div>

    <CoolLink href="/blog/high-school">high school journey</CoolLink>
</section>
