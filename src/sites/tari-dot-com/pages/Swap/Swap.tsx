'use client';
import { memo, useMemo, useRef, useState, useEffect } from 'react';

import {
    ConnectedWalletWrapper,
    CurrentStep,
    HeaderItem,
    HeaderWrapper,
    StepHeader,
    SubmitButtonWrapper,
    SwapAmountInput,
    SwapDirection,
    SwapDirectionWrapper,
    SwapOption,
    SwapOptionAmount,
    SwapOptionCurrency,
    SwapErrorMessage,
    SwapsContainer,
    OptionContainer,
} from './Swap.styles';
import { useAccount } from 'wagmi';
import { useAppKitWallet } from '@reown/appkit-wallet-button/react';
import { useSwapData } from './useSwapData';
import { useAdaptiveFontSize } from '@/ui-shared/hooks/useAdaptiveFontSize';
import { getCurrencyIcon } from './helpers/getCurrencyIcon';
import { truncateMiddle } from '../../utils/truncateMiddle';
import { EnabledTokensEnum } from '@/ui-shared/hooks/swap/lib/constants';
import { TokenSelection } from './SwapDialogs/sections/TokenSelection/TokenSelection';
import { WalletContents } from './SwapDialogs/sections/WalletContents/WalletContents';
import { WalletButton } from './SwapDialogs/components/WalletButton/WalletButton';
import { ArrowIcon } from './SwapDialogs/icons/elements/ArrowIcon';
import { ChevronSVG } from './SwapDialogs/icons/chevron';
import { MessageType, postToParentIframe, useIframeMessage } from '@/ui-shared/hooks/swap/useIframeMessage';
import { TransactionResponse, TransactionReceipt } from 'ethers';
import { TransactionState } from '@/ui-shared/hooks/swap/lib/providers';
import { useUIStore } from '@/stores/useUiStore';

