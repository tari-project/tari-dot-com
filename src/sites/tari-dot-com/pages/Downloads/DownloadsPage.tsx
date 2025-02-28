'use client';

import { Wrapper, Container, Divider } from './styles';

import Header from '../../ui/Header/Header';
import UniverseSection from './sections/UniverseSection/UniverseSection';
import BaseNodeSection from './sections/BaseNodeSection/BaseNodeSection';
import Footer from '../../ui/Footer/Footer';
import GradientBackground from './GradientBackground';

export default function DownloadsPage() {
    return (
        <Wrapper>
            <Container>
                <Header />
                <UniverseSection />
                <Divider />
                <BaseNodeSection />
                <Footer />
                <GradientBackground />
            </Container>
        </Wrapper>
    );
}
