import { useConnect } from 'wagmi';
import { Provider } from 'ethers';
import { useCallback } from 'react';

export const useConnectWallet = ({
    isOpen,
    setIsOpen,
    setError,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setError?: (error: string) => void;
}) => {
    const { connectors } = useConnect();
    const handleConnect = useCallback(async () => {
        const walletConnectConnector = connectors.find((c) => c.id === 'walletConnect');

        if (walletConnectConnector) {
            try {
                const provider = (await walletConnectConnector.getProvider()) as Provider;

                const handleDisconnect = () => {
                    console.info('Disconnected from wallet');
                };

                provider.on('disconnect', handleDisconnect);

                provider.on('connect', (info: unknown) => {
                    console.info('connect', info);
                    setIsOpen(false);
                });

                provider.on('proposal_expire', () => {
                    setError?.(
                        'Wallet Connect failed. Please try again with a different Ethereum wallet. If you continue to face challenges, please connect with Tari contributors on Telegram or Discord.'
                    );
                });

                provider.on('error', (error: unknown) => {
                    console.info('connect', error);
                });

                const cleanup = () => {
                    provider.removeListener('disconnect', handleDisconnect);
                };
                walletConnectConnector
                    .connect()
                    .then((r) => console.info(r))
                    .catch((e) => console.error('Error connecting to wallet:', e));
                // connect({ connector: walletConnectConnector });
                return cleanup;
            } catch (e) {
                console.error('Connection failed:', e);
                console.warn('Retrying connection in 3 seconds...');
                setTimeout(() => {
                    if (isOpen) {
                        handleConnect();
                    }
                }, 3000);
            }
        } else {
            console.error('WalletConnect connector not found.');
        }
    }, [connectors, isOpen, setError, setIsOpen]);


    return { handleConnect }
};

