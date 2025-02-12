'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60,
            networkMode: 'offlineFirst',
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
