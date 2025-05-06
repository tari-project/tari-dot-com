'use client';

import { Update } from '@/services/lib/updates';
import PostContent from './sections/PostContent/PostContent';

import { Wrapper } from './styles';

interface PostPageProps {
    post?: Update;
    nextPosts?: Update[];
}

export default function PostPage({ post, nextPosts = [] }: PostPageProps) {
    return <Wrapper>{post && <PostContent post={post} nextPosts={nextPosts} />}</Wrapper>;
}
