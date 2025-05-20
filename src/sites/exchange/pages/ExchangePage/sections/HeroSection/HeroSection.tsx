import HeroTopBorder from './borders/HeroTopBorder';
import HeroContent from './HeroContent/HeroContent';
import HeroHeader from './HeroHeader/HeroHeader';
import { Wrapper, ContentWrapper, MiddleWrapper } from './styles';
import { Exchange } from '@/app/(exchange)/exchange/[name]/page';
import HeroBottomBorder from './borders/HeroBottomBorder';
import HeroLeftBorder from './borders/HeroLeftBorder';
import HeroRightBorder from './borders/HeroRightBorder';

export default function HeroSection({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper>
            <HeroLeftBorder color={exchange?.color} />
            <MiddleWrapper>
                <HeroTopBorder color={exchange?.color} />
                <ContentWrapper>
                    <HeroHeader exchange={exchange} />
                    <HeroContent exchange={exchange} />
                </ContentWrapper>
                <HeroBottomBorder color={exchange?.color} />
            </MiddleWrapper>
            <HeroRightBorder color={exchange?.color} />
        </Wrapper>
    );
}
