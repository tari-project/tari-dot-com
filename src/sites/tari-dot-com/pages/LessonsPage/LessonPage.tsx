'use client';

import { Lesson } from '@/services/lib/lessons';
import LessonContent from './sections/LessonContent/LessonContent';

import { Wrapper } from './styles';

interface LessonPageProps {
    lesson?: Lesson;
    nextLessons?: Lesson[];
}

export default function LessonPage({ lesson, nextLessons = [] }: LessonPageProps) {
    return <Wrapper>{lesson && <LessonContent lesson={lesson} nextLessons={nextLessons} />}</Wrapper>;
}
