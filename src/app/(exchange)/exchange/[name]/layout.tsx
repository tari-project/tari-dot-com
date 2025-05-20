import LayoutExchange from '@/ui-shared/layouts/Layout/LayoutExchange';
import { Viewport } from 'next';
import { exchangeData } from './page';

export const viewport: Viewport = {
    themeColor: 'black',
    initialScale: 1,
    width: 'device-width',
    height: 'device-height',
    minimumScale: 1,
    maximumScale: 1,
};

export async function generateMetadata({ params }: { params: { name: string } }) {
    const exchange = exchangeData[params.name] || { name: params.name };
    return {
        title: `Tari x ${exchange.name}`,
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
