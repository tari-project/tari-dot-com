'use client';
import { Exchange } from '@/sites/exchange/types/exchange';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const EXCHANGE_LIST_QUERY_KEY = ['exchange-list'];

export async function fetchExchangeData(exchangeId: string): Promise<Exchange> {
    const response = await fetch(`https://rwa.y.at/miner/exchanges/${exchangeId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch miner stats');
    }

    return response.json();
}

type Props = {
    disabled?: boolean;
};

export function useExchangeData(props?: Props) {
    const { disabled } = { disabled: false, ...props };
    const { name } = useParams<{ name: string }>();

    return useQuery<Exchange>({
        queryKey: [...EXCHANGE_LIST_QUERY_KEY, name],
        queryFn: () => fetchExchangeData(name),
        refetchOnWindowFocus: true,
        enabled: Boolean(name && !disabled),
    });
}
