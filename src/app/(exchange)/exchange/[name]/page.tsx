import ExchangePage from '@/sites/exchange/pages/ExchangePage/ExchangePage';

export const runtime = 'edge';

interface ExchangePageProps {
    params: {
        name: string;
    };
}

export type Exchange = {
    name: string;
    color: string;
    logoHeader: React.ReactNode;
    logoSquare: React.ReactNode;
};

export const exchangeData: Record<string, Exchange> = {
    TariBank: {
        name: 'TariBank',
        color: '#FFDC00',
        logoHeader: (
            <svg xmlns="http://www.w3.org/2000/svg" width="121" height="38" viewBox="0 0 121 38" fill="none">
                <g clipPath="url(#clip0_10025_18122)">
                    <path
                        d="M77.1523 6.53125L68.8486 31.0584H74.1612L75.9133 25.3874H83.1963L84.9484 31.0584H90.261L81.9573 6.53125H77.1523ZM77.3288 20.7934L79.5557 13.4831L81.7826 20.7934H77.3306H77.3288Z"
                        fill="currentColor"
                    />
                    <path d="M121 6.53125H116.062V31.0584H121V6.53125Z" fill="white" />
                    <path
                        d="M103.002 21.6194C107.536 21.3811 110.138 18.6356 110.138 14.0872C110.138 9.53869 107.236 6.53125 102.376 6.53125H93.0684V31.0584H98.0062V23.3933L104.767 31.0584H111.126L102.735 21.6321L103.002 21.6176V21.6194ZM98.0062 17.0491V11.127H102.205C104.121 11.127 105.133 12.1513 105.133 14.089C105.133 16.0266 104.121 17.0491 102.205 17.0491H98.0062Z"
                        fill="currentColor"
                    />
                    <path
                        d="M56.7212 31.0602H61.6572V11.1252H69.9464V6.53125H48.4321V11.1252H56.7212V31.0602Z"
                        fill="currentColor"
                    />
                    <path
                        d="M0 10.0175V20.4845L15.321 37.5921L37.0481 20.5463V10.0084L15.3902 0L0 10.0175ZM13.4816 29.9725L3.71336 19.0653V13.1341L13.4816 15.6467V29.9725ZM17.195 31.4026V16.6001L31.4044 20.2552L17.195 31.4026ZM33.3366 12.3809V16.9185L6.72081 10.0739L15.6958 4.23189L33.3348 12.3827L33.3366 12.3809Z"
                        fill="currentColor"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_10025_18122">
                        <rect width="121" height="37.5921" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        logoSquare: (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.000183105 10.0175V20.4845L15.3212 37.5921L37.0483 20.5463V10.0084L15.3904 0L0.000183105 10.0175ZM13.4818 29.9725L3.71355 19.0653V13.1341L13.4818 15.6467V29.9725ZM17.1952 31.4026V16.6001L31.4046 20.2552L17.1952 31.4026ZM33.3368 12.3809V16.9185L6.72099 10.0739L15.696 4.23189L33.335 12.3827L33.3368 12.3809Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
};

export const generateMetadata = async ({ params }: { params: { name: string } }) => {
    const exchange = exchangeData[params.name] || { name: params.name };

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

export default function Page({ params }: ExchangePageProps) {
    const { name } = params;
    const exchange = exchangeData[name as keyof typeof exchangeData];

    return <ExchangePage exchange={exchange} />;
}
