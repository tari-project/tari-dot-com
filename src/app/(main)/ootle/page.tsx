import OotlePage from '@/sites/tari-dot-com/pages/OotlePage/OotlePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Ootle',
    description:
        'The Ootle, Tari’s Layer 2 smart-contract network, launches November 11th. Built for agentic payments, tapplets, and on-chain templates.',
    alternates: {
        canonical: '/ootle',
    },
    openGraph: {
        title: 'The Ootle',
        description:
            'The Ootle, Tari’s Layer 2 smart-contract network, launches November 11th. Built for agentic payments, tapplets, and on-chain templates.',
        images: [
            {
                url: 'https://tari.com/tari-og.png?v=2',
                width: 1200,
                height: 630,
                alt: 'Tari / The Ootle',
            },
        ],
    },
};

export default function Page() {
    return <OotlePage />;
}
