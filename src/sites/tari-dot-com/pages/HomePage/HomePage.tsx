'use client';

import { Wrapper } from './styles';

import IntroSection from './sections/IntroSection/IntroSection';
import VideoSection from './sections/VideoSection/VideoSection';
import EcosystemSection from './sections/EcosystemSection/EcosystemSection';
import TariSection from './sections/TariSection/TariSection';
import FAQSection from './sections/FAQSection/FAQSection';

export default function HomePage() {
    return (
        <Wrapper>
            <IntroSection />
            <VideoSection />
            <EcosystemSection />
            <TariSection />
            <FAQSection />
        </Wrapper>
    );
}
