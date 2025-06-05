import React from 'react';
import { TextWrapper, Wrapper, Eyebrow, Title, BottomWrapper, WhiteText, YellowText } from './styles';
import bgImage from './images/background.png';
import DownloadButton from '@/sites/tari-dot-com/pages/HomePage/sections/IntroSection/components/DownloadButton/DownloadButton';
import MetaInfo from './components/MetaInfo/MetaInfo';
import { Exchange } from '@/sites/exchange/types/exchange';
import { getValidHexColor, getTextColorForBg } from '@/sites/exchange/utils';

export default function HeroContent({ exchange }: { exchange: Exchange }) {
    const color = getValidHexColor(exchange?.primary_colour);
    const textColor = getTextColorForBg(color);

    return (
        <Wrapper $bgImage={bgImage.src}>
            <TextWrapper>
                <Eyebrow $color={color}>Tari $xtM is on {exchange?.name}</Eyebrow>
                <Title>
                    <WhiteText>Mine to {exchange?.name} & Earn</WhiteText>
                    <YellowText $color={color}>15% Bonus XTM</YellowText>
                </Title>
                <DownloadButton backgroundColor={color} textColor={textColor} showIconBackground={true} />
            </TextWrapper>
            <BottomWrapper>
                <MetaInfo />
            </BottomWrapper>
        </Wrapper>
    );
}
