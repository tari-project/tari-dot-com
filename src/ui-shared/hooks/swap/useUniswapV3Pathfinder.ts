/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token, WETH9, CurrencyAmount, NativeCurrency, Price, Percent } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
import { usePublicClient } from 'wagmi';
import { PublicClient as ViemPublicClient, zeroAddress, encodeFunctionData, encodePacked } from 'viem';
import { useCallback, useMemo } from 'react';
import JSBI from 'jsbi';

import {
    uniswapV3QuoterV2Abi,
    QUOTER_ADDRESSES_V3,
    FACTORY_ADDRESSES_V3,
    uniswapV3FactoryAbi,
    USDT_SDK_TOKEN,
    XTM_SDK_TOKEN,
    SLIPPAGE_TOLERANCE_PERCENT,
    V3_SWAP_ROUTER_ADDRESS as SWAP_ROUTER_ADDRESSES,
    swapRouter02AbiJson,
} from './lib/constants';
import { V3TradeDetails, SwapField, TradeLeg } from './lib/types';

interface UseUniswapV3PathfinderArgs {
    currentChainId: number | undefined;
    uiToken0: Token | NativeCurrency | undefined;
    uiToken1: Token | NativeCurrency | undefined;
    userAccountAddress?: `0x${string}`;
}

interface PathfinderResult {
    tradeDetails: V3TradeDetails | null;
    error: string | null;
    isLoading: boolean;
}

const emptyPathfinderReturn: PathfinderResult = { tradeDetails: null, error: null, isLoading: false };
const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(1), JSBI.BigInt(1));

