import PrivacyPolicy from '@/sites/tari-dot-com/pages/LegalPages/PrivacyPolicy';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Privacy Policy',
    };

    return metadata;
};

export default function Page() {
    return <PrivacyPolicy />;
}
