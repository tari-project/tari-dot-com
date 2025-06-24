import React, { useEffect, useState } from 'react';
import {
    TextWrapper,
    Wrapper,
    Eyebrow,
    Title,
    BottomWrapper,
    WhiteText,
    YellowText,
    GradientText,
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
import VeraMobileDownload from './components/VeraMobileDownload/VeraMobileDownload';

export default function HeroContent({ exchange }: { exchange: Exchange }) {
    const color = getValidHexColor(exchange?.primary_colour);
    const textColor = getTextColorForBg(color);
    const isSmallScreen = useMedia('(max-width: 1220px)');
    const isVeera = exchange.id === 'veera';

    const [videoSrc, setVideoSrc] = useState(
        'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/cd0baf3c3ee19a2534c9fb2f4fa72cec/manifest/video.m3u8',
    );

    const [posterSrc, setPosterSrc] = useState(
        'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/cd0baf3c3ee19a2534c9fb2f4fa72cec/thumbnails/thumbnail.jpg?time=&height=600',
    );

    useEffect(() => {
        if (isSmallScreen) {
            setVideoSrc(
                'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/f6417f9ea7e749608329faf2d214a242/manifest/video.m3u8',
            );
            setPosterSrc(
                'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/f6417f9ea7e749608329faf2d214a242/thumbnails/thumbnail.jpg?time=&height=600',
            );
        } else {
            setVideoSrc(
                'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/cd0baf3c3ee19a2534c9fb2f4fa72cec/manifest/video.m3u8',
            );
            setPosterSrc(
                'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/cd0baf3c3ee19a2534c9fb2f4fa72cec/thumbnails/thumbnail.jpg?time=&height=600',
            );
        }
    }, [isSmallScreen]);

    return (
        <Wrapper $bgImage={bgImage.src}>
            <VideoWrapper $isVera={isVeera}>
                <TopSlope />
                <BottomSlope />
                <VideoPlayer src={videoSrc} loop={true} poster={posterSrc} />
            </VideoWrapper>

            <TextWrapper>
                {isVeera ? (
                    <Title $isVera={isVeera}>
                        <YellowText $color={color} $isVera>
                            Download Tari Universe and{' '}
                        </YellowText>
                        <GradientText>earn rewards</GradientText>
                        <YellowText $color={color} $isVera>
                            {' '}
                            on Veera
                        </YellowText>
                    </Title>
                ) : (
                    <>
                        <Eyebrow>Tari $xtM is on {exchange?.name}</Eyebrow>
                        <Title>
                            <WhiteText>Mine to {exchange?.name} & Earn</WhiteText>
                            <YellowText $color={color}>{exchange.reward_percentage}% Bonus XTM</YellowText>
                        </Title>
                    </>
                )}
                <DownloadButton
                    isSticky={isVeera}
                    isVeera={isVeera}
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
                {isVeera ? <VeraMobileDownload /> : null}
            </TextWrapper>

            <BottomWrapper>
                <MetaInfo />
            </BottomWrapper>

            <Shadow />
        </Wrapper>
    );
}
