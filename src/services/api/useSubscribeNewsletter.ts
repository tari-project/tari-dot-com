import { useMutation } from '@tanstack/react-query';

async function subscribeNewsletter(email: string, name: string) {
    const response = await fetch('https://rwa.y.at/miner/exchanges/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            name,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch miner stats');
    }

    return response.json();
}

export function useSubscribeNewsletter() {
    return useMutation({
        mutationFn: ({ email, name }: { email: string; name: string }) => subscribeNewsletter(email, name),
    });
}
