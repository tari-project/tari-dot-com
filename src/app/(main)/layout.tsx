import Layout from '@/ui-shared/layouts/Layout/Layout';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari',
        description:
            'Tari is the L1 protocol powered by you. Proof of work and an ingenious app platform to put all of its power in your hands.',
        icons: [{ url: 'https://tari.com/favicon.png?v=1', type: 'image/png' }],
        openGraph: {
            images: [
                {
                    url: 'https://tari.com/tari-og.png?v=2',
                    width: 1200,
                    height: 630,
                    alt: 'Tari',
                },
            ],
        },
    };

    return metadata;
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
