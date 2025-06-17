import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const generateDepositAddress = [
    {
        label: 'Pseudocode',
        content: (
            <CodeHighlight title="🧠 Deposit Address Generation Logic">
                <CodeContent
                    code={`FUNCTION generateDepositAddress(userId):
    // Step 1: Input validation
    IF (userId IS empty OR userId IS invalid):
        THROW "Invalid user ID"
    
    // Step 2: Generate unique payment identifier
    timestamp = getCurrentTimestamp()
    randomBytes = generateSecureRandom(8) // 8 bytes = 64 bits
    paymentId = "deposit-" + userId + "-" + timestamp + "-" + randomBytes
    
    // Step 3: Convert payment ID to bytes for gRPC
    paymentIdBytes = convertToBytes(paymentId, "UTF-8")
    
    // Step 4: Call wallet gRPC to get address with payment ID
    request = {
        payment_id: paymentIdBytes
    }
    
    TRY:
        response = walletClient.GetPaymentIdAddress(request)
        
        // Step 5: Extract address information
        address = response.one_sided_address_base58
        emojiAddress = response.one_sided_address_emoji
        
        // Step 6: Store in database for tracking
        depositRecord = {
            userId: userId,
            paymentId: paymentId,
            address: address,
            status: "pending",
            createdAt: timestamp
        }
        
        database.save(depositRecord)
        
        // Step 7: Return deposit instructions to user
        RETURN {
            address: address,
            paymentId: paymentId,
            emojiAddress: emojiAddress,
            instructions: "Send XTM to this address with payment ID: " + paymentId,
            qrCode: generateQRCode(address, paymentId)
        }
        
    CATCH (grpcError):
        LOG "Failed to generate address: " + grpcError.message
        THROW "Address generation failed"`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'grpcurl',
        content: (
            <CodeHighlight title="🧪 Test Address Generation with grpcurl" variant="secondary">
                <CodeContent
                    code={`# First, get the exchange's main address (without payment ID)
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompleteAddress

# Generate address with specific payment ID
# Note: payment_id must be base64 encoded
PAYMENT_ID="deposit-user123-$(date +%s)-$(openssl rand -hex 4)"
PAYMENT_ID_B64=$(echo -n "$PAYMENT_ID" | base64 -w 0)

echo "Using Payment ID: $PAYMENT_ID"
echo "Base64 encoded: $PAYMENT_ID_B64"

grpcurl -plaintext \
  -d "{\"payment_id\": \"$PAYMENT_ID_B64\"}" \
  localhost:18143 \
  tari.rpc.Wallet/GetPaymentIdAddress

# Complete test script
#!/bin/bash
echo "=== Deposit Address Generation Test ==="

# Check if wallet is accessible
if ! grpcurl -plaintext -connect-timeout 5 localhost:18143 list > /dev/null 2>&1; then
    echo "❌ Wallet gRPC not accessible"
    exit 1
fi

# Generate unique payment ID
USER_ID="user123"
TIMESTAMP=$(date +%s)
RANDOM_HEX=$(openssl rand -hex 4)
PAYMENT_ID="deposit-\${USER_ID}-\${TIMESTAMP}-\${RANDOM_HEX}"
PAYMENT_ID_B64=$(echo -n "$PAYMENT_ID" | base64 -w 0)

echo "✅ Generated Payment ID: $PAYMENT_ID"

# Get address with payment ID
echo "🔍 Requesting address from wallet..."
RESPONSE=$(grpcurl -plaintext \
  -d "{\"payment_id\": \"$PAYMENT_ID_B64\"}" \
  localhost:18143 \
  tari.rpc.Wallet/GetPaymentIdAddress 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "✅ Address generated successfully"
    echo "$RESPONSE" | jq .
else
    echo "❌ Failed to generate address"
fi

# Test with authentication (if enabled)
AUTH_HEADER=$(echo -n "exchange_user:secure_password" | base64 -w 0)
grpcurl -plaintext \
  -H "authorization: Basic $AUTH_HEADER" \
  -d "{\"payment_id\": \"$PAYMENT_ID_B64\"}" \
  localhost:18143 \
  tari.rpc.Wallet/GetPaymentIdAddress`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Node.js',
        content: (
            <CodeContent
                code={`const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const crypto = require('crypto');

class TariDepositManager {
    constructor() {
        // Load protobuf
        const packageDefinition = protoLoader.loadSync('./proto/wallet.proto', {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });
        
        const walletProto = grpc.loadPackageDefinition(packageDefinition).tari.rpc;
        
        // Create authenticated client
        const credentials = grpc.credentials.createInsecure();
        this.client = new walletProto.Wallet('localhost:18143', credentials);
        
        // Add authentication metadata
        this.metadata = new grpc.Metadata();
        this.metadata.add('authorization', 'Basic ' + 
            Buffer.from('exchange_user:secure_password_here').toString('base64'));
    }
    
    async generateDepositAddress(userId) {
        // Generate unique payment ID
        const timestamp = Date.now();
        const randomHex = crypto.randomBytes(4).toString('hex');
        const paymentId = \`deposit-\${userId}-\${timestamp}-\${randomHex}\`;
        const paymentIdBytes = Buffer.from(paymentId, 'utf8');
        
        return new Promise((resolve, reject) => {
            this.client.GetPaymentIdAddress(
                { payment_id: paymentIdBytes },
                this.metadata,
                (error, response) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    
                    // Store in database
                    this.storeDepositRecord(userId, paymentId);
                    
                    resolve({
                        address: response.one_sided_address_base58,
                        paymentId: paymentId,
                        emojiAddress: response.one_sided_address_emoji,
                        instructions: \`Send XTM to \${response.one_sided_address_base58} with payment ID: \${paymentId}\`,
                        qrCode: this.generateQRCode(response.one_sided_address_base58, paymentId)
                    });
                }
            );
        });
    }
    
    storeDepositRecord(userId, paymentId) {
        // Store in your database
        console.log(\`Storing deposit record: User \${userId}, Payment ID \${paymentId}\`);
        // Implementation depends on your database
    }
    
    generateQRCode(address, paymentId) {
        // Generate QR code for easy mobile scanning
        const tariUri = \`tari:\${address}?payment_id=\${paymentId}\`;
        return tariUri; // Return URI or actual QR code image
    }
}`}
            />
        ),
    },
    {
        label: 'Python',
        content: (
            <CodeContent
                code={`import grpc
import wallet_pb2
import wallet_pb2_grpc
import uuid
import base64
import time
from datetime import datetime

class TariDepositManager:
    def __init__(self):
        # Create gRPC channel
        self.channel = grpc.insecure_channel('localhost:18143')
        self.client = wallet_pb2_grpc.WalletStub(self.channel)
        
        # Authentication metadata
        auth_string = base64.b64encode(b'exchange_user:secure_password_here').decode('ascii')
        self.metadata = [('authorization', f'Basic {auth_string}')]
    
    def generate_deposit_address(self, user_id):
        """Generate a unique deposit address for a user"""
        
        # Generate unique payment ID
        timestamp = int(time.time())
        random_hex = uuid.uuid4().hex[:8]
        payment_id = f"deposit-{user_id}-{timestamp}-{random_hex}"
        payment_id_bytes = payment_id.encode('utf-8')
        
        try:
            # Get address with payment ID
            request = wallet_pb2.GetPaymentIdAddressRequest(payment_id=payment_id_bytes)
            response = self.client.GetPaymentIdAddress(request, metadata=self.metadata)
            
            # Store in database
            self.store_deposit_record(user_id, payment_id)
            
            return {
                'address': response.one_sided_address_base58,
                'payment_id': payment_id,
                'emoji_address': response.one_sided_address_emoji,
                'instructions': f'Send XTM to {response.one_sided_address_base58} with payment ID: {payment_id}',
                'qr_code': self.generate_qr_code(response.one_sided_address_base58, payment_id)
            }
            
        except grpc.RpcError as e:
            raise Exception(f"Failed to generate deposit address: {e.details()}")
    
    def store_deposit_record(self, user_id, payment_id):
        """Store deposit record in database"""
        # Implementation depends on your database
        print(f"Storing deposit record: User {user_id}, Payment ID {payment_id}")
        
    def generate_qr_code(self, address, payment_id):
        """Generate QR code URI for mobile wallets"""
        tari_uri = f"tari:{address}?payment_id={payment_id}"
        return tari_uri
        
    def close(self):
        self.channel.close()`}
            />
        ),
    },
    {
        label: 'Rust',
        content: (
            <CodeContent
                code={`use tonic::transport::Channel;
use tonic::metadata::MetadataValue;
use tonic::{Request, Status};
use uuid::Uuid;
use base64;
use chrono::Utc;

// Generated from proto files
pub mod tari_rpc {
    tonic::include_proto!("tari.rpc");
}

use tari_rpc::wallet_client::WalletClient;
use tari_rpc::{GetPaymentIdAddressRequest, GetCompleteAddressResponse};

pub struct TariDepositManager {
    client: WalletClient,
}

impl TariDepositManager {
    pub async fn new() -> Result> {
        let channel = Channel::from_static("http://127.0.0.1:18143").connect().await?;
        let client = WalletClient::new(channel);
        
        Ok(TariDepositManager { client })
    }
    
    pub async fn generate_deposit_address(&mut self, user_id: &str) -> Result {
        // Generate unique payment ID
        let timestamp = Utc::now().timestamp();
        let random_hex = Uuid::new_v4().to_string()[..8].to_string();
        let payment_id = format!("deposit-{}-{}-{}", user_id, timestamp, random_hex);
        
        let payment_id_bytes = payment_id.as_bytes().to_vec();
        
        // Create authenticated request
        let mut request = Request::new(GetPaymentIdAddressRequest {
            payment_id: payment_id_bytes,
        });
        
        // Add authentication
        let auth_header = base64::encode("exchange_user:secure_password_here");
        let metadata_value = MetadataValue::from_str(&format!("Basic {}", auth_header))
            .map_err(|_| Status::invalid_argument("Invalid auth header"))?;
        request.metadata_mut().insert("authorization", metadata_value);
        
        // Make the request
        let response = self.client.get_payment_id_address(request).await?;
        let address_info = response.into_inner();
        
        // Store in database
        self.store_deposit_record(user_id, &payment_id).await?;
        
        Ok(DepositInfo {
            address: address_info.one_sided_address_base58,
            payment_id: payment_id.clone(),
            emoji_address: address_info.one_sided_address_emoji,
            instructions: format!("Send XTM to {} with payment ID: {}", 
                address_info.one_sided_address_base58, payment_id),
            qr_code: self.generate_qr_code(&address_info.one_sided_address_base58, &payment_id),
        })
    }
    
    async fn store_deposit_record(&self, user_id: &str, payment_id: &str) -> Result<(), Status> {
        // Implementation depends on your database
        println!("Storing deposit record: User {}, Payment ID {}", user_id, payment_id);
        Ok(())
    }
    
    fn generate_qr_code(&self, address: &str, payment_id: &str) -> String {
        format!("tari:{}?payment_id={}", address, payment_id)
    }
}

#[derive(Debug)]
pub struct DepositInfo {
    pub address: String,
    pub payment_id: String,
    pub emoji_address: String,
    pub instructions: String,
    pub qr_code: String,
}`}
            />
        ),
    },
    {
        label: 'PHP',
        content: (
            <CodeContent
                code={`client = new WalletClient('localhost:18143', [
            'credentials' => ChannelCredentials::createInsecure()
        ]);
        
        // Authentication metadata
        $authString = base64_encode('exchange_user:secure_password_here');
        $this->metadata = ['authorization' => ["Basic {$authString}"]];
    }
    
    public function generateDepositAddress($userId) {
        // Generate unique payment ID
        $timestamp = time();
        $randomHex = bin2hex(random_bytes(4));
        $paymentId = "deposit-{$userId}-{$timestamp}-{$randomHex}";
        
        $paymentIdBytes = $paymentId;
        
        try {
            // Create request
            $request = new GetPaymentIdAddressRequest([
                'payment_id' => $paymentIdBytes
            ]);
            
            // Make gRPC call
            list($response, $status) = $this->client->GetPaymentIdAddress(
                $request, 
                $this->metadata
            )->wait();
            
            if ($status->code !== Grpc\STATUS_OK) {
                throw new Exception("gRPC error: " . $status->details);
            }
            
            // Store in database
            $this->storeDepositRecord($userId, $paymentId);
            
            return [
                'address' => $response->getOneSidedAddressBase58(),
                'payment_id' => $paymentId,
                'emoji_address' => $response->getOneSidedAddressEmoji(),
                'instructions' => "Send XTM to {$response->getOneSidedAddressBase58()} with payment ID: {$paymentId}",
                'qr_code' => $this->generateQRCode($response->getOneSidedAddressBase58(), $paymentId)
            ];
            
        } catch (Exception $e) {
            throw new Exception("Failed to generate deposit address: " . $e->getMessage());
        }
    }
    
    private function storeDepositRecord($userId, $paymentId) {
        // Implementation depends on your database
        error_log("Storing deposit record: User {$userId}, Payment ID {$paymentId}");
    }
    
    private function generateQRCode($address, $paymentId) {
        return "tari:{$address}?payment_id={$paymentId}";
    }
}
?>`}
            />
        ),
    },
];
