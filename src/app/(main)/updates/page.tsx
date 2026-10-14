import { getAllUpdates } from '@/services/lib/updates';
import UpdatesPage from '@/sites/tari-dot-com/pages/UpdatesPage/UpdatesPage';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'Updates',
    description: "Follow the Tari project and learn what's happening in the world of programmable privacy.",
    ...canonicalUrl('/updates'),
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const resolvedParams = await searchParams;
    const currentPage = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
    const postsPerPage = 10;

    const allPosts = await getAllUpdates();
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const paginatedPosts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    return (
        <UpdatesPage
            posts={paginatedPosts}
            pagination={{
                currentPage,
                totalPages,
                postsPerPage,
                totalPosts,
            }}
        />
    );
}
