'use client';

import StyledComponentsProvider from './StyledComponentsProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <StyledComponentsProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
        </StyledComponentsProvider>
    );
}
