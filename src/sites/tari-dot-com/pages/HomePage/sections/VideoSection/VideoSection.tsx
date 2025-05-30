'use client';

import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import { Wrapper, TextWrapper, Title, Text, Holder, VideoPlayer } from './styles';

export default function VideoSection() {
    return (
        <Wrapper id="how-it-works">
            <Holder>
                <TextWrapper>
                    <Title>
                        <TitleAnimation text={`Run Tari Universe. Earn Tari (XTM)`} />
                    </Title>
                    <Text>
                        <TitleAnimation
                            text={`Our Tari Universe mining application is stunningly beautiful, safe and easy to use. When its running, you’re helping to secure the Tari network. This is no free lunch. You’ll earn XTM tokens for your (computer's!) hard work.`}
                            staggerDelay={0.01}
                        />
                    </Text>
                </TextWrapper>

                <VideoPlayer
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.15, 0, 0, 0.97] }}
                >
                    <iframe
                        src="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/9e28f4ccfda42bd43d3c2d77e06a81ad/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-o6ocjyfui1ltpm5h.cloudflarestream.com%2F9e28f4ccfda42bd43d3c2d77e06a81ad%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&background=#fff"
                        loading="lazy"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={true}
                    ></iframe>
                </VideoPlayer>
            </Holder>
        </Wrapper>
    );
}
