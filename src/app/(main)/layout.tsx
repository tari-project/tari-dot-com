import Layout from '@/ui-shared/layouts/Layout/Layout';
import { Metadata } from 'next';

// When in Layout, Metadata propagates defaults for routes underneath. For all other cases, it should be in the
// pages.tsx.
export const metadata: Metadata = {
    title: {
        template: 'Tari: %s',
        absolute: 'Tari',
    },
    description:
        'Tari is the L1 protocol powered by you. Proof of work and an ingenious app platform to put all of its power in your hands.',
    icons: [{ url: 'https://tari.com/favicon.png?v=1', type: 'image/png' }],
    metadataBase: new URL('https://tari.com'),
    alternates: {},
    openGraph: {
        images: [
            {
                url: 'https://tari.com/tari-og.png?v=2',
                width: 1200,
                height: 630,
                alt: 'Tari',
            },
        ],
        siteName: 'Tari.com',
        type: 'website',
    },
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
