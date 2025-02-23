'use client';

import { Wrapper } from './styles';

import Header from '../../ui/Header/Header';
import IntroSection from './sections/IntroSection/IntroSection';
import UniverseSection from './sections/UniverseSection/UniverseSection';
import EcosystemSection from './sections/EcosystemSection/EcosystemSection';
import TariSection from './sections/TariSection/TariSection';
import FAQSection from './sections/FAQSection/FAQSection';
import Footer from '../../ui/Footer/Footer';
import GradientBackground from './GradientBackground';

export default function HomePage() {
    return (
        <Wrapper>
            <Header />
            <IntroSection />
            <UniverseSection />
            <EcosystemSection />
            <TariSection />
            <FAQSection />
            <Footer />
            <GradientBackground />
        </Wrapper>
    );
}
