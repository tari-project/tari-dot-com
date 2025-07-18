'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import type { Exchange } from '@/sites/exchange/types/exchange';
import { fetchExchangeData } from './fetchExchangeData';
import { useMemo } from 'react';

export const EXCHANGE_LIST_QUERY_KEY = ['exchange-list'];

type Props = {
    disabled?: boolean;
};

export function useExchangeData(props?: Props) {
    const { disabled } = { disabled: false, ...props };
    const { name } = useParams<{ name: string }>();
    const searchParams = useSearchParams();
    const password = useMemo(() => searchParams.get('password') || '', [searchParams]);

    return useQuery<Exchange>({
        queryKey: [...EXCHANGE_LIST_QUERY_KEY, name, password],
        queryFn: () => fetchExchangeData(name, password),
        refetchOnWindowFocus: true,
        enabled: Boolean(name && !disabled),
    });
}
