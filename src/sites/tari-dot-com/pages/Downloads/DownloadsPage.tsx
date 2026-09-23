'use client';

import { Wrapper, Divider } from './styles';

import UniverseSection from './sections/UniverseSection/UniverseSection';
import BaseNodeSection from './sections/BaseNodeSection/BaseNodeSection';

import { ScreenReaderH1 } from '@/ui-shared/components/ScreenReaderContent/styles';

export default function DownloadsPage() {
    return (
        <Wrapper>
            <ScreenReaderH1>Downloads</ScreenReaderH1>
            <UniverseSection />
            <Divider />
            <BaseNodeSection />
        </Wrapper>
    );
}
