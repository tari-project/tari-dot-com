import CoreContributorsPage from '@/sites/tari-dot-com/pages/CoreContributorsPage/CoreContributorsPage';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'Core Contributors',
    description:
        'Meet Tari’s Core Contributors and learn how the program connects contribution, responsibility, and governance.',
    ...canonicalUrl('/core-contributors'),
};

export default function Page() {
    return <CoreContributorsPage />;
}
