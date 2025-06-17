import Providers from '../Providers/Providers';
import GlobalStyles from './GlobalStyles/GobalStyles';

import { fontString } from './Fonts';
import Footer from '@/sites/tari-dot-com/ui/Footer/Footer';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { ExchangeWrapper } from './styles';
import Script from 'next/script';

export default function LayoutExchange({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <GlobalStyles />
            <html lang="en" className={fontString}>
                <body>
                    <ExchangeWrapper>
                        {children}
                        <Footer />
                    </ExchangeWrapper>
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
