import type { Metadata } from 'next';
import { Viewport } from 'next';

export const viewport: Viewport = {
    themeColor: 'black',
    initialScale: 1,
    width: 'device-width',
    height: 'device-height',
    minimumScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://tari.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
