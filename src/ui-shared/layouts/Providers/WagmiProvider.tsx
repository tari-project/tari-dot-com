'use client';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors/walletConnect';
// import { RPC_URLS } from '@/ui-shared/hooks/swap/lib/constants';

// const mainnetRpcUrl = RPC_URLS[mainnet.id];
// const sepoliaRpcUrl = RPC_URLS[sepolia.id];

const metadata = {
    name: 'Tari Universe',
    description: 'Tari Universe Wallet',
    url: 'https://www.tari.com',
    icons: ['https://tari.com/assets/img/node-icon-alt.svg'],
};

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || 'c523cd3d3e0246530115c1dc2c016852';

const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        walletConnect({
            projectId: PROJECT_ID,
            metadata,
            showQrModal: true,
            qrModalOptions: { themeMode: 'light' },
        }),
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
    ssr: true,
});

export default function WagmiProviderWrapper({ children }: { children: React.ReactNode }) {
    return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
