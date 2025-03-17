'use client';

import { useMotionValue, useSpring } from 'motion/react';
import { OuterWrapper, Wrapper, TextWrapper, Username, Followers, InsideBorder, ImageWrapper, Image } from './styles';
//import TikTokIcon from '@/sites/tari-dot-com/ui/Footer/components/SocialLinks/icons/TikTokIcon';

interface Props {
    image?: string;
    video?: string | null;
    username?: string;
    followers?: string;
    style?: React.CSSProperties;
    mouseX?: number;
    mouseY?: number;
    depth?: number;
    aspectRatio?: string;
    className?: string;
}

export default function TikTokBubble({
    username,
    followers,
    image,
    video,
    style,
    mouseX = 0,
    mouseY = 0,
    depth = 1.5,
    aspectRatio = '9/16',
    className,
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

    const isLandscape = aspectRatio === '16/9';

    return (
        <OuterWrapper style={style} className={className}>
            <Wrapper
                style={{
                    x: springX,
                    y: springY,
                }}
                $isLandscape={isLandscape}
            >
                <InsideBorder />
                <TextWrapper>
                    {Boolean(username) && (
                        <Username>
                            {/* <TikTokIcon /> {username} */}
                            {username}
                        </Username>
                    )}
                    {Boolean(followers) && <Followers>{followers}</Followers>}
                </TextWrapper>
                <ImageWrapper>
                    {video ? (
                        <iframe
                            src={video}
                            style={{
                                border: 'none',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                            }}
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                            allowFullScreen={true}
                        ></iframe>
                    ) : image ? (
                        <Image src={image} alt={`${username} content`} />
                    ) : null}
                </ImageWrapper>
            </Wrapper>
        </OuterWrapper>
    );
}
