'use client';

import { Wrapper, Divider } from './styles';

import UniverseSection from './sections/UniverseSection/UniverseSection';
import BaseNodeSection from './sections/BaseNodeSection/BaseNodeSection';

export default function DownloadsPage() {
    return (
        <Wrapper>
            <UniverseSection />
            <Divider />
            <BaseNodeSection />
        </Wrapper>
    );
}
