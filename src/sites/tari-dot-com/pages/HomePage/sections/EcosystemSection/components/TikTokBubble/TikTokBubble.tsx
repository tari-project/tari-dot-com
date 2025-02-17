'use client';

import { Wrapper, TextWrapper, Username, Followers, InsideBorder } from './styles';

interface TikTokBubbleProps {
    image: string;
    username: string;
    followers: string;
    style?: React.CSSProperties;
}

export default function TikTokBubble({ username, followers, image, style }: TikTokBubbleProps) {
    return (
        <Wrapper $image={image} style={style}>
            <InsideBorder />
            <TextWrapper>
                <Username>{username}</Username>
                <Followers>{followers}</Followers>
            </TextWrapper>
        </Wrapper>
    );
}
