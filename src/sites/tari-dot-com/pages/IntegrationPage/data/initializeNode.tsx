import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const initializeNode = [
    {
        label: 'Pseudocode',
        content: (
            <CodeHighlight title="🧠 Node Setup Logic">
                <CodeContent
                    code={`FUNCTION setupTariNode():
    // Step 1: Check system requirements
    IF (disk_space < 50GB OR memory < 4GB):
        THROW "Insufficient system resources"
    
    // Step 2: Initialize node configuration
    IF (config_file_exists):
        LOAD existing_config
    ELSE:
        CREATE default_config
        SET network = "mainnet" // or "testnet" for testing
        SET grpc_enabled = true
        SET grpc_port = 18142
        SET p2p_port = 18141
    
    // Step 3: Generate node identity
    IF (NOT node_identity_exists):
        GENERATE new_keypair
        SAVE keypair_to_secure_location
        LOG "Node identity created: " + public_key
    
    // Step 4: Configure network transport
    IF (tor_available):
        SET transport = "tor"
    ELSE:
        SET transport = "tcp"
        CONFIGURE public_ip_address
    
    // Step 5: Start synchronization
    START node_process
    WAIT_FOR initial_sync
    
    RETURN node_status`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'grpcurl Test',
        content: (
            <CodeHighlight title="🧪 Test Node with grpcurl" variant="secondary">
                <CodeContent
                    code={`# Test if node is running and accessible
grpcurl -plaintext localhost:18142 list

# Expected output:
# grpc.reflection.v1alpha.ServerReflection
# tari.rpc.BaseNode

# Get node version
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetVersion

# Get node identity (public key and addresses)
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/Identify

# Check sync status
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo

# Check network connectivity
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetNetworkStatus

# List connected peers
grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/ListConnectedPeers

# Note: The following scripts require 'jq' for JSON parsing
# Install with: brew install jq (macOS) or apt-get install jq (Ubuntu)
# Quick health check script
#!/bin/bash
echo "=== Node Health Check ==="
echo "1. Testing gRPC connectivity..."
if grpcurl -plaintext -connect-timeout 5 localhost:18142 list > /dev/null 2>&1; then
    echo "✅ gRPC accessible"
    
    echo "2. Getting tip info..."
    grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetTipInfo
    
    echo "3. Checking network status..."
    grpcurl -plaintext localhost:18142 tari.rpc.BaseNode/GetNetworkStatus
else
    echo "❌ gRPC not accessible - check if node is running"
fi`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Command Line',
        content: (
            <CodeContent
                code={`# Start the node for first-time setup
minotari_node

# When prompted:
# - Create node identity: y
# - Mine: n (for exchange use)
# - Network: mainnet (or testnet for testing)`}
            />
        ),
    },
    {
        label: 'Automated Script',
        content: (
            <CodeContent
                code={`#!/bin/bash
# automated-node-setup.sh

# Create Tari directory
mkdir -p ~/.tari/mainnet/config

# Generate basic config
cat > ~/.tari/mainnet/config/config.toml << 'EOF'
[base_node.mainnet]
grpc_enabled = true
grpc_base_node_address = "127.0.0.1:18142"
transport = "tor"
allow_test_addresses = false

[wallet]
grpc_enabled = true
grpc_address = "127.0.0.1:18143"
EOF

# Start node
minotari_node --init`}
            />
        ),
    },
];
