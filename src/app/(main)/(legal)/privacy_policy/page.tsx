import PrivacyPolicy from '@/sites/tari-dot-com/pages/LegalPages/PrivacyPolicy';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: "View the Tari project website's privacy policy.",
    ...canonicalUrl('/privacy_policy'),
};

export default function Page() {
    return <PrivacyPolicy />;
}
