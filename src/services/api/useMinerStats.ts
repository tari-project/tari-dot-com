import { useQuery } from '@tanstack/react-query';
import { RWA_API } from '@/config/api';

export const MINER_STATS_QUERY_KEY = ['minerStats'];

interface MinerStats {
    totalMiners: number;
}

async function fetchMinerStats(): Promise<MinerStats> {
    // Live miner count: bypass the browser HTTP cache so every React Query
    // refetch hits the origin.
    const response = await fetch(`${RWA_API}/miner/stats`, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch miner stats');
    }

    return response.json();
}

export function useMinerStats() {
    return useQuery<MinerStats>({
        queryKey: MINER_STATS_QUERY_KEY,
        queryFn: fetchMinerStats,
        refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
        // Stop polling when the tab is hidden.
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
    });
}
