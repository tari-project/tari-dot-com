import TokenomicsPage from '@/sites/tari-dot-com/pages/TokenomicsPage/TokenomicsPage';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Downloads',
    };

    return metadata;
};

export default function Page() {
    return <TokenomicsPage />;
}
