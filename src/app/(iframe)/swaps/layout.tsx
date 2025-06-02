'use client';

import Providers from "@/ui-shared/layouts/Providers/Providers";

export default function SwapsLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en"
        style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
        }}
    >
        <body
            style={{
                backgroundColor: '#f3f3f3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                fontFamily: 'Poppins, sans-serif',
                width: '100%',
                overflow: 'hidden',
            }}
        >
            <Providers>
                {children}
            </Providers>
        </body>
    </html>;
}
