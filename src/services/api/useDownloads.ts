/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

export const DOWNLOADS_KEY = ['downloads'];

interface DownloadLinks {
    downloadLinks: any;
}

async function fetchDownloads(): Promise<DownloadLinks> {
    const response = await fetch('https://gh-cache.tari.com/s3');

    if (!response.ok) {
        throw new Error('Failed to fetch download links');
    }

    return response.json();
}

export function useDownloads() {
    return useQuery<DownloadLinks>({
        queryKey: DOWNLOADS_KEY,
        queryFn: fetchDownloads,
        refetchOnWindowFocus: true,
    });
}
