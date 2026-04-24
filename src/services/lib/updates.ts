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

/**
 * Raw accessor. Returns a shallow copy of the bundled updates array so
 * callers can sort/filter without mutating the imported module state.
 */
export async function getAllUpdates(): Promise<Update[]> {
    const allPostsData = await import('../../generated/all-updates.json');
    return [...(allPostsData.default as Update[])];
}

export async function getUpdatesBySlug(slug: string): Promise<Update | undefined> {
    const posts = await getAllUpdates();
    return posts.find((post) => post.slug === slug);
}

export async function getAllUpdateSlugs(): Promise<string[]> {
    const posts = await getAllUpdates();
    return posts.map((post) => post.slug);
}

/**
 * Sorted accessor. Explicitly returns a new array sorted by `date` descending
 * (newest first). Does not mutate the underlying module-level JSON.
 */
export async function getSortedUpdates(): Promise<Update[]> {
    const posts = await getAllUpdates();
    return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
