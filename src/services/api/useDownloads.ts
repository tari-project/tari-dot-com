import { useQuery } from '@tanstack/react-query';
import { organizeDownloads, OrganizedDownloads } from '@/sites/tari-dot-com/utils/organizeDownloads';

export const DOWNLOADS_KEY = ['downloads'];

interface Download {
    url: string;
    path: string;
    size: string;
    lastModified: string;
    sha256: string | null;
}

interface DownloadLinks {
    downloadLinks: Download[];
    organizedDownloads: OrganizedDownloads;
}

async function fetchDownloads(): Promise<Download[]> {
    // Build artifact catalog is slow-moving; let the browser HTTP cache serve
    // repeat visits within a session.
    const response = await fetch('https://gh-cache.tari.com/s3', { cache: 'force-cache' });

    if (!response.ok) {
        throw new Error('Failed to fetch download links');
    }

    return response.json();
}

export function useDownloads() {
    return useQuery<DownloadLinks>({
        queryKey: DOWNLOADS_KEY,
        queryFn: async () => {
            const downloadLinks = await fetchDownloads();
            return organizeDownloads(downloadLinks);
        },
        // Keep results fresh for 60s before React Query will refetch. Combined
        // with the HTTP force-cache above, this dedupes refetch chatter.
        staleTime: 60_000,
        refetchOnWindowFocus: false,
    });
}
