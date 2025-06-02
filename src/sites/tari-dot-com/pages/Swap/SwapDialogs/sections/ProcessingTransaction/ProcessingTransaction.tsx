import { ProcessingDetailsWrapper, StatusValue } from './ProcessingTransaction.styles';
import { WalletButton } from '../../components/WalletButton/WalletButton';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { ChainId } from '@uniswap/sdk-core';
import TransactionModal from '../../TransactionModal/TransactionModal';
import { StatusList, StatusListEntry } from '../../StatusList/StatusList';
import LoadingDots from '../../components/LoadingDots';
import CompletedIcon from '../../icons/CompleteIcon';
import ProcessingIcon from '../../icons/ProcessingIcon';
import { StatusHero } from '../../StatusHero/StatusHero';

export type SwapStatus = 'processingapproval' | 'processingswap' | 'success' | 'error';

interface Props {
    status: SwapStatus;
    isOpen: boolean;
    fees?: { approval: string | null; swap: string | null };
    setIsOpen: (isOpen: boolean) => void;
    transactionId?: string | null; // Hash of the swap transaction
    txBlockHash?: `0x${string}` | null;
    errorMessage?: string | null; // Added for error status
}

const sepoliaExplorerUrl = 'https://sepolia.etherscan.io';
const mainnetExplorerUrl = 'https://etherscan.io';
const ExplorerUrls = {
    [ChainId.SEPOLIA]: sepoliaExplorerUrl,
    [ChainId.MAINNET]: mainnetExplorerUrl,
};

export const ProcessingTransaction = ({
    status,
    isOpen,
    setIsOpen,
    transactionId,
    fees,
    txBlockHash,
    errorMessage,
}: Props) => {
    const { chain } = useAccount();
    const explorerUrl = ExplorerUrls[(chain?.id ?? ChainId.MAINNET) as keyof typeof ExplorerUrls];

    const statusItems: StatusListEntry[] = useMemo(() => {
        const items: StatusListEntry[] = [];

        items.push({
            label: 'Status',
            value: (
                <StatusValue $status={status}>
                    {status === 'success' && 'Completed'}
                    {(status === 'processingapproval' || status === 'processingswap') && 'Processing'}
                    {status === 'error' && 'Failed'}
                </StatusValue>
            ),
        });

        // items.push({
        //     label: 'Approval Fee',
        //     value: fees?.approval ?? <LoadingDots />,
        // });
        items.push({
            label: 'Swap Fee',
            value: fees?.swap ?? <LoadingDots />,
        });
        items.push({
            label: 'Transaction ID',
            value: transactionId ? (
                explorerUrl ? (
                    <a href={`${explorerUrl}/tx/${transactionId}`} target="_blank" rel="noopener noreferrer">
                        {transactionId}
                    </a>
                ) : (
                    transactionId
                )
            ) : (
                <LoadingDots />
            ),
        });
        items.push({
            label: 'Block Hash',
            value: txBlockHash ? (
                explorerUrl ? (
                    <a href={`${explorerUrl}/block/${txBlockHash}`} target="_blank" rel="noopener noreferrer">
                        {txBlockHash}
                    </a>
                ) : (
                    txBlockHash
                )
            ) : (
                <LoadingDots />
            ),
        });

        if (status === 'error' && errorMessage) {
            items.push({
                label: 'Error Message',
                value: <span style={{ color: 'red', wordBreak: 'break-word' }}>{errorMessage}</span>, // Basic styling for error
            });
        }

        return items.filter((item) => item.value !== undefined);
    }, [status, fees, transactionId, txBlockHash, errorMessage, explorerUrl]);

    const heroTitle = useMemo(() => {
        switch (status) {
            case 'processingapproval':
                return 'Approving Spend';
            case 'processingswap':
                return 'Processing Swap';
            case 'success':
                return 'Swap Successful';
            case 'error':
                return 'Swap Failed';
        }
    }, [status]);

    const heroMessage = useMemo(() => {
        switch (status) {
            case 'processingapproval':
                return 'Please confirm the approval in your wallet.';
            case 'processingswap':
                return 'Your transaction is being processed.';
            case 'success':
                return 'Your tokens have been swapped.';
            case 'error':
                return 'The transaction could not be completed.';
        }
    }, [status]);

    const ctaMessage = useMemo(() => {
        switch (status) {
            case 'processingapproval':
                return 'Awaiting Approval';
            case 'processingswap':
                return 'Processing';
            case 'success':
                return 'Done';
            case 'error':
                return 'Close'; // Or "Try Again" if you have that logic
        }
    }, [status]);

    const statusIcon = useMemo(() => {
        switch (status) {
            case 'success':
                return <CompletedIcon />;
            // case 'error':
            //     return <ErrorIcon />;
            default: // processingapproval, processingswap
                return <ProcessingIcon />;
        }
    }, [status]);

    return (
        <TransactionModal show={isOpen} handleClose={() => setIsOpen(false)}>
            <StatusHero icon={statusIcon} title={heroTitle}>
                <p>{heroMessage}</p>
            </StatusHero>

            <ProcessingDetailsWrapper>
                <StatusList entries={statusItems} />
            </ProcessingDetailsWrapper>

            <WalletButton
                variant={status === 'error' ? 'error' : 'primary'} // Example: use danger variant for error
                size="xl"
                disabled={status === 'processingswap' || status === 'processingapproval'}
                onClick={() => setIsOpen(false)}
            >
                {ctaMessage}
            </WalletButton>
        </TransactionModal>
    );
};
