import { getSortedLessons } from '@/services/lib/lessons';
import LessonsPage from '@/sites/tari-dot-com/pages/LessonsPage/LessonsPage';


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

    const sortedLessons = await getSortedLessons();
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
