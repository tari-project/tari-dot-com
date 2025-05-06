import { Lesson } from '@/services/lib/lessons';
import { Holder, Wrapper, LessonTitle, LessonInfo, LessonBody, LessonImage, BackButton } from './styles';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import NextLessons from './components/NextLessons/NextLessons';

interface LessonContentProps {
    lesson: Lesson;
    nextLessons?: Lesson[];
}

export default function LessonContent({ lesson, nextLessons = [] }: LessonContentProps) {
    return (
        <Wrapper>
            <Holder>
                <BackButton href="/lessons" as={Link}>
                    &lt; Back to lessons
                </BackButton>
                {lesson.thumbnail && <LessonImage src={lesson.thumbnail} alt={lesson.title} width="100%" />}
                <LessonTitle>{lesson.title}</LessonTitle>
                {lesson.author && <LessonInfo>By {lesson.author}</LessonInfo>}
                <LessonBody>
                    <ReactMarkdown>{lesson.content}</ReactMarkdown>
                </LessonBody>

                {nextLessons.length > 0 && <NextLessons lessons={nextLessons.slice(0, 3)} />}
            </Holder>
        </Wrapper>
    );
}
