<script>
    const { fullPage } = $props();

    const tasks = [
        {
            contest: "AICC Round 5",
            title: "Watermark Removal",
            link: "todo",
            type: "CV",
            difficulty: "medium",
        },
        {
            contest: "PreONIA Algolymp 11-12",
            title: "Markov Maze",
            link: "todo",
            type: "RL",
            difficulty: "easy",
        },
        {
            contest: "PreONIA Algolymp 9-10",
            title: "RNA Profile",
            link: "todo",
            type: "NLP",
            difficulty: "easy",
        },
        {
            contest: "CEOAI Practice Round 1",
            title: "Star Observatory",
            link: "https://judge.nitro-ai.org/competitions/ceoai/ceoai-2026-practice-1/3/view",
            type: "CV",
            difficulty: "hard",
        },
        {
            contest: "PreOJIA Algolymp 11-12",
            title: "Lunar Craters",
            link: "https://judge.nitro-ai.org/competitions/algolymp/algolymp-preojia-xi-xii/1/view",
            type: "CV",
            difficulty: "easy",
        },
        {
            contest: "AICC Round 3",
            title: "Sound of Nature",
            link: "https://www.kaggle.com/competitions/sound-of-nature-aicc-round-3/overview",
            type: "Audio",
            difficulty: "easy",
        },
        {
            contest: "AICC Round 2",
            title: "Face Matching",
            link: "https://www.kaggle.com/competitions/face-matching-aicc-round-2",
            type: "CV",
            difficulty: "easy",
        },
        {
            contest: "AICC Round 2",
            title: "Essay Gap",
            link: "https://www.kaggle.com/competitions/essay-gap-aicc-round-2",
            type: "NLP",
            difficulty: "easy",
        },
        {
            contest: "AICC Round 0",
            title: "Brain Tumor",
            link: "https://www.kaggle.com/competitions/aicc-round-0-brain-tumor",
            type: "CV",
            difficulty: "medium",
        },
    ];

    const linkClasses =
        "text-base font-semibold hover:underline text-primary hover:cursor-pointer transition-colors";
</script>

<div>
    <p>
        Complete
        <a class={linkClasses} href="/tasks">list</a>
        of my competitive AI tasks published in contests:
    </p>

    <ul class="list list-inside list-disc mt-4">
        {#each tasks as task}
            <li>
                {task.contest}:
                <a class={linkClasses} target="_blank" href={task.link}>
                    "{task.title}"
                </a>
                ({task.type}, {task.difficulty})
            </li>
        {/each}
    </ul>

    <p class="mt-4 text-justify">
        For context, "preOJIA" and "preONIA" contests are preparatory rounds for
        Romania's regional and national phases, respectively. AICC stands for
        <a
            class={linkClasses}
            target="_blank"
            href="https://aicc-official.org/contests"
        >
            "AI Community Contest"
        </a>, a practice monthly contest for international AI olympiads.

        {#if fullPage}
            <br /><br />
            Rated difficulties are relative to IOAI, where easy tasks can be solved
            with classic approaches, and medium/hard tasks require deeper thinking
            or sometimes using ideas from newer research papers.
        {/if}
    </p>
</div>
