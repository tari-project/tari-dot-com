'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * React Query defaults for this app.
 *
 * - networkMode: 'always'
 *     We previously used 'offlineFirst', which resolves queries from cache
 *     without firing a request when the browser reports offline. On a
 *     marketing + live-data site this masks real upstream outages and can
 *     surface stale data indefinitely. 'always' is the correct default;
 *     individual hooks can opt out if they have a real offline story.
 *
 * - staleTime: 30s
 *     Baseline: data is considered fresh for 30s after it lands, so remounts
 *     within a tab session do not immediately refetch. Hooks with live data
 *     (useBlocks, useMinerStats) use their own refetchInterval instead.
 *
 * - gcTime: 1h
 *     Keep cached results in memory for an hour after the last observer
 *     unmounts, so navigating away and back does not cost a refetch.
 *
 * - refetchOnWindowFocus: false
 *     Avoid thrashing endpoints every time the user tabs back. Live hooks
 *     can opt in if needed.
 *
 * - refetchOnReconnect: 'always'
 *     When the network comes back after a drop, always refetch (not just
 *     stale queries). Cheap insurance against showing pre-disconnect data.
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'always',
            staleTime: 30_000,
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            refetchOnReconnect: 'always',
        },
    },
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (process.env.NODE_ENV === 'development') {
                console.error(query.queryKey, error);
            }
        },
    }),
});

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
