import TokenomicsPage from '@/sites/tari-dot-com/pages/TokenomicsPage/TokenomicsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tokenomics',
    description:
        'Dig into the tokenomics of XTM and Tari-- its emissions schedule, its preallocations, its unlock schedules, and more.',
    alternates: {
        canonical: '/tokenomics',
    },
    openGraph: {
        url: '/tokenomics',
    },
};

export default function Page() {
    return <TokenomicsPage />;
}
