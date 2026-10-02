import { useMutation } from '@tanstack/react-query';

type Props = {
    email: string;
    name?: string;
    token: string;
};

type SubscribeNewsletterResponse = {
    success: boolean;
};

async function subscribeNewsletter(props: Props) {
    const response = await fetch('https://rwa.y.at/miner/exchanges/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch miner stats');
    }

    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('success' in data) || typeof data.success !== 'boolean') {
        throw new Error('Invalid newsletter response');
    }

    return {
        success: data.success,
    } satisfies SubscribeNewsletterResponse;
}

export function useSubscribeNewsletter() {
    return useMutation({
        mutationFn: (props: Props) => subscribeNewsletter(props),
    });
}
