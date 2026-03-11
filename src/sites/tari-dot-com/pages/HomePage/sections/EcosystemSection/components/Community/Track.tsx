'use client';

import { useEffect, useState } from 'react';
import {
    TrackWrapper,
    TrackWidth,
    Track,
    Image,
    TRACK_GAP_SIZE_DESKTOP,
    TRACK_GAP_SIZE_MOBILE,
} from './styles';
import BlockchainCapital from './images/blockchain_capital.png';
import ParisHilton from './images/paris_hilton.png';
import GEAZY from './images/geazy.png';
import GMoney from './images/gmoney.png';
import Loomdart from './images/loomdart.png';
import LilWayne from './images/lilwayne.png';

const imagesToScroll = [BlockchainCapital, ParisHilton, GEAZY, GMoney, Loomdart, LilWayne];
const imagesTotalWidth = imagesToScroll.reduce((sum, image) => sum + image.width, 0);

export default function TrackComponent() {
    const [isMobileViewport, setIsMobileViewport] = useState(false);

    useEffect(() => {
        const mobileQuery = window.matchMedia(`(max-width: 768px)`);

        const updateViewportMatch = () => {
            setIsMobileViewport(mobileQuery.matches);
        };

        updateViewportMatch();
        mobileQuery.addEventListener('change', updateViewportMatch);

        return () => {
            mobileQuery.removeEventListener('change', updateViewportMatch);
        };
    }, []);

    const gapSize = isMobileViewport ? TRACK_GAP_SIZE_MOBILE : TRACK_GAP_SIZE_DESKTOP;
    const scrollOffset = imagesTotalWidth + imagesToScroll.length * gapSize;

    return (
        <TrackWrapper>
            <TrackWidth>
                <Track
                    initial={{
                        x: '0px',
                    }}
                    animate={{
                        x: `-${scrollOffset}px`,
                        transition: {
                            x: {
                                repeat: Infinity,
                                duration: 20,
                                ease: 'linear',
                                repeatType: 'loop',
                            },
                        },
                    }}
                >
                    <Image src={BlockchainCapital.src} alt="Blockchain Capital" />
                    <Image src={ParisHilton.src} alt="Paris Hilton" />
                    <Image src={GEAZY.src} alt="G-Eazy" />
                    <Image src={GMoney.src} alt="@gmoney" />
                    <Image src={Loomdart.src} alt="@loomdart" />
                    <Image src={LilWayne.src} alt="Lil Wayne" />
                    <Image src={BlockchainCapital.src} alt="Blockchain Capital" />
                    <Image src={ParisHilton.src} alt="Paris Hilton" />
                    <Image src={GEAZY.src} alt="G-Eazy" />
                    <Image src={GMoney.src} alt="@gmoney" />
                    <Image src={Loomdart.src} alt="@loomdart" />
                    <Image src={LilWayne.src} alt="Lil Wayne" />
                    <Image src={BlockchainCapital.src} alt="Blockchain Capital" />
                    <Image src={ParisHilton.src} alt="Paris Hilton" />
                    <Image src={GEAZY.src} alt="G-Eazy" />
                    <Image src={GMoney.src} alt="@gmoney" />
                    <Image src={Loomdart.src} alt="@loomdart" />
                    <Image src={LilWayne.src} alt="Lil Wayne" />
                    <Image src={BlockchainCapital.src} alt="Blockchain Capital" />
                    <Image src={ParisHilton.src} alt="Paris Hilton" />
                    <Image src={GEAZY.src} alt="G-Eazy" />
                    <Image src={GMoney.src} alt="@gmoney" />
                    <Image src={Loomdart.src} alt="@loomdart" />
                    <Image src={LilWayne.src} alt="Lil Wayne" />
                    <Image src={BlockchainCapital.src} alt="Blockchain Capital" />
                    <Image src={ParisHilton.src} alt="Paris Hilton" />
                    <Image src={GEAZY.src} alt="G-Eazy" />
                    <Image src={GMoney.src} alt="@gmoney" />
                    <Image src={Loomdart.src} alt="@loomdart" />
                    <Image src={LilWayne.src} alt="Lil Wayne" />
                    <Image src={BlockchainCapital.src} alt="Blockchain Capital" />
                    <Image src={ParisHilton.src} alt="Paris Hilton" />
                    <Image src={GEAZY.src} alt="G-Eazy" />
                    <Image src={GMoney.src} alt="@gmoney" />
                    <Image src={Loomdart.src} alt="@loomdart" />
                    <Image src={LilWayne.src} alt="Lil Wayne" />
                </Track>
            </TrackWidth>
        </TrackWrapper>
    );
}
