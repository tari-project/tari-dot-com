/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccount, useBalance, useEstimateFeesPerGas, useReadContracts } from 'wagmi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { formatUnits as viemFormatUnits, parseUnits as viemParseUnits, erc20Abi as viemErc20Abi, parseUnits } from 'viem';
import { Token, NativeCurrency, Ether, ChainId } from '@uniswap/sdk-core';
import {
    ENABLED_TOKEN_ADDRESSES,
    EnabledTokensEnum,
    TOKEN_DEFINITIONS,
    XTM_SDK_TOKEN,
} from '@/ui-shared/hooks/swap/lib/constants';
import {
    formatDisplayBalanceForSelectable,
    fetchTokenPriceUSD,
    formatAmountSmartly,
    formatNativeGasFee as utilFormatNativeGasFee,
} from '@/ui-shared/hooks/swap/lib/utils';
import { SwapExecutionProps, useUniswapV3Interactions } from '@/ui-shared/hooks/swap/useSwapV3';
import { V3TradeDetails, SwapField, SwapTransaction } from '@/ui-shared/hooks/swap/lib/types';
import { useTokenDisplayInfo } from './helpers/useTokenInfo';
import { cleanFormattedNumber, formatNumberWithCommas } from './helpers/formatNumberInputValues';
import { ethers } from 'ethers';

export type TokenSymbol = EnabledTokensEnum;
export interface SelectableTokenInfo {
    label: string;
    symbol: TokenSymbol;
    address: `0x${string}` | null;
    iconSymbol: string;
    definition: Token | NativeCurrency;
    balance?: string;
    usdValue?: string;
    rawBalance?: bigint;
    decimals: number;
    pricePerTokenUSD?: number;
}

