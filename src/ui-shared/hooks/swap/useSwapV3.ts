/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token, WETH9, Ether, NativeCurrency, CurrencyAmount, ChainId, Price } from '@uniswap/sdk-core'; // Added Percent, Price
import { encodeSqrtRatioX96, FeeAmount, TickMath } from '@uniswap/v3-sdk';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import {
    Contract,
    Signer as EthersSigner,
    TransactionResponse,
    TransactionReceipt,
    zeroPadValue,
    TransactionRequest as EthersTransactionRequest,
} from 'ethers';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { erc20Abi, parseUnits, PublicClient as ViemPublicClient, zeroAddress } from 'viem';
import {
    QUOTER_ADDRESSES_V3,
    XTM_SDK_TOKEN,
    KNOWN_SDK_TOKENS,
    DEADLINE_MINUTES,
    nonfungiblePositionManagerAbi,
    FACTORY_ADDRESSES_V3,
    uniswapV3FactoryAbi,
    NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
    V3_SWAP_ROUTER_ADDRESS,
} from './lib/constants';
import { walletClientToSigner } from './lib/utils';
import { V3TradeDetails, SwapField, SwapDirection } from './lib/types';
import { useUniswapV3Pathfinder } from './useUniswapV3Pathfinder';
import { sendTransactionWithWagmiSigner, TransactionState } from './lib/providers';

export type SwapExecutionProps = {
    onApproveRequest?: () => void,
    onApproveSuccess?: () => void,
    onFailure?: (message?: string) => void,
    onSuccess?: (txResult: { response?: TransactionResponse; receipt?: TransactionReceipt; status?: TransactionState }) => void,
}

