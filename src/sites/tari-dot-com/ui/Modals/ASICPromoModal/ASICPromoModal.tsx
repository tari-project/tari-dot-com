'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import {
    ModalOverlay,
    ModalWrapper,
    ModalBox,
    CloseButton,
    ContentArea,
    ImageArea,
    Title,
    Description,
    EmojiText,
    CTAButton,
    PromoSection,
    PromoText,
    PromoCodeBadge,
    ASICImage,
} from './styles';

const ASIC_PROMO_KEY = 'tari_asic_promo_shown';

export default function ASICPromoModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if promo has been shown before
        const hasBeenShown = localStorage.getItem(ASIC_PROMO_KEY);

        if (!hasBeenShown) {
            // Auto-open modal after 3 seconds
            const timer = setTimeout(() => {
                setShow(true);
                localStorage.setItem(ASIC_PROMO_KEY, 'true');
            }, 3000);

            return () => clearTimeout(timer);
        }

        // Listen for manual modal trigger
        const handleOpenModal = () => {
            setShow(true);
        };

        window.addEventListener('openASICPromoModal', handleOpenModal);
        return () => window.removeEventListener('openASICPromoModal', handleOpenModal);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ModalWrapper>
                        <ModalBox
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <CloseButton onClick={() => setShow(false)}>
                                <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M18 6L6 18M6 6L18 18"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </CloseButton>

                            <ContentArea>
                                <Title>
                                    The First Tari
                                    <br />
                                    ASIC Has Arrived
                                </Title>

                                <Description>
                                    <strong>Tari block rewards will never be higher than they are right now.</strong>{' '}
                                    Maximize your XTM earnings with the <strong>Goldshell XT</strong>, which delivers{' '}
                                    <strong>20x better mining performance</strong> than GPUs.
                                </Description>

                                <EmojiText>💜🐢</EmojiText>

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
                                        <strong>20% OFF</strong> When you use promo code
                                    </PromoText>
                                    <PromoCodeBadge as="a" href="/privacy_policy" onClick={() => setShow(false)}>
                                        PRIVACY
                                    </PromoCodeBadge>
                                </PromoSection>
                            </ContentArea>

                            <ImageArea>
                                <ASICImage src="/asic-machine.png" alt="Goldshell XT ASIC Miner" />
                            </ImageArea>
                        </ModalBox>
                    </ModalWrapper>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
}
