'use client';

import { Wrapper, Container, Divider } from './styles';

import Header from '../../ui/Header/Header';
import UniverseSection from './sections/UniverseSection/UniverseSection';
import BaseNodeSection from './sections/BaseNodeSection/BaseNodeSection';
import Footer from '../../ui/Footer/Footer';
import GradientBackground from '../../ui/GradientBackground/GradientBackground';
import Banner from '../../ui/Banner/Banner';
import MobileMenu from '../../ui/Header/MobileMenu/MobileMenu';

export default function DownloadsPage() {
    return (
        <Wrapper>
            <Banner />
            <Header />
            <MobileMenu />
            <Container>
                <UniverseSection />
                <Divider />
                <BaseNodeSection />
                <Footer />
                <GradientBackground />
            </Container>
        </Wrapper>
    );
}
