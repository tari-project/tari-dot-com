'use client';

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

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            openModal();
        }
    };

    return (
        <NewBannerWrapper onClick={handleClick}>
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
