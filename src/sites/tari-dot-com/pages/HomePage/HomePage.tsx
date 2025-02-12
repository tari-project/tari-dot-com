'use client';

import { DarkBackground, Wrapper } from './styles';

import Footer from '../../ui/Footer/Footer';
import Header from '../../ui/Header/Header';

import Intro from './sections/Intro/Intro';
import Universe from './sections/Universe/Universe';
import Ecosystem from './sections/Ecosystem/Ecosystem';
import Tari from './sections/Tari/Tari';
import FAQ from './sections/FAQ/FAQ';
import { useRef } from 'react';

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const darkBgRef = useRef<HTMLDivElement>(null);
    const tariSectionRef = useRef<HTMLDivElement>(null);

    return (
        <Wrapper ref={containerRef}>
            <Header containerRef={containerRef} darkBgRef={darkBgRef} tariSectionRef={tariSectionRef} />
            <Intro />
            <DarkBackground ref={darkBgRef}>
                <Universe />
                <Ecosystem />
                <div ref={tariSectionRef}>
                    <Tari />
                </div>
                <FAQ />
                <Footer />
            </DarkBackground>
        </Wrapper>
    );
}
