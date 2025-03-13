import { PostsMap } from '@/lib/posts';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const postsMap = (await import('../../../../generated/posts-map.json')) as { default: PostsMap };
    const post = postsMap.default[slug];

    if (!post) {
        return new Response('Post not found', { status: 404 });
    }

    return NextResponse.json(post);
}
