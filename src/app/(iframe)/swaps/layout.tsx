import { fontString } from "@/ui-shared/layouts/Layout/Fonts";
import Providers from "@/ui-shared/layouts/Providers/Providers";

export default function SwapsLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en"
        className={fontString}
    >
        <body
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-poppins)',
                overflow: 'hidden',
                margin: 0,
                padding: 0,
                marginTop: '10px',
            }}
        >
            <Providers>
                {children}
            </Providers>
        </body>
    </html>;
}
