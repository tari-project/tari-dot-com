import { getPostBySlug } from '@/services/lib/posts';
import PostPage from '@/sites/tari-dot-com/pages/UpdatesPage/PostPage';

import { notFound } from 'next/navigation';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        if (!slug) {
            return { title: 'Tari / Updates / Post Not Found' };
        }

        const post = await getPostBySlug(slug);

        if (!post) {
            return { title: 'Tari / Updates / Post Not Found' };
        }

        return { title: `Tari / Updates / ${post.title}` };
    } catch (error) {
        console.error('Error in generateMetadata:', error);
        return { title: 'Tari / Updates' };
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        if (!slug) {
            notFound();
        }

        const post = await getPostBySlug(slug);

        if (!post) {
            notFound();
        }

        return <PostPage post={post} />;
    } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
    }
}
