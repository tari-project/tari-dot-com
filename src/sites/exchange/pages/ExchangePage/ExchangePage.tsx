import React from 'react';
import FAQSection from '@/sites/tari-dot-com/pages/HomePage/sections/FAQSection/FAQSection';
import ExploreTariSection from './sections/ExploreTariSection/ExploreTariSection';
import HeroSection from './sections/HeroSection/HeroSection';
import StepsSection from './sections/StepsSection/StepsSection';
import TrustedBySection from './sections/TrustedBySection/TrustedBySection';
import { FaqWrapper, Wrapper } from './styles';
import { Exchange } from '@/sites/exchange/types/exchange';

export default function ExchangePage({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper>
            <HeroSection exchange={exchange} />
            <StepsSection exchange={exchange} />
            <TrustedBySection />
            <ExploreTariSection exchange={exchange} />
            <FaqWrapper>
                <FAQSection />
            </FaqWrapper>
        </Wrapper>
    );
}
