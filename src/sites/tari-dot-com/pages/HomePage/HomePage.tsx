'use client';

import { Wrapper } from './styles';
import { useEffect } from 'react';
import { scrollToElement } from '../../utils/scrollUtils';

import Header from '../../ui/Header/Header';
import IntroSection from './sections/IntroSection/IntroSection';
import VideoSection from './sections/VideoSection/VideoSection';
import EcosystemSection from './sections/EcosystemSection/EcosystemSection';
import TariSection from './sections/TariSection/TariSection';
import FAQSection from './sections/FAQSection/FAQSection';
import Footer from '../../ui/Footer/Footer';
import GradientBackground from '../../ui/GradientBackground/GradientBackground';
import Banner from '../../ui/Banner/Banner';
import MobileMenu from '../../ui/Header/MobileMenu/MobileMenu';

export default function HomePage() {
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                scrollToElement(id);
            }, 100);
        } else {
            const scrollToSection = sessionStorage.getItem('scrollToSection');
            if (scrollToSection) {
                sessionStorage.removeItem('scrollToSection');

                setTimeout(() => {
                    scrollToElement(scrollToSection);
                    window.history.pushState(null, '', `/#${scrollToSection}`);
                }, 100);
            }
        }
    }, []);

    return (
        <Wrapper>
            <Banner />
            <Header />
            <MobileMenu />
            <IntroSection />
            <VideoSection />
            <EcosystemSection />
            <TariSection />
            <FAQSection />
            <Footer />
            <GradientBackground />
        </Wrapper>
    );
}
