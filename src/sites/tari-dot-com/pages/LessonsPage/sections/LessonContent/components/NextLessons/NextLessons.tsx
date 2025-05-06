import { Lesson } from '@/services/lib/lessons';
import { Wrapper, Card, Image, Title } from './styles';
import Link from 'next/link';
import { ReadMoreButton } from '../../../ArticlesList/components/ArticleEntry/styles';

interface NextLessonsProps {
    lessons: Lesson[];
}

export default function NextLessons({ lessons }: NextLessonsProps) {
    return (
        <Wrapper>
            {lessons.map((lesson) => (
                <Card key={lesson.slug}>
                    <Image
                        src={lesson.thumbnail || '/assets/lessons/img/lesson-background.jpg'}
                        alt={lesson.title}
                        $alignLeft={
                            !lesson.thumbnail || lesson.thumbnail === '/assets/lessons/img/lesson-background.jpg'
                        }
                    />
                    <Title href={`/lessons/${lesson.slug}`} as={Link}>
                        {lesson.title}
                    </Title>
                    <ReadMoreButton href={`/lessons/${lesson.slug}`}>Read More</ReadMoreButton>
                </Card>
            ))}
        </Wrapper>
    );
}
