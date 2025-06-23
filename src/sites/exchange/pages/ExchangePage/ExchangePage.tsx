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
import { Exchange } from '../../types/exchange';

type Props = {
    customData?: Exchange
};
export default function ExchangePage({ customData }: Props) {
    const { data: exchange } = useExchangeData({ disabled: !!customData });
    const data = customData || exchange;

    if (!data) {
        return <Wrapper />;
    }

    const isVera = customData?.id === 'vera';

    return (
        <Wrapper>
            <HeroSection exchange={data} />
            {isVera ? null : <>
                <StepsSection exchange={data} />
                <TrustedBySection />
            </>}
            <ExploreTariSection exchange={data} />
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
