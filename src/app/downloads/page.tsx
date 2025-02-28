import DownloadsPage from '@/sites/tari-dot-com/pages/Downloads/DownloadsPage';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Downloads',
    };

    return metadata;
};

export default function Page() {
    return <DownloadsPage />;
}
