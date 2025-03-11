'use client';

import { Wrapper } from './styles';

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
