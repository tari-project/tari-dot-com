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

import avatar1Img from './images/avatar1.jpg';
import avatar2Img from './images/avatar2.jpg';
import avatar3Img from './images/avatar3.jpg';

import tiktok4Img from './images/Udi-2.jpeg';
import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import Community from './components/Community/Community';

const textBubbleData: {
    text: string;
    username?: string;
    avatarImage: string;
    style: React.CSSProperties;
}[] = [
    {
        text: 'Tari Universe is like ASMR!',
        username: '@betty_nft',
        avatarImage: avatar2Img.src,
        style: { top: '11%', left: '41.8%' },
    },
    {
        text: 'History is being written in front of us!',
        username: '@itsplats',
        avatarImage: avatar1Img.src,
        style: { top: '53%', right: '3%' },
    },
    {
        text: 'Tari Universe is like the Apple of mining!',
        username: '@boredelonmusk',
        avatarImage: avatar3Img.src,
        style: { top: '42.5%', left: '3.5%' },
    },
];

const tikTokBubbleData: {
    username?: string;
    followers?: string;
    image?: string;
    video?: string;
    style: React.CSSProperties;
    aspectRatio: string;
}[] = [
    {
        username: 'CryptøJ',
        video: 'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/a97e4e57206a63d2f9baaaee2cce3ce0/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-o6ocjyfui1ltpm5h.cloudflarestream.com%2Fa97e4e57206a63d2f9baaaee2cce3ce0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false',
        style: { top: '9%', left: '13%' },
        aspectRatio: '16/9',
    },
    {
        username: '@tari_xtr',
        video: 'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/5795a98e217a08b75b230529340c01f6/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-o6ocjyfui1ltpm5h.cloudflarestream.com%2F5795a98e217a08b75b230529340c01f6%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false',
        style: { top: '18%', right: '7%' },
        aspectRatio: '9/16',
    },
    {
        username: 'Lit🔥🍀🚫',
        video: 'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/5c86c0e92bc7091ec97d976c1b5ff5fe/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-o6ocjyfui1ltpm5h.cloudflarestream.com%2F5c86c0e92bc7091ec97d976c1b5ff5fe%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false',
        style: { top: '69%', right: '20%' },

        aspectRatio: '9/16',
    },

    {
        username: 'Udi',
        followers: `I'm literally mining like this`,
        image: tiktok4Img.src,
        style: { top: '60%', left: '9%' },
        aspectRatio: '9/16',
    },
];

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
            <FloatingElements>
                <TextMiddle>
                    <Eyebrow>
                        <TitleAnimation text={`PEOPLE ❤️ MINING TARI`} />
                    </Eyebrow>
                    <Title>
                        <TitleAnimation text={`347,000+ people like you love Tari`} />
                    </Title>
                    <Text>
                        <TitleAnimation
                            text={`People from all walks of life are mining and earning Tari. Join us. The water is warm (we promise!)`}
                            staggerDelay={0.01}
                        />
                    </Text>
                </TextMiddle>

                {textBubbleData.map((bubble, index) => (
                    <TextBubble
                        key={`text-bubble-${index}`}
                        text={bubble.text}
                        username={bubble.username}
                        avatarImage={bubble.avatarImage}
                        style={bubble.style}
                        mouseX={mousePosition.x}
                        mouseY={mousePosition.y}
                    />
                ))}

                {tikTokBubbleData.map((bubble, index) => (
                    <TikTokBubble
                        key={`tiktok-bubble-${index}`}
                        username={bubble.username}
                        followers={bubble.followers}
                        image={bubble.image}
                        video={bubble.video}
                        style={bubble.style}
                        mouseX={mousePosition.x}
                        mouseY={mousePosition.y}
                        aspectRatio={bubble.aspectRatio}
                    />
                ))}

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

            <Community />
        </Wrapper>
    );
}
