'use client';

import { useState } from 'react';

import { Wrapper, TextMiddle, Eyebrow, Title, Text, Circle1, Circle2, Circle3, FloatingElements } from './styles';

import TextBubble from './components/TextBubble/TextBubble';
import TikTokBubble from './components/TikTokBubble/TikTokBubble';

import avatar1Img from './images/avatar1.png';
import avatar2Img from './images/avatar2.png';
import avatar3Img from './images/avatar3.png';

import tiktok1Img from './images/tiktok1.png';
import tiktok2Img from './images/tiktok2.png';
import tiktok3Img from './images/tiktok3.png';
import tiktok4Img from './images/tiktok4.png';
import TitleAnimation from '@/components/TitleAnimation/TitleAnimation';

export default function EcosystemSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    };

    return (
        <Wrapper onMouseMove={handleMouseMove}>
            <TextMiddle>
                <Eyebrow>PEOPLE &nbsp;❤️&nbsp; MINING TARI</Eyebrow>
                <Title>
                    <TitleAnimation text={`ECHOES FROM THE ECOSYSTEM`} align="center" />
                </Title>
                <Text>People from all around the world with tiers of computers are mining Tari everyday.</Text>
            </TextMiddle>

            <FloatingElements
                style={{
                    transform: `translate(-50%, -50%) perspective(1000px) rotateY(${mousePosition.x * -5}deg) rotateX(${
                        mousePosition.y * 5
                    }deg)`,
                }}
            >
                <TextBubble
                    text={`My fav side hustle`}
                    username={`@Casey`}
                    avatarImage={avatar1Img.src}
                    style={{ top: '11%', left: '41.8%' }}
                />
                <TextBubble
                    text={`My 3090 is killin it!`}
                    username={`@JaylenBrown`}
                    avatarImage={avatar2Img.src}
                    style={{ top: '42%', left: '4.5%' }}
                />
                <TextBubble
                    text={`Ummm, this is ridiculously simple!`}
                    username={`@boredelonmusk`}
                    avatarImage={avatar3Img.src}
                    style={{ top: '54%', right: '1%' }}
                />

                <TikTokBubble
                    username={`@Casey`}
                    followers={`252K Followers`}
                    image={tiktok1Img.src}
                    style={{ top: '10%', left: '12%' }}
                />
                <TikTokBubble
                    username={`@ToTheMoon`}
                    followers={`13K Followers`}
                    image={tiktok2Img.src}
                    style={{ top: '18%', right: '8%' }}
                />
                <TikTokBubble
                    username={`@FancyRigs`}
                    followers={`1.2M Followers`}
                    image={tiktok3Img.src}
                    style={{ top: '62%', left: '9%' }}
                />
                <TikTokBubble
                    username={`@tari_xtr`}
                    followers={`350K Followers`}
                    image={tiktok4Img.src}
                    style={{ top: '67%', right: '23%' }}
                />

                <Circle1 />
                <Circle2 />
                <Circle3 />
            </FloatingElements>
        </Wrapper>
    );
}
