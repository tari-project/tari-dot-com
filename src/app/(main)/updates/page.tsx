import { getAllUpdates } from '@/services/lib/updates';
import UpdatesPage from '@/sites/tari-dot-com/pages/UpdatesPage/UpdatesPage';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Updates',
    };

    return metadata;
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
