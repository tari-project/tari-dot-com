import { useMutation } from '@tanstack/react-query';

async function sendDownloadLink(email: string, token: string) {
    const response = await fetch('https://rwa.y.at/miner/exchanges/user/veera-download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            token
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch miner stats');
    }

    return response.json();
}

export function useSendDownloadLink() {
    return useMutation({
        mutationFn: ({ email, token }: { email: string; token: string }) => sendDownloadLink(email, token),
    });
}
