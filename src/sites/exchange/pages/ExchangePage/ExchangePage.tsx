'use client';
import React, { useEffect, useMemo } from 'react';
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
import { useUIStore } from '@/stores/useUiStore';

type Props = {
    customData?: Exchange;
    /**
     * Server-fetched exchange payload used to seed React Query. Avoids a
     * duplicate client fetch on first render. Ignored when `customData`
     * short-circuits the hook.
     */
    initialExchangeData?: Exchange;
};
export default function ExchangePage({ customData, initialExchangeData }: Props) {
    const { data: exchange } = useExchangeData({
        disabled: !!customData,
        initialData: initialExchangeData,
    });
    const data = customData || exchange;
    const isVera = useMemo(() => data?.id === 'veera', [data]);
    const setIsVeera = useUIStore((s) => s.setVeera);
    useEffect(() => {
        if (isVera) {
            setIsVeera(true);
        }
    }, [isVera, setIsVeera]);

    if (!data) {
        return <Wrapper />;
    }

    return (
        <Wrapper>
            <HeroSection exchange={data} />
            {isVera ? null : (
                <>
                    <StepsSection exchange={data} />
                    <TrustedBySection />
                </>
            )}
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
