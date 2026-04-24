import { getAllUpdateSlugs, getSortedUpdates, getUpdatesBySlug } from '@/services/lib/updates';
import PostPage from '@/sites/tari-dot-com/pages/UpdatesPage/PostPage';

import { notFound } from 'next/navigation';


export async function generateStaticParams() {
    const slugs = await getAllUpdateSlugs();
    return slugs.map((slug) => ({ slug }));
}

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
    try {
        const { slug } = await params;

        if (!slug) {
            notFound();
        }

        const post = await getUpdatesBySlug(slug);

        if (!post) {
            notFound();
        }

        const sortedPosts = await getSortedUpdates();

        const nextPosts = sortedPosts.filter((p) => p.slug !== slug).slice(0, 3);

        return <PostPage post={post} nextPosts={nextPosts} />;
    } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
    }
}
