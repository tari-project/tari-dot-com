import PostPage from '@/sites/tari-dot-com/pages/UpdatesPage/PostPage';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

//export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!slug) {
        return {
            title: 'Tari / Updates / Post Not Found',
        };
    }

    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Tari / Updates / Post Not Found',
        };
    }

    return {
        title: `Tari / Updates / ${post.title}`,
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    try {
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
