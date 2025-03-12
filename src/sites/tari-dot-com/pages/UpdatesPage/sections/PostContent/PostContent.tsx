import { Post } from '@/lib/posts';
import { Holder, Wrapper, PostTitle, PostDate, PostBody } from './styles';
import ReactMarkdown from 'react-markdown';

interface PostContentProps {
    post: Post;
}

export default function PostContent({ post }: PostContentProps) {
    return (
        <Wrapper>
            <Holder>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.date}</PostDate>
                <PostBody>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </PostBody>
            </Holder>
        </Wrapper>
    );
}
