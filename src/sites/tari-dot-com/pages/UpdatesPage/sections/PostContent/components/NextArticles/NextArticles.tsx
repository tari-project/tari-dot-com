import { Update } from '@/services/lib/updates';
import { Wrapper, Card, Image, Title, Meta } from './styles';
import Link from 'next/link';
import ArticleDate from '../../../ArticlesList/components/ArticleEntry/ArticleDate';
import { ReadMoreButton } from '../../../ArticlesList/components/ArticleEntry/styles';

interface NextArticlesProps {
    posts: Update[];
}

export default function NextArticles({ posts }: NextArticlesProps) {
    return (
        <Wrapper>
            {posts.map((post) => (
                <Card key={post.slug}>
                    <Image
                        src={post.thumbnail}
                        alt={post.title}
                        $alignLeft={post.thumbnail === '/assets/updates/img/update-background.jpg'}
                    />
                    <Title href={`/updates/${post.slug}`} as={Link}>
                        {post.title}
                    </Title>
                    <Meta>
                        <ArticleDate dateString={post.date} />
                    </Meta>
                    <ReadMoreButton href={`/updates/${post.slug}`}>Read More</ReadMoreButton>
                </Card>
            ))}
        </Wrapper>
    );
}
