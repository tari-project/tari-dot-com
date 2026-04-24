import { useMutation } from '@tanstack/react-query';
import { RWA_API } from '@/config/api';

type SendDownloadLinkResponse = {
    success: boolean;
    message?: string;
};

// Mutation: POSTs a fresh body built from current args every call, so no
// `cache` hint is needed — browsers do not cache POST by default, and the
// body cannot go stale because it is constructed from the caller's arguments.
async function sendDownloadLink(email: string, token: string): Promise<SendDownloadLinkResponse> {
    const response = await fetch(`${RWA_API}/miner/exchanges/user/veera-download`, {
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
        throw new Error('Failed to send download link');
    }

    return response.json() as Promise<SendDownloadLinkResponse>;
}

export function useSendDownloadLink() {
    return useMutation({
        mutationFn: ({ email, token }: { email: string; token: string }) => sendDownloadLink(email, token),
    });
}
