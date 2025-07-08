import Providers from '../Providers/Providers';
import GlobalStyles from './GlobalStyles/GobalStyles';

import { fontString } from './Fonts';
import Banner from '@/sites/tari-dot-com/ui/Banner/Banner';
import Header from '@/sites/tari-dot-com/ui/Header/Header';
import Footer from '@/sites/tari-dot-com/ui/Footer/Footer';
import GradientBackground from '@/sites/tari-dot-com/ui/GradientBackground/GradientBackground';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import { AppWrapper } from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <GlobalStyles />
            <html lang="en" className={fontString}>
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
