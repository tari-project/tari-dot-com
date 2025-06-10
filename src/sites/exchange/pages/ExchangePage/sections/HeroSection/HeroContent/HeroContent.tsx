import React, { useEffect, useState } from 'react';
import {
    TextWrapper,
    Wrapper,
    Eyebrow,
    Title,
    BottomWrapper,
    WhiteText,
    YellowText,
    VideoWrapper,
    Shadow,
    TopSlope,
    BottomSlope,
} from './styles';
import bgImage from './images/background.png';
import DownloadButton from '@/sites/tari-dot-com/pages/HomePage/sections/IntroSection/components/DownloadButton/DownloadButton';
import MetaInfo from './components/MetaInfo/MetaInfo';
import { Exchange } from '@/sites/exchange/types/exchange';
import { getValidHexColor, getTextColorForBg } from '@/sites/exchange/utils';
import SeasonTimerInButton from './components/SeasonTimerInButton/SeasonTimerInButton';
import VideoPlayer from '@/sites/tari-dot-com/pages/HomePage/sections/IntroSection/components/VideoPlayer/VideoPlayer';
import { useMedia } from 'react-use';

export default function HeroContent({ exchange }: { exchange: Exchange }) {
    const color = getValidHexColor(exchange?.primary_colour);
    const textColor = getTextColorForBg(color);
    const isSmallScreen = useMedia('(max-width: 1220px)');

    const [videoSrc, setVideoSrc] = useState(
        'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/d3fee8562a139ee49012fc31d7a8f195/manifest/video.m3u8'
    );

    useEffect(() => {
        if (isSmallScreen) {
            setVideoSrc(
                'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/f6417f9ea7e749608329faf2d214a242/manifest/video.m3u8'
            );
        } else {
            setVideoSrc(
                'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/d3fee8562a139ee49012fc31d7a8f195/manifest/video.m3u8'
            );
        }
    }, [isSmallScreen]);

    return (
        <Wrapper $bgImage={bgImage.src}>
            <VideoWrapper>
                <TopSlope />
                <BottomSlope />
                <VideoPlayer
                    src={videoSrc}
                    loop={true}
                    poster="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/d3fee8562a139ee49012fc31d7a8f195/thumbnails/thumbnail.jpg?time=&height=600"
                />
            </VideoWrapper>

            <TextWrapper>
                <Eyebrow>Tari $xtM is on {exchange?.name}</Eyebrow>
                <Title>
                    <WhiteText>Mine to {exchange?.name} & Earn</WhiteText>
                    <YellowText $color={color}>{exchange.reward_percentage}% Bonus XTM</YellowText>
                </Title>
                <DownloadButton
                    backgroundColor={color}
                    textColor={textColor}
                    showIconBackground={true}
                    glow={true}
                    subTextComponent={
                        exchange?.reward_expiry_date ? (
                            <SeasonTimerInButton date={new Date(exchange.reward_expiry_date)} />
                        ) : null
                    }
                />
            </TextWrapper>

            <BottomWrapper>
                <MetaInfo />
            </BottomWrapper>

            <Shadow />
        </Wrapper>
    );
}
