import React, { forwardRef } from 'react';
import { VideoPlayer } from '@/sites/tari-dot-com/pages/HomePage/sections/VideoSection/styles';
import {
    Holder,
    Title,
    Text,
    TitleWrapper,
    Wrapper,
    DiagonalYellowBox,
    ShadowBox,
    BackgroundWrapper,
    ShadowHolder,
    ShadowWrapper,
} from './styles';
import { Exchange } from '@/sites/exchange/types/exchange';

const ExploreTariSection = forwardRef<HTMLDivElement, { exchange: Exchange }>(({ exchange }, ref) => {
    return (
        <Wrapper ref={ref} id="explore-tari-section">
            <Holder>
                <TitleWrapper>
                    <Title $color={exchange?.primary_colour}>
                        EXPLORE &nbsp;<span>TARI UNIVERSE</span>
                    </Title>
                    <Text>
                        Our Tari Universe mining application is stunningly beautiful, safe and easy to use. When
                        it&apos;s running, you&apos;re helping to secure the Tari network. This is no free lunch.
                        You&apos;ll earn XTM tokens for your (computer&apos;s!) hard work.
                    </Text>
                </TitleWrapper>

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
            <BackgroundWrapper>
                <ShadowWrapper>
                    <ShadowHolder>
                        <ShadowBox />
                    </ShadowHolder>
                </ShadowWrapper>
                <DiagonalYellowBox $color={exchange?.primary_colour} />
            </BackgroundWrapper>
        </Wrapper>
    );
});

ExploreTariSection.displayName = 'ExploreTariSection';

export default ExploreTariSection;
