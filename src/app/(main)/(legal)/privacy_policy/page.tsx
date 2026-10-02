import PrivacyPolicy from '@/sites/tari-dot-com/pages/LegalPages/PrivacyPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: "View the Tari project website's privacy policy.",
    alternates: {
        canonical: '/privacy_policy',
    },
    openGraph: {
        url: '/privacy_policy',
    },
};

export default function Page() {
    return <PrivacyPolicy />;
}
