import { getUpdatesBySlug, getAllUpdates, Update } from '@/services/lib/updates';
import PostPage from '@/sites/tari-dot-com/pages/UpdatesPage/PostPage';

import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        if (!slug) {
            return { title: 'Tari / Updates / Post Not Found' };
        }

        const post = await getUpdatesBySlug(slug);

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
    let post: Update | undefined;
    let nextPosts: Update[] = [];

    try {
        const { slug } = await params;

        if (!slug) {
            notFound();
        }

        post = await getUpdatesBySlug(slug);

        if (!post) {
            notFound();
        }

        const allPosts = await getAllUpdates();

        nextPosts = allPosts
            .filter((p) => p.slug !== slug)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);
    } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
    }

    return <PostPage post={post} nextPosts={nextPosts} />;
}
