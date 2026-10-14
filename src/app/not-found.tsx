import Layout from '@/ui-shared/layouts/Layout/Layout';

export default function NotFound() {
    return (
        <Layout>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    color: '#111',
                }}
            >
                <h1
                    style={{
                        fontSize: '6rem',
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1,
                    }}
                >
                    404
                </h1>
                <p
                    style={{
                        fontSize: '1.25rem',
                        color: '#555',
                        margin: '1rem 0 0',
                        maxWidth: '480px',
                    }}
                >
                    This page could not be found. It may have been moved or no longer exists.
                </p>
            </div>
        </Layout>
    );
}
