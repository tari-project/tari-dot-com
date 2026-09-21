'use client';

import { Wrapper } from './styles';

import OotleAnnouncement from './sections/OotleAnnouncement/OotleAnnouncement';
import IntroSection from './sections/IntroSection/IntroSection';
import VideoSection from './sections/VideoSection/VideoSection';
import EcosystemSection from './sections/EcosystemSection/EcosystemSection';
import TariSection from './sections/TariSection/TariSection';
import FAQSection from './sections/FAQSection/FAQSection';
import Modals from '../../ui/Modals/Modals';

export default function HomePage() {
    return (
        <Wrapper>
            <OotleAnnouncement />
            <IntroSection />
            <VideoSection />
            <EcosystemSection />
            <TariSection />
            <FAQSection maxEntries={5} />
            <Modals />
        </Wrapper>
    );
}
