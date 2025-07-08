import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const basenodeAPIMethods = [
    {
        label: 'Node Information',
        content: (
            <>
                <CodeHighlight title="🧠 Node Information Logic">
                    <CodeContent
                        code={`// Base node information provides blockchain state and node status

FUNCTION getNodeVersion():
    // Get base node software version
    RETURN baseNodeClient.GetVersion()

FUNCTION getNodeIdentity():
    // Get node's public key, addresses, and network identity
    RETURN baseNodeClient.Identify()

FUNCTION getTipInfo():
    // Get current blockchain tip information including:
    // - Best block height and hash
    // - Accumulated difficulty
    // - Sync status
    RETURN baseNodeClient.GetTipInfo()

FUNCTION getSyncInfo():
    // Get detailed synchronization status
    RETURN baseNodeClient.GetSyncInfo()

FUNCTION getSyncProgress():
    // Get sync progress with state information
    RETURN baseNodeClient.GetSyncProgress()

FUNCTION getConsensusConstants(blockHeight):
    // Get network consensus rules for specific block height
    request = {block_height: blockHeight}
    RETURN baseNodeClient.GetConstants(request)

FUNCTION checkForUpdates():
    // Check if newer software version is available
    RETURN baseNodeClient.CheckForUpdates()

FUNCTION getNetworkState():
    // Get comprehensive network state including peers and difficulty
    RETURN baseNodeClient.GetNetworkState()`}
                    />
                </CodeHighlight>
                <CodeHighlight title="🧪 Node Information with grpcurl" variant="secondary">
                    <CodeContent
                        code={`# 1. Get Node Version
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetVersion

# 2. Get Node Identity
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/Identify

# 3. Get Tip Information (current blockchain state)
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo

# 4. Get Sync Information
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetSyncInfo

# 5. Get Sync Progress Details
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetSyncProgress

# 6. Get Consensus Constants for Current Tip
TIP_HEIGHT=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo | jq -r '.metadata.best_block_height // 0')
grpcurl -plaintext \
  -d "{\"block_height\": $TIP_HEIGHT}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetConstants

# 7. Check for Software Updates
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/CheckForUpdates

# 8. Get Network State
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetNetworkState

# Complete node status script
#!/bin/bash
echo "=== Base Node Status Check ==="

echo "1. Node Version:"
VERSION=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetVersion 2>/dev/null | jq -r '.value // "Unknown"')
echo "Version: $VERSION"

echo -e "\n2. Node Identity:"
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/Identify | jq .

echo -e "\n3. Blockchain Status:"
TIP_INFO=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo 2>/dev/null)
if [ $? -eq 0 ]; then
    HEIGHT=$(echo "$TIP_INFO" | jq -r '.metadata.best_block_height // 0')
    HASH=$(echo "$TIP_INFO" | jq -r '.metadata.best_block_hash // "unknown"')
    SYNC_STATUS=$(echo "$TIP_INFO" | jq -r '.initial_sync_achieved // false')
    
    echo "Height: $HEIGHT"
    echo "Hash: \${HASH:0:16}..."
    echo "Synced: $SYNC_STATUS"
else
    echo "❌ Could not get tip info"
fi

echo -e "\n4. Sync Progress:"
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetSyncProgress | jq .

echo -e "\n5. Software Updates:"
UPDATE_INFO=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/CheckForUpdates 2>/dev/null)
HAS_UPDATE=$(echo "$UPDATE_INFO" | jq -r '.has_update // false')
if [ "$HAS_UPDATE" = "true" ]; then
    NEW_VERSION=$(echo "$UPDATE_INFO" | jq -r '.version // "unknown"')
    echo "⚠️  Update available: $NEW_VERSION"
else
    echo "✅ Software up to date"
fi`}
                    />
                </CodeHighlight>
            </>
        ),
    },
    {
        label: 'Blockchain Data',
        content: (
            <>
                <CodeHighlight title="🧪 Blockchain Data with grpcurl" variant="secondary">
                    <CodeContent
                        code={`# 1. List Recent Headers (last 10 blocks)
grpcurl -plaintext \
  -d "{\"num_headers\": 10, \"sorting\": \"SORTING_DESC\"}" \
  localhost:18142 \
  tari.rpc.BaseNode/ListHeaders

# 2. Get Headers from Specific Height
START_HEIGHT=100000
grpcurl -plaintext \
  -d "{\"from_height\": $START_HEIGHT, \"num_headers\": 5}" \
  localhost:18142 \
  tari.rpc.BaseNode/ListHeaders

# 3. Get Header by Hash
BLOCK_HASH="a1b2c3d4e5f6..."  # Replace with actual block hash
grpcurl -plaintext \
  -d "{\"hash\": \"$BLOCK_HASH\"}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetHeaderByHash

# 4. Get Specific Blocks
grpcurl -plaintext \
  -d "{\"heights\": [100000, 100001, 100002]}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetBlocks

# 5. Get Block Timing Statistics (last 100 blocks)
grpcurl -plaintext \
  -d "{\"from_tip\": 100}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetBlockTiming

# 6. Get Block Size Statistics
grpcurl -plaintext \
  -d "{\"from_tip\": 100, \"calc_type\": \"MEDIAN\"}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetBlockSize

# 7. Get Block Fee Statistics
grpcurl -plaintext \
  -d "{\"start_height\": 100000, \"end_height\": 100100, \"calc_type\": \"MEAN\"}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetBlockFees

# 8. Get Network Difficulty (last 10 blocks)
grpcurl -plaintext \
  -d "{\"from_tip\": 10}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetNetworkDifficulty

# 9. Get Tokens in Circulation
TIP_HEIGHT=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo | jq -r '.metadata.best_block_height')
grpcurl -plaintext \
  -d "{\"heights\": [$TIP_HEIGHT]}" \
  localhost:18142 \
  tari.rpc.BaseNode/GetTokensInCirculation

# Blockchain analysis script
#!/bin/bash
echo "=== Blockchain Analysis ==="

# Get current tip
TIP_INFO=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo 2>/dev/null)
TIP_HEIGHT=$(echo "$TIP_INFO" | jq -r '.metadata.best_block_height // 0')

echo "Current tip height: $TIP_HEIGHT"

if [ "$TIP_HEIGHT" -gt 0 ]; then
    echo -e "\n1. Recent Block Timing:"
    grpcurl -plaintext \
      -d "{\"from_tip\": 10}" \
      localhost:18142 \
      tari.rpc.BaseNode/GetBlockTiming | jq .
    
    echo -e "\n2. Network Difficulty (last 5 blocks):"
    grpcurl -plaintext \
      -d "{\"from_tip\": 5}" \
      localhost:18142 \
      tari.rpc.BaseNode/GetNetworkDifficulty | \
      jq '{height: .height, difficulty: .difficulty, hash_rate: .estimated_hash_rate}'
    
    echo -e "\n3. Block Size Statistics:"
    grpcurl -plaintext \
      -d "{\"from_tip\": 100, \"calc_type\": \"MEDIAN\"}" \
      localhost:18142 \
      tari.rpc.BaseNode/GetBlockSize | jq .
    
    echo -e "\n4. Circulating Supply:"
    grpcurl -plaintext \
      -d "{\"heights\": [$TIP_HEIGHT]}" \
      localhost:18142 \
      tari.rpc.BaseNode/GetTokensInCirculation | jq .
else
    echo "❌ Node not synced or not accessible"
fi`}
                    />
                </CodeHighlight>
            </>
        ),
    },
    {
        label: 'Network Methods',
        content: (
            <>
                <CodeHighlight title="🧪 Network Methods with grpcurl" variant="secondary">
                    <CodeContent
                        code={`# 1. Get Network Status
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetNetworkStatus

# 2. List Connected Peers
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/ListConnectedPeers

# 3. Get All Peers (including disconnected)
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetPeers

# 4. Get Mempool Statistics
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetMempoolStats

# 5. Get Mempool Transactions
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetMempoolTransactions

# 6. Check Transaction State (by signature)
TX_SIGNATURE="3045022100..."  # Replace with actual transaction signature
grpcurl -plaintext \
  -d "{\"excess_sig\": {\"public_nonce\": \"...\", \"signature\": \"$TX_SIGNATURE\"}}" \
  localhost:18142 \
  tari.rpc.BaseNode/TransactionState

# 7. Search for UTXOs by Commitment
COMMITMENT="a1b2c3d4e5f6..."  # Replace with actual commitment
grpcurl -plaintext \
  -d "{\"commitments\": [\"$COMMITMENT\"]}" \
  localhost:18142 \
  tari.rpc.BaseNode/SearchUtxos

# 8. Search for Kernels by Signature
grpcurl -plaintext \
  -d "{\"signatures\": [{\"public_nonce\": \"...\", \"signature\": \"...\"}]}" \
  localhost:18142 \
  tari.rpc.BaseNode/SearchKernels

# 9. Fetch Matching UTXOs by Hash
UTXO_HASH="hash1,hash2,hash3"
grpcurl -plaintext \
  -d "{\"hashes\": [\"$UTXO_HASH\"]}" \
  localhost:18142 \
  tari.rpc.BaseNode/FetchMatchingUtxos

# Network monitoring script
#!/bin/bash
echo "=== Network Monitoring ==="

echo "1. Network Status:"
NETWORK_STATUS=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetNetworkStatus 2>/dev/null)
if [ $? -eq 0 ]; then
    STATUS=$(echo "$NETWORK_STATUS" | jq -r '.status')
    LATENCY=$(echo "$NETWORK_STATUS" | jq -r '.avg_latency_ms // 0')
    CONNECTIONS=$(echo "$NETWORK_STATUS" | jq -r '.num_node_connections // 0')
    
    echo "Status: $STATUS"
    echo "Connections: $CONNECTIONS"
    echo "Avg Latency: \${LATENCY}ms"
else
    echo "❌ Cannot get network status"
fi

echo -e "\n2. Connected Peers:"
PEER_INFO=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/ListConnectedPeers 2>/dev/null)
if [ $? -eq 0 ]; then
    PEER_COUNT=$(echo "$PEER_INFO" | jq '.connected_peers | length')
    echo "Connected peers: $PEER_COUNT"
    
    if [ "$PEER_COUNT" -gt 0 ]; then
        echo "Peer details:"
        echo "$PEER_INFO" | jq '.connected_peers[] | {
            addresses: .addresses,
            user_agent: .user_agent,
            features: .features
        }' | head -20
    fi
else
    echo "❌ Cannot get peer information"
fi

echo -e "\n3. Mempool Status:"
MEMPOOL_STATS=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetMempoolStats 2>/dev/null)
if [ $? -eq 0 ]; then
    UNCONFIRMED=$(echo "$MEMPOOL_STATS" | jq -r '.unconfirmed_txs // 0')
    WEIGHT=$(echo "$MEMPOOL_STATS" | jq -r '.unconfirmed_weight // 0')
    
    echo "Unconfirmed transactions: $UNCONFIRMED"
    echo "Total weight: $WEIGHT"
else
    echo "❌ Cannot get mempool stats"
fi

echo -e "\n4. Health Summary:"
if [ "$CONNECTIONS" -gt 3 ] && [ "$STATUS" = "Online" ]; then
    echo "✅ Network health: Good"
elif [ "$CONNECTIONS" -gt 0 ]; then
    echo "⚠️  Network health: Degraded"
else
    echo "❌ Network health: Poor"
fi`}
                    />
                </CodeHighlight>
            </>
        ),
    },
];
