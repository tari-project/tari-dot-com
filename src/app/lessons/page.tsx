import { getAllLessons } from '@/services/lib/lessons';
import LessonsPage from '@/sites/tari-dot-com/pages/LessonsPage/LessonsPage';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Lessons',
    };

    return metadata;
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const resolvedParams = await searchParams;
    const currentPage = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
    const lessonsPerPage = 15;

    const allLessons = await getAllLessons();
    // Sort lessons by order
    const sortedLessons = allLessons.sort((a, b) => a.order - b.order);
    const totalLessons = sortedLessons.length;
    const totalPages = Math.ceil(totalLessons / lessonsPerPage);

    const paginatedLessons = sortedLessons.slice((currentPage - 1) * lessonsPerPage, currentPage * lessonsPerPage);

    return (
        <LessonsPage
            lessons={paginatedLessons}
            pagination={{
                currentPage,
                totalPages,
                lessonsPerPage,
                totalLessons,
            }}
        />
    );
}
