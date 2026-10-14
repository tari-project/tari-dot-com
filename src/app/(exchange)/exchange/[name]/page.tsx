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
    const url = `/exchange/${encodeURIComponent(name)}`;

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
            url,
        },
        alternates: {
            // While a great deal of the content on this page is repeated, the headlines and offers are distinct.
            // Pointing the canonical to the root would be 'better' for content de-duplication, but undo the utility
            // of having a landing page to begin with by pruning it from the indexes and pointing relevant queries
            // about the exchange and Tari to the home root where that exchange is not mentioned.
            canonical: url,
        },
    };
};

export default async function Page({ params, searchParams }: PageProps) {
    const { name } = await params;
    const { password } = await searchParams;
    const exchange = await fetchExchangeData(name, password as string);

    return <ExchangePage customData={exchange} />;
}
