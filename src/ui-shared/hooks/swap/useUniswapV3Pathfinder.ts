/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token, WETH9, CurrencyAmount, NativeCurrency, Price, Percent } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
import { usePublicClient } from 'wagmi';
import { PublicClient as ViemPublicClient, zeroAddress } from 'viem';
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
} from './lib/constants';
import { V3TradeDetails, SwapField, TradeLeg } from './lib/types';

interface UseUniswapV3PathfinderArgs {
    currentChainId: number | undefined;
    uiToken0: Token | NativeCurrency | undefined;
    uiToken1: Token | NativeCurrency | undefined;
}

interface PathfinderResult {
    tradeDetails: V3TradeDetails | null;
    error: string | null;
    isLoading: boolean;
}

const emptyPathfinderReturn: PathfinderResult = { tradeDetails: null, error: null, isLoading: false };
const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(1), JSBI.BigInt(1));
// const ZERO_PERCENT = new Percent(JSBI.BigInt(0), JSBI.BigInt(1));

export const useUniswapV3Pathfinder = ({ currentChainId, uiToken0, uiToken1 }: UseUniswapV3PathfinderArgs) => {
    const publicClient = usePublicClient({ chainId: currentChainId }) as ViemPublicClient;

    const v3QuoterAddress = useMemo(
        () => (currentChainId ? QUOTER_ADDRESSES_V3[currentChainId as keyof typeof QUOTER_ADDRESSES_V3] : undefined),
        [currentChainId]
    );
    const v3FactoryAddress = useMemo(
        () => (currentChainId ? FACTORY_ADDRESSES_V3[currentChainId as keyof typeof FACTORY_ADDRESSES_V3] : undefined),
        [currentChainId]
    );
    const xtmToken = useMemo(() => (currentChainId ? XTM_SDK_TOKEN[currentChainId as keyof typeof XTM_SDK_TOKEN] : undefined), [currentChainId]);
    const usdtToken = useMemo(() => (currentChainId ? USDT_SDK_TOKEN[currentChainId as keyof typeof USDT_SDK_TOKEN] : undefined), [currentChainId]);

    const wethToken = useMemo(() => {
        if (!currentChainId || !WETH9[currentChainId as keyof typeof WETH9]) return undefined;
        return WETH9[currentChainId as keyof typeof WETH9];
    }, [currentChainId]) as Token;

    // Refactored function to quote with a specific fee
    const quoteSingleLegWithSpecificFee = useCallback(
        async (
            tIn: Token,
            tOut: Token,
            amountForLeg: CurrencyAmount<Token>,
            fee: FeeAmount, // Specific fee for this leg
            isExactInputLeg: boolean,
            signal?: AbortSignal
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
                            args: [{ tokenIn: tIn.address as `0x${string}`, tokenOut: tOut.address as `0x${string}`, amountIn: amountForLeg.quotient, fee, sqrtPriceLimitX96: 0n, }],
                        })) as [bigint, bigint, bigint, bigint];
                        if (quoteResult[0] > 0n) {
                            return { outputAmount: CurrencyAmount.fromRawAmount(tOut, quoteResult[0].toString()), gasEstimate: quoteResult[3], poolAddress: poolAddr };
                        }
                    } else { // isExactOutputLeg
                        const quoteResult = (await publicClient.readContract({
                            address: v3QuoterAddress,
                            abi: uniswapV3QuoterV2Abi,
                            functionName: 'quoteExactOutputSingle',
                            args: [{ tokenIn: tIn.address as `0x${string}`, tokenOut: tOut.address as `0x${string}`, amount: amountForLeg.quotient, fee, sqrtPriceLimitX96: 0n, }],
                        })) as [bigint, bigint, bigint, bigint];
                        if (quoteResult[0] > 0n) { // amountIn is quoteResult[0]
                            return { inputAmount: CurrencyAmount.fromRawAmount(tIn, quoteResult[0].toString()), gasEstimate: quoteResult[3], poolAddress: poolAddr };
                        }
                    }
                }
            } catch {
                // console.error("Error in quoteSingleLegWithSpecificFee:", err); // Optional: for deeper debugging
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
            fee: FeeAmount; // Return the fee that worked
            gasEstimate: bigint;
            poolAddress: `0x${string}`;
        } | null> => {
            // This function tries multiple fee tiers
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
        [quoteSingleLegWithSpecificFee] // Depends on the new specific fee quoter
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
                    !publicClient
                ) {
                    return { ...emptyPathfinderReturn, error: 'Invalid or zero amount.' };
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
                const calcAmountOut = toXtm ? amountType === 'wxtmField' : amountType === 'ethTokenField';
                const isExactInputTrade =
                    (toXtm && amountType === 'ethTokenField') || (!toXtm && amountType === 'wxtmField');

                if (calcAmountOut) {
                    if (toXtm) {
                        amountOutToQuote = CurrencyAmount.fromRawAmount((uiToken1 as Token) || wethToken, amountRaw);
                    } else {
                        amountOutToQuote = CurrencyAmount.fromRawAmount(uiToken0 as Token, amountRaw);
                    }
                } else {
                    if (toXtm) {
                        amountInToQuote = CurrencyAmount.fromRawAmount(uiToken0 as Token, amountRaw);
                    } else {
                        amountInToQuote = CurrencyAmount.fromRawAmount((uiToken1 as Token) || wethToken, amountRaw);
                    }
                }

                const commonIntermediaries = [wethToken, usdtToken].filter(
                    (token) => token && !token.equals(initialLogicToken) && !token.equals(finalLogicToken)
                );

                const possiblePathsTokens: Token[][] = [];
                possiblePathsTokens.push([initialLogicToken, finalLogicToken]);

                for (const intermediary of commonIntermediaries) {
                    if (intermediary) {
                        possiblePathsTokens.push([initialLogicToken, intermediary, finalLogicToken]);
                    }
                }

                let bestTradePath: TradeLeg[] = [];
                let bestCalculatedInputAmount: CurrencyAmount<Token> | undefined;
                let bestCalculatedOutputAmount: CurrencyAmount<Token> | undefined;
                let bestTotalGasEstimate = 0n;

                for (const currentPathTokens of possiblePathsTokens) {
                    if (signal?.aborted) throw new Error('Aborted');
                    const currentTradeLegs: TradeLeg[] = [];
                    let currentPathInputAmount: CurrencyAmount<Token> | undefined;
                    let currentPathOutputAmount: CurrencyAmount<Token> | undefined;
                    let currentPathTotalGas = 0n;
                    let pathIsPossible = true;

                    if (isExactInputTrade && amountInToQuote) {
                        currentPathInputAmount = amountInToQuote;
                        let nextLegInputAmount = currentPathInputAmount;

                        for (let i = 0; i < currentPathTokens.length - 1; i++) {
                            const legInToken = currentPathTokens[i];
                            const legOutToken = currentPathTokens[i + 1];
                            const quote = await findAndQuoteSingleLeg( // This now returns the fee used
                                legInToken,
                                legOutToken,
                                nextLegInputAmount,
                                true,
                                signal
                            );

                            if (!quote || !quote.outputAmount || JSBI.equal(quote.outputAmount.quotient, JSBI.BigInt(0))) {
                                pathIsPossible = false;
                                break;
                            }
                            currentTradeLegs.push({ tokenIn: legInToken, tokenOut: legOutToken, fee: quote.fee });
                            nextLegInputAmount = quote.outputAmount;
                            currentPathTotalGas += quote.gasEstimate;
                        }
                        if (pathIsPossible) currentPathOutputAmount = nextLegInputAmount;
                    } else if (!isExactInputTrade && amountOutToQuote) {
                        currentPathOutputAmount = amountOutToQuote;
                        let prevLegOutputAmount = currentPathOutputAmount;

                        for (let i = currentPathTokens.length - 1; i > 0; i--) {
                            const legInToken = currentPathTokens[i - 1];
                            const legOutToken = currentPathTokens[i];
                            const quote = await findAndQuoteSingleLeg( // This now returns the fee used
                                legInToken,
                                legOutToken,
                                prevLegOutputAmount,
                                false,
                                signal
                            );

                            if (!quote || !quote.inputAmount || JSBI.equal(quote.inputAmount.quotient, JSBI.BigInt(0))) {
                                pathIsPossible = false;
                                break;
                            }
                            currentTradeLegs.unshift({ tokenIn: legInToken, tokenOut: legOutToken, fee: quote.fee });
                            prevLegOutputAmount = quote.inputAmount;
                            currentPathTotalGas += quote.gasEstimate;
                        }
                        if (pathIsPossible) currentPathInputAmount = prevLegOutputAmount;
                    } else {
                        pathIsPossible = false;
                    }

                    if (pathIsPossible && currentPathInputAmount && currentPathOutputAmount) {
                        if (isExactInputTrade) {
                            if (!bestCalculatedOutputAmount || currentPathOutputAmount.greaterThan(bestCalculatedOutputAmount)) {
                                bestCalculatedOutputAmount = currentPathOutputAmount;
                                bestCalculatedInputAmount = currentPathInputAmount;
                                bestTradePath = currentTradeLegs;
                                bestTotalGasEstimate = currentPathTotalGas;
                            }
                        } else {
                            if (!bestCalculatedInputAmount || currentPathInputAmount.lessThan(bestCalculatedInputAmount)) {
                                bestCalculatedInputAmount = currentPathInputAmount;
                                bestCalculatedOutputAmount = currentPathOutputAmount;
                                bestTradePath = currentTradeLegs;
                                bestTotalGasEstimate = currentPathTotalGas;
                            }
                        }
                    }
                }

                if (signal?.aborted) throw new Error('Aborted');

                if (bestTradePath.length === 0 || !bestCalculatedInputAmount || !bestCalculatedOutputAmount || JSBI.equal(bestCalculatedOutputAmount.quotient, JSBI.BigInt(0))) {
                    return { ...emptyPathfinderReturn, error: 'Failed to get trade details.' };
                }

                const finalDisplayInputAmount = CurrencyAmount.fromRawAmount(actualTradeInputToken, bestCalculatedInputAmount.quotient);
                const finalDisplayOutputAmount = CurrencyAmount.fromRawAmount(actualTradeOutputToken, bestCalculatedOutputAmount.quotient);
                const executionPriceForDisplay = new Price(finalDisplayInputAmount.currency, finalDisplayOutputAmount.currency, finalDisplayInputAmount.quotient, finalDisplayOutputAmount.quotient);

                const slippageAdjustedPercent = ONE_HUNDRED_PERCENT.subtract(SLIPPAGE_TOLERANCE_PERCENT);
                const minimumReceivedRaw = bestCalculatedOutputAmount.multiply(slippageAdjustedPercent).quotient;
                const minimumReceived = CurrencyAmount.fromRawAmount(finalDisplayOutputAmount.currency, minimumReceivedRaw);
                const estimatedGasFeeNativeStr = bestTotalGasEstimate > 0n ? bestTotalGasEstimate.toString() : null;
                const slippagePercentValue = (JSBI.toNumber(SLIPPAGE_TOLERANCE_PERCENT.numerator) * 100) / JSBI.toNumber(SLIPPAGE_TOLERANCE_PERCENT.denominator);

                // let priceImpactPercentString: string | null = null;
                // if (bestTradePath.length > 0 && publicClient) {
                // Use 1 wei of the initial logic token for market price calculation.
                // Note: This can result in 0 output if the output token has few decimals relative to input token (e.g., WETH -> USDC).
                // const tinyAmountIn = CurrencyAmount.fromRawAmount(initialLogicToken.wrapped, '100000000');
                // let currentMarketAmount: CurrencyAmount<Token> = tinyAmountIn;
                // let marketPathPossible = true;
                //
                // for (const leg of bestTradePath) {
                //     if (signal?.aborted) throw new Error('Aborted');
                //     const marketQuote = await quoteSingleLegWithSpecificFee( // Use specific fee from the best path
                //         leg.tokenIn, // Already a Token
                //         leg.tokenOut, // Already a Token
                //         currentMarketAmount,
                //         leg.fee, // Use the fee determined for this leg in the main trade
                //         true,    // isExactInputLeg = true
                //         signal
                //     );
                //
                //     if (!marketQuote || !marketQuote.outputAmount || JSBI.equal(marketQuote.outputAmount.quotient, JSBI.BigInt(0))) {
                //         marketPathPossible = false;
                //         break;
                //     }
                //     currentMarketAmount = marketQuote.outputAmount;
                // }
                //
                // if (marketPathPossible && JSBI.greaterThan(currentMarketAmount.quotient, JSBI.BigInt(0))) {
                //     const marketOutputAmount = CurrencyAmount.fromRawAmount(finalLogicToken.wrapped, currentMarketAmount.quotient);
                //     const marketPrice = new Price(
                //         initialLogicToken.wrapped,
                //         finalLogicToken.wrapped,
                //         tinyAmountIn.quotient,
                //         marketOutputAmount.quotient
                //     );
                //
                //     const executionPriceAsLogicTokens = new Price(
                //         initialLogicToken.wrapped,
                //         finalLogicToken.wrapped,
                //         bestCalculatedInputAmount.quotient, // From the actual trade
                //         bestCalculatedOutputAmount.quotient // From the actual trade
                //     );
                //
                //     if (JSBI.greaterThan(marketPrice.denominator, JSBI.BigInt(0)) && JSBI.greaterThan(marketPrice.numerator, JSBI.BigInt(0))) {
                //         // Price impact: ((executionPrice / marketPrice) - 1) * 100%
                //         // A negative result means execution price is worse than market price.
                //         const priceImpactFraction = executionPriceAsLogicTokens.divide(marketPrice).subtract(ONE_HUNDRED_PERCENT);
                //
                //         // We want to display it as a positive percentage, e.g., 1.23%
                //         const impactPercent = priceImpactFraction.multiply(new Percent(JSBI.BigInt(100))); // Convert fraction to percentage value
                //         const absoluteImpactPercent = impactPercent.lessThan(ZERO_PERCENT)
                //             ? impactPercent.multiply(new Percent(JSBI.BigInt(-1)))
                //             : impactPercent;
                //
                //         priceImpactPercentString = absoluteImpactPercent.toFixed(2);
                //     }
                // }
                // }

                const tradeDetails: V3TradeDetails = {
                    inputToken: actualTradeInputToken,
                    outputToken: actualTradeOutputToken,
                    inputAmount: finalDisplayInputAmount,
                    outputAmount: finalDisplayOutputAmount,
                    minimumReceived,
                    executionPrice: executionPriceForDisplay,
                    priceImpactPercent: null, //priceImpactPercentString,
                    estimatedGasFeeNative: estimatedGasFeeNativeStr,
                    slippageTolerancePercent: `${slippagePercentValue.toFixed(2)}%`,
                    path: bestTradePath,
                };
                return { tradeDetails, error: null, isLoading: false };
            } catch (e: any) {
                if (signal?.aborted) {
                    return { ...emptyPathfinderReturn, isLoading: false };
                }
                return { ...emptyPathfinderReturn, error: e.message || 'Failed to get trade details.', isLoading: false };
            }
        },
        [currentChainId, uiToken0, uiToken1, wethToken, xtmToken, usdtToken, findAndQuoteSingleLeg, publicClient]
    );

    return { getBestTradeForAmount };
};
