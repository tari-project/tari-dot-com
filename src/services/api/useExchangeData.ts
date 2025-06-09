'use client';
import { Exchange } from '@/sites/exchange/types/exchange';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchExchangeData } from './fetchExchangeData';

export const EXCHANGE_LIST_QUERY_KEY = ['exchange-list'];

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
