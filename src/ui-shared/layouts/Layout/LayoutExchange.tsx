import Providers from '../Providers/Providers';
import GlobalStyles from './GlobalStyles/GobalStyles';

import { fontString } from './Fonts';
import Footer from '@/sites/tari-dot-com/ui/Footer/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ExchangeWrapper } from './styles';

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
                </body>
            </html>
        </Providers>
    );
}
