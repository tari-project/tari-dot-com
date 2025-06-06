import { useAccount, useDisconnect } from 'wagmi';
import { WalletButton } from '../../components/WalletButton/WalletButton';
import {
    ConnectedWalletWrapper,
    WalletContentsContainer,
    TokenList,
    TokenItem,
    TokenItemLeft,
    TokenIconWrapper,
    TokenInfo,
    TokenName,
    TokenSymbol,
    TokenItemRight,
    TokenSeparator,
    WalletAddress,
    CopyText,
} from './WalletContents.styles';
import { useCallback, useState } from 'react';
import { getCurrencyIcon } from '../../helpers/getIcon';
import { truncateMiddle } from '@/sites/tari-dot-com/utils/truncateMiddle';
import TransactionModal from '../../TransactionModal/TransactionModal';
import { SelectableTokenInfo } from '../../../useSwapData';
import { CopyIcon } from '../../icons/CopyIcon';
import { AnimatePresence } from 'motion/react';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    availableTokens: SelectableTokenInfo[];
}

export const WalletContents = ({ isOpen, setIsOpen, availableTokens }: Props) => {
    const { disconnect } = useDisconnect();
    const { address: accountAddress } = useAccount();

    const [copied, setCopied] = useState(false);

    const handleDisconnect = useCallback(() => {
        if (accountAddress) {
            disconnect();
        }
        setIsOpen(false);
    }, [accountAddress, disconnect, setIsOpen]);

    const handleCopyAddress = useCallback(() => {
        if (accountAddress) {
            navigator.clipboard.writeText(accountAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    }, [accountAddress]);

    return (
        <TransactionModal
            show={isOpen}
            handleClose={() => setIsOpen(false)}
            title="Wallet Connected"
        >
            <WalletContentsContainer>
                <ConnectedWalletWrapper>
                    <WalletButton variant="error" onClick={handleDisconnect} size="small">
                        Disconnect
                    </WalletButton>
                    <WalletAddress onClick={handleCopyAddress} title="Copy address">
                        <span className="address-content">
                            <CopyIcon width={20} height={20} />
                            {truncateMiddle(accountAddress || '', 6, 5)}
                        </span>
                        <AnimatePresence>
                            {copied && (
                                <CopyText
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    Copied!
                                </CopyText>
                            )}
                        </AnimatePresence>
                    </WalletAddress>
                </ConnectedWalletWrapper>

                <TokenList>
                    {availableTokens.map((token, index) => (
                        <div key={token.symbol}>
                            <TokenItem>
                                <TokenItemLeft>
                                    <TokenIconWrapper>
                                        {getCurrencyIcon({
                                            symbol: token.symbol,
                                            width: 32,
                                        })}
                                    </TokenIconWrapper>
                                    <TokenInfo>
                                        <TokenName>{token.label}</TokenName>
                                        <TokenSymbol>{token.symbol}</TokenSymbol>
                                    </TokenInfo>
                                </TokenItemLeft>
                                <TokenItemRight>
                                    {token.usdValue && <span className="usd">{token.usdValue}</span>}
                                    <span className="balance">{token.balance || `0.000 ${token.symbol}`}</span>
                                </TokenItemRight>
                            </TokenItem>
                            {index < availableTokens.length - 1 && <TokenSeparator />}
                        </div>
                    ))}
                </TokenList>
            </WalletContentsContainer>
        </TransactionModal>
    );
};
