'use client';

import { useState, useEffect } from 'react';
import BaseModal from '../BaseModal/BaseModal';
import { 
    ModalContent, 
    ContentSection, 
    ImageSection, 
    Title, 
    Description, 
    EmojiText, 
    ButtonContainer,
    CTAButton, 
    PromoRow, 
    PromoText, 
    PromoCodePill,
    MinerImage 
} from './styles';

const TARI_ASIC_BANNER_KEY = 'tari_asic_banner_shown';

export default function TariASICModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if promo has been shown before
        const hasBeenShown = localStorage.getItem(TARI_ASIC_BANNER_KEY);
        
        if (!hasBeenShown) {
            // Auto-open modal after 3 seconds
            const timer = setTimeout(() => {
                setShow(true);
                localStorage.setItem(TARI_ASIC_BANNER_KEY, 'true');
            }, 3000);

            return () => clearTimeout(timer);
        }

        // Listen for manual modal trigger
        const handleOpenModal = () => {
            setShow(true);
        };

        window.addEventListener('openTariASICModal', handleOpenModal);
        return () => window.removeEventListener('openTariASICModal', handleOpenModal);
    }, []);

    return (
        <BaseModal show={show} setShow={setShow}>
            <ModalContent>
                <ContentSection>
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

                    <ButtonContainer>
                        <CTAButton 
                            as="a"
                            href="https://www.goldshell.com/gsaf/Tari/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShow(false)}
                        >
                            Buy the Goldshell XT
                        </CTAButton>

                        <PromoRow>
                            <PromoText>
                                <strong>20% OFF</strong> When you use promo code
                            </PromoText>
                            <PromoCodePill>PRIVACY</PromoCodePill>
                        </PromoRow>
                    </ButtonContainer>
                </ContentSection>

                <ImageSection>
                    <MinerImage src="/asic-machine.png" alt="Goldshell XT Mining Hardware" />
                </ImageSection>
            </ModalContent>
        </BaseModal>
    );
}
