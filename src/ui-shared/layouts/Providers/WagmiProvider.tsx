'use client';
import { createAppKit } from '@reown/appkit/react';
import { AppKitNetwork, mainnet, sepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { WagmiProvider } from 'wagmi';
import { http } from 'viem';
import { RPC_URLS } from '@/ui-shared/hooks/swap/lib/constants';

const metadata = {
    name: 'Tari Universe',
    description: 'Tari Universe Wallet',
    url: 'https://tari.com',
    icons: ['https://universe.tari.com/assets/tari-logo.png'],
};

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || 'c523cd3d3e0246530115c1dc2c016852';

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, sepolia];

const wagmiAdapterInstance = new WagmiAdapter({
    networks,
    projectId: PROJECT_ID,
    ssr: true,
    transports: {
        [mainnet.id]: http(RPC_URLS[mainnet.id]),
        [sepolia.id]: http(RPC_URLS[sepolia.id]),
    },
});

createAppKit({
    adapters: [wagmiAdapterInstance],
    networks,
    projectId: PROJECT_ID,
    metadata,
    themeMode: "light",
    themeVariables: {
        "--w3m-color-mix": "#cdcdcd",
        "--w3m-color-mix-strength": 40,
    },
});

export default function WagmiProviderWrapper({ children }: { children: React.ReactNode }) {
    return <WagmiProvider config={wagmiAdapterInstance.wagmiConfig}>{children}</WagmiProvider>;
};
