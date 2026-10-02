import PrivacyPolicy from '@/sites/tari-dot-com/pages/LegalPages/PrivacyPolicy';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Privacy Policy',
        description: "View the Tari project website's privacy policy.",
        alternates: {
            canonical: '/privacy_policy',
        },
        openGraph: {
            url: '/privacy_policy',
        },
    };

    return metadata;
};

export default function Page() {
    return <PrivacyPolicy />;
}
