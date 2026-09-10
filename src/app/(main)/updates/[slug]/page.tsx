import { getUpdatesBySlug, getAllUpdates } from '@/services/lib/updates';
import PostPage from '@/sites/tari-dot-com/pages/UpdatesPage/PostPage';

import { notFound } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { pageError } from '@/app/utils';

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

const InnerPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    const post = await getUpdatesBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = await getAllUpdates();

    const nextPosts = allPosts
        .filter((p) => p.slug !== slug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return <PostPage post={post} nextPosts={nextPosts} />;
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <ErrorBoundary fallbackRender={({ error }) => <div>{error + ''}</div>} onError={pageError}>
            <InnerPage params={params} />
        </ErrorBoundary>
    );
}
