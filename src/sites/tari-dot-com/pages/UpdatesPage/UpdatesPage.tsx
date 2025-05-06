import { Update } from '@/services/lib/updates';
import ArticlesList from './sections/ArticlesList/ArticlesList';
import { Wrapper } from './styles';

interface UpdatesPageProps {
    posts: Update[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        postsPerPage: number;
        totalPosts: number;
    };
}

export default function UpdatesPage({ posts, pagination }: UpdatesPageProps) {
    return (
        <Wrapper>
            <ArticlesList posts={posts} pagination={pagination} />
        </Wrapper>
    );
}
