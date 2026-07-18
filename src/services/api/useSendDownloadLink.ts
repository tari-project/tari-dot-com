import { useMutation } from '@tanstack/react-query';

type SendDownloadLinkResponse = {
    success: boolean;
};

async function sendDownloadLink(email: string, token: string) {
    const response = await fetch('https://rwa.y.at/miner/exchanges/user/veera-download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            token,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch miner stats');
    }

    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('success' in data) || typeof data.success !== 'boolean') {
        throw new Error('Invalid download link response');
    }

    return { success: data.success } satisfies SendDownloadLinkResponse;
}

export function useSendDownloadLink() {
    return useMutation({
        mutationFn: ({ email, token }: { email: string; token: string }) => sendDownloadLink(email, token),
    });
}
