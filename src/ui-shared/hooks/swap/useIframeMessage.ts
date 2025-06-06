'use client';
import { SelectableTokenInfo } from "@/sites/tari-dot-com/pages/Swap/useSwapData";
import { useEffect } from "react";
import { SwapDirection } from "./lib/types";

export enum MessageType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    APPROVE_REQUEST = 'APPROVE_REQUEST',
    APPROVE_SUCCESS = 'APPROVE_SUCCESS',
    CONFIRM_REQUEST = 'CONFIRM_REQUEST',
    WALLET_CONNECT = 'WALLET_CONNECT',
    PROCESSING_STATUS = 'PROCESSING_STATUS',
    SWAP_HEIGHT_CHANGE = 'SWAP_HEIGHT_CHANGE',
    SET_FULLSCREEN = 'SET_FULLSCREEN',
}

interface WalletConnectMessage {
    type: MessageType.WALLET_CONNECT;
    payload: {
        open: boolean;
    };
}

interface SetFullscreenMessage {
    type: MessageType.SET_FULLSCREEN;
    payload: {
        open: boolean;
    };
}

interface SwapHeightChangeMessage {
    type: MessageType.SWAP_HEIGHT_CHANGE;
    payload: {
        height: number;
    }
}

type SwapConfirmation = {
    type: MessageType.CONFIRM_REQUEST;
    payload: {
        fromTokenDisplay?: SelectableTokenInfo;
        toTokenDisplay?: SelectableTokenInfo;
        toTokenSymbol?: string;
        transaction: {
            amount: string;
            targetAmount: string;
            direction: SwapDirection;
            slippage?: string | null;
            networkFee?: string | null;
            networkFeeNative?: string | null;
            priceImpact?: string | null;
            minimumReceived?: string | null;
            executionPrice?: string | null;
            transactionId?: string | null;
            paidTransactionFee?: string | null;
        };
    }
}

type ApproveMessage = {
    type: MessageType.APPROVE_REQUEST;
}

type ApproveSuccessMessage = {
    type: MessageType.APPROVE_SUCCESS;
}

type ErrorMessage = {
    type: MessageType.ERROR;
    payload: {
        message: string;
    }
}

type SuccessMessage = {
    type: MessageType.SUCCESS;
    payload: {
        status: 'pending' | 'success' | 'error';
        txId?: string;
    }
}

type SwapStatus = 'processingapproval' | 'processingswap' | 'success' | 'error';

type ProcessingMessage = {
    type: MessageType.PROCESSING_STATUS;
    payload: {
        status: SwapStatus;
        fees?: { approval: string | null; swap: string | null };
        transactionId?: string | null; // Hash of the swap transaction
        txBlockHash?: `0x${string}` | null;
        errorMessage?: string | null; // Added for error status
        fromTokenSymbol?: string;
        fromTokenAmount?: string;
        toTokenSymbol?: string;
        toTokenAmount?: string;
    }
}

export type IframeMessage =
    | ApproveMessage
    | WalletConnectMessage
    | ApproveSuccessMessage
    | SwapConfirmation
    | ErrorMessage
    | SuccessMessage
    | ProcessingMessage
    | SetFullscreenMessage
    | SwapHeightChangeMessage
    ;

// Post a message to the parent window
export function postToParentIframe(message: IframeMessage, targetOrigin: string = '*') {
    if (window.parent) {
        console.log('Posting message to parent:', message);
        window.parent.postMessage(message, targetOrigin);
    }
}

// Hook to listen for messages from the parent window
export function useIframeMessage(onMessage: (event: MessageEvent) => void) {
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            // Optionally, add origin checks here for security
            onMessage(event);
        }
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [onMessage]);
}
