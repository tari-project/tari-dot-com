import { WalletButton } from '../../components/WalletButton/WalletButton';
// import { setWalletConnectModalStep } from '@app/store/actions/walletStoreActions';
// import { SwapStep } from '@app/store';
import {
    SelectedChain,
    SelectedChainInfo,
    SwapAmountInput,
    SwapDetails,
    // NewOutputAmount,
    // NewOutputWrapper,
    // SwapDetailsKey,
    // SwapDetailsValue,
    SwapDirection,
    SwapDirectionWrapper,
    SwapOption,
    SwapOptionAmount,
    SwapOptionCurrency,
    WalletConnectHeader,
} from './SwapConfirmation.styles';
import { getCurrencyIcon } from '../../helpers/getIcon';
import { ArrowIcon } from '../../icons/elements/ArrowIcon';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';
import { truncateMiddle } from '@/sites/tari-dot-com/utils/truncateMiddle';
import { StatusList, StatusListEntry } from '../../StatusList/StatusList';
import { EnabledTokensEnum } from '@/ui-shared/hooks/swap/lib/constants';
import { SelectableTokenInfo } from '../../../useSwapData';
import TransactionModal from '../../TransactionModal/TransactionModal';
import { SwapDirection as SwapDirectionType } from '@/ui-shared/hooks/swap/lib/types';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onConfirm: () => void;
    fromTokenDisplay?: SelectableTokenInfo;
    toTokenSymbol?: string; // Added to determine the "Receive" token symbol
    transaction: {
        amount: string;
        targetAmount: string;
        direction: SwapDirectionType;
        slippage?: string | null;
        networkFee?: string | null; // Estimated network fee for the swap
        priceImpact?: string | null;
        minimumReceived?: string | null; // Added
        executionPrice?: string | null; // Added
        transactionId?: string | null;
        paidTransactionFee?: string | null; // Added: Actual fee paid
    };
}
export const SwapConfirmation = ({
    isOpen,
    setIsOpen,
    transaction,
    onConfirm,
    fromTokenDisplay,
    toTokenSymbol,
}: Props) => {
    const {
        amount,
        targetAmount,
        direction,
        networkFee,
        priceImpact,
        minimumReceived,
        executionPrice,
        paidTransactionFee,
        transactionId,
    } = transaction;
    const dataAcc = useAccount();
    const activeChainIcon = useMemo(() => {
        if (!fromTokenDisplay?.symbol) return null;
        return getCurrencyIcon({
            symbol: fromTokenDisplay.symbol,
            width: 20,
        });
    }, [fromTokenDisplay?.symbol]);

    const receiveTokenSymbol = useMemo(() => {
        if (toTokenSymbol) return toTokenSymbol;
        return direction === 'toXtm' ? EnabledTokensEnum.WXTM : (fromTokenDisplay?.symbol ?? '');
    }, [direction, fromTokenDisplay?.symbol, toTokenSymbol]);

    const items = useMemo(() => {
        const baseItems: StatusListEntry[] = [];

        if (executionPrice) {
            baseItems.push({
                label: 'Rate',
                value: executionPrice,
            });
        }

        if (networkFee) {
            baseItems.push({
                label: 'Network cost',
                value: `${networkFee} GWEI`,

                helpText: networkFee,
            });
        }

        if (minimumReceived) {
            baseItems.push({
                label: 'Minimum received',
                value: minimumReceived,
            });
        }

        if (priceImpact) {
            baseItems.push({
                label: 'Price impact',
                value: priceImpact,
            });
        }

        if (transactionId && paidTransactionFee) {
            baseItems.push({
                label: 'Transaction fee paid',
                value: paidTransactionFee,
            });
        }

        return baseItems.filter((item) => item.value !== null && item.value !== undefined);
    }, [executionPrice, networkFee, minimumReceived, priceImpact, transactionId, paidTransactionFee]);

    return (
        <TransactionModal show={isOpen} handleClose={() => setIsOpen(false)} noHeader>
            <div>
                <WalletConnectHeader>
                    <span />
                    <SelectedChain>
                        {activeChainIcon}
                        <SelectedChainInfo>
                            <span className="address">{truncateMiddle(dataAcc.address || '', 6)}</span>
                            <span className="chain">
                                {fromTokenDisplay?.symbol} {dataAcc.chain?.testnet ? '(TESTNET)' : 'MAINNET'}
                            </span>
                        </SelectedChainInfo>
                    </SelectedChain>
                </WalletConnectHeader>

                <SwapOption>
                    <span> Sell </span>
                    <SwapOptionAmount>
                        <SwapAmountInput disabled type="text" inputMode="decimal" placeholder="0.00" value={amount} />
                        <SwapOptionCurrency>
                            {fromTokenDisplay?.symbol
                                ? getCurrencyIcon({ symbol: fromTokenDisplay?.symbol, width: 25 })
                                : null}
                            <span>{fromTokenDisplay?.symbol}</span>
                        </SwapOptionCurrency>
                    </SwapOptionAmount>
                    <span>{fromTokenDisplay?.balance}</span>
                </SwapOption>
                <SwapDirection>
                    <SwapDirectionWrapper $direction={direction}>
                        <ArrowIcon width={15} />
                    </SwapDirectionWrapper>
                </SwapDirection>
                <SwapOption>
                    <span> Receive (estimated) </span>
                    <SwapOptionAmount>
                        <SwapAmountInput
                            disabled
                            type="text"
                            inputMode="decimal"
                            placeholder="0.00"
                            value={targetAmount}
                        />
                        <SwapOptionCurrency>
                            {getCurrencyIcon({ symbol: receiveTokenSymbol as EnabledTokensEnum, width: 25 })}
                            <span>{receiveTokenSymbol}</span>
                        </SwapOptionCurrency>
                    </SwapOptionAmount>
                </SwapOption>

                <SwapDetails>
                    {
                        // <NewOutputWrapper>
                        //     <NewOutputAmount>
                        //         <SwapDetailsKey>{t('swap.new-output')}</SwapDetailsKey>
                        //         <SwapDetailsValue>{1.074234}</SwapDetailsValue>
                        //     </NewOutputAmount>
                        //     <WalletButton
                        //         variant="success"
                        //         onClick={() => setWalletConnectModalStep(SwapStep.WalletContents)}
                        //         size="medium"
                        //     >
                        //         {t('swap.accept')}
                        //     </WalletButton>
                        // </NewOutputWrapper>
                    }

                    <StatusList entries={items} />
                </SwapDetails>

                <WalletButton variant="primary" onClick={onConfirm} size="xl">
                    Approve and buy
                </WalletButton>
            </div>
        </TransactionModal>
    );
};
