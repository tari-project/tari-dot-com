import { ArticleInfo, Excerpt, ReadMoreButton, Thumbnail, Title, Wrapper } from './styles';
import { Lesson } from '@/services/lib/lessons';

interface Props {
    lesson: Lesson;
}

export default function ArticleEntry({ lesson }: Props) {
    return (
        <Wrapper>
            <ArticleInfo>
                <Title href={`/lessons/${lesson.slug}.html`}>{lesson.title}</Title>
                <Excerpt>{lesson.excerpt}</Excerpt>
                <ReadMoreButton href={`/lessons/${lesson.slug}.html`}>Read More</ReadMoreButton>
            </ArticleInfo>

            <Thumbnail
                $image={lesson.thumbnail || '/assets/lessons/img/lesson-background.jpg'}
                $backgroundPosition={
                    !lesson.thumbnail || lesson.thumbnail === '/assets/lessons/img/lesson-background.jpg'
                        ? 'left'
                        : 'center'
                }
                href={`/lessons/${lesson.slug}.html`}
            />
        </Wrapper>
    );
}
