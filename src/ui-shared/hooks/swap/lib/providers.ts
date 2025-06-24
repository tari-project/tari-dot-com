/* eslint-disable @typescript-eslint/no-explicit-any */
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
    Timeout = 'Timeout',
}

export async function sendTransactionWithWagmiSigner(
    signer: EthersSigner,
    transactionRequest: EthersTransactionRequest,
): Promise<{
    state: TransactionState;
    response?: EthersTransactionResponse;
    receipt?: EthersTransactionReceipt;
    actualFeeWei?: bigint;
}> {
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
        console.info('Transaction sent with ether, awaiting confirmation');

        // Wait for 2 confirmations with a 5-minute timeout
        const receipt = await signer.provider.waitForTransaction(txRes.hash, 2, 60000 * 5); // 5 minutes
        console.info('Transaction receipt received');

        if (receipt) {
            const effectiveGasPrice = receipt.gasPrice;
            let actualFeeWei: bigint | undefined;
            if (receipt.gasUsed && effectiveGasPrice) {
                actualFeeWei = receipt.gasUsed * effectiveGasPrice;
                console.info(`Actual Fee Paid: ${actualFeeWei.toString()} Wei`);
            }

            if (receipt.status === 1) {
                console.info('Transaction succeeded on-chain.');
                // Return the calculated fee along with other data
                return { state: TransactionState.Sent, response: txRes, receipt, actualFeeWei };
            } else {
                console.error('Transaction failed on-chain (status 0).', receipt);
                return { state: TransactionState.Failed, response: txRes, receipt, actualFeeWei };
            }
        } else {
            // This case will now be caught by the timeout error
            console.error('Transaction receipt was null after waiting.');
            return { state: TransactionState.Failed, response: txRes };
        }
    } catch (e: any) {
        if (e.code === 'TIMEOUT') {
            console.error('Transaction timed out.', e);
            return { state: TransactionState.Timeout };
        }
        console.error(`Transaction submission or mining error:`, e);
        return { state: TransactionState.Failed };
    }
}
