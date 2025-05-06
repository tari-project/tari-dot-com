import { Holder, Wrapper, PageTitle } from './styles';
import Pagination from './components/Pagination/Pagination';
import ArticleEntry from './components/ArticleEntry/ArticleEntry';
import { Lesson } from '@/services/lib/lessons';

interface ArticlesListProps {
    lessons: Lesson[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        lessonsPerPage: number;
        totalLessons: number;
    };
}

export default function ArticlesList({ lessons, pagination }: ArticlesListProps) {
    return (
        <Wrapper>
            <Holder>
                <PageTitle>Lessons</PageTitle>

                {lessons.map((lesson) => (
                    <ArticleEntry key={lesson.slug} lesson={lesson} />
                ))}

                {pagination && pagination.totalPages > 1 && (
                    <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
                )}
            </Holder>
        </Wrapper>
    );
}
