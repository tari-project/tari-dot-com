export type Update = {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    content: string;
    thumbnail: string;
    og_image: string;
    tag: string;
};

export type UpdatesMap = {
    [slug: string]: Update;
};

export type AllUpdates = Update[];

export async function getAllUpdates(): Promise<Update[]> {
    const allPostsData = await import('../../generated/all-updates.json');
    return allPostsData.default as Update[];
}

export async function getUpdatesBySlug(slug: string): Promise<Update | undefined> {
    const posts = await getAllUpdates();
    return posts.find((post) => post.slug === slug);
}

export async function getAllUpdateSlugs(): Promise<string[]> {
    const posts = await getAllUpdates();
    return posts.map((post) => post.slug);
}
