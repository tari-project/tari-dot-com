import Banner from '../../ui/Banner/Banner';
import Footer from '../../ui/Footer/Footer';
import GradientBackground from '../../ui/GradientBackground/GradientBackground';
import Header from '../../ui/Header/Header';
import MobileMenu from '../../ui/Header/MobileMenu/MobileMenu';
import ArticlesList from './sections/ArticlesList/ArticlesList';
import { Wrapper } from './styles';
import { Post } from '@/lib/posts';

interface UpdatesPageProps {
    posts: Post[];
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
            <Banner />
            <Header />
            <MobileMenu />

            <ArticlesList posts={posts} pagination={pagination} />

            <Footer />
            <GradientBackground />
        </Wrapper>
    );
}
