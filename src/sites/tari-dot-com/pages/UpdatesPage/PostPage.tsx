'use client';

import Banner from '../../ui/Banner/Banner';
import Footer from '../../ui/Footer/Footer';
import GradientBackground from '../../ui/GradientBackground/GradientBackground';
import Header from '../../ui/Header/Header';
import MobileMenu from '../../ui/Header/MobileMenu/MobileMenu';
import PostContent from './sections/PostContent/PostContent';
import { Post } from '@/lib/posts';
import { Wrapper } from './styles';

interface PostPageProps {
    post?: Post;
}

export default function PostPage({ post }: PostPageProps) {
    return (
        <Wrapper>
            <Banner />
            <Header />
            <MobileMenu />

            {post && <PostContent post={post} />}

            <Footer />
            <GradientBackground />
        </Wrapper>
    );
}
