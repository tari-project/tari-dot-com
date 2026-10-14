import TokenomicsPage from '@/sites/tari-dot-com/pages/TokenomicsPage/TokenomicsPage';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'Tokenomics',
    description:
        'Dig into the tokenomics of XTM and Tari-- its emissions schedule, its preallocations, its unlock schedules, and more.',
    ...canonicalUrl('/tokenomics'),
};

export default function Page() {
    return <TokenomicsPage />;
}
