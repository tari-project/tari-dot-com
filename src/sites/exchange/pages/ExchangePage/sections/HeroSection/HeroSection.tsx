import HeroTopBorder from './borders/HeroTopBorder';
import HeroContent from './HeroContent/HeroContent';
import HeroHeader from './HeroHeader/HeroHeader';
import { Wrapper, ContentWrapper, MiddleWrapper } from './styles';

import HeroBottomBorder from './borders/HeroBottomBorder';
import HeroLeftBorder from './borders/HeroLeftBorder';
import HeroRightBorder from './borders/HeroRightBorder';
import { Exchange } from '@/sites/exchange/types/exchange';

export default function HeroSection({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper>
            <HeroLeftBorder color={exchange?.primary_colour} />
            <MiddleWrapper>
                <HeroTopBorder color={exchange?.primary_colour} />
                <ContentWrapper>
                    <HeroHeader exchange={exchange} />
                    <HeroContent exchange={exchange} />
                </ContentWrapper>
                <HeroBottomBorder color={exchange?.primary_colour} />
            </MiddleWrapper>
            <HeroRightBorder color={exchange?.primary_colour} />
        </Wrapper>
    );
}
