'use client';

import { useMotionValue, useSpring } from 'motion/react';
import { OuterWrapper, Wrapper, Avatar, TextWrapper, Text, Username } from './styles';
import BlueCheckIcon from './BlueCheckIcon';

interface Props {
    avatarImage: string;
    text?: string;
    username?: string;
    style?: React.CSSProperties;
    mouseX?: number;
    mouseY?: number;
    depth?: number;
    className?: string;
}

export default function TextBubble({
    avatarImage,
    text,
    username,
    style,
    mouseX = 0,
    mouseY = 0,
    depth = 1.2,
    className,
}: Props) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15 };

    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    if (mouseX !== 0 || mouseY !== 0) {
        x.set(mouseX * 25 * depth);
        y.set(mouseY * 25 * depth);
    }

    return (
        <OuterWrapper style={style} className={className}>
            <Wrapper
                style={{
                    x: springX,
                    y: springY,
                }}
            >
                <Avatar $image={avatarImage} />
                <TextWrapper>
                    <Text>{text}</Text>
                    <Username>
                        {username} <BlueCheckIcon />
                    </Username>
                </TextWrapper>
            </Wrapper>
        </OuterWrapper>
    );
}
