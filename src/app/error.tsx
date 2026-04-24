'use client';

import { useEffect } from 'react';

// App-level error boundary. Renders when an uncaught error bubbles up to the
// root segment. Must be a client component per Next.js App Router contract.
export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Surface the error in the console so it lands in browser devtools and
        // any attached error-reporting integrations.
        console.error('App error boundary caught:', error);
    }, [error]);

    return (
        <div
            role="alert"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                fontFamily: 'var(--font-poppins), system-ui, sans-serif',
                background: '#000',
                color: '#fff',
                gap: '1rem',
            }}
        >
            <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 600 }}>
                Something went wrong
            </h1>
            <p style={{ margin: 0, opacity: 0.7, maxWidth: '40ch' }}>
                An unexpected error interrupted this page. You can try again, or
                head back to the homepage.
            </p>
            {error.digest ? (
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.5 }}>
                    Reference: {error.digest}
                </p>
            ) : null}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                    type="button"
                    onClick={reset}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#fff',
                        color: '#000',
                        border: 'none',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                    }}
                >
                    Try again
                </button>
                <a
                    href="/"
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '999px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}
                >
                    Go home
                </a>
            </div>
        </div>
    );
}
