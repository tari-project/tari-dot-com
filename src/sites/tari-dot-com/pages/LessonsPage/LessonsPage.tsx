import { Lesson } from '@/services/lib/lessons';
import ArticlesList from './sections/ArticlesList/ArticlesList';
import { Wrapper } from './styles';

interface Props {
    lessons: Lesson[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        lessonsPerPage: number;
        totalLessons: number;
    };
}

export default function LessonsPage({ lessons, pagination }: Props) {
    return (
        <Wrapper>
            <ArticlesList lessons={lessons} pagination={pagination} />
        </Wrapper>
    );
}
