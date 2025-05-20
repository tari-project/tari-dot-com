import LayoutExchange from '@/ui-shared/layouts/Layout/LayoutExchange';
import { exchangeData } from './page';

export const generateMetadata = async ({ params }: { params: { name: string } }) => {
    const exchange = exchangeData[params.name] || { name: params.name };

    const metadata = {
        title: `Tari x ${exchange.name}`,
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

export default function ExchangeLayout({ children }: { children: React.ReactNode }) {
    return <LayoutExchange>{children}</LayoutExchange>;
}
