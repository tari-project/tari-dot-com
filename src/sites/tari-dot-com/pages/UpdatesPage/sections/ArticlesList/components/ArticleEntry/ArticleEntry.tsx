import { ArticleInfo, Date, Excerpt, ReadMoreButton, Tags, Thumbnail, Title, Wrapper } from './styles';
import ArticleDate from './ArticleDate';
import { Post } from '@/services/lib/posts';

interface Props {
    post: Post;
}

export default function ArticleEntry({ post }: Props) {
    return (
        <Wrapper>
            <ArticleInfo>
                <Title href={`/updates/${post.slug}`}>{post.title}</Title>
                <Excerpt>{post.excerpt}</Excerpt>
                <Date>
                    <Tags>{post.tag}</Tags>&nbsp;&nbsp;
                    <ArticleDate dateString={post.date} />
                </Date>
                <ReadMoreButton href={`/updates/${post.slug}`}>Read More</ReadMoreButton>
            </ArticleInfo>

            <Thumbnail
                $image={post.thumbnail}
                $backgroundPosition={post.thumbnail === '/assets/updates/img/update-background.jpg' ? 'left' : 'center'}
                href={`/updates/${post.slug}`}
            />
        </Wrapper>
    );
}
