'use client';
import { Swap } from '@/sites/Swap/Swap';
import WagmiProviderWrapper from '@/ui-shared/layouts/Providers/WagmiProvider';

export const runtime = 'edge';

export default function Page() {
    return (
        <WagmiProviderWrapper>
            <Swap />
        </WagmiProviderWrapper>
    );
}
