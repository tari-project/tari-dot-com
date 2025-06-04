'use client';

import Providers from "@/ui-shared/layouts/Providers/Providers";

export default function SwapsLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en">
        <body
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            <Providers>
                {children}
            </Providers>
        </body>
    </html>;
}
