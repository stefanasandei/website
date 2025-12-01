<script>
    import ExperienceItem from "./ExperienceItem.svelte";

    const experiences = [
        { company: "Company A", dates: "2024 - Now", status: "Active" },
        { company: "Company B", dates: "2022 - 2024", status: "Done" },
        { company: "Company C", dates: "2020 - 2022", status: "Done" },
    ];
</script>

<section>
    <h2 class="text-lg font-bold uppercase mb-4 pb-2 border-b border-border">
        Experience
    </h2>

    <div class="space-y-1">
        <div
            class="grid grid-cols-3 gap-4 px-2 py-2 text-sm font-semibold border-b"
        >
            <div>Company</div>
            <div>Dates</div>
            <div class="text-right">Status</div>
        </div>
        {#each experiences as exp (exp.company)}
            <ExperienceItem {...exp} />
        {/each}
    </div>
</section>
