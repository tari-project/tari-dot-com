import React from 'react';
import { TextWrapper, Wrapper, Eyebrow, Title, BottomWrapper } from './styles';
import bgImage from './images/background.png';
import DownloadButton from '@/sites/tari-dot-com/pages/HomePage/sections/IntroSection/components/DownloadButton/DownloadButton';
import MetaInfo from './components/MetaInfo/MetaInfo';
import SeasonTimer from './components/SeasonTimer/SeasonTimer';
import { Exchange } from '@/app/(exchange)/exchange/[name]/page';

export default function HeroContent({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper $bgImage={bgImage.src}>
            <TextWrapper>
                <Eyebrow>Tari $xtM is on {exchange?.name}</Eyebrow>
                <Title>MINE DIRECTLY TO {exchange?.name}</Title>
                <DownloadButton backgroundColor={exchange?.color} textColor={`#161616`} showIconBackground={true} />
            </TextWrapper>
            <BottomWrapper>
                <MetaInfo />
                <SeasonTimer />
            </BottomWrapper>
        </Wrapper>
    );
}
