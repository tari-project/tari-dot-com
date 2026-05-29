'use client';

import { useEffect, useRef } from 'react';
import { useASICModalStore } from '@/stores/useASICModalStore';
import {
    NewBannerWrapper,
    BannerContent,
    LeftSection,
    RightSection,
    ASICImage,
    MainTitle,
    SubText,
    BuyButton,
    GoldshellText,
} from './promo-styles';

type Props = {
    _children?: React.ReactNode;
    onClick?: () => void;
};

export default function PromoBanner({ _children, onClick }: Props) {
    const { openModal } = useASICModalStore();
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bannerElement = bannerRef.current;

        if (!bannerElement) {
            return;
        }

        const rootStyle = document.documentElement.style;
        const syncBannerHeight = () => {
            const bannerHeight = Math.ceil(bannerElement.getBoundingClientRect().height);
            rootStyle.setProperty('--promo-banner-height', `${bannerHeight}px`);
        };

        syncBannerHeight();

        const resizeObserver = new ResizeObserver(syncBannerHeight);
        resizeObserver.observe(bannerElement);

        return () => {
            resizeObserver.disconnect();
            rootStyle.removeProperty('--promo-banner-height');
        };
    }, []);

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            openModal();
        }
    };

    return (
        <NewBannerWrapper ref={bannerRef} onClick={handleClick}>
            <BannerContent>
                <ASICImage src="/asic-machine-banner.png" alt="ASIC Miner" />
                <LeftSection>
                    <MainTitle>THE FIRST TARI ASIC HAS ARRIVED</MainTitle>
                </LeftSection>

                <RightSection>
                    <SubText>
                        Maximize your XTM earnings with the <GoldshellText>Goldshell XT</GoldshellText>
                    </SubText>
                    <BuyButton>Buy now</BuyButton>
                </RightSection>
            </BannerContent>
        </NewBannerWrapper>
    );
}
