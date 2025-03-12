import { Post } from '@/lib/posts';
import { Holder, Wrapper, PageTitle } from './styles';
import Pagination from './components/Pagination/Pagination';
import ArticleEntry from './components/ArticleEntry/ArticleEntry';

interface ArticlesListProps {
    posts: Post[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        postsPerPage: number;
        totalPosts: number;
    };
}

export default function ArticlesList({ posts, pagination }: ArticlesListProps) {
    return (
        <Wrapper>
            <Holder>
                <PageTitle>Developer updates</PageTitle>

                {posts.map((post) => (
                    <ArticleEntry key={post.slug} post={post} />
                ))}

                {pagination && pagination.totalPages > 1 && (
                    <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
                )}
            </Holder>
        </Wrapper>
    );
}
