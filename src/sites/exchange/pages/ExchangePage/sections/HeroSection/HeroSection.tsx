import HeroBorder from './HeroBorder/HeroBorder';
import HeroContent from './HeroContent/HeroContent';
import HeroHeader from './HeroHeader/HeroHeader';
import { Wrapper, ContentWrapper } from './styles';

export default function HeroSection() {
    return (
        <Wrapper>
            <ContentWrapper>
                <HeroHeader />
                <HeroContent />
            </ContentWrapper>
            <HeroBorder />
        </Wrapper>
    );
}
