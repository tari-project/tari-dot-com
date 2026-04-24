import { useState, useEffect, useMemo, useCallback } from 'react';
import { useBalance, useReadContract } from 'wagmi';
import { Ether, NativeCurrency, Token } from '@uniswap/sdk-core';
import { formatUnits, erc20Abi } from 'viem';
import { TokenSymbol } from '../useSwapData';
import { XTM_SDK_TOKEN } from '@/ui-shared/hooks/swap/lib/constants';
import { fetchTokenPriceUSD, formatDisplayBalanceForSelectable } from '@/ui-shared/hooks/swap/lib/utils';

export interface SelectableTokenInfo {
    label: string;
    symbol: TokenSymbol;
    address: `0x${string}` | null;
    iconSymbol: string;
    definition: Token | NativeCurrency;
    balance: string;
    rawBalance?: bigint;
    decimals: number;
    pricePerTokenUSD?: number;
    usdValue?: string;
}

interface UseTokenDisplayInfoProps {
    uiTokenDefinition?: Token | NativeCurrency;
    chainId?: number;
    accountAddress?: `0x${string}`;
    fallbackDefinition?: Token | NativeCurrency;
}

export function useTokenDisplayInfo({
    uiTokenDefinition,
    chainId,
    accountAddress,
    fallbackDefinition,
}: UseTokenDisplayInfoProps) {
    const [tokenPrice, setTokenPrice] = useState<number | undefined>();
    const [isFetchingPrice, setIsFetchingPrice] = useState<boolean>(false);

    const isNative = uiTokenDefinition?.isNative ?? false;
    const tokenAddress = isNative ? undefined : ((uiTokenDefinition as Token | undefined)?.address as `0x${string}` | undefined);

    const {
        data: nativeBalanceData,
        isLoading: isLoadingNativeBalance,
        refetch: refetchNativeBalance,
    } = useBalance({
        address: isNative ? accountAddress : undefined,
        chainId: chainId,
    });

    const {
        data: erc20BalanceData,
        isLoading: isLoadingErc20Balance,
        refetch: refetchErc20Balance,
    } = useReadContract({
        address: !isNative ? tokenAddress : undefined,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: accountAddress ? [accountAddress] : undefined,
        chainId: chainId,
        query: { enabled: !isNative && !!tokenAddress && !!accountAddress },
    });

    const rawBalanceData = useMemo(() => {
        if (isNative) {
            return nativeBalanceData
                ? { value: nativeBalanceData.value, decimals: nativeBalanceData.decimals, symbol: nativeBalanceData.symbol }
                : undefined;
        }
        if (erc20BalanceData !== undefined) {
            return { value: erc20BalanceData as bigint, decimals: uiTokenDefinition?.decimals || 18, symbol: uiTokenDefinition?.symbol };
        }
        return undefined;
    }, [isNative, nativeBalanceData, erc20BalanceData, uiTokenDefinition]);

    const isLoadingBalance = isNative ? isLoadingNativeBalance : isLoadingErc20Balance;

    const fetchPrice = useCallback(async () => {
        if (uiTokenDefinition?.symbol && chainId) {
            setIsFetchingPrice(true);
            try {
                const price = await fetchTokenPriceUSD(uiTokenDefinition.symbol);
                setTokenPrice(price);
            } catch (error) {
                console.error('Failed to fetch token price:', error);
                setTokenPrice(undefined); // Or handle error state
            } finally {
                setIsFetchingPrice(false);
            }
        } else {
            setTokenPrice(undefined);
        }
    }, [uiTokenDefinition, chainId]);

    useEffect(() => {
        fetchPrice();
    }, [fetchPrice]);

    const tokenDisplayInfo = useMemo((): SelectableTokenInfo | undefined => {
        if (!chainId) return undefined; // Guard against undefined chainId for fallback

        const def = uiTokenDefinition;
        const balData = rawBalanceData;

        // Determine decimals: prefer definition, then balance data, then default
        const decimals = def?.decimals || balData?.decimals || 18;

        const displaySymbol =
            def?.symbol ||
            balData?.symbol ||
            (fallbackDefinition && 'symbol' in fallbackDefinition ? fallbackDefinition.symbol : 'ETH') ||
            '';

        const balance = formatDisplayBalanceForSelectable(balData?.value, decimals, displaySymbol);

        let usdValStr: string | undefined;
        if (balData?.value !== undefined && tokenPrice !== undefined) {
            const numBal = parseFloat(formatUnits(balData.value, decimals));
            usdValStr = `$${(numBal * tokenPrice).toFixed(2)}`;
        }

        const effectiveDefinition =
            def ||
            fallbackDefinition ||
            (chainId ? Ether.onChain(chainId) : undefined) ||
            XTM_SDK_TOKEN[chainId as keyof typeof XTM_SDK_TOKEN];

        return {
            label:
                def?.name ||
                def?.symbol ||
                ((fallbackDefinition && 'name' in fallbackDefinition ? fallbackDefinition.name : 'Token') as string),
            symbol: displaySymbol.toUpperCase() as TokenSymbol,
            address: def?.isNative ? null : (def?.address as `0x${string}`) || null,
            iconSymbol: def?.symbol?.toLowerCase() || '',
            definition: effectiveDefinition as Token | NativeCurrency,
            balance,
            rawBalance: balData?.value,
            decimals,
            pricePerTokenUSD: tokenPrice,
            usdValue: usdValStr,
        };
    }, [rawBalanceData, uiTokenDefinition, chainId, tokenPrice, fallbackDefinition]);

    const refetch = useCallback(async () => {
        const pricePromise = fetchPrice();
        const balancePromise = isNative ? refetchNativeBalance() : refetchErc20Balance();
        await Promise.all([pricePromise, balancePromise]);
    }, [fetchPrice, isNative, refetchNativeBalance, refetchErc20Balance]);

    return {
        tokenDisplayInfo,
        isLoading: isLoadingBalance || isFetchingPrice,
        refetch,
        rawBalanceData,
        tokenPrice,
    };
}
