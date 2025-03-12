'use client';
import qrCode from '../images/qr-code.svg';
import { useState } from 'react';
import Image from 'next/image';
import playStoreButton from '../images/PlayStoreButton.svg';
import appStoreButton from '../images/AppStoreButton.svg';
import { AnimatePresence } from 'framer-motion';
import { QRButton, QRPopupContainer, QRPopupContent } from './styles';

export default function QRPopup({ os }: { os: 'Android' | 'iOS' }) {
    const [isOpen, setIsOpen] = useState(false);
    const androidLink = 'https://play.google.com/store/apps/details?id=com.tari.android.wallet';
    const iosLink = 'https://apps.apple.com/us/app/tari-aurora/id1503654828?ls=1';

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);
    const handleButtonClick = () => {
        window.open(os === 'Android' ? androidLink : iosLink);
    };

    return (
        <QRPopupContainer>
            <QRButton onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleButtonClick}>
                <Image
                    src={os === 'Android' ? playStoreButton.src : appStoreButton.src}
                    alt={os === 'Android' ? 'Play Store Button' : 'App Store Button'}
                    width={169}
                    height={50}
                />
            </QRButton>

            <AnimatePresence>
                {isOpen && (
                    <QRPopupContent
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: 10,
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Image src={qrCode.src} alt="QR Code" width={150} height={150} />
                        <h4>Scan QR Code</h4>
                    </QRPopupContent>
                )}
            </AnimatePresence>
        </QRPopupContainer>
    );
}
