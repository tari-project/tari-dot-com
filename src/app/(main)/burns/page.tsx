import BurnsPage from '@/sites/tari-dot-com/pages/BurnsPage/BurnsPage';
import type { Metadata } from 'next';

const description =
    'Live tally of XTM burned on layer 1 to mint TARI on the Ootle, as reported by Tari Universe and verified on chain.';

export const metadata: Metadata = {
    title: 'Burn to L2',
    description,
    alternates: {
        canonical: '/burns',
    },
    openGraph: {
        title: 'Burn to L2',
        description,
        images: [
            {
                url: 'https://tari.com/tari-og.png?v=2',
                width: 1200,
                height: 630,
                alt: 'Tari / Burn to L2',
            },
        ],
    },
};

export default function Page() {
    return <BurnsPage />;
}
