import React from 'react';
import {
    TextWrapper,
    Wrapper,
    Eyebrow,
    Title,
    BottomWrapper,
    WhiteText,
    YellowText,
    //VideoWrapper,
    Shadow,
} from './styles';
import bgImage from './images/background.png';
import DownloadButton from '@/sites/tari-dot-com/pages/HomePage/sections/IntroSection/components/DownloadButton/DownloadButton';
import MetaInfo from './components/MetaInfo/MetaInfo';
import { Exchange } from '@/sites/exchange/types/exchange';
import { getValidHexColor, getTextColorForBg } from '@/sites/exchange/utils';
import SeasonTimerInButton from './components/SeasonTimerInButton/SeasonTimerInButton';

export default function HeroContent({ exchange }: { exchange: Exchange }) {
    const color = getValidHexColor(exchange?.primary_colour);
    const textColor = getTextColorForBg(color);

    return (
        <Wrapper $bgImage={bgImage.src}>
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

            {/* <VideoWrapper>
                <iframe
                    src="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/f6417f9ea7e749608329faf2d214a242/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-o6ocjyfui1ltpm5h.cloudflarestream.com%2Ff6417f9ea7e749608329faf2d214a242%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen={true}
                ></iframe>
            </VideoWrapper> */}
        </Wrapper>
    );
}
