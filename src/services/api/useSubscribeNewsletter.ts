import { useMutation } from '@tanstack/react-query';
import { RWA_API } from '@/config/api';

type Props = {
    email: string;
    name?: string;
    token: string;
    veera: boolean;
};

// Mutation: POSTs a fresh body per call. No `cache` hint needed — POST is
// not cached by browsers, and the body is built from the caller's args so
// it cannot go stale.
async function subscribeNewsletter(props: Props) {
    const response = await fetch(`${RWA_API}/miner/exchanges/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
    });

    if (!response.ok) {
        throw new Error('Failed to subscribe to newsletter');
    }

    return response.json();
}

export function useSubscribeNewsletter() {
    return useMutation({
        mutationFn: (props: Props) => subscribeNewsletter(props),
    });
}
