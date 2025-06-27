import IntegrationPage from '@/sites/tari-dot-com/pages/IntegrationPage/IntegrationPage';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Integration Guide',
    };

    return metadata;
};

export default function Page() {
    return <IntegrationPage />;
}
