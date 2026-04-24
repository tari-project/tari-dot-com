import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 — Page Not Found | Tari',
    description: 'The page you were looking for does not exist.',
};

export default function NotFound() {
    return (
        <div
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
            <p style={{ margin: 0, fontSize: '0.875rem', letterSpacing: '0.2em', opacity: 0.5 }}>
                ERROR 404
            </p>
            <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 600 }}>
                Page not found
            </h1>
            <p style={{ margin: 0, opacity: 0.7, maxWidth: '40ch' }}>
                The page you are looking for has moved, been renamed, or never
                existed.
            </p>
            <Link
                href="/"
                style={{
                    marginTop: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: '#fff',
                    color: '#000',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontWeight: 600,
                }}
            >
                Return home
            </Link>
        </div>
    );
}
