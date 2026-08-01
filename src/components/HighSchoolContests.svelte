<script>
    import CollapsibleSection from "./CollapsibleSection.svelte";
    import contests from "../data/high-school-contests.json";

    const contestYears = contests.reduce((years, contest) => {
        let year = years[years.length - 1];

        if (!year || year.year !== contest.year) {
            year = { year: contest.year, contests: [] };
            years.push(year);
        }

        year.contests.push(contest);
        return years;
    }, []);

    contestYears.sort((a, b) => b.year - a.year);
</script>

<CollapsibleSection title="Show all contests" open>
    <div class="space-y-8 p-4">
        {#each contestYears as year}
            <section>
                <h3
                    class="mb-3 border-b border-border pb-2 text-lg font-semibold !text-foreground"
                >
                    {year.year}
                </h3>
                <div class="list-none space-y-3 p-0">
                    {#each year.contests as contest}
                        <div>
                            <p
                                class="!text-left text-sm leading-relaxed !text-foreground/90"
                            >
                                <span class="font-semibold text-primary"
                                    >{contest.subject}</span
                                >: {contest.title}
                                <!-- <a
                                    href={contest.source}
                                    target={contest.source === "#"
                                        ? undefined
                                        : "_blank"}
                                    rel={contest.source === "#"
                                        ? undefined
                                        : "noopener noreferrer"}
                                    class="ml-2 whitespace-nowrap text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                                    >Source</a
                                > -->
                            </p>
                        </div>
                    {/each}
                </div>
            </section>
        {/each}
    </div>
</CollapsibleSection>
