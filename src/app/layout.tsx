import Layout from '@/ui-shared/layouts/Layout/Layout';
import { Viewport } from 'next';

export const viewport: Viewport = {
    themeColor: 'black',
    initialScale: 1,
    width: 'device-width',
    height: 'device-height',
    minimumScale: 1,
    maximumScale: 1,
};

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari',
        description:
            'Tari is the L1 protocol powered by you. Proof of work and an ingenious app platform to put all of its power in your hands.',
        icons: [{ url: '/favicon-white.svg?v=3', type: 'image/svg+xml' }],
    };

    return metadata;
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
