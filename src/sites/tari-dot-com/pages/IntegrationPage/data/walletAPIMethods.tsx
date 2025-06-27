import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const walletAPIMethods = [
    {
        label: 'Core Methods',
        content: (
            <>
                <CodeHighlight title="🧠 Core Wallet Operations Logic">
                    <CodeContent
                        code={`// Core wallet operations provide basic wallet information and state

FUNCTION getWalletVersion():
    // Simple version check - no parameters needed
    RETURN walletClient.GetVersion()

FUNCTION getWalletState():
    // Returns comprehensive wallet status including:
    // - Blockchain sync height
    // - Balance information
    // - Network connectivity status
    RETURN walletClient.GetState()

FUNCTION checkWalletConnectivity():
    // Quick connectivity check without full state
    RETURN walletClient.CheckConnectivity()

FUNCTION getWalletIdentity():
    // Returns wallet's public key and addresses
    RETURN walletClient.Identify()

FUNCTION getWalletAddresses():
    // Get basic address formats (binary)
    RETURN walletClient.GetAddress()

FUNCTION getCompleteAddresses():
    // Get all address formats (binary, base58, emoji)
    RETURN walletClient.GetCompleteAddress()

FUNCTION generateAddressWithPaymentId(paymentId):
    // Generate address tied to specific payment ID
    paymentIdBytes = convertToBytes(paymentId)
    RETURN walletClient.GetPaymentIdAddress(paymentIdBytes)`}
                    />
                </CodeHighlight>
                <CodeHighlight title="🧪 Core Wallet Methods with grpcurl" variant="secondary">
                    <CodeContent
                        code={`# 1. Get Wallet Version
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetVersion

# 2. Get Wallet State (comprehensive status)
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState

# 3. Quick Connectivity Check
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/CheckConnectivity

# 4. Get Wallet Identity
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/Identify

# 5. Get Basic Addresses
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetAddress

# 6. Get Complete Address Information
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompleteAddress

# 7. Generate Address with Payment ID
PAYMENT_ID="deposit-user123-$(date +%s)"
PAYMENT_ID_B64=$(echo -n "$PAYMENT_ID" | base64 -w 0)

grpcurl -plaintext \
  -d "{\"payment_id\": \"$PAYMENT_ID_B64\"}" \
  localhost:18143 \
  tari.rpc.Wallet/GetPaymentIdAddress

# Complete wallet status check script
#!/bin/bash
echo "=== Wallet Status Check ==="

echo "1. Version:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetVersion

echo -e "\n2. Connectivity:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/CheckConnectivity

echo -e "\n3. State:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState

echo -e "\n4. Identity:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/Identify`}
                    />
                </CodeHighlight>
            </>
        ),
    },
    {
        label: 'Transaction Methods',
        content: (
            <>
                <CodeHighlight title="🧠 Transaction Operations Logic">
                    <CodeContent
                        code={`// Transaction operations for sending funds and querying transaction history

FUNCTION sendFunds(recipients):
    // Send funds to one or more recipients
    // Each recipient needs: address, amount, fee_per_gram, payment_type, payment_id
    FOR EACH recipient IN recipients:
        validateAddress(recipient.address)
        validateAmount(recipient.amount)
        validatePaymentType(recipient.payment_type) // ONE_SIDED for exchanges
    
    request = {recipients: recipients}
    RETURN walletClient.Transfer(request)

FUNCTION getTransactionInfo(transactionIds):
    // Get detailed information for specific transactions
    request = {transaction_ids: transactionIds}
    RETURN walletClient.GetTransactionInfo(request)

FUNCTION getCompletedTransactions(filter):
    // Stream completed transactions, optionally filtered
    // Filter can be: payment_id, block_hash, block_height
    request = createFilteredRequest(filter)
    RETURN walletClient.GetCompletedTransactions(request) // Returns stream

FUNCTION cancelTransaction(transactionId):
    // Cancel a pending transaction
    request = {tx_id: transactionId}
    RETURN walletClient.CancelTransaction(request)

FUNCTION streamTransactionEvents():
    // Monitor real-time transaction events
    RETURN walletClient.StreamTransactionEvents() // Returns stream

FUNCTION processTransactionStream():
    stream = streamTransactionEvents()
    WHILE (event = stream.next()):
        IF (event.type == "Mined" AND event.direction == "Inbound"):
            processIncomingDeposit(event)
        ELSE IF (event.type == "Cancelled"):
            handleCancelledTransaction(event)`}
                    />
                </CodeHighlight>
                <CodeHighlight title="🧪 Transaction Methods with grpcurl" variant="secondary">
                    <CodeContent
                        code={`# 1. Send Funds (ONE_SIDED transaction for exchanges)
RECIPIENT="12HVCEeZC2RGE4SDn3yGwqz..."  # Replace with actual address
AMOUNT=1000000  # 1 XTM in microXTM
PAYMENT_ID="withdraw-$(date +%s)-$(openssl rand -hex 4)"
PAYMENT_ID_B64=$(echo -n "$PAYMENT_ID" | base64 -w 0)

grpcurl -plaintext \
  -d "{
    \"recipients\": [{
      \"address\": \"$RECIPIENT\",
      \"amount\": $AMOUNT,
      \"fee_per_gram\": 25,
      \"payment_type\": \"ONE_SIDED\",
      \"payment_id\": \"$PAYMENT_ID_B64\"
    }]
  }" \
  localhost:18143 \
  tari.rpc.Wallet/Transfer

# 2. Get Transaction Information
TX_ID=12345  # Replace with actual transaction ID
grpcurl -plaintext \
  -d "{\"transaction_ids\": [$TX_ID]}" \
  localhost:18143 \
  tari.rpc.Wallet/GetTransactionInfo

# 3. Get All Completed Transactions
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompletedTransactions

# 4. Get Transactions for Specific Payment ID
PAYMENT_ID="deposit-user123-abc456"
grpcurl -plaintext \
  -d "{\"payment_id\": {\"utf8_string\": \"$PAYMENT_ID\"}}" \
  localhost:18143 \
  tari.rpc.Wallet/GetCompletedTransactions

# 5. Get Transactions for Specific Block
BLOCK_HASH="a1b2c3d4e5f6..."
grpcurl -plaintext \
  -d "{\"block_hash\": {\"hash\": \"$BLOCK_HASH\"}}" \
  localhost:18143 \
  tari.rpc.Wallet/GetCompletedTransactions

# 6. Cancel Transaction
TX_ID=12345
grpcurl -plaintext \
  -d "{\"tx_id\": $TX_ID}" \
  localhost:18143 \
  tari.rpc.Wallet/CancelTransaction

# 7. Stream Real-time Transaction Events
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/StreamTransactionEvents

# Transaction monitoring script
#!/bin/bash
echo "=== Transaction Monitoring ==="

echo "1. Recent Transactions:"
timeout 10s grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompletedTransactions | head -20

echo -e "\n2. Real-time Events (monitoring for 30 seconds):"
timeout 30s grpcurl -plaintext localhost:18143 tari.rpc.Wallet/StreamTransactionEvents | \
while read -r line; do
    echo "$(date): $line"
done`}
                    />
                </CodeHighlight>
            </>
        ),
    },
    {
        label: 'Advanced Methods',
        content: (
            <>
                <CodeHighlight title="🧠 Advanced Wallet Operations Logic">
                    <CodeContent
                        code={`// Advanced wallet operations for balance management and network operations

FUNCTION getBalance(paymentId):
    // Get balance, optionally filtered by payment ID
    IF (paymentId IS provided):
        request = {payment_id: convertPaymentId(paymentId)}
    ELSE:
        request = {} // Get total wallet balance
    
    RETURN walletClient.GetBalance(request)

FUNCTION splitCoins(amountPerSplit, splitCount, feePerGram):
    // Split large UTXOs into smaller ones for better transaction management
    validateAmount(amountPerSplit)
    validateCount(splitCount)
    
    request = {
        amount_per_split: amountPerSplit,
        split_count: splitCount,
        fee_per_gram: feePerGram,
        lock_height: 0
    }
    
    RETURN walletClient.CoinSplit(request)

FUNCTION importUTXOs(outputs, paymentId):
    // Import external UTXOs into wallet
    FOR EACH output IN outputs:
        validateUTXO(output)
    
    request = {
        outputs: outputs,
        payment_id: paymentId
    }
    
    RETURN walletClient.ImportUtxos(request)

FUNCTION getNetworkStatus():
    // Get detailed network connectivity information
    RETURN walletClient.GetNetworkStatus()

FUNCTION listConnectedPeers():
    // Get list of currently connected peers
    RETURN walletClient.ListConnectedPeers()

FUNCTION setBaseNode(publicKey, address):
    // Configure which base node to connect to
    request = {
        public_key_hex: publicKey,
        net_address: address
    }
    
    RETURN walletClient.SetBaseNode(request)

FUNCTION revalidateTransactions():
    // Force revalidation of all wallet transactions
    RETURN walletClient.RevalidateAllTransactions()`}
                    />
                </CodeHighlight>
                <CodeHighlight title="🧪 Advanced Methods with grpcurl" variant="secondary">
                    <CodeContent
                        code={`# 1. Get Total Balance
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetBalance

# 2. Get Balance for Specific Payment ID
PAYMENT_ID="deposit-user123"
grpcurl -plaintext \
  -d "{\"payment_id\": {\"utf8_string\": \"$PAYMENT_ID\"}}" \
  localhost:18143 \
  tari.rpc.Wallet/GetBalance

# 3. Get Unspent Amounts
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetUnspentAmounts

# 4. Coin Split (create 10 outputs of 0.1 XTM each)
grpcurl -plaintext \
  -d "{
    \"amount_per_split\": 100000,
    \"split_count\": 10,
    \"fee_per_gram\": 25,
    \"lock_height\": 0
  }" \
  localhost:18143 \
  tari.rpc.Wallet/CoinSplit

# 5. Get Network Status
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetNetworkStatus

# 6. List Connected Peers
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/ListConnectedPeers

# 7. Set Base Node
NODE_PUBKEY="90f67a04edcb36261e6304ca213629d183c44e26bd47e38c253473f44d901733"
NODE_ADDRESS="/onion3/f5qbkkfkoxowzvshe5mppzpgiiy76cwumpsacungeldoal6hehcgzfqd:18141"

grpcurl -plaintext \
  -d "{
    \"public_key_hex\": \"$NODE_PUBKEY\",
    \"net_address\": \"$NODE_ADDRESS\"
  }" \
  localhost:18143 \
  tari.rpc.Wallet/SetBaseNode

# 8. Revalidate All Transactions
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/RevalidateAllTransactions

# Comprehensive wallet health check
#!/bin/bash
echo "=== Advanced Wallet Health Check ==="

echo "1. Balance Information:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetBalance | jq .

echo -e "\n2. Network Status:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetNetworkStatus | jq .

echo -e "\n3. Connected Peers:"
PEER_COUNT=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/ListConnectedPeers | jq '.connected_peers | length')
echo "Connected peers: $PEER_COUNT"

echo -e "\n4. Unspent Outputs:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetUnspentAmounts | jq .

# Check if wallet needs coin splitting
BALANCE=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetBalance | jq -r '.available_balance // 0')
UNSPENT_COUNT=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetUnspentAmounts | jq '.amount | length')

echo -e "\n5. UTXO Analysis:"
echo "Available balance: $BALANCE microXTM"
echo "Number of UTXOs: $UNSPENT_COUNT"

if [ "$UNSPENT_COUNT" -lt 5 ] && [ "$BALANCE" -gt 10000000 ]; then
    echo "💡 Consider coin splitting for better transaction management"
fi`}
                    />
                </CodeHighlight>
            </>
        ),
    },
];
