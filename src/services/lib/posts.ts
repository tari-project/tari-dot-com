export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    content: string;
    thumbnail: string;
    og_image: string;
    tag: string;
};

export type PostsMap = {
    [slug: string]: Post;
};

export type AllPosts = Post[];

export async function getAllPosts(): Promise<Post[]> {
    const allPostsData = await import('../../generated/all-posts.json');
    return allPostsData.default as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const posts = await getAllPosts();
    return posts.find((post) => post.slug === slug);
}

export async function getAllPostSlugs(): Promise<string[]> {
    const posts = await getAllPosts();
    return posts.map((post) => post.slug);
}
