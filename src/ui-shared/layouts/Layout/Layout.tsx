import Providers from '../Providers/Providers';
import GlobalStyles from './GlobalStyles/GobalStyles';

import App from './App';
import { fontString } from './Fonts';
import Banner from '@/sites/tari-dot-com/ui/Banner/Banner';
import Header from '@/sites/tari-dot-com/ui/Header/Header';
import Footer from '@/sites/tari-dot-com/ui/Footer/Footer';
import GradientBackground from '@/sites/tari-dot-com/ui/GradientBackground/GradientBackground';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <GlobalStyles />
            <html lang="en" className={fontString}>
                <body>
                    <App>
                        <Banner />
                        <Header />
                        {children}
                        <Footer />
                        <GradientBackground />
                    </App>
                    <GoogleAnalytics gaId={`G-61WER6XQRY`} />
                </body>
            </html>
        </Providers>
    );
}
