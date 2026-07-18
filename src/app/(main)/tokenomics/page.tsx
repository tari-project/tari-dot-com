import TokenomicsPage from '@/sites/tari-dot-com/pages/TokenomicsPage/TokenomicsPage';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Tokenomics',
    };

    return metadata;
};

export default function Page() {
    return <TokenomicsPage />;
}
