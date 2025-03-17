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
    const response = await fetch('https://gh-cache.tari.com/s3');

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
        refetchOnWindowFocus: true,
    });
}
