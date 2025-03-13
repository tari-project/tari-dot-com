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
    const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`;

    const response = await fetch(fetchUrl, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        return [];
    }

    return response.json();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts/${slug}`;

    const response = await fetch(fetchUrl, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        return undefined;
    }

    return response.json();
}

export async function getAllPostSlugs(): Promise<string[]> {
    const posts = await getAllPosts();
    return posts.map((post) => post.slug);
}
