import localFont from 'next/font/local';
import Providers from '../Providers/Providers';
import GlobalStyles from './GlobalStyles/GobalStyles';

import App from './App';

// fonts ----------------

const PoppinsFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Poppins/Poppins-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-poppins',
});

const DrukFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Druk/DrukWideLCG-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-druk',
});

// layout ----------------

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <GlobalStyles />
            <html
                lang="en"
                className={`${PoppinsFont.className} ${PoppinsFont.variable} ${DrukFont.className} ${DrukFont.variable}`}
            >
                <body>
                    <App>{children}</App>
                </body>
            </html>
        </Providers>
    );
}
