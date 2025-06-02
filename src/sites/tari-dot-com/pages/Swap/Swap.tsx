'use client';
import { memo, useMemo, useRef, useState } from 'react';
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
} from './Swap.styles';
import { useAccount } from 'wagmi';
import { useAppKitWallet } from '@reown/appkit-wallet-button/react';
import { useSwapData } from './useSwapData';
import { useAdaptiveFontSize } from '@/ui-shared/hooks/useAdaptiveFontSize';
import { getCurrencyIcon } from './helpers/getCurrencyIcon';
import { truncateMiddle } from '../../utils/truncateMiddle';
import { EnabledTokensEnum } from '@/ui-shared/hooks/swap/lib/constants';
import { SwapConfirmation } from './SwapDialogs/sections/SwapConfirmation/SwapConfirmation';
import { ProcessingTransaction } from './SwapDialogs/sections/ProcessingTransaction/ProcessingTransaction';
import { TokenSelection } from './SwapDialogs/sections/TokenSelection/TokenSelection';
import { WalletContents } from './SwapDialogs/sections/WalletContents/WalletContents';
import { SignApprovalMessage } from './SwapDialogs/sections/SignMessage/SignApprovalMessage';
import { WalletButton } from './SwapDialogs/components/WalletButton/WalletButton';
import { ArrowIcon } from './SwapDialogs/icons/elements/ArrowIcon';
import { ChevronSVG } from './SwapDialogs/icons/chevron';
// Removed useTranslation import


export const Swap = memo(function Swap() {
    const [openWallet, setOpenWallet] = useState(false);
    const connectedAccount = useAccount();
    const { connect } = useAppKitWallet();

    const {
        notEnoughBalance,
        fromTokenDisplay,
        toTokenDisplay,
        reviewSwap,
        isLoading,
        processingOpen,
        isProcessingApproval,
        isProcessingSwap,
        swapSuccess,
        ethTokenAmount,
        wxtmAmount,
        uiDirection,
        transaction,
        tokenSelectOpen,
        selectableFromTokens,
        error,
        insufficientLiquidity,
        lastUpdatedField,
        setProcessingOpen,
        setFromAmount,
        setTargetAmount,
        setReviewSwap,
        handleToggleUiDirection,
        handleConfirm,
        setTokenSelectOpen,
        handleSelectFromToken,
    } = useSwapData();

    const handleButtonClick = () => {
        if (connectedAccount.address) {
            setReviewSwap(true);
        } else {
            connect('walletConnect');
        }
    };

    const disabled = useMemo(() => {
        const hasAmount = Number(ethTokenAmount) > 0 || Number(wxtmAmount) > 0; // Check if either has a positive amount
        return Boolean(isLoading || !hasAmount || insufficientLiquidity || notEnoughBalance);
    }, [isLoading, notEnoughBalance, insufficientLiquidity, ethTokenAmount, wxtmAmount]);

    // Refs for the input elements
    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);

    // Use the hook for each input
    const fromInputFontSize = useAdaptiveFontSize({
        inputValue: ethTokenAmount,
        inputRef: fromInputRef,
    });

    const toInputFontSize = useAdaptiveFontSize({
        inputValue: wxtmAmount,
        inputRef: toInputRef,
    });

    return (
        <SwapsContainer>
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
                    <SwapOptionCurrency $clickable={true} onClick={() => setTokenSelectOpen(true)}>
                        {getCurrencyIcon({ symbol: fromTokenDisplay?.symbol || EnabledTokensEnum.ETH, width: 25 })}
                        <span>{fromTokenDisplay?.symbol || 'ETH'}</span>
                        <ChevronSVG width={18} />
                    </SwapOptionCurrency>
                </SwapOptionAmount>
                {connectedAccount.address ? <span>{`Balance: ${fromTokenDisplay?.balance}`}</span> : null}
            </SwapOption>
            <SwapDirection>
                <SwapDirectionWrapper $direction={uiDirection} onClick={handleToggleUiDirection}>
                    <ArrowIcon width={15} />
                </SwapDirectionWrapper>
            </SwapDirection>
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
                    <SwapOptionCurrency>
                        {getCurrencyIcon({ symbol: EnabledTokensEnum.WXTM, width: 25 })}
                        <span>{'wXTM'}</span>
                    </SwapOptionCurrency>
                </SwapOptionAmount>
                {connectedAccount.address ? <span>{`Balance: ${toTokenDisplay?.balance}`}</span> : null}
            </SwapOption>
            {error && <SwapErrorMessage> {error} </SwapErrorMessage>}
            {/* Show error only if it exists */}
            <SubmitButtonWrapper>
                <WalletButton
                    variant="primary"
                    onClick={handleButtonClick}
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
            {/* ////////////////////////////////// */}
            {/* Floating Elements */}
            <SwapConfirmation
                isOpen={Boolean(
                    reviewSwap &&
                    connectedAccount.address &&
                    !notEnoughBalance &&
                    (Number(ethTokenAmount) > 0 || Number(wxtmAmount) > 0)
                )}
                setIsOpen={setReviewSwap}
                onConfirm={handleConfirm}
                transaction={transaction}
                fromTokenDisplay={fromTokenDisplay}
                toTokenSymbol={toTokenDisplay?.symbol}
            />
            <ProcessingTransaction
                status={
                    isProcessingApproval
                        ? 'processingapproval'
                        : isProcessingSwap
                            ? 'processingswap'
                            : swapSuccess
                                ? 'success'
                                : error // If there's an error, set status to 'error'
                                    ? 'error'
                                    : 'processingapproval' // Default or handle appropriately
                }
                isOpen={processingOpen && !isProcessingApproval}
                setIsOpen={setProcessingOpen}
                fees={{
                    approval: transaction?.paidTransactionFeeApproval ?? null,
                    swap: transaction?.paidTransactionFeeSwap ?? null,
                }}
                txBlockHash={transaction?.txBlockHash ?? undefined}
                transactionId={transaction?.transactionId ?? undefined}
                errorMessage={error} // Pass the error message
            />
            <TokenSelection
                isOpen={tokenSelectOpen}
                setIsOpen={setTokenSelectOpen}
                availableTokens={selectableFromTokens}
                onSelectToken={handleSelectFromToken}
            />
            <WalletContents isOpen={openWallet} setIsOpen={setOpenWallet} availableTokens={selectableFromTokens} />
            <SignApprovalMessage isOpen={isProcessingApproval && processingOpen} setIsOpen={setProcessingOpen} />
        </SwapsContainer>
    );
});

