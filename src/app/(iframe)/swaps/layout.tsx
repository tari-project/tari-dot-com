import Providers from '@/ui-shared/layouts/Providers/Providers';

export default function SwapsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-poppins)',
                    overflow: 'hidden',
                    margin: 0,
                    padding: 0,
                    marginTop: '10px',
                    minHeight: '100vh',
                }}
            >
                {children}
            </div>
        </Providers>
    );
}
