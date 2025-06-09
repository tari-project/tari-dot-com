import HeroTopBorder from './borders/HeroTopBorder';
import HeroContent from './HeroContent/HeroContent';
import HeroHeader from './HeroHeader/HeroHeader';
import { Wrapper, ContentWrapper, MiddleWrapper } from './styles';

import HeroBottomBorder from './borders/HeroBottomBorder';
import HeroLeftBorder from './borders/HeroLeftBorder';
import HeroRightBorder from './borders/HeroRightBorder';
import { Exchange } from '@/sites/exchange/types/exchange';
import { getValidHexColor } from '@/sites/exchange/utils';

export default function HeroSection({ exchange }: { exchange: Exchange }) {
    const color = getValidHexColor(exchange?.primary_colour);

    return (
        <Wrapper>
            <HeroLeftBorder color={color} />
            <MiddleWrapper>
                <HeroTopBorder color={color} />
                <ContentWrapper>
                    <HeroHeader exchange={exchange} />
                    <HeroContent exchange={exchange} />
                </ContentWrapper>
                <HeroBottomBorder color={color} />
            </MiddleWrapper>
            <HeroRightBorder color={color} />
        </Wrapper>
    );
}
