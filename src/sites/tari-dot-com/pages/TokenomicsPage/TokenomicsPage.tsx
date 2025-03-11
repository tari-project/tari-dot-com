'use client';

import Banner from '../../ui/Banner/Banner';
import Footer from '../../ui/Footer/Footer';
import GradientBackground from '../../ui/GradientBackground/GradientBackground';
import Header from '../../ui/Header/Header';
import MobileMenu from '../../ui/Header/MobileMenu/MobileMenu';
import ContentSection from './sections/ContentSection/ContentSection';
import { Wrapper } from './styles';

export default function TokenomicsPage() {
    return (
        <Wrapper>
            <Banner />
            <Header />
            <MobileMenu />
            <ContentSection />
            <Footer />
            <GradientBackground />
        </Wrapper>
    );
}
