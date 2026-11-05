import { useQuery } from '@tanstack/react-query';

export interface BurnStats {
    micro: bigint;
    burns: bigint;
    people: bigint;
}

interface BurnStatsResponse {
    network: string;
    burnCount: number;
    totalMicroMinotari: string;
    uniqueBurners: number;
}

async function fetchBurnStats(): Promise<BurnStats> {
    const response = await fetch('https://rwa.y.at/miner/burns/stats?network=mainnet');

    if (!response.ok) {
        throw new Error('Failed to fetch burn stats');
    }

    const data: BurnStatsResponse = await response.json();
    if (
        data?.network !== 'mainnet' ||
        !Number.isSafeInteger(data.burnCount) ||
        data.burnCount < 0 ||
        !Number.isSafeInteger(data.uniqueBurners) ||
        data.uniqueBurners < 0 ||
        typeof data.totalMicroMinotari !== 'string' ||
        !/^\d+$/.test(data.totalMicroMinotari)
    ) {
        throw new Error('Invalid burn stats');
    }

    return {
        micro: BigInt(data.totalMicroMinotari),
        burns: BigInt(data.burnCount),
        people: BigInt(data.uniqueBurners),
    };
}

export function useBurnStats() {
    return useQuery<BurnStats>({
        queryKey: ['burnStats'],
        queryFn: fetchBurnStats,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60,
    });
}
