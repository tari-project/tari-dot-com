import ExchangePage from '@/sites/exchange/pages/ExchangePage/ExchangePage';

export const runtime = 'edge';

interface ExchangePageProps {
    params: {
        name: string;
    };
}

export default function Page({ params }: ExchangePageProps) {
    const { name } = params;

    return <ExchangePage name={name} />;
}
