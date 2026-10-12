import Link from 'next/link';

export default function NotFound() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '2rem',
                textAlign: 'center',
                fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
        >
            <h1
                style={{
                    fontSize: '6rem',
                    fontWeight: 800,
                    margin: 0,
                    color: '#111',
                    lineHeight: 1,
                }}
            >
                404
            </h1>
            <p
                style={{
                    fontSize: '1.25rem',
                    color: '#555',
                    margin: '1rem 0 2rem',
                    maxWidth: '480px',
                }}
            >
                This page could not be found. It may have been moved or no longer exists.
            </p>
            <nav
                style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Link
                    href="/"
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#111',
                        color: '#fff',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}
                >
                    Home
                </Link>
                <Link
                    href="/updates"
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#f3f4f6',
                        color: '#111',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}
                >
                    Updates
                </Link>
                <Link
                    href="/lessons"
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#f3f4f6',
                        color: '#111',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}
                >
                    Lessons
                </Link>
                <Link
                    href="/tokenomics"
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#f3f4f6',
                        color: '#111',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}
                >
                    Tokenomics
                </Link>
            </nav>
        </div>
    );
}
