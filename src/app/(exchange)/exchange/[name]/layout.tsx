import LayoutExchange from '@/ui-shared/layouts/Layout/LayoutExchange';
import { Viewport, Metadata } from 'next';
import { exchangeData } from './page';

export const viewport: Viewport = {
    themeColor: 'black',
    initialScale: 1,
    width: 'device-width',
    height: 'device-height',
    minimumScale: 1,
    maximumScale: 1,
};

type Props = {
    params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { name } = params;
    const exchange = exchangeData[name as keyof typeof exchangeData];
    return {
        title: `Tari x ${exchange ? exchange.name : name}`,
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
}

export default function ExchangeLayout({ children }: { children: React.ReactNode }) {
    return <LayoutExchange>{children}</LayoutExchange>;
}
