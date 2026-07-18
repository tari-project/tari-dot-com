import { useState, useEffect, useMemo, useCallback } from 'react';
import { useBalance, useReadContract } from 'wagmi';
import { Ether, NativeCurrency, Token } from '@uniswap/sdk-core';
import { erc20Abi, formatUnits } from 'viem';
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
    const definition = uiTokenDefinition || fallbackDefinition;
    const isNative = definition?.isNative ?? true;
    const tokenAddress = definition && 'address' in definition ? (definition.address as `0x${string}`) : undefined;

    const {
        data: nativeBalanceData,
        isLoading: isLoadingNativeBalance,
        refetch: refetchNativeBalance,
    } = useBalance({
        address: accountAddress,
        chainId: chainId,
        query: { enabled: Boolean(accountAddress && isNative) },
    });

    const {
        data: tokenBalance,
        isLoading: isLoadingTokenBalance,
        refetch: refetchTokenBalance,
    } = useReadContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: accountAddress ? [accountAddress] : undefined,
        chainId,
        query: { enabled: Boolean(accountAddress && tokenAddress) },
    });

    const rawBalanceData = useMemo(() => {
        if (isNative) return nativeBalanceData;
        if (tokenBalance === undefined) return undefined;

        return {
            value: tokenBalance,
            decimals: definition?.decimals || 18,
            symbol: definition?.symbol || '',
        };
    }, [definition?.decimals, definition?.symbol, isNative, nativeBalanceData, tokenBalance]);

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
        const pricePromise = fetchPrice(); // Re-trigger price fetch
        const balancePromise = isNative ? refetchNativeBalance() : refetchTokenBalance();
        await Promise.all([pricePromise, balancePromise]);
    }, [fetchPrice, isNative, refetchNativeBalance, refetchTokenBalance]);

    return {
        tokenDisplayInfo,
        isLoading: (isNative ? isLoadingNativeBalance : isLoadingTokenBalance) || isFetchingPrice,
        refetch,
        rawBalanceData,
        tokenPrice,
    };
}
