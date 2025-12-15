'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useASICModalStore } from '@/stores/useASICModalStore';
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
    ASICImage
} from './styles';

export default function ASICPromoModal() {
    const { isOpen, closeModal, initAutoOpen } = useASICModalStore();

    useEffect(() => {
        initAutoOpen();
    }, [initAutoOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
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
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <CloseButton onClick={closeModal}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </CloseButton>

                            <ContentArea>
                                <div>
                                    <Title>
                                        The First Tari<br />
                                        ASIC Has Arrived
                                    </Title>
                                    
                                    <Description>
                                        <strong>Tari block rewards will never be higher than they are right now.</strong> Maximize your XTM earnings with the <strong>Goldshell XT</strong>, which delivers <strong>20x better mining performance</strong> than GPUs.
                                    </Description>

                                    <EmojiText>💜🐢</EmojiText>
                                </div>

                                <div>
                                    <CTAButton 
                                        as="a"
                                        href="https://www.goldshell.com/gsaf/Tari/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={closeModal}
                                    >
                                        Buy the Goldshell XT
                                    </CTAButton>

                                    <PromoSection>
                                        <PromoText>
                                            <strong>20% OFF</strong> When you use promo code
                                        </PromoText>
                                        <PromoCodeBadge 
                                            as="a"
                                            href="/privacy_policy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={closeModal}
                                        >
                                            PRIVACY
                                        </PromoCodeBadge>
                                    </PromoSection>
                                </div>
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
