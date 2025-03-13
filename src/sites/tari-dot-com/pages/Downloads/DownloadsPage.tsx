'use client';

import { Wrapper, Container, Divider } from './styles';

import UniverseSection from './sections/UniverseSection/UniverseSection';
import BaseNodeSection from './sections/BaseNodeSection/BaseNodeSection';

export default function DownloadsPage() {
    return (
        <Wrapper>
            <Container>
                <UniverseSection />
                <Divider />
                <BaseNodeSection />
            </Container>
        </Wrapper>
    );
}
