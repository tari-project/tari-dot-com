// import { config } from '@/config';
import { useState } from 'react';
import Turnstile, { useTurnstile } from 'react-turnstile';

console.log('key', process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
export const useCaptcha = () => {
    const [token, setToken] = useState('');
    const turnstile = useTurnstile();

    const markup = (
        <Turnstile
            theme="dark"
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            onVerify={(token) => {
                setToken(token);
            }}
        />
    );

    return { token, markup, reset: turnstile?.reset };
};

