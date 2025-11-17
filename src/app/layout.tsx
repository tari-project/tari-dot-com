import { Viewport } from 'next';

export const viewport: Viewport = {
    themeColor: 'black',
    initialScale: 1,
    width: 'device-width',
    height: 'device-height',
    minimumScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
