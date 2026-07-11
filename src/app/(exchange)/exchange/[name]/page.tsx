import ExchangePage from '@/sites/exchange/pages/ExchangePage/ExchangePage';
import { fetchExchangeData } from '@/services/api/fetchExchangeData';

type PageProps = {
    params: Promise<{ name: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({ params, searchParams }: PageProps) => {
    const { name } = await params;
    const { password } = await searchParams;
    const exchange = await fetchExchangeData(name, password as string);

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

export default async function Page({ params, searchParams }: PageProps) {
    const { name } = await params;
    const { password } = await searchParams;
    const exchange = await fetchExchangeData(name, password as string);

    return <ExchangePage customData={exchange} />;
}
