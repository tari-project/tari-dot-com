'use client';
import React from 'react';
import FAQSection from '@/sites/tari-dot-com/pages/HomePage/sections/FAQSection/FAQSection';
import ExploreTariSection from './sections/ExploreTariSection/ExploreTariSection';
import HeroSection from './sections/HeroSection/HeroSection';
import StepsSection from './sections/StepsSection/StepsSection';
import TrustedBySection from './sections/TrustedBySection/TrustedBySection';
import { EcosystemWrapper, FaqWrapper, Wrapper } from './styles';
import { useExchangeData } from '@/services/api/useExchangeData';
import EcosystemSection from '@/sites/tari-dot-com/pages/HomePage/sections/EcosystemSection/EcosystemSection';
import Modals from '@/sites/tari-dot-com/ui/Modals/Modals';

export default function ExchangePage() {
    const { data: exchange } = useExchangeData({});

    if (!exchange) {
        return <Wrapper />;
    }

    return (
        <Wrapper>
            <HeroSection exchange={exchange} />
            <StepsSection exchange={exchange} />
            <TrustedBySection />
            <ExploreTariSection exchange={exchange} />
            <EcosystemWrapper>
                <EcosystemSection hideSupporters={true} />
            </EcosystemWrapper>
            <FaqWrapper>
                <FAQSection maxEntries={5} />
            </FaqWrapper>
            <Modals />
        </Wrapper>
    );
}
