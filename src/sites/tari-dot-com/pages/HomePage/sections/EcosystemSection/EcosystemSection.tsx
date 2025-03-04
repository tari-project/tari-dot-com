'use client';

import { useState } from 'react';
import { useMotionValue } from 'motion/react';

import {
    Wrapper,
    TextMiddle,
    Eyebrow,
    Title,
    Text,
    Circle1,
    Circle2,
    Circle3,
    FloatingElements,
    CircleHolder,
} from './styles';

import TextBubble from './components/TextBubble/TextBubble';
import TikTokBubble from './components/TikTokBubble/TikTokBubble';

import avatar1Img from './images/avatar1.png';
import avatar2Img from './images/avatar2.png';
import avatar3Img from './images/avatar3.png';

import tiktok1Img from './images/tiktok1.png';
import tiktok2Img from './images/tiktok2.png';
import tiktok3Img from './images/tiktok3.png';
import tiktok4Img from './images/tiktok4.png';
import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';

export default function EcosystemSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
    };

    return (
        <Wrapper onMouseMove={handleMouseMove}>
            <TextMiddle>
                <Eyebrow>
                    <TitleAnimation text={`PEOPLE ❤️ MINING TARI`} />
                </Eyebrow>
                <Title>
                    <TitleAnimation text={`ECHOES FROM THE ECOSYSTEM`} />
                </Title>
                <Text>
                    <TitleAnimation
                        text={`People from all around the world with tiers of computers are mining Tari everyday.`}
                        staggerDelay={0.01}
                    />
                </Text>
            </TextMiddle>

            <FloatingElements>
                <TextBubble
                    text={`My fav side hustle`}
                    username={`@Casey`}
                    avatarImage={avatar1Img.src}
                    style={{ top: '11%', left: '41.8%' }}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />
                <TextBubble
                    text={`My 3090 is killin it!`}
                    username={`@JaylenBrown`}
                    avatarImage={avatar2Img.src}
                    style={{ top: '42%', left: '4.5%' }}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />
                <TextBubble
                    text={`Ummm, this is ridiculously simple!`}
                    username={`@boredelonmusk`}
                    avatarImage={avatar3Img.src}
                    style={{ top: '54%', right: '1%' }}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />

                <TikTokBubble
                    username={`@Casey`}
                    followers={`252K Followers`}
                    image={tiktok1Img.src}
                    style={{ top: '10%', left: '12%' }}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />
                <TikTokBubble
                    username={`@ToTheMoon`}
                    followers={`13K Followers`}
                    image={tiktok2Img.src}
                    style={{ top: '18%', right: '8%' }}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />
                <TikTokBubble
                    username={`@FancyRigs`}
                    followers={`1.2M Followers`}
                    image={tiktok3Img.src}
                    style={{ top: '62%', left: '9%' }}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />
                <TikTokBubble
                    username={`@tari_xtr`}
                    followers={`350K Followers`}
                    image={tiktok4Img.src}
                    style={{ top: '67%', right: '23%' }}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />

                <CircleHolder
                    style={{
                        transform: `translate(-50%, -50%) perspective(1000px) rotateY(${
                            mousePosition.x * -5
                        }deg) rotateX(${mousePosition.y * 5}deg)`,
                    }}
                >
                    <Circle1 />
                    <Circle2 />
                    <Circle3 />
                </CircleHolder>
            </FloatingElements>
        </Wrapper>
    );
}
