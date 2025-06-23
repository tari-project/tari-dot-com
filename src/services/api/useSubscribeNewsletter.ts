import { useMutation } from '@tanstack/react-query';

type Props = {
    email: string;
    name?: string;
    token: string;
    veera: boolean;
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

    return response.json();
}

export function useSubscribeNewsletter() {
    return useMutation({
        mutationFn: (props: Props) => subscribeNewsletter(props),
    });
}
