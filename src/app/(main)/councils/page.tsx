import CouncilsPage from '@/sites/tari-dot-com/pages/CouncilsPage/CouncilsPage';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'Council',
    description:
        'Meet the Tari Council members and learn about their roles, responsibilities, and how they govern the protocol.',
    ...canonicalUrl('/councils'),
};

export default function Page() {
    return <CouncilsPage />;
}
