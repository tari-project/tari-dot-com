import UserAgreement from '@/sites/tari-dot-com/pages/LegalPages/UserAgreement';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'User Agreement',
    description: 'View the Tari Labs user agreement.',
    alternates: {
        canonical: '/user_agreement',
    },
    openGraph: {
        url: '/user_agreement',
    },
};

export default function Page() {
    return <UserAgreement />;
}