export const useUniswapV3Interactions = () => {
    const [pairTokenAddress, setPairTokenAddress] = useState<`0x${string}` | null>(null);
    const [direction, setDirection] = useState<SwapDirection>('toXtm');
    const [isLoadingHook, setIsLoadingHook] = useState(false);
    const [errorHook, setErrorHook] = useState<string | null>(null);
    const [insufficientLiquidityHook, setInsufficientLiquidityHook] = useState(false);
    const [isApprovingHook, setIsApprovingHook] = useState(false);
    const [isFetchingPoolHook, setIsFetchingPoolHook] = useState(false);

    const { address: accountAddress, isConnected, chain } = useAccount();
    const { data: walletClient } = useWalletClient();

    const defaultChainId = ChainId.MAINNET;
    const currentChainId = useMemo(() => chain?.id || defaultChainId, [chain?.id, defaultChainId]);
    const publicClient = usePublicClient({ chainId: currentChainId }) as ViemPublicClient;

    const quoterAddressV3 = useMemo(
        () => (currentChainId ? QUOTER_ADDRESSES_V3[currentChainId as keyof typeof QUOTER_ADDRESSES_V3] : undefined),
        [currentChainId]
    );

    const v3SwapRouter02Address = useMemo(
        () => (currentChainId ? V3_SWAP_ROUTER_ADDRESS[currentChainId as keyof typeof V3_SWAP_ROUTER_ADDRESS] : undefined),
        [currentChainId]
    );

    const [signer, setSigner] = useState<EthersSigner | null>(null);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (walletClient) {
                const s = await walletClientToSigner(walletClient);
                if (!cancelled) setSigner(s);
            } else if (!cancelled) setSigner(null);
        })();
        return () => {
            cancelled = true;
        };
    }, [walletClient]);

    const [sdkToken0, setSdkToken0] = useState<Token | NativeCurrency | undefined>(Ether.onChain(ChainId.MAINNET));
    const [sdkToken1, setSdkToken1] = useState<Token | NativeCurrency | undefined>(XTM_SDK_TOKEN[ChainId.MAINNET]);

    const handleUpdateSdkTokens = useCallback(
        (pairTokenAddress: string | null, direction: SwapDirection, currentChainId: number | undefined) => {
            const _xtmUiToken = XTM_SDK_TOKEN[currentChainId as keyof typeof XTM_SDK_TOKEN];
            if (!currentChainId) return;
            let _uiInputToken: Token | NativeCurrency | undefined;
            let _uiOutputToken: Token | NativeCurrency | undefined;
            let selectedPairSideTokenForSwapUi: Token | NativeCurrency | undefined;

            if (pairTokenAddress === null) {
                selectedPairSideTokenForSwapUi = Ether.onChain(currentChainId);
            } else {
                const currentWeth = WETH9[currentChainId as keyof typeof WETH9];
                const lowerCaseAddress = pairTokenAddress.toLowerCase() as `0x${string}`;
                if (currentWeth && lowerCaseAddress === currentWeth.address.toLowerCase()) {
                    selectedPairSideTokenForSwapUi = Ether.onChain(currentChainId);
                } else {
                    selectedPairSideTokenForSwapUi = KNOWN_SDK_TOKENS[currentChainId as keyof typeof KNOWN_SDK_TOKENS]?.[
                        lowerCaseAddress
                    ];
                }
            }

            if (direction === 'toXtm') {
                _uiInputToken = selectedPairSideTokenForSwapUi;
                _uiOutputToken = _xtmUiToken;
            } else {
                _uiInputToken = _xtmUiToken;
                _uiOutputToken = selectedPairSideTokenForSwapUi;
            }
            setSdkToken0(_uiInputToken);
            setSdkToken1(_uiOutputToken);
        },
        []
    );

    const handeSetPairTokenAddress = useCallback(
        (pairTokenAddress: string | null) => {
            setPairTokenAddress(pairTokenAddress as `0x${string}` | null);
            handleUpdateSdkTokens(pairTokenAddress, direction, currentChainId);
        },
        [direction, currentChainId, handleUpdateSdkTokens]
    );

    const handleSetDirection = useCallback(
        (direction: SwapDirection) => {
            setDirection(direction);
            handleUpdateSdkTokens(pairTokenAddress, direction, currentChainId);
        },
        [pairTokenAddress, currentChainId, handleUpdateSdkTokens]
    );

    useEffect(() => {
        handleUpdateSdkTokens(pairTokenAddress, direction, currentChainId);
    }, [currentChainId, handleUpdateSdkTokens, pairTokenAddress, direction]);


    const abortController = useRef<AbortController | null>(null);

    useEffect(() => {
        setErrorHook(null);
        setInsufficientLiquidityHook(false);
        if (abortController.current) abortController.current.abort();
    }, [sdkToken0, sdkToken1, pairTokenAddress, direction, currentChainId]);

    const { getBestTradeForAmount: getPathfinderTradeDetails } = useUniswapV3Pathfinder({
        currentChainId,
        uiToken0: sdkToken0,
        uiToken1: sdkToken1,
        userAccountAddress: accountAddress
    });

    const getTradeDetails = useCallback(
        async (amountRaw: string, amountType: SwapField, _signal?: AbortSignal): Promise<V3TradeDetails> => {
            if (abortController.current) abortController.current.abort();
            abortController.current = new AbortController();
            const signal = _signal || abortController.current.signal;

            setIsFetchingPoolHook(true);
            setErrorHook(null);
            setInsufficientLiquidityHook(false);
            const result = await getPathfinderTradeDetails(amountRaw, amountType, signal);
            setIsFetchingPoolHook(false);
            if (result.error) {
                setErrorHook(result.error);
                setInsufficientLiquidityHook(true); // Also set this if error from pathfinder
            }
            const outputAmountQuotient = result.tradeDetails?.outputAmount?.quotient;
            if (!result.error && (outputAmountQuotient === undefined || BigInt(outputAmountQuotient.toString()) === 0n)) {
                setInsufficientLiquidityHook(true);
            }


            const defaultInputCurrency = sdkToken0 || (currentChainId ? Ether.onChain(currentChainId) : undefined);
            const defaultOutputCurrency = sdkToken1 || (currentChainId ? Ether.onChain(currentChainId) : undefined);

            const defaultTrade: V3TradeDetails = {
                inputToken: defaultInputCurrency!,
                outputToken: defaultOutputCurrency!,
                inputAmount: defaultInputCurrency
                    ? CurrencyAmount.fromRawAmount(defaultInputCurrency, '0')
                    : undefined!,
                outputAmount: defaultOutputCurrency
                    ? CurrencyAmount.fromRawAmount(defaultOutputCurrency, '0')
                    : undefined!,
                minimumReceived: defaultOutputCurrency
                    ? CurrencyAmount.fromRawAmount(defaultOutputCurrency, '0')
                    : undefined!,
                executionPrice: new Price(defaultInputCurrency!, defaultOutputCurrency!, 1, 0),
                priceImpactPercent: null,
                estimatedGasFeeNative: null,
                path: [],
            };
            return result.tradeDetails || defaultTrade;
        },
        [getPathfinderTradeDetails, sdkToken0, currentChainId, sdkToken1]
    );

    const approveTokenForV3Router02 = useCallback(
        async (token: Token, amount: bigint, spender: string, onApproveRequest?: () => void, onApproveSuccess?: () => void) => {
            if (!signer || !accountAddress) throw new Error('Wallet not connected for approval');
            setIsApprovingHook(true);
            setErrorHook(null);
            try {
                const currentAllowance = await publicClient.readContract({
                    address: token.address as `0x${string}`,
                    abi: erc20Abi,
                    functionName: 'allowance',
                    args: [accountAddress, spender as `0x${string}`],
                });

                if (BigInt(currentAllowance.toString()) < amount) {
                    onApproveRequest?.();
                    const tokenContract = new Contract(token.address, erc20Abi, signer);
                    const approveTxPopulated = await tokenContract.approve.populateTransaction(spender, amount);
                    const approveResult = await sendTransactionWithWagmiSigner(signer, approveTxPopulated);
                    if (approveResult.state !== TransactionState.Sent || !approveResult.receipt) {
                        throw new Error(`Approval for ${token.symbol} failed or receipt not found.`);
                    }
                }
                setIsApprovingHook(false);
                onApproveSuccess?.();
                return true;
            } catch (e: any) {
                console.error(`Approval error for ${token.symbol}:`, e);
                setErrorHook('Token approval failed. Please try again or check your wallet for details.');
                setIsApprovingHook(false);
                return false;
            }
        },
        [signer, accountAddress, publicClient]
    );

    const executeSwapWithV3Router02 = useCallback(
        async (
            { tradeDetails, onApproveRequest, onApproveSuccess, onSuccess, onFailure }: {
                tradeDetails: V3TradeDetails,
            } & SwapExecutionProps
        ): Promise<{ response: TransactionResponse; receipt: TransactionReceipt } | null> => {
            setErrorHook(null);
            setIsLoadingHook(true);

            const inputCurrency = tradeDetails?.inputAmount?.currency;
            const amountInRaw = tradeDetails?.inputAmount?.quotient;

            if (
                !signer ||
                !accountAddress ||
                !isConnected ||
                !v3SwapRouter02Address ||
                !currentChainId ||
                !inputCurrency ||
                !amountInRaw ||
                !tradeDetails.transactionRequest ||
                !tradeDetails.transactionRequest.to ||
                !tradeDetails.transactionRequest.data
            ) {
                const errorMsg = 'Swap could not start. Invalid trade details or wallet not ready.';
                setErrorHook(errorMsg);
                onFailure?.(errorMsg);
                setIsLoadingHook(false);
                return null;
            }

            const amountInBigInt = BigInt(amountInRaw.toString());

            try {
                if (!inputCurrency.isNative) {
                    const approvalSuccess = await approveTokenForV3Router02(
                        inputCurrency as Token,
                        amountInBigInt,
                        v3SwapRouter02Address, // Approve the router
                        onApproveRequest,
                        onApproveSuccess
                    );
                    if (!approvalSuccess) {
                        setIsLoadingHook(false);
                        onFailure?.('Token approval failed.');
                        return null;
                    }
                }

                const populatedTx: EthersTransactionRequest = {
                    to: tradeDetails.transactionRequest.to,
                    data: tradeDetails.transactionRequest.data,
                    value: tradeDetails.transactionRequest.value || 0n,
                };

                // Optional: Gas estimation for the pre-built transaction
                // try {
                //     const estimatedGas = await signer.estimateGas(populatedTx);
                //     populatedTx.gasLimit = (estimatedGas * 120n) / 100n; // 20% buffer
                // } catch (gasError: any) {
                //     console.warn('[V3SwapRouter02] Gas estimation for pre-built tx failed, using default or letting wallet decide:', gasError.message);
                // }

                const txResult = await sendTransactionWithWagmiSigner(signer, populatedTx);
                console.info('[V3SwapRouter02] Swap response (using pre-built tx):', txResult);
                setIsLoadingHook(false);

                if (txResult.state === TransactionState.Sent && txResult.receipt && txResult.response) {
                    onSuccess?.(txResult);
                    return { response: txResult.response, receipt: txResult.receipt };
                } else {
                    const failureMsg = txResult.receipt ? 'Swap transaction failed on-chain.' : 'Swap transaction submission failed.';
                    onFailure?.(failureMsg);
                    setErrorHook(failureMsg);
                    return null;
                }
            } catch (e: any) {
                console.error('[V3SwapRouter02] Error executing swap:', e);
                const failureMsg = e.message || 'Something went wrong while processing your swap.';
                onFailure?.(failureMsg);
                setErrorHook(failureMsg);
                setIsLoadingHook(false);
                setIsApprovingHook(false);
                return null;
            }
        },
        [signer, accountAddress, isConnected, v3SwapRouter02Address, currentChainId, approveTokenForV3Router02]
    );

    const addLiquidityAndCreatePoolIfNeeded = useCallback(async () => {
        setErrorHook(null);
        setIsLoadingHook(true);
        setIsApprovingHook(false);

        const fee = FeeAmount.LOW;
        const tickSpacing = 10;
        const minTick = Math.ceil(TickMath.MIN_TICK / tickSpacing) * tickSpacing;
        const maxTick = Math.floor(TickMath.MAX_TICK / tickSpacing) * tickSpacing;
        const tickLower = minTick;
        const tickUpper = maxTick;
        const amountUiToken0DesiredStr = '10000';
        const amountUiToken1DesiredStr = '10000000';
        const amountUiToken0MinStr = '10000';
        const amountUiToken1MinStr = '10000';

        const finalRecipient = accountAddress;

        if (!sdkToken0 || !sdkToken1 || !currentChainId || !signer || !accountAddress || !publicClient) {
            setErrorHook('Cannot add liquidity. Please ensure your wallet is connected and all required fields are filled.');
            setIsLoadingHook(false);
            return { state: TransactionState.Failed };
        }

        const nftPositionManagerAddr = currentChainId
            ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[currentChainId as keyof typeof NONFUNGIBLE_POSITION_MANAGER_ADDRESSES]
            : undefined;
        const factoryAddr = currentChainId ? FACTORY_ADDRESSES_V3[currentChainId as keyof typeof FACTORY_ADDRESSES_V3] : undefined;

        if (!nftPositionManagerAddr || !nonfungiblePositionManagerAbi || !factoryAddr || !uniswapV3FactoryAbi) {
            setErrorHook('This network is not supported for liquidity operations. Please switch to a supported network.');
            setIsLoadingHook(false);
            return { state: TransactionState.Failed };
        }

        if (tickLower >= tickUpper) {
            setErrorHook('Invalid price range: the lower tick must be less than the upper tick.');
            setIsLoadingHook(false);
            return { state: TransactionState.Failed };
        }
        if (tickLower % tickSpacing !== 0 || tickUpper % tickSpacing !== 0) {
            setErrorHook(`Invalid price range: ticks must be multiples of ${tickSpacing} for this fee tier.`);
            setIsLoadingHook(false);
            return { state: TransactionState.Failed };
        }

        const nftpmContract = new Contract(nftPositionManagerAddr, nonfungiblePositionManagerAbi, signer);
        let createPoolResponse: TransactionResponse | undefined;
        let createPoolReceipt: TransactionReceipt | undefined;
        let mintResponse: TransactionResponse | undefined;
        let mintReceipt: TransactionReceipt | undefined;
        let nftTokenId: bigint | undefined;

        try {
            const [tokenA_pool, tokenB_pool] = (sdkToken0.wrapped.sortsBefore(sdkToken1.wrapped))
                ? [sdkToken0, sdkToken1]
                : [sdkToken1, sdkToken0];

            const amountADesired_pool = parseUnits(
                tokenA_pool.equals(sdkToken0) ? amountUiToken0DesiredStr : amountUiToken1DesiredStr,
                tokenA_pool.decimals
            );
            const amountBDesired_pool = parseUnits(
                tokenB_pool.equals(sdkToken0) ? amountUiToken0DesiredStr : amountUiToken1DesiredStr,
                tokenB_pool.decimals
            );
            const amountAMin_pool = parseUnits(
                tokenA_pool.equals(sdkToken0) ? amountUiToken0MinStr : amountUiToken1MinStr,
                tokenA_pool.decimals
            );
            const amountBMin_pool = parseUnits(
                tokenB_pool.equals(sdkToken0) ? amountUiToken0MinStr : amountUiToken1MinStr,
                tokenB_pool.decimals
            );

            const poolAddressOnFactory = await publicClient.readContract({
                address: factoryAddr,
                abi: uniswapV3FactoryAbi,
                functionName: 'getPool',
                args: [
                    tokenA_pool.wrapped.address as `0x${string}`,
                    tokenB_pool.wrapped.address as `0x${string}`,
                    fee
                ],
            }) as `0x${string}`;

            if (poolAddressOnFactory === zeroAddress) {
                setIsLoadingHook(true);
                setErrorHook('No pool found for this pair. Creating and initializing a new pool...');

                if (amountADesired_pool === 0n || amountBDesired_pool === 0n) {
                    setErrorHook('To create a new pool, both token amounts must be greater than zero.');
                    setIsLoadingHook(false);
                    return { state: TransactionState.Failed };
                }
                const sqrtPriceX96 = encodeSqrtRatioX96(amountBDesired_pool.toString(), amountADesired_pool.toString());

                const createPoolPopulatedTx =
                    await nftpmContract.createAndInitializePoolIfNecessary.populateTransaction(
                        tokenA_pool.wrapped.address,
                        tokenB_pool.wrapped.address,
                        fee,
                        BigInt(sqrtPriceX96.toString())
                    );
                createPoolPopulatedTx.gasLimit = 2000000n;

                const createPoolTxResult = await sendTransactionWithWagmiSigner(signer, createPoolPopulatedTx);
                createPoolResponse = createPoolTxResult.response;
                createPoolReceipt = createPoolTxResult.receipt;

                if (createPoolTxResult.state !== TransactionState.Sent || !createPoolReceipt) {
                    setErrorHook('Pool creation failed. Please try again or check your wallet for details.');
                    setIsLoadingHook(false);
                    return { state: TransactionState.Failed, createPoolResponse, createPoolReceipt };
                }
                setErrorHook(null);
            }

            setIsLoadingHook(true);
            setIsApprovingHook(true);
            const tokensToApproveInfo: { token: Token; amount: bigint }[] = [];
            if (!tokenA_pool.isNative && amountADesired_pool > 0n) {
                tokensToApproveInfo.push({ token: tokenA_pool as Token, amount: amountADesired_pool });
            }
            if (!tokenB_pool.isNative && amountBDesired_pool > 0n) {
                tokensToApproveInfo.push({ token: tokenB_pool as Token, amount: amountBDesired_pool });
            }

            for (const { token, amount } of tokensToApproveInfo) {
                const currentAllowance = await publicClient.readContract({
                    address: token.address as `0x${string}`,
                    abi: erc20Abi,
                    functionName: 'allowance',
                    args: [accountAddress!, nftPositionManagerAddr],
                });
                if (BigInt(currentAllowance.toString()) < amount) {
                    const tokenContract = new Contract(token.address, erc20Abi, signer);
                    const approveTxPopulated = await tokenContract.approve.populateTransaction(
                        nftPositionManagerAddr,
                        amount
                    );
                    approveTxPopulated.gasLimit = 100000n;
                    const approveTxResult = await sendTransactionWithWagmiSigner(signer, approveTxPopulated);
                    if (approveTxResult.state !== TransactionState.Sent || !approveTxResult.receipt) {
                        throw new Error(`Approval failed for ${token.symbol}`);
                    }
                }
            }
            setIsApprovingHook(false);

            let ethValueForMint = 0n;
            if (tokenA_pool.isNative && amountADesired_pool > 0n) ethValueForMint = amountADesired_pool;
            else if (tokenB_pool.isNative && amountBDesired_pool > 0n) ethValueForMint = amountBDesired_pool;

            const mintParamsForManager = {
                token0: tokenA_pool.wrapped.address as `0x${string}`,
                token1: tokenB_pool.wrapped.address as `0x${string}`,
                fee: fee,
                tickLower: tickLower,
                tickUpper: tickUpper,
                amount0Desired: amountADesired_pool,
                amount1Desired: amountBDesired_pool,
                amount0Min: amountAMin_pool,
                amount1Min: amountBMin_pool,
                recipient: finalRecipient as `0x${string}`,
                deadline: BigInt(Math.floor(Date.now() / 1000) + DEADLINE_MINUTES * 60),
            };

            const mintPopulatedTx = await nftpmContract.mint.populateTransaction(mintParamsForManager, {
                value: ethValueForMint > 0n ? ethValueForMint : undefined,
            });
            mintPopulatedTx.gasLimit = 700000n;

            const mintTxResult = await sendTransactionWithWagmiSigner(signer, mintPopulatedTx);
            mintResponse = mintTxResult.response;
            mintReceipt = mintTxResult.receipt;
            setIsLoadingHook(false);

            if (mintTxResult.state === TransactionState.Sent && mintReceipt) {
                try {
                    const transferTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
                    const mintEventLog = mintReceipt.logs.find(
                        (log: any) =>
                            log.address.toLowerCase() === nftPositionManagerAddr?.toLowerCase() &&
                            log.topics[0] === transferTopic &&
                            log.topics[1].toLowerCase() ===
                            zeroPadValue('0x0000000000000000000000000000000000000000', 32).toLowerCase() &&
                            log.topics[2].toLowerCase() === zeroPadValue(finalRecipient!, 32).toLowerCase()
                    );
                    if (mintEventLog && mintEventLog.topics[3]) {
                        nftTokenId = BigInt(mintEventLog.topics[3]);
                    }
                } catch (parseError) {
                    console.warn('[AddLiq] Could not parse tokenId from mint receipt logs:', parseError);
                }
                return {
                    state: TransactionState.Sent,
                    createPoolResponse,
                    createPoolReceipt,
                    mintResponse,
                    mintReceipt,
                    nftTokenId,
                };
            } else {
                const errorMsg = mintReceipt
                    ? 'Mint transaction failed on-chain (NFTPM).'
                    : 'Mint transaction submission failed (NFTPM).';
                setErrorHook(errorMsg);
                return {
                    state: TransactionState.Failed,
                    createPoolResponse,
                    createPoolReceipt,
                    mintResponse,
                    mintReceipt,
                };
            }
        } catch (error: any) {
            let errorMessage = 'An unexpected error occurred while adding liquidity. Please try again.';
            if (error.message && error.message.length < 100) errorMessage = error.message;
            else if (error.reason && error.reason.length < 100) errorMessage = error.reason;
            else if (error.code) errorMessage = `Transaction failed with code: ${error.code}`;
            setErrorHook(errorMessage);
            setIsLoadingHook(false);
            setIsApprovingHook(false);
            return {
                state: TransactionState.Failed,
                createPoolResponse,
                createPoolReceipt,
                mintResponse,
                mintReceipt,
            };
        }
    }, [sdkToken0, sdkToken1, accountAddress, currentChainId, signer, publicClient]);


    return {
        addLiquidityV3: addLiquidityAndCreatePoolIfNeeded,
        pairTokenAddress,
        direction,
        setPairTokenAddress: handeSetPairTokenAddress,
        setDirection: handleSetDirection,
        token0: sdkToken0,
        token1: sdkToken1,
        isLoading: isLoadingHook,
        isApproving: isApprovingHook,
        isFetchingPool: isFetchingPoolHook,
        error: errorHook,
        insufficientLiquidity: insufficientLiquidityHook,
        getTradeDetails,
        executeSwap: executeSwapWithV3Router02,
        isReady: !!publicClient && !!currentChainId && !!quoterAddressV3 && !!signer && !!accountAddress && isConnected,
    };
};
