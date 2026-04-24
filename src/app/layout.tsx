import { Viewport } from 'next';
import { fontString } from '@/ui-shared/layouts/Layout/Fonts';

export const viewport: Viewport = {
    themeColor: 'black',
    initialScale: 1,
    width: 'device-width',
    height: 'device-height',
    // Allow pinch-zoom for accessibility (WCAG 2.1 SC 1.4.4).
    userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={fontString}>
            <head>
                <link
                    rel="preload"
                    href="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/3ed05f3d4fbfd3eec7c4bb911915d1c2/manifest/video.m3u8"
                    as="fetch"
                    type="application/vnd.apple.mpegurl"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/852dac0dc91d50d399a7349dcc7316a1/manifest/video.m3u8"
                    as="fetch"
                    type="application/vnd.apple.mpegurl"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/d47e48d7d48b9a0a6835af9546075d88/manifest/video.m3u8"
                    as="fetch"
                    type="application/vnd.apple.mpegurl"
                    crossOrigin="anonymous"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
