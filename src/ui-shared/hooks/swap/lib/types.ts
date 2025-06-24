import { Token, CurrencyAmount, Price, NativeCurrency, TradeType } from '@uniswap/sdk-core';
import { FeeAmount, Trade } from '@uniswap/v3-sdk';

export interface V3TradeDetails {
    // For QuoterV2 based approach:
    inputToken?: Token | NativeCurrency;
    outputToken?: Token | NativeCurrency;
    inputAmount?: CurrencyAmount<Token | NativeCurrency>;
    outputAmount?: CurrencyAmount<Token | NativeCurrency>; // Quoted output amount

    estimatedGasFeeNative?: string | null;
    estimatedGasFeeUSD?: string | null; // If you calculate this

    // V3 specific details you might get or calculate:
    // sqrtPriceX96After?: bigint;
    // initializedTicksCrossed?: number;

    // Simplified details for UI:
    minimumReceived?: CurrencyAmount<Token | NativeCurrency> | null;
    executionPrice?: Price<Token | NativeCurrency, Token | NativeCurrency> | null;
    priceImpactPercent?: string | null; // Harder to calculate accurately with QuoterV2 alone
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path?: any;
    sdkTrade?: Trade<Token, Token, TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT> | null;
    midPrice?: Price<Token | NativeCurrency, Token | NativeCurrency> | null;
    slippageTolerancePercent?: string; // Added field for slippage tolerance

    transactionRequest?: {
        // This is the crucial part
        to: `0x${string}`;
        data: `0x${string}`;
        value?: bigint;
    };
}

export type SwapField = 'ethTokenField' | 'wxtmField';
export type SwapDirection = 'fromXtm' | 'toXtm';

export interface SwapTransaction {
    amount: string;
    targetAmount: string;
    direction: SwapDirection;
    slippage?: string | null;
    networkFee?: string | null;
    priceImpact?: string | null;
    minimumReceived?: string | null;
    executionPrice?: string | null;
    transactionId?: string | null;
    paidTransactionFeeApproval?: string | null;
    paidTransactionFeeSwap?: string | null;
    txBlockHash?: `0x${string}` | null;
}

export interface TradeLeg {
    tokenIn: Token;
    tokenOut: Token;
    fee: FeeAmount;
}

export type SendStatus = 'fields' | 'reviewing' | 'processing' | 'completed';
