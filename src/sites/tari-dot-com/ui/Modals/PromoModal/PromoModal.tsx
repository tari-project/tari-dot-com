'use client';

import { useState, useEffect } from 'react';
import BaseModal from '../BaseModal/BaseModal';
import { ModalContainer, ContentSide, ImageSide, MinerImage, Title, Description, CTAButton, EmojiSection, PromoSection, PromoText, PromoCode } from './styles';

const PROMO_BANNER_KEY = 'tari_promo_banner_shown';

export default function PromoModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if promo has been shown before
        const hasBeenShown = localStorage.getItem(PROMO_BANNER_KEY);
        
        if (!hasBeenShown) {
            // Auto-open modal after 3 seconds
            const timer = setTimeout(() => {
                setShow(true);
                localStorage.setItem(PROMO_BANNER_KEY, 'true');
            }, 3000);

            return () => clearTimeout(timer);
        }

        // Listen for manual modal trigger
        const handleOpenModal = () => {
            setShow(true);
        };

        window.addEventListener('openPromoModal', handleOpenModal);
        return () => window.removeEventListener('openPromoModal', handleOpenModal);
    }, []);

    return (
        <BaseModal show={show} setShow={setShow}>
            <ModalContainer>
                <ContentSide>
                    <Title>The First Tari<br />ASIC Has Arrived</Title>
                    
                    <Description>
                        <span className="bold">Tari block rewards will never be higher than they are right now.</span> Maximize your XTM earnings with the <span className="bold">Goldshell XT</span>, which delivers <span className="bold">20x better mining performance</span> than GPUs.
                    </Description>

                    <EmojiSection>💜🐢</EmojiSection>

                    <CTAButton 
                        as="a"
                        href="https://www.goldshell.com/gsaf/Tari/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShow(false)}
                    >
                        Buy the Goldshell XT
                    </CTAButton>

                    <PromoSection>
                        <PromoText>
                            <span className="bold">20% OFF</span> <span className="regular">When you use promo code</span>
                        </PromoText>
                        <PromoCode>PRIVACY</PromoCode>
                    </PromoSection>
                </ContentSide>

                <ImageSide>
                    <MinerImage src="/asic-machine.png" alt="XT-BOX Mining Hardware" />
                </ImageSide>
            </ModalContainer>
        </BaseModal>
    );
}

// Export function to manually trigger modal (for banner click)
export const openPromoModal = () => {
    const event = new CustomEvent('openPromoModal');
    window.dispatchEvent(event);
};
