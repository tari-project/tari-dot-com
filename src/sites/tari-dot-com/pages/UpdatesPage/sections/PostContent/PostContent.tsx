import { Post } from '@/services/lib/posts';
import { Holder, Wrapper, PostTitle, PostDate, PostBody, PostImage, BackButton } from './styles';
import ReactMarkdown from 'react-markdown';
import ArticleDate from '../ArticlesList/components/ArticleEntry/ArticleDate';
import Link from 'next/link';
import NextArticles from './components/NextArticles/NextArticles';

interface PostContentProps {
    post: Post;
    nextPosts?: Post[];
}

export default function PostContent({ post, nextPosts = [] }: PostContentProps) {
    return (
        <Wrapper>
            <Holder>
                <BackButton href="/updates" as={Link}>
                    &lt; Back to updates
                </BackButton>
                <PostImage src={post.thumbnail} alt={post.title} width="100%" />
                <PostTitle>{post.title}</PostTitle>
                <PostDate>
                    <ArticleDate dateString={post.date} />
                </PostDate>
                <PostBody>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </PostBody>

                {nextPosts.length > 0 && <NextArticles posts={nextPosts.slice(0, 3)} />}
            </Holder>
        </Wrapper>
    );
}
