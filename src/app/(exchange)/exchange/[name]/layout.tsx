import LayoutExchange from '@/ui-shared/layouts/Layout/LayoutExchange';
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
        title: 'Tari x [ExchangeHere]',
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
