import { AllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    const allPosts = (await import('../../../generated/all-posts.json')) as { default: AllPosts };
    return NextResponse.json(allPosts.default);
}
