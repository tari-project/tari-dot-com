import { getCurrencyIcon } from '../../helpers/getIcon';
import { ModalContent, TokenDetails, TokenInfo, TokenItem, TokenList, TokenValue } from './TokenSelection.styles';
import TransactionModal from '../../TransactionModal/TransactionModal';
import { SelectableTokenInfo } from '../../../useSwapData';
import { WalletButton } from '../../components/WalletButton/WalletButton';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    availableTokens: SelectableTokenInfo[];
    onSelectToken: (token: SelectableTokenInfo) => void;
}

export const TokenSelection = ({ isOpen, setIsOpen, availableTokens, onSelectToken }: Props) => {
    const handleSelectToken = (token: SelectableTokenInfo) => {
        onSelectToken(token);
        setIsOpen(false);
    };

    return (
        <TransactionModal show={isOpen} handleClose={() => setIsOpen(false)} title={'Select a token'}>
            <ModalContent
            >
                <TokenList role="listbox" aria-label={'Select a token'}>
                    {availableTokens.map((token) =>
                        token.symbol.toLowerCase() === 'wxtm' ? null : (
                            <TokenItem
                                key={token.symbol + (token.address || 'native')}
                                onClick={() => handleSelectToken(token)}
                                role="option"
                                tabIndex={0}
                                aria-selected="false"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelectToken(token);
                                    }
                                }}
                            >
                                <TokenInfo>
                                    {getCurrencyIcon({ symbol: token.symbol, width: 32 })}
                                    <TokenDetails>
                                        <span className="name">{token.label}</span>
                                        <span className="symbol">{token.symbol}</span>
                                    </TokenDetails>
                                </TokenInfo>
                                <TokenValue>
                                    {token.usdValue && <span className="usd">{token.usdValue}</span>}
                                    {token.balance && <span className="balance">{token.balance}</span>}
                                </TokenValue>
                            </TokenItem>
                        )
                    )}
                    {availableTokens.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#a0a0b0' }}>
                            No other tokens available
                        </div>
                    )}
                </TokenList>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <WalletButton variant="secondary" onClick={() => setIsOpen(false)} size="large">
                        Continue
                    </WalletButton>
                </div>
            </ModalContent>
        </TransactionModal>
    );
};
