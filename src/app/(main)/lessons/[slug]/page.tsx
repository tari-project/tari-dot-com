import { getLessonBySlug, getSortedLessons, Lesson } from '@/services/lib/lessons';
import LessonPage from '@/sites/tari-dot-com/pages/LessonsPage/LessonPage';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const { slug } = await params;

        if (!slug) {
            return { title: 'Lessons / Lesson Not Found' };
        }

        const lesson = await getLessonBySlug(slug);

        if (!lesson) {
            return { title: 'Lessons / Lesson Not Found' };
        }

        return {
            title: `Lessons / ${lesson.title}`,
            description: lesson.excerpt || lesson.subtitle || lesson.lead,
            ...canonicalUrl(`/lessons/${slug}`),
        };
    } catch (error) {
        console.error('Error in generateMetadata:', error);
        return { title: 'Lessons' };
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    let lesson: Lesson | undefined;
    const nextLessons: Lesson[] = [];

    try {
        const { slug } = await params;

        if (!slug) {
            notFound();
        }

        lesson = await getLessonBySlug(slug);

        if (!lesson) {
            notFound();
        }

        const allLessons = await getSortedLessons();

        const currentLessonIndex = allLessons.findIndex((l) => l.slug === slug);

        for (let i = 1; i <= 3; i++) {
            const index = (currentLessonIndex + i) % allLessons.length;
            if (allLessons[index] && allLessons[index].slug !== slug) {
                nextLessons.push(allLessons[index]);
            }
        }
    } catch (error) {
        console.error('Error fetching lesson:', error);
        notFound();
    }

    return <LessonPage lesson={lesson} nextLessons={nextLessons} />;
}
