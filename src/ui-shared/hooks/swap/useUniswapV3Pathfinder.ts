/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token, WETH9, CurrencyAmount, NativeCurrency, Price, Percent } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
import { usePublicClient } from 'wagmi';
import { PublicClient as ViemPublicClient, zeroAddress, encodeFunctionData, encodePacked } from 'viem'; // Added encodeFunctionData, encodePacked
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
    V3_SWAP_ROUTER_ADDRESS as
        SWAP_ROUTER_ADDRESSES,
    swapRouter02AbiJson,
} from './lib/constants';
import { V3TradeDetails, SwapField, TradeLeg } from './lib/types';

interface UseUniswapV3PathfinderArgs {
    currentChainId: number | undefined;
    uiToken0: Token | NativeCurrency | undefined;
    uiToken1: Token | NativeCurrency | undefined;
    userAccountAddress?: `0x${string}`; // Optional: pass user's address for more accurate gas estimate 'from'
}

interface PathfinderResult {
    tradeDetails: V3TradeDetails | null;
    error: string | null;
    isLoading: boolean;
}

const emptyPathfinderReturn: PathfinderResult = { tradeDetails: null, error: null, isLoading: false };
const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(1), JSBI.BigInt(1));

export const useUniswapV3Pathfinder = ({ currentChainId, uiToken0, uiToken1, userAccountAddress }: UseUniswapV3PathfinderArgs) => {
    const publicClient = usePublicClient({ chainId: currentChainId }) as ViemPublicClient;

    const v3QuoterAddress = useMemo(
        () => (currentChainId ? QUOTER_ADDRESSES_V3[currentChainId as keyof typeof QUOTER_ADDRESSES_V3] : undefined),
        [currentChainId]
    );
    const v3FactoryAddress = useMemo(
        () => (currentChainId ? FACTORY_ADDRESSES_V3[currentChainId as keyof typeof FACTORY_ADDRESSES_V3] : undefined),
        [currentChainId]
    );
    const swapRouterAddress = useMemo(
        () => (currentChainId ? SWAP_ROUTER_ADDRESSES[currentChainId as keyof typeof SWAP_ROUTER_ADDRESSES] : undefined),
        [currentChainId]
    );
    const xtmToken = useMemo(() => (currentChainId ? XTM_SDK_TOKEN[currentChainId as keyof typeof XTM_SDK_TOKEN] : undefined), [currentChainId]);
    const usdtToken = useMemo(() => (currentChainId ? USDT_SDK_TOKEN[currentChainId as keyof typeof USDT_SDK_TOKEN] : undefined), [currentChainId]);

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
            signal?: AbortSignal
        ): Promise<{
            outputAmount?: CurrencyAmount<Token>;
            inputAmount?: CurrencyAmount<Token>;
            gasEstimate: bigint; // This is Quoter's gas estimate, used as fallback
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
                            args: [{ tokenIn: tIn.address as `0x${string}`, tokenOut: tOut.address as `0x${string}`, amountIn: amountForLeg.quotient, fee, sqrtPriceLimitX96: 0n, }],
                        })) as [bigint, bigint, bigint, bigint]; // amountOut, sqrtPriceX96After, initializedTicksCrossed, gasEstimate
                        if (quoteResult[0] > 0n) {
                            return { outputAmount: CurrencyAmount.fromRawAmount(tOut, quoteResult[0].toString()), gasEstimate: quoteResult[3], poolAddress: poolAddr };
                        }
                    } else { // isExactOutputLeg
                        const quoteResult = (await publicClient.readContract({
                            address: v3QuoterAddress,
                            abi: uniswapV3QuoterV2Abi,
                            functionName: 'quoteExactOutputSingle',
                            args: [{ tokenIn: tIn.address as `0x${string}`, tokenOut: tOut.address as `0x${string}`, amount: amountForLeg.quotient, fee, sqrtPriceLimitX96: 0n, }],
                        })) as [bigint, bigint, bigint, bigint]; // amountIn, sqrtPriceX96After, initializedTicksCrossed, gasEstimate
                        if (quoteResult[0] > 0n) {
                            return { inputAmount: CurrencyAmount.fromRawAmount(tIn, quoteResult[0].toString()), gasEstimate: quoteResult[3], poolAddress: poolAddr };
                        }
                    }
                }
            } catch {
                if (signal?.aborted) throw new Error('Aborted');
            }
            return null;
        },
        [publicClient, v3FactoryAddress, v3QuoterAddress]
    );

    const findAndQuoteSingleLeg = useCallback(
        async (
            tIn: Token,
            tOut: Token,
            amountForLeg: CurrencyAmount<Token>,
            isExactInputLeg: boolean,
            signal?: AbortSignal
        ): Promise<{
            outputAmount?: CurrencyAmount<Token>;
            inputAmount?: CurrencyAmount<Token>;
            fee: FeeAmount;
            gasEstimate: bigint; // Quoter's gas estimate
            poolAddress: `0x${string}`;
        } | null> => {
            const feeTiersToTry = [FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.LOWEST, FeeAmount.HIGH];
            for (const fee of feeTiersToTry) {
                if (signal?.aborted) throw new Error('Aborted');
                const result = await quoteSingleLegWithSpecificFee(tIn, tOut, amountForLeg, fee, isExactInputLeg, signal);
                if (result) {
                    return { ...result, fee };
                }
            }
            return null;
        },
        [quoteSingleLegWithSpecificFee]
    );

    const getBestTradeForAmount = useCallback(
        async (amountRaw: string, amountType: SwapField, signal?: AbortSignal): Promise<PathfinderResult> => {
            try {
                if (
                    !currentChainId || !uiToken0 || !uiToken1 || !wethToken || !xtmToken || !usdtToken || !publicClient || !swapRouterAddress
                ) {
                    return { ...emptyPathfinderReturn, error: 'Configuration error (tokens, client, or router address missing).' };
                }
                if (!/^\d+$/.test(amountRaw) || BigInt(amountRaw) <= 0n) {
                    return { ...emptyPathfinderReturn, error: 'Invalid or zero amount.' };
                }

                const actualTradeInputToken = uiToken0;
                const actualTradeOutputToken = uiToken1;
                const initialLogicToken = actualTradeInputToken.isNative ? wethToken : (actualTradeInputToken as Token);
                const finalLogicToken = actualTradeOutputToken.isNative ? wethToken : (actualTradeOutputToken as Token);

                if (initialLogicToken.equals(finalLogicToken)) {
                    return { ...emptyPathfinderReturn, error: 'Pathfinder: Input and output tokens are the same.' };
                }

                let amountInToQuote: CurrencyAmount<Token> | undefined;
                let amountOutToQuote: CurrencyAmount<Token> | undefined;
                const toXtm = uiToken1.name === XTM_SDK_TOKEN[currentChainId as keyof typeof XTM_SDK_TOKEN]?.name;
                const isExactInputTrade = (toXtm && amountType === 'ethTokenField') || (!toXtm && amountType === 'wxtmField');

                if (isExactInputTrade) { // Exact Input trade
                    amountInToQuote = CurrencyAmount.fromRawAmount(initialLogicToken, amountRaw);
                } else { // Exact Output trade
                    amountOutToQuote = CurrencyAmount.fromRawAmount(finalLogicToken, amountRaw);
                }


                const commonIntermediaries = [wethToken, usdtToken].filter(
                    (token) => token && !token.equals(initialLogicToken) && !token.equals(finalLogicToken)
                );
                const possiblePathsTokens: Token[][] = [[initialLogicToken, finalLogicToken]];
                for (const intermediary of commonIntermediaries) {
                    if (intermediary) possiblePathsTokens.push([initialLogicToken, intermediary, finalLogicToken]);
                }

                let bestTradePath: TradeLeg[] = [];
                let bestCalculatedInputAmount: CurrencyAmount<Token> | undefined;
                let bestCalculatedOutputAmount: CurrencyAmount<Token> | undefined;
                let bestQuoterTotalGasEstimate = 0n; // Sum of Quoter's gas estimates, as a fallback

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
                            const quote = await findAndQuoteSingleLeg(legInToken, legOutToken, nextLegInputAmount, true, signal);
                            if (!quote || !quote.outputAmount || JSBI.equal(quote.outputAmount.quotient, JSBI.BigInt(0))) {
                                pathIsPossible = false; break;
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
                            const quote = await findAndQuoteSingleLeg(legInToken, legOutToken, prevLegOutputAmount, false, signal);
                            if (!quote || !quote.inputAmount || JSBI.equal(quote.inputAmount.quotient, JSBI.BigInt(0))) {
                                pathIsPossible = false; break;
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
                            if (!bestCalculatedOutputAmount || currentPathOutputAmount.greaterThan(bestCalculatedOutputAmount)) {
                                bestCalculatedOutputAmount = currentPathOutputAmount; bestCalculatedInputAmount = currentPathInputAmount; bestTradePath = currentTradeLegs; bestQuoterTotalGasEstimate = currentPathQuoterGas;
                            }
                        } else {
                            if (!bestCalculatedInputAmount || currentPathInputAmount.lessThan(bestCalculatedInputAmount)) {
                                bestCalculatedInputAmount = currentPathInputAmount; bestCalculatedOutputAmount = currentPathOutputAmount; bestTradePath = currentTradeLegs; bestQuoterTotalGasEstimate = currentPathQuoterGas;
                            }
                        }
                    }
                }

                if (signal?.aborted) throw new Error('Aborted');
                if (bestTradePath.length === 0 || !bestCalculatedInputAmount || !bestCalculatedOutputAmount || JSBI.equal(bestCalculatedOutputAmount.quotient, JSBI.BigInt(0))) {
                    return { ...emptyPathfinderReturn, error: 'Failed to find a valid trade path.' };
                }

                const finalDisplayInputAmount = CurrencyAmount.fromRawAmount(actualTradeInputToken, bestCalculatedInputAmount.quotient);
                const finalDisplayOutputAmount = CurrencyAmount.fromRawAmount(actualTradeOutputToken, bestCalculatedOutputAmount.quotient);
                const executionPriceForDisplay = new Price(finalDisplayInputAmount.currency, finalDisplayOutputAmount.currency, finalDisplayInputAmount.quotient, finalDisplayOutputAmount.quotient);
                const slippageAdjustedPercent = ONE_HUNDRED_PERCENT.subtract(SLIPPAGE_TOLERANCE_PERCENT);
                const minimumReceivedRaw = bestCalculatedOutputAmount.multiply(slippageAdjustedPercent).quotient;
                const minimumReceived = CurrencyAmount.fromRawAmount(finalDisplayOutputAmount.currency, minimumReceivedRaw);
                const slippagePercentValue = (JSBI.toNumber(SLIPPAGE_TOLERANCE_PERCENT.numerator) * 100) / JSBI.toNumber(SLIPPAGE_TOLERANCE_PERCENT.denominator);

                // --- Accurate Gas Estimation using estimateGas ---
                let simulatedGasEstimate: bigint | null = null;
                if (swapRouterAddress && publicClient && swapRouter02AbiJson) {
                    try {
                        const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20); // 20 minutes
                        const recipient = userAccountAddress || zeroAddress; // Use provided user address or zeroAddress for estimation

                        let transactionData: `0x${string}` | undefined;
                        let valueToSend: bigint = 0n;

                        if (actualTradeInputToken.isNative) {
                            valueToSend = BigInt(bestCalculatedInputAmount.quotient.toString());
                        }

                        if (bestTradePath.length === 1) { // Single-hop
                            const leg = bestTradePath[0];
                            if (isExactInputTrade) {
                                transactionData = encodeFunctionData({
                                    abi: swapRouter02AbiJson, functionName: 'exactInputSingle',
                                    args: [{
                                        tokenIn: leg.tokenIn.address as `0x${string}`, tokenOut: leg.tokenOut.address as `0x${string}`, fee: leg.fee,
                                        recipient, deadline, amountIn: bestCalculatedInputAmount.quotient, amountOutMinimum: minimumReceived.quotient, sqrtPriceLimitX96: 0n,
                                    }],
                                });
                            } else { // Exact output single
                                transactionData = encodeFunctionData({
                                    abi: swapRouter02AbiJson, functionName: 'exactOutputSingle',
                                    args: [{
                                        tokenIn: leg.tokenIn.address as `0x${string}`, tokenOut: leg.tokenOut.address as `0x${string}`, fee: leg.fee,
                                        recipient, deadline, amountOut: bestCalculatedOutputAmount.quotient, amountInMaximum: bestCalculatedInputAmount.quotient, sqrtPriceLimitX96: 0n,
                                    }],
                                });
                            }
                        } else { // Multi-hop
                            const pathTokens: `0x${string}`[] = [bestTradePath[0].tokenIn.address as `0x${string}`];
                            const pathFees: number[] = [];
                            bestTradePath.forEach(leg => {
                                pathTokens.push(leg.tokenOut.address as `0x${string}`);
                                pathFees.push(leg.fee);
                            });

                            const pathComponents: any[] = [];
                            const types: string[] = [];
                            pathComponents.push(pathTokens[0]);
                            types.push('address');
                            for (let i = 0; i < pathFees.length; i++) {
                                pathComponents.push(pathFees[i]);
                                types.push('uint24');
                                pathComponents.push(pathTokens[i + 1]);
                                types.push('address');
                            }
                            const encodedPath = encodePacked(types, pathComponents);

                            if (isExactInputTrade) {
                                transactionData = encodeFunctionData({
                                    abi: swapRouter02AbiJson, functionName: 'exactInput',
                                    args: [{ path: encodedPath, recipient, deadline, amountIn: bestCalculatedInputAmount.quotient, amountOutMinimum: minimumReceived.quotient }],
                                });
                            } else { // Exact output multi-hop
                                transactionData = encodeFunctionData({
                                    abi: swapRouter02AbiJson, functionName: 'exactOutput',
                                    args: [{ path: encodedPath, recipient, deadline, amountOut: bestCalculatedOutputAmount.quotient, amountInMaximum: bestCalculatedInputAmount.quotient }],
                                });
                            }
                        }

                        if (transactionData) {
                            const estimationAccount = userAccountAddress || zeroAddress;
                            simulatedGasEstimate = await publicClient.estimateGas({
                                account: estimationAccount, to: swapRouterAddress, data: transactionData, value: valueToSend,
                            });
                        }
                    } catch (e: any) {
                        console.warn("Failed to simulate transaction for gas estimation:", e.message);
                        // Fallback to quoter's estimate if simulation fails
                    }
                }
                // --- End Accurate Gas Estimation ---

                const finalEstimatedGasFeeNativeStr = simulatedGasEstimate
                    ? simulatedGasEstimate.toString()
                    : (bestQuoterTotalGasEstimate > 0n ? bestQuoterTotalGasEstimate.toString() : null);

                const tradeDetails: V3TradeDetails = {
                    inputToken: actualTradeInputToken, outputToken: actualTradeOutputToken,
                    inputAmount: finalDisplayInputAmount, outputAmount: finalDisplayOutputAmount,
                    minimumReceived, executionPrice: executionPriceForDisplay, priceImpactPercent: null,
                    estimatedGasFeeNative: finalEstimatedGasFeeNativeStr,
                    slippageTolerancePercent: `${slippagePercentValue.toFixed(2)}%`, path: bestTradePath,
                };
                return { tradeDetails, error: null, isLoading: false };
            } catch (e: any) {
                if (signal?.aborted) return { ...emptyPathfinderReturn, isLoading: false };
                console.error("Error in getBestTradeForAmount:", e);
                return { ...emptyPathfinderReturn, error: e.message || 'Failed to get trade details.', isLoading: false };
            }
        },
        [currentChainId, uiToken0, uiToken1, wethToken, xtmToken, usdtToken, findAndQuoteSingleLeg, publicClient, swapRouterAddress, userAccountAddress]
    );

    return { getBestTradeForAmount };
};
