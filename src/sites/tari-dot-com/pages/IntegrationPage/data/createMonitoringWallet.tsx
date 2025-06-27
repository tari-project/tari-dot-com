import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const createMonitoringWallet = [
    {
        label: 'Pseudocode',
        content: (
            <CodeHighlight title="🧠 Wallet Creation Logic">
                <CodeContent
                    code={`FUNCTION createMonitoringWallet():
    // Step 1: Initialize wallet with secure passphrase
    passphrase = generateSecurePassphrase(256) // 256-bit entropy
    
    // Step 2: Create wallet identity
    TRY:
        walletIdentity = tariWallet.createIdentity(passphrase)
        
        // Step 3: Configure for monitoring only
        walletConfig = {
            name: "exchange-monitoring",
            grpc_enabled: true,
            grpc_address: "127.0.0.1:18143",
            grpc_authentication: {
                username: "exchange_monitor",
                password: generateSecurePassword()
            },
            base_node_service_peers: [trusted_node_address],
            network: "mainnet", // or "testnet"
            spending_key_access: false // Read-only
        }
        
        // Step 4: Generate deposit address
        depositAddress = walletIdentity.getOneSidedAddress()
        
        // Step 5: Store securely
        secureStorage.store({
            wallet_id: walletIdentity.public_key,
            deposit_address: depositAddress,
            grpc_credentials: walletConfig.grpc_authentication,
            created_at: getCurrentTimestamp()
        })
        
        // Step 6: Start monitoring service
        startWalletSync()
        
        RETURN {
            address: depositAddress,
            wallet_id: walletIdentity.public_key,
            status: "ready_for_deposits"
        }
        
    CATCH (error):
        LOG "Wallet creation failed: " + error.message
        THROW "Failed to create monitoring wallet"`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'grpcurl Test',
        content: (
            <CodeHighlight title="🧪 Test Wallet with grpcurl" variant="secondary">
                <CodeContent
                    code={`# Check if wallet is running and accessible
grpcurl -plaintext localhost:18143 list

# Get wallet identity and addresses
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/Identify

# Get complete address information
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompleteAddress

# Check wallet synchronization status
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState

# Test wallet connectivity to base node
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetNetworkStatus

# Wallet health check script
#!/bin/bash
echo "=== Wallet Health Check ==="

echo "1. Testing wallet accessibility..."
if grpcurl -plaintext -connect-timeout 5 localhost:18143 list > /dev/null 2>&1; then
    echo "✅ Wallet gRPC accessible"
else
    echo "❌ Wallet not accessible"
    exit 1
fi

echo "2. Getting wallet identity..."
IDENTITY=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/Identify 2>/dev/null)
if [ $? -eq 0 ]; then
    PUBLIC_KEY=$(echo "$IDENTITY" | jq -r '.public_key')
    echo "Wallet Public Key: \${PUBLIC_KEY:0:16}..."
else
    echo "❌ Could not get wallet identity"
fi

echo "3. Checking sync status..."
STATE=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState 2>/dev/null)
if [ $? -eq 0 ]; then
    SCANNED_HEIGHT=$(echo "$STATE" | jq -r '.scanned_height // 0')
    BALANCE=$(echo "$STATE" | jq -r '.balance.available_balance // 0')
    
    echo "Scanned Height: $SCANNED_HEIGHT"
    echo "Available Balance: $BALANCE microXTM"
else
    echo "❌ Could not get wallet state"
fi

echo "4. Network connectivity..."
NETWORK=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetNetworkStatus 2>/dev/null)
if [ $? -eq 0 ]; then
    STATUS=$(echo "$NETWORK" | jq -r '.status // "Unknown"')
    CONNECTIONS=$(echo "$NETWORK" | jq -r '.num_node_connections // 0')
    
    echo "Network Status: $STATUS"
    echo "Node Connections: $CONNECTIONS"
else
    echo "❌ Could not get network status"
fi`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Setup Commands',
        content: (
            <CodeContent
                code={`# Initialize wallet for first time
minotari_console_wallet --init

# When prompted, choose:
# - Create new wallet: y
# - Set password: [secure password]
# - Recover from seed: n (unless restoring)
# - Network: mainnet

# Start wallet with gRPC enabled
minotari_console_wallet --enable-grpc

# In separate terminal, verify wallet is accessible
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompleteAddress`}
            />
        ),
    },
];
