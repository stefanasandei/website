export interface Publication {
    id: string;
    url: string;
    pdfUrl: string;
    title: string;
    authors: string[];
    published: string;
    year: number;
    primaryCategory: string;
    code?: string;
}

const decodeEntities = (s: string) =>
    s
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

const extractId = (link: string) => link.match(/abs\/([\d.]+)/)?.[1] ?? link.trim();

export async function getPublications(
    links: string[],
    codeLinks: Record<string, string> = {},
): Promise<Publication[]> {
    const ids = [...new Set(links.map(extractId))];

    let xml = "";
    try {
        const res = await fetch(
            `http://export.arxiv.org/api/query?id_list=${ids.join(",")}&sortBy=submittedDate&sortOrder=descending`,
        );
        if (!res.ok) throw new Error(`arXiv API responded ${res.status}`);
        xml = await res.text();
    } catch (e) {
        console.warn("arXiv fetch failed, falling back to link-only entries", e);
        return ids.map((id) => ({
            id,
            url: `https://arxiv.org/abs/${id}`,
            pdfUrl: `https://arxiv.org/pdf/${id}`,
            title: `arXiv:${id}`,
            authors: [],
            published: "",
            year: 0,
            primaryCategory: "",
            code: codeLinks[id],
        }));
    }

    return xml
        .split("<entry>")
        .slice(1)
        .map((entry) => {
            const id = entry.match(/<id>[\s\S]*?\/abs\/([\d.]+?)(?:v\d+)?<\/id>/)?.[1] ?? "";
            const published = entry.match(/<published>([\s\S]*?)<\/published>/)?.[1] ?? "";
            return {
                id,
                url: `https://arxiv.org/abs/${id}`,
                pdfUrl: `https://arxiv.org/pdf/${id}`,
                title: decodeEntities(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
                authors: [...entry.matchAll(/<name>([\s\S]*?)<\/name>/g)].map((m) =>
                    decodeEntities(m[1]),
                ),
                published,
                year: parseInt(published.slice(0, 4), 10) || 0,
                primaryCategory:
                    entry.match(/<arxiv:primary_category term="([^"]+)"/)?.[1] ?? "",
                code: codeLinks[id],
            };
        })
        .filter((pub) => pub.id);
}