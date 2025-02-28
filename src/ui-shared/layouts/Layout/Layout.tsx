import Providers from '../Providers/Providers';
import GlobalStyles from './GlobalStyles/GobalStyles';

import App from './App';
import { fontString } from './Fonts';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <GlobalStyles />
            <html lang="en" className={fontString}>
                <body>
                    <App>{children}</App>
                </body>
            </html>
        </Providers>
    );
}
