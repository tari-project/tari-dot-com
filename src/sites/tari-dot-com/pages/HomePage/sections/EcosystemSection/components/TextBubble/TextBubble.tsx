'use client';

import { useMotionValue, useSpring } from 'motion/react';
import { FloatingWrapper, Wrapper, Avatar, TextWrapper, Text, Username, InViewWrapper } from './styles';
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
        <FloatingWrapper style={style} className={className}>
            <InViewWrapper
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.15, 0, 0, 0.97] }}
            >
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
            </InViewWrapper>
        </FloatingWrapper>
    );
}
