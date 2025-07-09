import Providers from '../Providers/Providers';
import GlobalStyles from './GlobalStyles/GobalStyles';

import { fontString } from './Fonts';
import Banner from '@/sites/tari-dot-com/ui/Banner/Banner';
import Header from '@/sites/tari-dot-com/ui/Header/Header';
import Footer from '@/sites/tari-dot-com/ui/Footer/Footer';
import GradientBackground from '@/sites/tari-dot-com/ui/GradientBackground/GradientBackground';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import Head from 'next/head';
import { AppWrapper } from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <GlobalStyles />
            <html lang="en" className={fontString}>
                <Head>
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
                </Head>
                <body>
                    <AppWrapper>
                        <Banner />
                        <Header />
                        {children}
                        <Footer />
                        <GradientBackground />
                    </AppWrapper>
                    <GoogleAnalytics gaId={`G-K7EWCBLYHN`} />
                    <GoogleTagManager gtmId={`GTM-PSQML865`} />
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-MG7C9LNNYV"
                        strategy="afterInteractive"
                    />
                    <Script id="gtag-init" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-MG7C9LNNYV');
                        `}
                    </Script>
                </body>
            </html>
        </Providers>
    );
}
