import UserAgreement from '@/sites/tari-dot-com/pages/LegalPages/UserAgreement';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / User Agreement',
    };

    return metadata;
};

export default function Page() {
    return <UserAgreement />;
}
