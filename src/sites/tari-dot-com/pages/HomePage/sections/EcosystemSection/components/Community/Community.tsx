'use client';

import { Holder, Image, Track, TrackWidth, TrackWrapper, Wrapper } from './styles';

import BlockchainCapital from './images/blockchain_capital.png';
import CMTDigital from './images/cmtdigital.png';
import GEAZY from './images/geazy.png';
import GMoney from './images/gmoney.png';
import LilWayne from './images/lilwayne.png';
import Loomdart from './images/loomdart.png';
import ParisHilton from './images/paris_hilton.png';

export default function Community() {
    return (
        <Wrapper>
            <Holder>
                <TrackWrapper>
                    <TrackWidth>
                        <Track
                            initial={{
                                x: '0px',
                            }}
                            animate={{
                                x: '-1691px',
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
                            <Image src={CMTDigital.src} alt="CMT Digital" />
                            <Image src={GEAZY.src} alt="G-Eazy" />
                            <Image src={GMoney.src} alt="@gmoney" />
                            <Image src={Loomdart.src} alt="@loomdart" />
                            <Image src={LilWayne.src} alt="Lil Wayne" />
                            <Image src={BlockchainCapital.src} alt="Blockchain Capital" />
                            <Image src={ParisHilton.src} alt="Paris Hilton" />
                            <Image src={CMTDigital.src} alt="CMT Digital" />
                            <Image src={GEAZY.src} alt="G-Eazy" />
                            <Image src={GMoney.src} alt="@gmoney" />
                            <Image src={Loomdart.src} alt="@loomdart" />
                            <Image src={LilWayne.src} alt="Lil Wayne" />
                        </Track>
                    </TrackWidth>
                </TrackWrapper>
            </Holder>
        </Wrapper>
    );
}
