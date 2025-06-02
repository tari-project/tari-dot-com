'use client';

import StyledComponentsProvider from './StyledComponentsProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { ReactNode } from 'react';
import WagmiProviderWrapper from './WagmiProvider';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <StyledComponentsProvider>
            <WagmiProviderWrapper>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </WagmiProviderWrapper>
        </StyledComponentsProvider >
    );
}
