import {
    ethers,
    Signer as EthersSigner,
    TransactionRequest as EthersTransactionRequest,
    TransactionResponse as EthersTransactionResponse,
    TransactionReceipt as EthersTransactionReceipt,
} from 'ethers';

export enum TransactionState {
    Failed = 'Failed',
    New = 'New',
    Rejected = 'Rejected',
    Sending = 'Sending',
    Sent = 'Sent',
}

export async function sendTransactionWithWagmiSigner(
    signer: EthersSigner,
    transactionRequest: EthersTransactionRequest
): Promise<{ state: TransactionState; response?: EthersTransactionResponse; receipt?: EthersTransactionReceipt }> {
    if (!signer.provider) {
        console.error('Signer does not have a provider.');
        return { state: TransactionState.Failed };
    }

    if (transactionRequest.value) {
        try {
            transactionRequest.value = ethers.toBigInt(transactionRequest.value.toString());
        } catch (e) {
            console.error('Invalid transaction value:', transactionRequest.value, e);
            return { state: TransactionState.Failed };
        }
    }

    try {
        console.info('Sending transaction with ether');
        console.info('Transaction request:', transactionRequest);
        const txRes = await signer.sendTransaction(transactionRequest);
        console.info('Transaction sent with ether');
        const receipt = await txRes.wait(1);
        // const receipt = { status: 1 } as EthersTransactionReceipt;
        console.info('Transaction receipt received');

        if (receipt) {
            if (receipt.status === 1) {
                console.info('Transaction succeeded on-chain.');
                return { state: TransactionState.Sent, response: txRes, receipt };
            } else {
                console.error('Transaction failed on-chain (status 0).', receipt);
                return { state: TransactionState.Failed, response: txRes, receipt };
            }
        } else {
            console.error('Transaction receipt was null after waiting.');
            return { state: TransactionState.Failed, response: txRes };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.error(`Transaction submission or mining error:`, e);
        return { state: TransactionState.Failed };
    }
}
