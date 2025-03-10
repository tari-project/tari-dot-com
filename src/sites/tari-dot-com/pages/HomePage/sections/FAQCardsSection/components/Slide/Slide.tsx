'use client';

import { ReactNode } from 'react';
import { Wrapper, TextWrapper, Title, Text, ImageWrapper, ImageBorder } from './styles';

interface Props {
    title: string;
    text: ReactNode;
    image?: string;
}

export default function Slide({ title, text, image }: Props) {
    return (
        <Wrapper>
            <TextWrapper>
                <Title>{title}</Title>
                <Text>{text}</Text>
            </TextWrapper>
            <ImageWrapper $image={image}>
                <ImageBorder />
            </ImageWrapper>
        </Wrapper>
    );
}
