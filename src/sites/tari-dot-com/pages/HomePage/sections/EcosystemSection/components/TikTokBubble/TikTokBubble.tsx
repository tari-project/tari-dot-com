'use client';

import { useMotionValue, useSpring } from 'motion/react';
import TikTokIcon from '@/sites/tari-dot-com/ui/Footer/icons/TikTokIcon';
import { OuterWrapper, Wrapper, TextWrapper, Username, Followers, InsideBorder } from './styles';

interface Props {
    image: string;
    username: string;
    followers: string;
    style?: React.CSSProperties;
    mouseX?: number;
    mouseY?: number;
    depth?: number;
}

export default function TikTokBubble({
    username,
    followers,
    image,
    style,
    mouseX = 0,
    mouseY = 0,
    depth = 1.5,
}: Props) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 120, damping: 20, mass: 1.1 };

    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    if (mouseX !== 0 || mouseY !== 0) {
        x.set(mouseX * 18 * depth);
        y.set(mouseY * 18 * depth);
    }

    return (
        <OuterWrapper style={style}>
            <Wrapper
                $image={image}
                style={{
                    x: springX,
                    y: springY,
                }}
            >
                <InsideBorder />
                <TextWrapper>
                    <Username>
                        <TikTokIcon /> {username}
                    </Username>
                    <Followers>{followers}</Followers>
                </TextWrapper>
            </Wrapper>
        </OuterWrapper>
    );
}
