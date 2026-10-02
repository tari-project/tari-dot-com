import type { Metadata } from 'next';
import Disclaimer from '@/sites/tari-dot-com/pages/LegalPages/Disclaimer';

export const metadata: Metadata = {
    title: 'Tari / Disclaimer',
    description: 'Legal disclaimer for Tari',
    alternates: {
        canonical: '/disclaimer',
    },
    openGraph: {
        url: '/disclaimer',
    },
};

export default function Page() {
    return <Disclaimer />;
}
