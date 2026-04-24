'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import type { Exchange } from '@/sites/exchange/types/exchange';
import { fetchExchangeData } from './fetchExchangeData';
import { useMemo } from 'react';

export const EXCHANGE_LIST_QUERY_KEY = ['exchange-list'];

type Props = {
    disabled?: boolean;
    /**
     * Server-fetched Exchange to seed React Query with. When provided, the
     * first client render has data immediately (no loading flicker, no
     * duplicate fetch). React Query will still revalidate on focus per
     * refetchOnWindowFocus.
     */
    initialData?: Exchange;
};

export function useExchangeData(props?: Props) {
    const { disabled, initialData } = { disabled: false, ...props };
    const { name } = useParams<{ name: string }>();
    const searchParams = useSearchParams();
    const password = useMemo(() => searchParams.get('password') || '', [searchParams]);

    return useQuery<Exchange>({
        queryKey: [...EXCHANGE_LIST_QUERY_KEY, name, password],
        queryFn: () => fetchExchangeData(name, password),
        refetchOnWindowFocus: true,
        enabled: Boolean(name && !disabled),
        initialData,
    });
}
