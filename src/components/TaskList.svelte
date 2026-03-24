<script>
    const tasks = [
        {
            contest: "AICC Round 5",
            title: "Watermark Removal",
            link: "todo",
            type: "CV",
            difficulty: "medium",
        },
        {
            contest: "PreONIA 11-12, by Algolymp",
            title: "Markov Maze",
            link: "todo",
            type: "RL",
            difficulty: "easy",
        },
        {
            contest: "PreONIA 9-10, by Algolymp",
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
            contest: "PreOJIA 11-12, by Algolymp",
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
        of my AI tasks published in contests:
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
            href="https://ioai-community-contest.netlify.app/contests"
        >
            "AI Community Contest"
        </a>, a practice monthly contest for IOAI.
        <br /><br />
        Rated difficulties are relative to IOAI, where easy tasks can be solved with
        classic approaches, and medium/hard tasks require deeper thinking or sometimes
        using ideas from newer research papers.
    </p>
</div>
