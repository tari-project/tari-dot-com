'use client';

import { Wrapper, Avatar, TextWrapper, Text, Username } from './styles';

interface Props {
    avatarImage: string;
    text: string;
    username: string;
    style?: React.CSSProperties;
}

export default function TextBubble({ avatarImage, text, username, style }: Props) {
    return (
        <Wrapper style={style}>
            <Avatar $image={avatarImage} />
            <TextWrapper>
                <Text>{text}</Text>
                <Username>{username}</Username>
            </TextWrapper>
        </Wrapper>
    );
}
