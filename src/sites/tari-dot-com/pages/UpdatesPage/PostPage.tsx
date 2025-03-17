'use client';

import { Post } from '@/services/lib/posts';
import PostContent from './sections/PostContent/PostContent';

import { Wrapper } from './styles';

interface PostPageProps {
    post?: Post;
    nextPosts?: Post[];
}

export default function PostPage({ post, nextPosts = [] }: PostPageProps) {
    return <Wrapper>{post && <PostContent post={post} nextPosts={nextPosts} />}</Wrapper>;
}
