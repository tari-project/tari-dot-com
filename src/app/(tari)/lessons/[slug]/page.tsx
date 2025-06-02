import { getLessonBySlug, getSortedLessons } from '@/services/lib/lessons';
import LessonPage from '@/sites/tari-dot-com/pages/LessonsPage/LessonPage';

import { notFound } from 'next/navigation';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        if (!slug) {
            return { title: 'Tari / Lessons / Lesson Not Found' };
        }

        const lesson = await getLessonBySlug(slug);

        if (!lesson) {
            return { title: 'Tari / Lessons / Lesson Not Found' };
        }

        return { title: `Tari / Lessons / ${lesson.title}` };
    } catch (error) {
        console.error('Error in generateMetadata:', error);
        return { title: 'Tari / Lessons' };
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        if (!slug) {
            notFound();
        }

        const lesson = await getLessonBySlug(slug);

        if (!lesson) {
            notFound();
        }

        const allLessons = await getSortedLessons();

        const currentLessonIndex = allLessons.findIndex((l) => l.slug === slug);

        const nextLessons = [];
        for (let i = 1; i <= 3; i++) {
            const index = (currentLessonIndex + i) % allLessons.length;
            if (allLessons[index] && allLessons[index].slug !== slug) {
                nextLessons.push(allLessons[index]);
            }
        }

        return <LessonPage lesson={lesson} nextLessons={nextLessons} />;
    } catch (error) {
        console.error('Error fetching lesson:', error);
        notFound();
    }
}
