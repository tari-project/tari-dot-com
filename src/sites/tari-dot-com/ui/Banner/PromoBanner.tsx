'use client';

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
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            // Dispatch event to open modal
            const event = new CustomEvent('openASICPromoModal');
            window.dispatchEvent(event);
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
