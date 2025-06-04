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
} from './WalletContents.styles';
import { useCallback } from 'react';
import { getCurrencyIcon } from '../../helpers/getIcon';
import { truncateMiddle } from '@/sites/tari-dot-com/utils/truncateMiddle';
import TransactionModal from '../../TransactionModal/TransactionModal';
import { SelectableTokenInfo } from '../../../useSwapData';
import { EnabledTokensEnum } from '@/ui-shared/hooks/swap/lib/constants';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    availableTokens: SelectableTokenInfo[];
}

export const WalletContents = ({ isOpen, setIsOpen, availableTokens }: Props) => {
    const { disconnect } = useDisconnect();
    const { address: accountAddress } = useAccount();

    const handleDisconnect = useCallback(() => {
        if (accountAddress) {
            disconnect();
        }
        setIsOpen(false);
    }, [accountAddress, disconnect, setIsOpen]);

    return (
        <TransactionModal
            show={isOpen}
            handleClose={() => setIsOpen(false)}
            title="Wallet Connected"
        >
            <WalletContentsContainer>
                <ConnectedWalletWrapper>
                    <WalletButton variant="error" onClick={handleDisconnect}>
                        Disconnect
                    </WalletButton>
                    <WalletAddress>
                        {getCurrencyIcon({ symbol: EnabledTokensEnum.ETH, width: 20 })}
                        {truncateMiddle(accountAddress || '', 7)}
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