export const useUniswapV3Pathfinder = ({
    currentChainId,
    uiToken0,
    uiToken1,
    userAccountAddress,
}: UseUniswapV3PathfinderArgs) => {
    const publicClient = usePublicClient({ chainId: currentChainId }) as ViemPublicClient;

    const v3QuoterAddress = useMemo(
        () => (currentChainId ? QUOTER_ADDRESSES_V3[currentChainId as keyof typeof QUOTER_ADDRESSES_V3] : undefined),
        [currentChainId],
    );
    const v3FactoryAddress = useMemo(
        () => (currentChainId ? FACTORY_ADDRESSES_V3[currentChainId as keyof typeof FACTORY_ADDRESSES_V3] : undefined),
        [currentChainId],
    );
    const swapRouterAddress = useMemo(
        () =>
            currentChainId ? SWAP_ROUTER_ADDRESSES[currentChainId as keyof typeof SWAP_ROUTER_ADDRESSES] : undefined,
        [currentChainId],
    );
    const xtmToken = useMemo(
        () => (currentChainId ? XTM_SDK_TOKEN[currentChainId as keyof typeof XTM_SDK_TOKEN] : undefined),
        [currentChainId],
    );
    const usdtToken = useMemo(
        () => (currentChainId ? USDT_SDK_TOKEN[currentChainId as keyof typeof USDT_SDK_TOKEN] : undefined),
        [currentChainId],
    );

    const wethToken = useMemo(() => {
        if (!currentChainId || !WETH9[currentChainId as keyof typeof WETH9]) return undefined;
        return WETH9[currentChainId as keyof typeof WETH9];
    }, [currentChainId]) as Token;

    const quoteSingleLegWithSpecificFee = useCallback(
        async (
            tIn: Token,
            tOut: Token,
            amountForLeg: CurrencyAmount<Token>,
            fee: FeeAmount,
            isExactInputLeg: boolean,
            signal?: AbortSignal,
        ): Promise<{
            outputAmount?: CurrencyAmount<Token>;
            inputAmount?: CurrencyAmount<Token>;
            gasEstimate: bigint;
            poolAddress: `0x${string}`;
        } | null> => {
            if (!publicClient || !v3FactoryAddress || !v3QuoterAddress || !tIn || !tOut) return null;
            const [sortedA, sortedB] = tIn.sortsBefore(tOut) ? [tIn, tOut] : [tOut, tIn];

            try {
                if (signal?.aborted) throw new Error('Aborted');
                const poolAddr = (await publicClient.readContract({
                    address: v3FactoryAddress,
                    abi: uniswapV3FactoryAbi,
                    functionName: 'getPool',
                    args: [sortedA.address as `0x${string}`, sortedB.address as `0x${string}`, fee],
                })) as `0x${string}`;

                if (poolAddr && poolAddr.toLowerCase() !== zeroAddress.toLowerCase()) {
                    if (isExactInputLeg) {
                        const quoteResult = (await publicClient.readContract({
                            address: v3QuoterAddress,
                            abi: uniswapV3QuoterV2Abi,
                            functionName: 'quoteExactInputSingle',
                            args: [
                                {
                                    tokenIn: tIn.address as `0x${string}`,
                                    tokenOut: tOut.address as `0x${string}`,
                                    amountIn: amountForLeg.quotient,
                                    fee,
                                    sqrtPriceLimitX96: 0n,
                                },
                            ],
                        })) as [bigint, bigint, bigint, bigint];
                        if (quoteResult[0] > 0n) {
                            return {
                                outputAmount: CurrencyAmount.fromRawAmount(tOut, quoteResult[0].toString()),
                                gasEstimate: quoteResult[3],
                                poolAddress: poolAddr,
                            };
                        }
                    } else {
                        const quoteResult = (await publicClient.readContract({
                            address: v3QuoterAddress,
                            abi: uniswapV3QuoterV2Abi,
                            functionName: 'quoteExactOutputSingle',
                            args: [
                                {
                                    tokenIn: tIn.address as `0x${string}`,
                                    tokenOut: tOut.address as `0x${string}`,
                                    amount: amountForLeg.quotient,
                                    fee,
                                    sqrtPriceLimitX96: 0n,
                                },
                            ],
                        })) as [bigint, bigint, bigint, bigint];
                        if (quoteResult[0] > 0n) {
                            return {
                                inputAmount: CurrencyAmount.fromRawAmount(tIn, quoteResult[0].toString()),
                                gasEstimate: quoteResult[3],
                                poolAddress: poolAddr,
                            };
                        }
                    }
                }
            } catch (e) {
                if (e instanceof Error && e.message.includes('aborted')) throw e;
                // Non-abort errors are caught and return null
            }
            return null;
        },
        [publicClient, v3FactoryAddress, v3QuoterAddress],
    );

    const findAndQuoteSingleLeg = useCallback(
        async (
            tIn: Token,
            tOut: Token,
            amountForLeg: CurrencyAmount<Token>,
            isExactInputLeg: boolean,
            signal?: AbortSignal,
        ): Promise<{
            outputAmount?: CurrencyAmount<Token>;
            inputAmount?: CurrencyAmount<Token>;
            fee: FeeAmount;
            gasEstimate: bigint;
            poolAddress: `0x${string}`;
        } | null> => {
            const feeTiersToTry = [FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.LOWEST, FeeAmount.HIGH];
            for (const fee of feeTiersToTry) {
                if (signal?.aborted) throw new Error('Aborted');
                const result = await quoteSingleLegWithSpecificFee(
                    tIn,
                    tOut,
                    amountForLeg,
                    fee,
                    isExactInputLeg,
                    signal,
                );
                if (result) {
                    return { ...result, fee };
                }
            }
            return null;
        },
        [quoteSingleLegWithSpecificFee],
    );

    const getBestTradeForAmount = useCallback(
        async (amountRaw: string, amountType: SwapField, signal?: AbortSignal): Promise<PathfinderResult> => {
            try {
                if (
                    !currentChainId ||
                    !uiToken0 ||
                    !uiToken1 ||
                    !wethToken ||
                    !xtmToken ||
                    !usdtToken ||
                    !publicClient ||
                    !swapRouterAddress
                ) {
                    return { ...emptyPathfinderReturn, error: 'Error getting trade details' };
                }
                if (!/^\d+$/.test(amountRaw) || BigInt(amountRaw) <= 0n) {
                    return { ...emptyPathfinderReturn, error: 'Invalid or zero amount.' };
                }

                const actualTradeInputToken = uiToken0;
                const actualTradeOutputToken = uiToken1;
                const initialLogicToken = actualTradeInputToken.isNative ? wethToken : (actualTradeInputToken as Token);
                const finalLogicToken = actualTradeOutputToken.isNative ? wethToken : (actualTradeOutputToken as Token);

                if (initialLogicToken.equals(finalLogicToken)) {
                    return { ...emptyPathfinderReturn, error: 'Error getting trade details' };
                }

                let amountInToQuote: CurrencyAmount<Token> | undefined;
                let amountOutToQuote: CurrencyAmount<Token> | undefined;
                const toXtm = uiToken1.name === XTM_SDK_TOKEN[currentChainId as keyof typeof XTM_SDK_TOKEN]?.name; // Assuming XTM is not native
                const isExactInputTrade =
                    (toXtm && amountType === 'ethTokenField') || (!toXtm && amountType === 'wxtmField');

                if (isExactInputTrade) {
                    amountInToQuote = CurrencyAmount.fromRawAmount(initialLogicToken, amountRaw);
                } else {
                    amountOutToQuote = CurrencyAmount.fromRawAmount(finalLogicToken, amountRaw);
                }

                const commonIntermediaries = [wethToken, usdtToken].filter(
                    (token) => token && !token.equals(initialLogicToken) && !token.equals(finalLogicToken),
                );
                const possiblePathsTokens: Token[][] = [[initialLogicToken, finalLogicToken]];
                for (const intermediary of commonIntermediaries) {
                    if (intermediary) possiblePathsTokens.push([initialLogicToken, intermediary, finalLogicToken]);
                }

                let bestTradePath: TradeLeg[] = [];
                let bestCalculatedInputAmount: CurrencyAmount<Token> | undefined;
                let bestCalculatedOutputAmount: CurrencyAmount<Token> | undefined; // This will be for finalLogicToken (e.g. WETH)
                let bestQuoterTotalGasEstimate = 0n;

                for (const currentPathTokens of possiblePathsTokens) {
                    if (signal?.aborted) throw new Error('Aborted');
                    const currentTradeLegs: TradeLeg[] = [];
                    let currentPathInputAmount: CurrencyAmount<Token> | undefined;
                    let currentPathOutputAmount: CurrencyAmount<Token> | undefined;
                    let currentPathQuoterGas = 0n;
                    let pathIsPossible = true;

                    if (isExactInputTrade && amountInToQuote) {
                        currentPathInputAmount = amountInToQuote;
                        let nextLegInputAmount = currentPathInputAmount;
                        for (let i = 0; i < currentPathTokens.length - 1; i++) {
                            const legInToken = currentPathTokens[i];
                            const legOutToken = currentPathTokens[i + 1];
                            const quote = await findAndQuoteSingleLeg(
                                legInToken,
                                legOutToken,
                                nextLegInputAmount,
                                true,
                                signal,
                            );
                            if (
                                !quote ||
                                !quote.outputAmount ||
                                JSBI.equal(quote.outputAmount.quotient, JSBI.BigInt(0))
                            ) {
                                pathIsPossible = false;
                                break;
                            }
                            currentTradeLegs.push({ tokenIn: legInToken, tokenOut: legOutToken, fee: quote.fee });
                            nextLegInputAmount = quote.outputAmount;
                            currentPathQuoterGas += quote.gasEstimate;
                        }
                        if (pathIsPossible) currentPathOutputAmount = nextLegInputAmount;
                    } else if (!isExactInputTrade && amountOutToQuote) {
                        currentPathOutputAmount = amountOutToQuote;
                        let prevLegOutputAmount = currentPathOutputAmount;
                        for (let i = currentPathTokens.length - 1; i > 0; i--) {
                            const legInToken = currentPathTokens[i - 1];
                            const legOutToken = currentPathTokens[i];
                            const quote = await findAndQuoteSingleLeg(
                                legInToken,
                                legOutToken,
                                prevLegOutputAmount,
                                false,
                                signal,
                            );
                            if (
                                !quote ||
                                !quote.inputAmount ||
                                JSBI.equal(quote.inputAmount.quotient, JSBI.BigInt(0))
                            ) {
                                pathIsPossible = false;
                                break;
                            }
                            currentTradeLegs.unshift({ tokenIn: legInToken, tokenOut: legOutToken, fee: quote.fee });
                            prevLegOutputAmount = quote.inputAmount;
                            currentPathQuoterGas += quote.gasEstimate;
                        }
                        if (pathIsPossible) currentPathInputAmount = prevLegOutputAmount;
                    } else {
                        pathIsPossible = false;
                    }

                    if (pathIsPossible && currentPathInputAmount && currentPathOutputAmount) {
                        if (isExactInputTrade) {
                            if (
                                !bestCalculatedOutputAmount ||
                                currentPathOutputAmount.greaterThan(bestCalculatedOutputAmount)
                            ) {
                                bestCalculatedOutputAmount = currentPathOutputAmount;
                                bestCalculatedInputAmount = currentPathInputAmount;
                                bestTradePath = currentTradeLegs;
                                bestQuoterTotalGasEstimate = currentPathQuoterGas;
                            }
                        } else {
                            if (
                                !bestCalculatedInputAmount ||
                                currentPathInputAmount.lessThan(bestCalculatedInputAmount)
                            ) {
                                bestCalculatedInputAmount = currentPathInputAmount;
                                bestCalculatedOutputAmount = currentPathOutputAmount;
                                bestTradePath = currentTradeLegs;
                                bestQuoterTotalGasEstimate = currentPathQuoterGas;
                            }
                        }
                    }
                }

                if (signal?.aborted) throw new Error('Aborted');
                if (
                    bestTradePath.length === 0 ||
                    !bestCalculatedInputAmount ||
                    !bestCalculatedOutputAmount ||
                    JSBI.equal(bestCalculatedOutputAmount.quotient, JSBI.BigInt(0))
                ) {
                    return { ...emptyPathfinderReturn };
                }

                // Amounts for display are in terms of the UI tokens (actualTradeInput/OutputToken)
                const finalDisplayInputAmount = CurrencyAmount.fromRawAmount(
                    actualTradeInputToken,
                    bestCalculatedInputAmount.quotient,
                );
                // bestCalculatedOutputAmount is in terms of finalLogicToken (WETH if output is native ETH)
                // finalDisplayOutputAmount should be in terms of actualTradeOutputToken (Native ETH if selected)
                const finalDisplayOutputAmount = CurrencyAmount.fromRawAmount(
                    actualTradeOutputToken,
                    bestCalculatedOutputAmount.quotient,
                );

                const executionPriceForDisplay = new Price(
                    finalDisplayInputAmount.currency,
                    finalDisplayOutputAmount.currency,
                    finalDisplayInputAmount.quotient,
                    finalDisplayOutputAmount.quotient,
                );
                const slippageAdjustedPercent = ONE_HUNDRED_PERCENT.subtract(SLIPPAGE_TOLERANCE_PERCENT);

                // minimumReceived is the minimum amount of actualTradeOutputToken (e.g. ETH)
                // It's derived from bestCalculatedOutputAmount (WETH) after slippage
                const minimumReceivedRaw = bestCalculatedOutputAmount.multiply(slippageAdjustedPercent).quotient;
                const minimumReceived = CurrencyAmount.fromRawAmount(actualTradeOutputToken, minimumReceivedRaw); // This is correct for display and for unwrapWETH9's amountMinimum

                const slippagePercentValue =
                    (JSBI.toNumber(SLIPPAGE_TOLERANCE_PERCENT.numerator) * 100) /
                    JSBI.toNumber(SLIPPAGE_TOLERANCE_PERCENT.denominator);

                let simulatedGasEstimate: bigint | null = null;

                let transactionData: `0x${string}` | undefined;
                let valueToSend: bigint = 0n;

                if (swapRouterAddress && publicClient && swapRouter02AbiJson) {
                    try {
                        const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20); // 20 minutes
                        const finalUserRecipient = userAccountAddress || zeroAddress; // Final recipient of ETH or Token

                        const commands: `0x${string}`[] = [];
                        let swapCallData: `0x${string}` | undefined;

                        if (actualTradeInputToken.isNative) {
                            valueToSend = BigInt(bestCalculatedInputAmount.quotient.toString());
                        }

                        // Determine recipient for the swap operation
                        // If output is native ETH, router receives WETH to unwrap it. Otherwise, final user receives token.
                        const swapRecipient = actualTradeOutputToken.isNative ? swapRouterAddress : finalUserRecipient;

                        if (bestTradePath.length === 1) {
                            const leg = bestTradePath[0];
                            if (isExactInputTrade) {
                                swapCallData = encodeFunctionData({
                                    abi: swapRouter02AbiJson,
                                    functionName: 'exactInputSingle',
                                    args: [
                                        {
                                            tokenIn: leg?.tokenIn?.address as `0x${string}`,
                                            tokenOut: leg?.tokenOut?.address as `0x${string}`,
                                            fee: leg.fee,
                                            recipient: swapRecipient,
                                            deadline,
                                            amountIn: bestCalculatedInputAmount.quotient,
                                            amountOutMinimum: minimumReceived.quotient, // This is min amount of finalLogicToken (WETH)
                                            sqrtPriceLimitX96: 0n,
                                        },
                                    ],
                                });
                            } else {
                                swapCallData = encodeFunctionData({
                                    abi: swapRouter02AbiJson,
                                    functionName: 'exactOutputSingle',
                                    args: [
                                        {
                                            tokenIn: leg.tokenIn.address as `0x${string}`,
                                            tokenOut: leg.tokenOut.address as `0x${string}`,
                                            fee: leg.fee,
                                            recipient: swapRecipient,
                                            deadline,
                                            amountOut: bestCalculatedOutputAmount.quotient, // This is exact amount of finalLogicToken (WETH)
                                            amountInMaximum: bestCalculatedInputAmount.quotient,
                                            sqrtPriceLimitX96: 0n,
                                        },
                                    ],
                                });
                            }
                        } else {
                            const pathTokens: `0x${string}`[] = [bestTradePath[0].tokenIn.address as `0x${string}`];
                            const pathFees: number[] = [];
                            bestTradePath.forEach((leg) => {
                                pathTokens.push(leg.tokenOut.address as `0x${string}`);
                                pathFees.push(leg.fee);
                            });

                            const types: string[] = ['address'];
                            const pathComponents: any[] = [pathTokens[0]];
                            for (let i = 0; i < pathFees.length; i++) {
                                types.push('uint24');
                                types.push('address');
                                pathComponents.push(pathFees[i]);
                                pathComponents.push(pathTokens[i + 1]);
                            }
                            const encodedPath = encodePacked(types, pathComponents);

                            if (isExactInputTrade) {
                                swapCallData = encodeFunctionData({
                                    abi: swapRouter02AbiJson,
                                    functionName: 'exactInput',
                                    args: [
                                        {
                                            path: encodedPath,
                                            recipient: swapRecipient,
                                            deadline,
                                            amountIn: bestCalculatedInputAmount.quotient,
                                            amountOutMinimum: minimumReceived.quotient, // Min amount of finalLogicToken (WETH)
                                        },
                                    ],
                                });
                            } else {
                                swapCallData = encodeFunctionData({
                                    abi: swapRouter02AbiJson,
                                    functionName: 'exactOutput',
                                    args: [
                                        {
                                            path: encodedPath,
                                            recipient: swapRecipient,
                                            deadline,
                                            amountOut: bestCalculatedOutputAmount.quotient, // Exact amount of finalLogicToken (WETH)
                                            amountInMaximum: bestCalculatedInputAmount.quotient,
                                        },
                                    ],
                                });
                            }
                        }

                        if (swapCallData) {
                            commands.push(swapCallData);
                        }

                        if (actualTradeOutputToken.isNative && commands.length > 0) {
                            if (!userAccountAddress) {
                                console.warn(
                                    'User address not provided for native ETH output, cannot generate unwrapWETH9 call.',
                                );
                                // Potentially throw error or handle as WETH output
                            } else {
                                // Amount for unwrapWETH9 is the amount of WETH expected
                                const amountToUnwrap = isExactInputTrade
                                    ? minimumReceived.quotient
                                    : bestCalculatedOutputAmount.quotient;
                                const unwrapCallData = encodeFunctionData({
                                    abi: swapRouter02AbiJson,
                                    functionName: 'unwrapWETH9',
                                    args: [amountToUnwrap, finalUserRecipient], // amountMinimum (of WETH), recipient (of ETH)
                                });
                                commands.push(unwrapCallData);
                            }
                        }

                        // If input was native ETH and we are doing a multicall,
                        // some routers might require an explicit refundETH if not all msg.value was used by the first payable command.
                        // However, standard routers usually handle this. If issues, add:
                        // if (actualTradeInputToken.isNative && commands.length > 1) {
                        //   commands.push(encodeFunctionData({ abi: swapRouter02AbiJson, functionName: 'refundETH' }));
                        // }

                        if (commands.length === 0) {
                            throw new Error('No transaction commands generated.');
                        } else if (commands.length === 1) {
                            transactionData = commands[0];
                        } else {
                            transactionData = encodeFunctionData({
                                abi: swapRouter02AbiJson,
                                functionName: 'multicall',
                                args: [commands],
                            });
                        }

                        if (transactionData) {
                            const estimationAccount = userAccountAddress || zeroAddress; // For estimation, zeroAddress is fallback
                            simulatedGasEstimate = await publicClient.estimateGas({
                                account: estimationAccount,
                                to: swapRouterAddress,
                                data: transactionData,
                                value: valueToSend,
                            });
                        }
                    } catch (e: any) {
                        console.warn('Failed to build transaction or simulate for gas estimation:', e.message);
                    }
                }

                const finalEstimatedGasFeeNativeStr = simulatedGasEstimate
                    ? simulatedGasEstimate.toString()
                    : bestQuoterTotalGasEstimate > 0n
                      ? bestQuoterTotalGasEstimate.toString()
                      : null;

                const tradeDetails: V3TradeDetails = {
                    inputToken: actualTradeInputToken,
                    outputToken: actualTradeOutputToken,
                    inputAmount: finalDisplayInputAmount,
                    outputAmount: finalDisplayOutputAmount,
                    minimumReceived,
                    executionPrice: executionPriceForDisplay,
                    priceImpactPercent: null,
                    estimatedGasFeeNative: finalEstimatedGasFeeNativeStr,
                    slippageTolerancePercent: `${slippagePercentValue.toFixed(2)}%`,
                    path: bestTradePath,
                    transactionRequest:
                        swapRouterAddress && transactionData
                            ? { to: swapRouterAddress, data: transactionData, value: valueToSend }
                            : undefined,
                };
                return { tradeDetails, error: null, isLoading: false };
            } catch (e: any) {
                if (e instanceof Error && e.message.includes('Aborted')) {
                    return { ...emptyPathfinderReturn, isLoading: false, error: '' };
                }
                console.error('Error in getBestTradeForAmount:', e);
                return { ...emptyPathfinderReturn, error: 'Failed to get trade details.', isLoading: false };
            }
        },
        [
            currentChainId,
            uiToken0,
            uiToken1,
            wethToken,
            xtmToken,
            usdtToken,
            findAndQuoteSingleLeg,
            publicClient,
            swapRouterAddress,
            userAccountAddress,
        ], // Added v3QuoterAddress
    );

    return { getBestTradeForAmount };
};
