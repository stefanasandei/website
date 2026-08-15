type BlogEntry = {
    data: {
        date: Date;
        is_archive?: boolean;
    };
};

export function isArchived(post: BlogEntry): boolean {
    return post.data.is_archive ?? post.data.date.getFullYear() < 2026;
}

export function blogSlug(id: string): string {
    return id.replace(/^archive\//, "");
}
