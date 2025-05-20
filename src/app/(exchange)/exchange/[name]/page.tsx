import ExchangePage from '@/sites/exchange/pages/ExchangePage/ExchangePage';
import { Exchange } from '@/sites/exchange/types/exchange';
import TariBankLogoHeader from '../../../../sites/exchange/pages/ExchangePage/images/TariBank/logoHeader.svg';
import TariBankLogoSquare from '../../../../sites/exchange/pages/ExchangePage/images/TariBank/logoSquare.svg';

export const runtime = 'edge';

const exchangeData: Record<string, Exchange> = {
    TariBank: {
        name: 'TariBank',
        color: '#FFDC00',
        logoHeader: TariBankLogoHeader.src,
        logoSquare: TariBankLogoSquare.src,
    },
};

export const generateMetadata = async ({ params }: { params: Promise<{ name: string }> }) => {
    const { name } = await params;
    const exchange = exchangeData[name] || { name };

    return {
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
};

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const exchange = exchangeData[name as keyof typeof exchangeData];
    return <ExchangePage exchange={exchange} />;
}
