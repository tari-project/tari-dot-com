'use client';
import React, { useEffect } from 'react';
import FAQSection from '@/sites/tari-dot-com/pages/HomePage/sections/FAQSection/FAQSection';
import ExploreTariSection from './sections/ExploreTariSection/ExploreTariSection';
import HeroSection from './sections/HeroSection/HeroSection';
import StepsSection from './sections/StepsSection/StepsSection';
import TrustedBySection from './sections/TrustedBySection/TrustedBySection';
import { EcosystemWrapper, FaqWrapper, Wrapper } from './styles';
import EcosystemSection from '@/sites/tari-dot-com/pages/HomePage/sections/EcosystemSection/EcosystemSection';
import Modals from '@/sites/tari-dot-com/ui/Modals/Modals';
import { Exchange } from '../../types/exchange';
import { useUIStore } from '@/stores/useUiStore';

type Props = {
    customData: Exchange;
};

export default function ExchangePage({ customData }: Props) {
    const isVera = customData.id === 'veera';
    const setIsVeera = useUIStore((s) => s.setVeera);

    useEffect(() => {
        if (isVera) {
            setIsVeera(true);
        }
    }, [isVera, setIsVeera]);

    return (
        <Wrapper>
            <HeroSection exchange={customData} />
            {isVera ? null : (
                <>
                    <StepsSection exchange={customData} />
                    <TrustedBySection />
                </>
            )}
            <ExploreTariSection exchange={customData} />
            <EcosystemWrapper>
                <EcosystemSection hideSupporters={true} />
            </EcosystemWrapper>
            <FaqWrapper>
                <FAQSection maxEntries={5} />
            </FaqWrapper>
            <Modals exchange={customData} />
        </Wrapper>
    );
}
