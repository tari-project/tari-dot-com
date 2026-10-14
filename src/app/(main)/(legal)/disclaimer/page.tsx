import type { Metadata } from 'next';
import Disclaimer from '@/sites/tari-dot-com/pages/LegalPages/Disclaimer';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Legal disclaimer for Tari',
    ...canonicalUrl('/disclaimer'),
};

export default function Page() {
    return <Disclaimer />;
}