export const useSwapData = () => {
    const connectedAccount = useAccount();
    const [ethUsdPrice, setEthUsdPrice] = useState<number | undefined>();


    const [ethTokenAmount, setEthTokenAmount] = useState<string>('');
    const [wxtmAmount, setWxtmAmount] = useState<string>('');

    const [lastUpdatedField, setLastUpdatedField] = useState<SwapField>('ethTokenField');

    const [isCalculatingQuote, setIsCalculatingQuote] = useState(false);
    const [tokenSelectOpen, setTokenSelectOpen] = useState(false);

    const [priceImpact, setPriceImpact] = useState<string | null>(null);
    const [networkFee, setNetworkFee] = useState<string | null>(null);
    const [slippage, setSlippage] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [paidTransactionFee, setPaidTransactionFee] = useState<string | null>(null);
    const [txBlockHash, setTxBlockHash] = useState<`0x${string}` | null>(null);
    const [uiError, setUiError] = useState<string | null>(null);
    // const [minimumReceivedDisplay, setMinimumReceivedDisplay] = useState<string | null>(null);
    const [executionPriceDisplay, setExecutionPriceDisplay] = useState<string | null>(null);

    const [tradeDetails, setTradeDetails] = useState<V3TradeDetails | null>(null);
    const defaultChainId = ChainId.MAINNET;

    const abortController = useRef<AbortController | null>(null);

    const {
        direction,
        addLiquidityV3,
        token0: swapEngineInputToken,
        token1: swapEngineOutputToken,
        setDirection: setSwapEngineDirection,
        setPairTokenAddress,
        getTradeDetails,
        executeSwap,
        insufficientLiquidity: insufficientLiquidityFromHook,
        error: swapEngineError,
    } = useUniswapV3Interactions();

    const currentChainId = useMemo(
        () => connectedAccount.chain?.id || defaultChainId,
        [connectedAccount.chain, defaultChainId]
    );

    const { data: feeData } = useEstimateFeesPerGas({ chainId: currentChainId });

    const fromUiTokenDefinition = useMemo(
        () => (direction === 'toXtm' ? swapEngineInputToken : swapEngineOutputToken),
        [direction, swapEngineInputToken, swapEngineOutputToken]
    );
    const toUiTokenDefinition = useMemo(
        () => (direction === 'toXtm' ? swapEngineOutputToken : swapEngineInputToken),
        [direction, swapEngineInputToken, swapEngineOutputToken]
    );

    const {
        tokenDisplayInfo: ethTokenDisplay,
        refetch: refetchFromToken,
    } = useTokenDisplayInfo({
        uiTokenDefinition: fromUiTokenDefinition,
        chainId: currentChainId,
        accountAddress: connectedAccount.address,
        fallbackDefinition: currentChainId ? Ether.onChain(currentChainId) : undefined,
    });

    const {
        tokenDisplayInfo: xtmTokenDisplay,
        refetch: refetchToToken,
    } = useTokenDisplayInfo({
        uiTokenDefinition: toUiTokenDefinition,
        chainId: currentChainId,
        accountAddress: connectedAccount.address,
        fallbackDefinition: currentChainId ? XTM_SDK_TOKEN[currentChainId as ChainId] : undefined,
    });

    const handleRefetchBalances = useCallback(async () => {
        await Promise.all([refetchFromToken(), refetchToToken()]);
    }, [refetchFromToken, refetchToToken]);

    const notEnoughBalance = useMemo(() => {
        if (direction === 'toXtm') {
            if (!ethTokenDisplay?.rawBalance || !ethTokenAmount || !ethTokenDisplay.decimals || Number(ethTokenAmount) <= 0) return false;
            try {
                const amountBigInt = viemParseUnits(ethTokenAmount, ethTokenDisplay.decimals);
                return amountBigInt > ethTokenDisplay.rawBalance;
            } catch {
                return true;
            }
        } else {
            if (!xtmTokenDisplay?.rawBalance || !wxtmAmount || !xtmTokenDisplay.decimals || Number(wxtmAmount) <= 0) return false;
            try {
                const amountBigInt = viemParseUnits(wxtmAmount, xtmTokenDisplay.decimals);
                return amountBigInt > xtmTokenDisplay.rawBalance;
            } catch {
                return true;
            }
        }
    }, [
        direction,
        ethTokenDisplay?.rawBalance,
        ethTokenDisplay?.decimals,
        ethTokenAmount,
        xtmTokenDisplay?.rawBalance,
        xtmTokenDisplay?.decimals,
        wxtmAmount,
    ]);

    const baseSelectableTokensForList = useMemo((): Omit<
        SelectableTokenInfo,
        'balance' | 'usdValue' | 'rawBalance' | 'pricePerTokenUSD'
    >[] => {
        const chainId = currentChainId;
        const xtmDef = XTM_SDK_TOKEN[chainId as ChainId];
        const tokens: Omit<SelectableTokenInfo, 'balance' | 'usdValue' | 'rawBalance' | 'pricePerTokenUSD'>[] = [];

        Object.keys(ENABLED_TOKEN_ADDRESSES).forEach((tokenId) => {
            const token = TOKEN_DEFINITIONS[tokenId as keyof typeof TOKEN_DEFINITIONS]?.[chainId as ChainId];
            if (token) {
                tokens.push({
                    label: token.name || 'Token',
                    symbol: token.symbol as TokenSymbol,
                    address: token.address as `0x${string}`,
                    iconSymbol: token.symbol?.toLowerCase() || token.address.toLowerCase(),
                    definition: token,
                    decimals: token.decimals,
                });
            }
        });

        const nativeEth = Ether.onChain(chainId);
        if (nativeEth && (!xtmDef || !nativeEth.equals(xtmDef))) {
            const symbol = nativeEth?.symbol?.toUpperCase() as TokenSymbol;
            const iconSymbol = nativeEth?.symbol?.toLowerCase();
            if (symbol && iconSymbol) {
                tokens.push({
                    label: nativeEth.name || 'Ethereum',
                    symbol,
                    address: null,
                    iconSymbol,
                    definition: nativeEth,
                    decimals: nativeEth.decimals,
                });
            }
        }

        Object.values(EnabledTokensEnum).forEach((tokenKey) => {
            let tokenDefinitionFromEnum: Token | undefined;
            if (tokenKey === EnabledTokensEnum.WXTM && xtmDef) tokenDefinitionFromEnum = xtmDef;

            if (tokenDefinitionFromEnum?.address) {
                if (!tokens.find((t) => t.definition.equals(tokenDefinitionFromEnum!))) {
                    tokens.push({
                        label: tokenDefinitionFromEnum.name || tokenKey,
                        symbol: (tokenDefinitionFromEnum.symbol || tokenKey) as TokenSymbol,
                        address: tokenDefinitionFromEnum.address as `0x${string}`,
                        iconSymbol: tokenDefinitionFromEnum.symbol?.toLowerCase() || tokenKey.toLowerCase(),
                        definition: tokenDefinitionFromEnum,
                        decimals: tokenDefinitionFromEnum.decimals,
                    });
                }
            }
        });
        return tokens;
    }, [currentChainId]);

    const selectableTokensContracts = useMemo(() => {
        if (!connectedAccount.address || baseSelectableTokensForList.length === 0) return [];
        return baseSelectableTokensForList
            .filter((token) => token.address !== null)
            .map(
                (token) =>
                    ({
                        address: token.address as `0x${string}`,
                        abi: viemErc20Abi,
                        functionName: 'balanceOf',
                        args: [connectedAccount.address as `0x${string}`],
                    }) as const
            );
    }, [connectedAccount.address, baseSelectableTokensForList]);

    const { data: erc20BalancesData } = useReadContracts({
        contracts: selectableTokensContracts,
        allowFailure: true,
        query: { enabled: selectableTokensContracts.length > 0 && !!connectedAccount.address },
    });

    const { data: nativeTokenBalanceDataForList } = useBalance({
        address: connectedAccount.address,
        chainId: currentChainId,
    });

    const [tokenPrices, setTokenPrices] = useState<Record<string, number | undefined>>({});

    useEffect(() => {
        const fetchAllPrices = async () => {
            if (baseSelectableTokensForList.length === 0 || !currentChainId) return;
            const newPrices: Record<string, number | undefined> = {};
            const promises = baseSelectableTokensForList.map(async (token) => {
                if (token.symbol) {
                    newPrices[token.symbol] = await fetchTokenPriceUSD(token.symbol);
                    if (token.symbol === 'ETH') {
                        setEthUsdPrice(newPrices[token.symbol]);
                    }
                }
            });
            await Promise.all(promises);
            setTokenPrices((prev) => ({ ...prev, ...newPrices }));
        };
        fetchAllPrices();
    }, [baseSelectableTokensForList, currentChainId]);

    const selectableFromTokens = useMemo((): SelectableTokenInfo[] => {
        return baseSelectableTokensForList
            .map((baseToken) => {
                let rawBalance: bigint | undefined;
                let balanceStr: string | undefined;

                if (baseToken.address === null) {
                    rawBalance = nativeTokenBalanceDataForList?.value;
                    balanceStr = rawBalance
                        ? formatDisplayBalanceForSelectable(rawBalance, baseToken.decimals, baseToken.symbol)
                        : undefined;
                } else {
                    const contractIndex = selectableTokensContracts.findIndex(
                        (c) => c.address.toLowerCase() === baseToken.address?.toLowerCase()
                    );
                    const balanceResult =
                        contractIndex !== -1 && erc20BalancesData ? erc20BalancesData[contractIndex] : undefined;
                    if (balanceResult?.status === 'success') rawBalance = balanceResult.result as bigint;
                    balanceStr = rawBalance
                        ? formatDisplayBalanceForSelectable(rawBalance, baseToken.decimals, baseToken.symbol)
                        : undefined;
                }

                const pricePerToken = baseToken.symbol ? tokenPrices[baseToken.symbol] : undefined;
                let totalUsdValueStr: string | undefined;
                if (rawBalance !== undefined && pricePerToken !== undefined) {
                    const numericBalance = parseFloat(viemFormatUnits(rawBalance, baseToken.decimals));
                    totalUsdValueStr = `$${(numericBalance * pricePerToken).toFixed(2)}`;
                }

                return {
                    ...baseToken,
                    balance: balanceStr,
                    usdValue: totalUsdValueStr,
                    rawBalance,
                    pricePerTokenUSD: pricePerToken,
                };
            })
            .sort((a, b) => {
                const valA =
                    a.rawBalance && a.pricePerTokenUSD
                        ? parseFloat(viemFormatUnits(a.rawBalance, a.decimals)) * a.pricePerTokenUSD
                        : 0;
                const valB =
                    b.rawBalance && b.pricePerTokenUSD
                        ? parseFloat(viemFormatUnits(b.rawBalance, b.decimals)) * b.pricePerTokenUSD
                        : 0;
                if (valB !== valA) return valB - valA;
                return (b.rawBalance || 0n) > (a.rawBalance || 0n) ? 1 : -1;
            });
    }, [
        baseSelectableTokensForList,
        erc20BalancesData,
        nativeTokenBalanceDataForList,
        tokenPrices,
        selectableTokensContracts,
    ]);

    const clearCalculatedDetails = useCallback(() => {
        setUiError(null);
        setTradeDetails(null);
        setPriceImpact(null);
        setNetworkFee(null);
        setSlippage(null);
        // setMinimumReceivedDisplay(null);
        setExecutionPriceDisplay(null);
    }, []);

    const calcRef = useRef<NodeJS.Timeout | null>(null);

    const calcAmounts = useCallback(
        async (signal: AbortSignal) => {
            let amountTypedByUserStr: string;
            let tokenUsedForParsingAmount: Token | NativeCurrency | undefined;
            if (lastUpdatedField === 'ethTokenField') {
                amountTypedByUserStr = ethTokenAmount;
                tokenUsedForParsingAmount = fromUiTokenDefinition;
            } else {
                amountTypedByUserStr = wxtmAmount;
                tokenUsedForParsingAmount = toUiTokenDefinition;
            }

            if (
                !tokenUsedForParsingAmount ||
                !amountTypedByUserStr ||
                Number.isNaN(Number(amountTypedByUserStr)) ||
                Number(amountTypedByUserStr) <= 0
            ) {
                clearCalculatedDetails();
                if (lastUpdatedField === 'ethTokenField' && wxtmAmount !== '') setWxtmAmount('');
                else if (lastUpdatedField === 'wxtmField' && ethTokenAmount !== '') setEthTokenAmount('');
                setIsCalculatingQuote(false);
                return;
            }

            setIsCalculatingQuote(true);
            try {
                const amountForCalcWei = viemParseUnits(amountTypedByUserStr, tokenUsedForParsingAmount.decimals);
                const details = await getTradeDetails(amountForCalcWei.toString(), lastUpdatedField, signal);

                if (signal.aborted) {
                    return;
                }

                setTradeDetails(details);

                if (details && details.inputAmount && details.outputAmount) {
                    setPriceImpact(details.priceImpactPercent ? `${details.priceImpactPercent}%` : null);
                    const estimatedGasUnits = BigInt(details.estimatedGasFeeNative || 0);
                    const gasPrice = feeData?.gasPrice || feeData?.maxFeePerGas; // This is the dynamic gas price from the network
                    const estimatedFeeInWei = estimatedGasUnits * (gasPrice || 0n);

                    // Format it into native currency string (e.g., "0.0015")
                    const feeInNative = viemFormatUnits(estimatedFeeInWei, 18);
                    setNetworkFee(feeInNative);

                    // if (details.minimumReceived && details.minimumReceived.currency.symbol) {
                    //     setMinimumReceivedDisplay(
                    //         `${formatAmountSmartly(details.minimumReceived)} ${details.minimumReceived.currency.symbol}`
                    //     );
                    // } else setMinimumReceivedDisplay(null);

                    if (details.executionPrice) {
                        const baseToken = details.executionPrice.baseCurrency;
                        const quoteToken = details.executionPrice.quoteCurrency;
                        if (baseToken.symbol && quoteToken.symbol) {
                            setExecutionPriceDisplay(
                                `1 ${baseToken.symbol} = ${formatNumberWithCommas(details.executionPrice.toSignificant(6))} ${quoteToken.symbol}`
                            );
                        } else setExecutionPriceDisplay(null);
                    } else setExecutionPriceDisplay(null);
                    if (details.inputToken?.name === XTM_SDK_TOKEN[currentChainId as ChainId]?.name) {
                        if (lastUpdatedField === 'ethTokenField') {
                            setWxtmAmount(formatAmountSmartly(details.inputAmount));
                        } else {
                            setEthTokenAmount(formatAmountSmartly(details.outputAmount));
                        }
                    }

                    else {
                        if (lastUpdatedField === 'ethTokenField') {
                            setWxtmAmount(formatAmountSmartly(details.outputAmount));
                        } else {
                            setEthTokenAmount(formatAmountSmartly(details.inputAmount));
                        }
                    }
                    setUiError(null);
                } else {
                    if (lastUpdatedField === 'ethTokenField' && wxtmAmount !== '') setWxtmAmount('');
                    else if (lastUpdatedField === 'wxtmField' && ethTokenAmount !== '') setEthTokenAmount('');
                    clearCalculatedDetails();
                }
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    return;
                }
                console.error("Error in calcAmounts: ", error);
                setUiError('Failed to fetch quote. Please try again.');
                if (lastUpdatedField === 'ethTokenField' && wxtmAmount !== '') setWxtmAmount('');
                else if (lastUpdatedField === 'wxtmField' && ethTokenAmount !== '') setEthTokenAmount('');
                clearCalculatedDetails();
            } finally {
                if (!signal.aborted) {
                    setIsCalculatingQuote(false);
                }
            }
        },
        [lastUpdatedField, ethTokenAmount, fromUiTokenDefinition, wxtmAmount, toUiTokenDefinition, clearCalculatedDetails, getTradeDetails, feeData?.gasPrice, feeData?.maxFeePerGas, currentChainId]
    );

    const calcAmountsFnRef = useRef(calcAmounts);
    useEffect(() => {
        calcAmountsFnRef.current = calcAmounts;
    }, [calcAmounts]);

    const debounceCalc = useCallback(() => {
        if (calcRef.current) clearTimeout(calcRef.current);
        if (abortController.current) {
            abortController.current.abort();
        }
        abortController.current = new AbortController();
        const signal = abortController.current.signal;

        setIsCalculatingQuote(true);
        calcRef.current = setTimeout(() => {
            calcAmountsFnRef.current(signal);
        }, 500);
    }, []);

    const handleNumberInput = (rawValue: string, field: SwapField) => {
        clearCalculatedDetails();
        const value = cleanFormattedNumber(rawValue);


        const currentUiTokenDef = field === 'ethTokenField' ? fromUiTokenDefinition : toUiTokenDefinition;
        const maxDecimals = currentUiTokenDef?.decimals ?? 18;
        let processedValue = value;

        const isEffectivelyZeroOrInvalid = processedValue === '' || processedValue === '.' || Number(processedValue) <= 0;

        if (isEffectivelyZeroOrInvalid && processedValue !== "0.") { // Allow "0." to continue for typing "0.X"
            if (field === 'ethTokenField') {
                setEthTokenAmount(processedValue);
                if (wxtmAmount !== '') setWxtmAmount('');
            } else {
                setWxtmAmount(processedValue);
                if (ethTokenAmount !== '') setEthTokenAmount('');
            }
            setLastUpdatedField(field);
            setIsCalculatingQuote(false);
            if (calcRef.current) clearTimeout(calcRef.current);
            if (abortController.current) abortController.current.abort();
            return;
        }

        const regex = /^\d*\.?\d*$/;
        if (!regex.test(processedValue) || (processedValue !== '.' && Number.isNaN(Number(processedValue)))) return;

        if (processedValue.length > 1 && processedValue.startsWith('0') && !processedValue.startsWith('0.')) {
            processedValue = processedValue.substring(1);
        }
        const parts = processedValue.split('.');
        if (parts[1] && parts[1].length > maxDecimals) {
            processedValue = `${parts[0]}.${parts[1].substring(0, maxDecimals)}`;
        }

        if (field === 'ethTokenField') setEthTokenAmount(processedValue);
        else setWxtmAmount(processedValue);
        setLastUpdatedField(field);
        debounceCalc();
    };

    const handleToggleUiDirection = useCallback(() => {
        setSwapEngineDirection(direction === 'toXtm' ? 'fromXtm' : 'toXtm');
        setLastUpdatedField('ethTokenField');
        clearCalculatedDetails();
        debounceCalc();
    }, [direction, setSwapEngineDirection, clearCalculatedDetails, debounceCalc]);

    const handleConfirm = async (params?: SwapExecutionProps) => {
        setTransactionId(null);
        setPaidTransactionFee(null);
        setTxBlockHash(null);
        setUiError(null);

        if (!tradeDetails || !tradeDetails.inputAmount || !tradeDetails.outputAmount || !tradeDetails.inputToken) {
            setUiError('Trade details are missing. Please try again.');
            return;
        }

        const inputAmountToExecute = BigInt(tradeDetails.inputAmount.quotient.toString());
        if (!inputAmountToExecute || inputAmountToExecute <= 0n) {
            setUiError('Input amount is invalid. Please try again.');
            return;
        }

        try {
            const swapResult = await executeSwap({ tradeDetails, ...params });

            if (!swapResult || !swapResult.receipt) {
                return;
            }

            if (swapResult.receipt.status !== 1) {
                setUiError(`Transaction ${swapResult.response.hash} failed on-chain.`);
                return;
            }

            setTransactionId(swapResult.response.hash);
            setTxBlockHash(swapResult.receipt.blockHash as `0x${string}`);

            if (swapResult?.actualFeeWei && connectedAccount.chain) {
                const feeInEth = ethers.formatEther(swapResult.actualFeeWei);
                console.log('Parsed Fee:', feeInEth);
                setPaidTransactionFee(feeInEth);
            }

            setEthTokenAmount('');
            setWxtmAmount('');
            clearCalculatedDetails(); // Clear quote details too

            setTimeout(() => {
                handleRefetchBalances();
            }, 3000);
        } catch (e: any) {
            console.error('Error in handleConfirm:', e);
            setUiError('An error occurred during the swap process.');
        }
    };

    const transactionForDisplay: SwapTransaction = useMemo(
        () => ({
            amount: formatNumberWithCommas(direction === 'toXtm' ? ethTokenAmount : wxtmAmount),
            targetAmount: formatNumberWithCommas(direction === 'toXtm' ? wxtmAmount : ethTokenAmount),
            direction: direction,
            slippage,
            networkFee,
            priceImpact,
            destinationAddress: connectedAccount.address,
            minimumReceived: null,//  minimumReceivedDisplay,
            executionPrice: executionPriceDisplay,
            transactionId,
            txBlockHash,
            paidTransactionFeeApproval: null,
            paidTransactionFeeSwap: paidTransactionFee,
        }),
        [direction, ethTokenAmount, wxtmAmount, slippage, networkFee, priceImpact, connectedAccount.address, executionPriceDisplay, transactionId, txBlockHash, paidTransactionFee]
    );

    const handleSelectFromToken = useCallback(
        (selectedToken: SelectableTokenInfo) => {
            setPairTokenAddress(selectedToken.address);
            setEthTokenAmount('1');
            setWxtmAmount('');
            setLastUpdatedField('ethTokenField');
            setTokenSelectOpen(false);
            clearCalculatedDetails();
            debounceCalc();
        },
        [setPairTokenAddress, clearCalculatedDetails, debounceCalc]
    );

    const combinedError = uiError || swapEngineError;

    return {
        notEnoughBalance,
        ethTokenDisplay,
        xtmTokenDisplay,
        isLoading: isCalculatingQuote,
        ethTokenAmount,
        wxtmAmount,
        uiDirection: direction,
        handleConfirm,
        transaction: transactionForDisplay,
        error: combinedError,
        handleSelectFromToken,
        selectableFromTokens,
        tokenSelectOpen,
        setTokenSelectOpen,
        handleToggleUiDirection,
        clearCalculatedDetails,
        insufficientLiquidity: insufficientLiquidityFromHook,
        handleRefetchBalances,
        lastUpdatedField,
        addLiquidityV3,
        ethUsdPrice,
        setFromAmount: (val: string) => handleNumberInput(val, 'ethTokenField'),
        setTargetAmount: (val: string) => handleNumberInput(val, 'wxtmField'),
    };
};
