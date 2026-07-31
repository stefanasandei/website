<script>
    import CollapsibleSection from "./CollapsibleSection.svelte";
    import ExperienceItem from "./ExperienceItem.svelte";
    import contestYears from "../data/high-school-contests.json";
</script>

<CollapsibleSection title="Show all contests" open>
    <div class="overflow-x-auto">
        <div class="min-w-0 sm:min-w-[760px]">
            <div
                class="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2 py-2 text-xs font-semibold uppercase tracking-wider !text-muted-foreground border-border border-b-2"
            >
                <div class="!text-left">Contest</div>
                <div class="hidden sm:block">Subject</div>
                <div class="hidden sm:block">Details</div>
                <div class="text-right">Prize</div>
            </div>

            {#each contestYears as year, yearIndex}
                {#if yearIndex > 0}
                    <div
                        class="col-span-2 sm:col-span-4 border-t border-border/70"
                        aria-hidden="true"
                    ></div>
                {/if}
                {#each year.contests as contest}
                    <ExperienceItem {...contest} showSubject={true} />
                {/each}
            {/each}
        </div>
    </div>
</CollapsibleSection>
