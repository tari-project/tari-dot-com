'use client';

import StyledComponentsProvider from './StyledComponentsProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { ReactNode } from 'react';
import ThemeProvider from '@/theme/ThemeProvider';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <StyledComponentsProvider>
            <ThemeProvider>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </ThemeProvider>
        </StyledComponentsProvider>
    );
}
