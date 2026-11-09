import { useQuery } from '@tanstack/react-query';

async function fetchLaunchTarget(): Promise<number | null> {
    const response = await fetch('https://rwa.y.at/config', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch launch config');
    }

    const config: Record<string, unknown> | null = await response.json();
    const launchAt = config?.['ootle-mainnet-launch-at'];
    const target = typeof launchAt === 'string' ? Date.parse(launchAt) : NaN;
    return Number.isFinite(target) ? target : null;
}

export function useLaunchTarget() {
    return useQuery<number | null>({
        queryKey: ['launchTarget'],
        queryFn: fetchLaunchTarget,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60,
    });
}
