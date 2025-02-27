import Layout from '@/layouts/Layout/Layout';
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
        icons: [{ url: '/favicon.svg?v=2', type: 'image/svg+xml' }],
        /*
        openGraph: {
            images: [
                {
                    url: 'https://static.tari.com/airdrop-og-image.png',
                    width: 1200,
                    height: 600,
                    alt: '',
                },
            ],
        },

        */
    };

    return metadata;
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
