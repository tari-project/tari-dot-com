import DownloadsPage from '@/sites/tari-dot-com/pages/Downloads/DownloadsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Downloads',
    description: 'Download the Tari Universe app for Desktop, begin mining and holding XTM and TARI today!',
    alternates: {
        canonical: '/downloads',
    },
};

export default function Page() {
    return <DownloadsPage />;
}
