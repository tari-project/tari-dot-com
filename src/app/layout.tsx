import type { Metadata, Viewport } from 'next';
import { fontString } from '@/ui-shared/layouts/Layout/Fonts';

export const viewport: Viewport = {
    themeColor: 'black',
    initialScale: 1,
    width: 'device-width',
    height: 'device-height',
    // Allow pinch-zoom for accessibility (WCAG 2.1 SC 1.4.4).
    userScalable: true,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://www.tari.com'),
    title: {
        default: 'Tari',
        template: '%s | Tari',
    },
    description:
        'Tari is the L1 protocol powered by you. Proof of work and an ingenious app platform to put all of its power in your hands.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={fontString}>
            <body>{children}</body>
        </html>
    );
}
