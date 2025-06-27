import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const commonIssues = [
    {
        label: 'Sync Issues',
        content: (
            <>
                <CodeHighlight title="🧪 Sync Troubleshooting with grpcurl" variant="secondary">
                    <CodeContent
                        code={`# Check node sync status
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetSyncInfo

# Check tip info
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo

# Check connected peers
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/ListConnectedPeers

# Complete sync diagnostic script
#!/bin/bash
echo "=== Sync Diagnostic Script ==="

echo "1. Base Node Sync Status:"
SYNC_INFO=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetSyncInfo 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "$SYNC_INFO" | jq .
else
    echo "❌ Cannot connect to base node"
fi

echo -e "\n2. Peer Connections:"
PEERS=$(grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/ListConnectedPeers 2>/dev/null)
PEER_COUNT=$(echo "$PEERS" | jq '.connected_peers | length')
echo "Connected peers: $PEER_COUNT"

if [ "$PEER_COUNT" -lt 3 ]; then
    echo "⚠️  Low peer count, checking network..."
    # Add more peers manually if needed
fi

echo -e "\n3. Wallet Sync Status:"
WALLET_STATE=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState 2>/dev/null)
if [ $? -eq 0 ]; then
    SCANNED_HEIGHT=$(echo "$WALLET_STATE" | jq -r '.scanned_height')
    echo "Wallet scanned height: $SCANNED_HEIGHT"
else
    echo "❌ Cannot connect to wallet"
fi

# Common fixes for sync issues:
echo -e "\n🔧 Common Sync Fixes:"
echo "1. Restart services: docker-compose restart"
echo "2. Clear peer ban list: rm ~/.tari/mainnet/peer_db/banned_peers"
echo "3. Manual peer addition: Use SetBaseNode RPC call"`}
                    />
                </CodeHighlight>
            </>
        ),
    },
    {
        label: 'Connectivity',
        content: (
            <CodeContent
                code={`# Network connectivity troubleshooting

## Check port accessibility
sudo netstat -tlnp | grep -E "(18141|18142|18143)"

## Test gRPC connectivity
grpcurl -plaintext -connect-timeout 10 localhost:18142 list
grpcurl -plaintext -connect-timeout 10 localhost:18143 list

## Firewall rules check
sudo iptables -L -n | grep -E "(18141|18142|18143)"

## DNS resolution for Tor (if using)
nslookup facebook.com # Should fail if properly isolated
curl --socks5 127.0.0.1:9050 http://check.torproject.org/

## Docker network troubleshooting
docker network ls
docker network inspect tari_tari-network

# Common connectivity fixes:
# 1. Check firewall settings
sudo ufw allow 18141
sudo ufw deny 18142 # gRPC should be localhost only
sudo ufw deny 18143 # gRPC should be localhost only

# 2. Verify Docker networking
docker exec tari-node ping tari-wallet
docker exec tari-wallet ping tari-node`}
            />
        ),
    },
    {
        label: 'Transactions',
        content: (
            <CodeHighlight title="🧪 Transaction Debugging with grpcurl" variant="secondary">
                <CodeContent
                    code={`# Check specific transaction status
TX_ID=12345
grpcurl -plaintext \
  -d "{\"transaction_ids\": [$TX_ID]}" \
  localhost:18143 \
  tari.rpc.Wallet/GetTransactionInfo

# Check mempool for pending transactions
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetMempoolStats
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetMempoolTransactions

# Search for transaction by commitment
COMMITMENT="your_commitment_hex"
grpcurl -plaintext \
  -d "{\"commitments\": [\"$COMMITMENT\"]}" \
  localhost:18142 \
  tari.rpc.BaseNode/SearchUtxos

# Transaction debugging script
#!/bin/bash
TX_ID="\${1:-}"

if [ -z "$TX_ID" ]; then
    echo "Usage: $0 "
    exit 1
fi

echo "=== Transaction Debugging: $TX_ID ==="

echo "1. Wallet transaction info:"
TX_INFO=$(grpcurl -plaintext \
  -d "{\"transaction_ids\": [$TX_ID]}" \
  localhost:18143 \
  tari.rpc.Wallet/GetTransactionInfo 2>/dev/null)

if [ $? -eq 0 ] && [ -n "$TX_INFO" ]; then
    echo "$TX_INFO" | jq .
    
    STATUS=$(echo "$TX_INFO" | jq -r '.transactions[0].status')
    echo "Transaction Status: $STATUS"
    
    if [ "$STATUS" = "TRANSACTION_STATUS_PENDING" ]; then
        echo "⏳ Transaction is pending..."
        echo "2. Checking mempool:"
        grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetMempoolStats
    fi
else
    echo "❌ Transaction not found in wallet"
fi

echo -e "\n🔧 Common Transaction Fixes:"
echo "1. Wait for confirmation (10-15 minutes typical)"
echo "2. Check if fee is sufficient"
echo "3. Verify recipient address format"
echo "4. Ensure wallet is synced"`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Performance',
        content: (
            <CodeContent
                code={`# Performance monitoring and optimization

## System resource monitoring
top -p $(pgrep minotari)
iostat -x 1 5
free -h
df -h

## Database performance (if using PostgreSQL)
sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"
sudo -u postgres psql -c "SELECT schemaname,tablename,n_tup_ins,n_tup_upd,n_tup_del FROM pg_stat_user_tables;"

## gRPC performance monitoring
# Monitor response times
time grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState
time grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo

## Log analysis for performance issues
tail -f ~/.tari/mainnet/logs/base_node.log | grep -E "(slow|timeout|error)"
tail -f ~/.tari/mainnet/logs/wallet.log | grep -E "(slow|timeout|error)"

# Performance optimization checklist:
# [ ] SSD storage for blockchain data
# [ ] Sufficient RAM (8GB+ recommended)
# [ ] Fast network connection
# [ ] Regular database maintenance
# [ ] Log rotation configured
# [ ] Monitoring alerts set up

## Docker performance optimization
# Use volume mounts instead of bind mounts for better I/O
# Allocate sufficient resources
docker stats tari-node tari-wallet`}
            />
        ),
    },
];
