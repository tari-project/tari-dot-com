// Suspense fallback for the main group. Kept intentionally minimal so it
// paints quickly while the real layout and route content stream in.
export default function Loading() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000',
            }}
        >
            <span
                style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.15)',
                    borderTopColor: '#fff',
                    animation: 'tari-spin 0.8s linear infinite',
                }}
            />
            <style>{`
                @keyframes tari-spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <span
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0,0,0,0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                }}
            >
                Loading…
            </span>
        </div>
    );
}
