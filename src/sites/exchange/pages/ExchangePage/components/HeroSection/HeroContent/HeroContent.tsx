import React from 'react';
import { TextWrapper, Wrapper, Eyebrow, Title } from './styles';
import bgImage from './images/background.png';
import DownloadButton from '@/sites/tari-dot-com/pages/HomePage/sections/IntroSection/components/DownloadButton/DownloadButton';
import MetaInfo from './components/MetaInfo/MetaInfo';
import SeasonTimer from './components/SeasonTimer/SeasonTimer';

export default function HeroContent() {
    return (
        <Wrapper $bgImage={bgImage.src}>
            <TextWrapper>
                <Eyebrow>Tari $xtM is on [EXCHANGE]</Eyebrow>
                <Title>MINE DIRECTLY TO [EXCHANGE]</Title>
                <DownloadButton />
            </TextWrapper>
            <MetaInfo />
            <SeasonTimer />
        </Wrapper>
    );
}
