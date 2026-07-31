/**
 * Rough word count / reading time for MDX entry bodies.
 * Strips code fences, JSX/HTML tags, imports and math blocks first.
 */
export function wordCount(body: string | undefined): number {
    if (!body) return 0;
    const text = body
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/\$\$[\s\S]*?\$\$/g, " ")
        .replace(/^import .*$/gm, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/[#*`_~[\]()]/g, " ");
    return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

export function readingTime(
    body: string | undefined,
    wordsPerMinute = 200,
): number {
    return Math.max(1, Math.round(wordCount(body) / wordsPerMinute));
}
