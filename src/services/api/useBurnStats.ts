import { useQuery } from '@tanstack/react-query';

export type BurnNetwork = 'mainnet' | 'esmeralda' | 'nextnet' | 'stagenet';

export interface BurnStats {
    network: BurnNetwork;
    /** Burns the network has seen (in a mempool or mined). */
    burnCount: number;
    /** Sum of those burns, in micro XTM, as a string to stay exact. */
    totalMicroMinotari: string;
    /** Distinct Universe installs that burned. */
    uniqueBurners: number;
}

async function fetchBurnStats(network: BurnNetwork): Promise<BurnStats> {
    const response = await fetch(`https://rwa.y.at/miner/burns/stats?network=${network}`);

    if (!response.ok) {
        throw new Error('Failed to fetch burn stats');
    }

    return response.json();
}

/** Burn-to-L2 totals reported by Tari Universe. The backend caches for a minute, so poll at that rate. */
export function useBurnStats(network: BurnNetwork = 'mainnet') {
    return useQuery<BurnStats>({
        queryKey: ['burnStats', network],
        queryFn: () => fetchBurnStats(network),
        refetchInterval: 1000 * 60,
    });
}