export const Swap = memo(function Swap() {
    const [openWallet, setOpenWallet] = useState(false);
    const connectedAccount = useAccount();

    const { setTheme } = useUIStore();

    const onOpenWalletConnect = () => {
        postToParentIframe({ type: MessageType.WALLET_CONNECT, payload: { open: true } });
    };

    const onCloseWalletConnect = () => {
        postToParentIframe({ type: MessageType.WALLET_CONNECT, payload: { open: false } });
    };


    const { connect } = useAppKitWallet(
        {
            onSuccess: onCloseWalletConnect,
            onError: onCloseWalletConnect,
        }
    );

    const {
        notEnoughBalance,
        fromTokenDisplay,
        toTokenDisplay,
        isLoading,
        ethTokenAmount,
        wxtmAmount,
        uiDirection,
        transaction,
        tokenSelectOpen,
        selectableFromTokens,
        error,
        insufficientLiquidity,
        lastUpdatedField,
        ethUsdPrice,
        setFromAmount,
        setTargetAmount,
        handleToggleUiDirection,
        handleConfirm,
        setTokenSelectOpen,
        handleSelectFromToken,
    } = useSwapData();

    const slippage = useMemo(() => {
        if (transaction.priceImpact) {
            return Number(transaction.priceImpact.replace('%', ''));
        }
        return null;
    }, [transaction]);

    const onApproveRequest = () => {
        postToParentIframe({ type: MessageType.APPROVE_REQUEST });
    };

    const onApproveSuccess = () => {
        postToParentIframe({ type: MessageType.APPROVE_SUCCESS });
        postToParentIframe({ type: MessageType.PROCESSING_STATUS, payload: { status: 'processingapproval' } });
    };

    const onFailure = (message?: string) => {
        postToParentIframe({ type: MessageType.ERROR, payload: { message: message || 'Swap execution failed.' } });
    };

    const onSuccess = (txResult: { response?: TransactionResponse; receipt?: TransactionReceipt; status?: TransactionState }) => {
        setFromAmount('');
        setTargetAmount('');

        let approvalFeeGwei = null;
        let approvalFeeUsd = null;
        let swapFeeGwei = null;
        let swapFeeUsd = null;

        if (txResult.receipt?.gasUsed && txResult.response?.gasPrice && ethUsdPrice) {
            const feeWei = txResult.receipt.gasUsed;
            const feeEth = Number(feeWei) * 15 * 1e-9;
            const feeUsd = feeEth * Number(ethUsdPrice);

            approvalFeeGwei = `${txResult.receipt.gasUsed} units`;
            approvalFeeUsd = `$${feeUsd.toFixed(2)}`;
            swapFeeGwei = `${txResult.receipt.gasUsed} units`;
            swapFeeUsd = `$${feeUsd.toFixed(2)}`;
        }

        postToParentIframe({
            type: MessageType.PROCESSING_STATUS, payload: {
                status: 'success',
                txBlockHash: txResult.receipt?.blockHash as `0x${string}`,
                transactionId: txResult.response?.hash,
                fees: {
                    swap: approvalFeeGwei && approvalFeeUsd ? approvalFeeUsd : null,
                    approval: swapFeeGwei && swapFeeUsd ? `${approvalFeeGwei}` : null,
                }
            }
        });
    };

    const handleReviewSwap = () => {
        if (connectedAccount.address) {
            let { amount, targetAmount } = transaction;
            if (transaction.direction === 'fromXtm') {
                amount = transaction.targetAmount;
                targetAmount = transaction.amount;
            }

            let networkFeeUsd = null;
            if (transaction.networkFee && ethUsdPrice) {
                const feeEth = Number(transaction.networkFee) * 15 * 1e-9;
                const feeUsd = feeEth * Number(ethUsdPrice);
                networkFeeUsd = `$${feeUsd.toFixed(2)}`;
            }

            postToParentIframe({
                type: MessageType.CONFIRM_REQUEST, payload: {
                    toTokenDisplay,
                    fromTokenDisplay, transaction: {
                        ...transaction, amount, targetAmount,
                        networkFee: transaction.networkFee ? networkFeeUsd : null,
                        networkFeeNative: transaction.networkFee,
                    }, toTokenSymbol: toTokenDisplay?.symbol,
                }
            });
        } else {
            connect('walletConnect');
            onOpenWalletConnect()
        }
    };

    useIframeMessage((event) => {
        switch (event.data.type) {
            case 'EXECUTE_SWAP':
                console.log('EXECUTE_SWAP', event.data);
                handleConfirm({ onApproveRequest, onApproveSuccess, onFailure, onSuccess });
                break;
            case 'SET_THEME':
                if (!event.data.payload.theme) return;
                setTheme(event.data.payload.theme);
                break;
            default:
                console.warn('Unknown message type:', event.data);
        }
    });

    const disabled = useMemo(() => {
        const hasAmount = Number(ethTokenAmount) > 0 || Number(wxtmAmount) > 0; // Check if either has a positive amount
        return Boolean(isLoading || !hasAmount || insufficientLiquidity || notEnoughBalance);
    }, [isLoading, notEnoughBalance, insufficientLiquidity, ethTokenAmount, wxtmAmount]);

    // Ref for the root container to observe height changes
    const containerRef = useRef<HTMLDivElement>(null);

    // Refs for the input elements
    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);

    // Notify parent window on height changes
    useEffect(() => {
        if (!containerRef.current) return;

        const notifyParent = () => {
            if (containerRef.current && containerRef.current.offsetHeight) {
                console.log('containerRef.current.offsetHeight', containerRef.current.offsetHeight);
                postToParentIframe({ type: MessageType.SWAP_HEIGHT_CHANGE, payload: { height: containerRef.current.offsetHeight + 40 } });
            }
        };

        // Initial notify
        notifyParent();

        const resizeObserver = new window.ResizeObserver(() => {
            notifyParent();
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Use the hook for each input
    const fromInputFontSize = useAdaptiveFontSize({
        inputValue: ethTokenAmount,
        inputRef: fromInputRef,
    });

    const toInputFontSize = useAdaptiveFontSize({
        inputValue: wxtmAmount,
        inputRef: toInputRef,
    });

    const xtmTokenInputMarkup = useMemo(() => {
        return <OptionContainer>
            <SwapOption>
                <span>{uiDirection === 'toXtm' ? 'Receive (estimated)' : 'Sell'}</span>
                <SwapOptionAmount>
                    <SwapAmountInput
                        ref={toInputRef} // Assign ref
                        type="text"
                        $error={uiDirection === 'fromXtm' ? notEnoughBalance : false}
                        $loading={isLoading && lastUpdatedField === 'ethTokenField'}
                        inputMode="decimal"
                        placeholder="0.00"
                        onChange={(e) => setTargetAmount(e.target.value)}
                        value={wxtmAmount}
                        $dynamicFontSize={toInputFontSize} // Pass dynamic font size
                    />
                </SwapOptionAmount>
                {connectedAccount.address ? <span>{`Balance: ${toTokenDisplay?.balance}`}</span> : null}
            </SwapOption>
            <SwapOptionCurrency>
                {getCurrencyIcon({ symbol: EnabledTokensEnum.WXTM, width: 25 })}
                <span>{'wXTM'}</span>
            </SwapOptionCurrency>
        </OptionContainer>
    }, [connectedAccount.address, isLoading, lastUpdatedField, notEnoughBalance, setTargetAmount, toInputFontSize, toTokenDisplay?.balance, uiDirection, wxtmAmount]);

    const ethTokenInputMarkup = useMemo(() => {
        return <OptionContainer>
            <SwapOption $paddingBottom={25}>
                <span>{uiDirection === 'toXtm' ? 'Sell' : 'Receive (estimated)'}</span>
                <SwapOptionAmount>
                    <SwapAmountInput
                        ref={fromInputRef} // Assign ref
                        type="text"
                        $error={uiDirection === 'toXtm' ? notEnoughBalance : false}
                        $loading={isLoading && lastUpdatedField === 'wxtmField'}
                        inputMode="decimal"
                        placeholder="0.00"
                        onChange={(e) => setFromAmount(e.target.value)}
                        value={ethTokenAmount}
                        $dynamicFontSize={fromInputFontSize} // Pass dynamic font size
                    />
                </SwapOptionAmount>
                {connectedAccount.address ? <span>{`Balance: ${fromTokenDisplay?.balance}`}</span> : null}
            </SwapOption>
            <SwapOptionCurrency $clickable={true} onClick={() => setTokenSelectOpen(true)}>
                {getCurrencyIcon({ symbol: fromTokenDisplay?.symbol || EnabledTokensEnum.ETH, width: 25 })}
                <span>{fromTokenDisplay?.symbol || 'ETH'}</span>
                <ChevronSVG width={8} />
            </SwapOptionCurrency>
        </OptionContainer>
    }, [connectedAccount.address, fromInputFontSize, fromTokenDisplay?.balance, fromTokenDisplay?.symbol, isLoading, lastUpdatedField, notEnoughBalance, setFromAmount, setTokenSelectOpen, uiDirection, ethTokenAmount]);


    return (
        <SwapsContainer ref={containerRef}>
            <HeaderWrapper>
                <HeaderItem>
                    <StepHeader>Enter amount</StepHeader>
                    <CurrentStep>
                        Step <strong>{'1'}</strong> {'/2'}
                    </CurrentStep>
                </HeaderItem>
                {fromTokenDisplay && connectedAccount.address ? (
                    <ConnectedWalletWrapper onClick={() => setOpenWallet(true)}>
                        <>
                            {getCurrencyIcon({ symbol: EnabledTokensEnum.ETH, width: 20 })}
                            {truncateMiddle((connectedAccount?.address as `0x${string}`) || '', 6)}
                        </>
                    </ConnectedWalletWrapper>
                ) : null}
            </HeaderWrapper>
            {uiDirection === 'toXtm' ? ethTokenInputMarkup : xtmTokenInputMarkup}
            <SwapDirection>
                <SwapDirectionWrapper $direction={'toXtm'} onClick={handleToggleUiDirection}>
                    <ArrowIcon width={15} />
                </SwapDirectionWrapper>
            </SwapDirection>
            {uiDirection === 'toXtm' ? xtmTokenInputMarkup : ethTokenInputMarkup}
            {slippage && Number(slippage) > 0.5 && (
                <SwapErrorMessage style={{ color: '#FFA500' }}>
                    Warning: Slippage is high ({Number(slippage).toFixed(2)}%). Your received amount may differ.
                </SwapErrorMessage>
            )}
            {error && <SwapErrorMessage> {error} </SwapErrorMessage>}

            <SubmitButtonWrapper>
                <WalletButton
                    variant="primary"
                    onClick={handleReviewSwap}
                    size="xl"
                    disabled={disabled && !!connectedAccount.address}
                >
                    {connectedAccount.address
                        ? isLoading
                            ? 'Loading...'
                            : 'Review swap'
                        : 'Connect wallet'}
                </WalletButton>
            </SubmitButtonWrapper>

            {/* --- Floating Elements --- */}
            <TokenSelection
                isOpen={tokenSelectOpen}
                setIsOpen={setTokenSelectOpen}
                availableTokens={selectableFromTokens}
                onSelectToken={handleSelectFromToken}
            />
            <WalletContents isOpen={openWallet} setIsOpen={setOpenWallet} availableTokens={selectableFromTokens} />
            {/* --- END Floating Elements --- */}
        </SwapsContainer>
    );
});

