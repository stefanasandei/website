/**
 * Cool, blue-ish color palette for tag chips.
 * The same color is reused for the same string so each tag
 * keeps a consistent identity across pages.
 */
export const tagColors: string[] = [
    "bg-[#93c5fd] text-[#0f172a] dark:bg-blue-900/30 dark:text-blue-300",
    "bg-[#67e8f9] text-[#0f172a] dark:bg-cyan-900/30 dark:text-cyan-300",
    "bg-[#7dd3fc] text-[#0f172a] dark:bg-sky-900/30 dark:text-sky-300",
    "bg-[#a5b4fc] text-[#0f172a] dark:bg-indigo-900/30 dark:text-indigo-300",
    "bg-[#5eead4] text-[#0f172a] dark:bg-teal-900/30 dark:text-teal-300",
];

/** Stable hash so a given tag always maps to the same color. */
export function tagColorIndex(tag: string): number {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = (hash << 5) - hash + tag.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % tagColors.length;
}
