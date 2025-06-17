import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const processApprovedWithdrawals = [
    {
        label: 'Pseudocode',
        content: (
            <CodeHighlight title="🧠 Withdrawal Processing Logic">
                <CodeContent
                    code={`FUNCTION processApprovedWithdrawal(withdrawalRecord):
    // Step 1: Final validation checks
    IF (withdrawalRecord.status != "approved"):
        THROW "Withdrawal not approved for processing"
    
    IF (isWithdrawalExpired(withdrawalRecord)):
        markWithdrawalAsExpired(withdrawalRecord.id)
        THROW "Withdrawal request has expired"
    
    // Step 2: Connect to cold storage wallet
    TRY:
        coldWallet = connectToColdWallet()
        IF (NOT coldWallet.isOnline()):
            THROW "Cold wallet not accessible"
    CATCH (connection_error):
        THROW "Failed to connect to cold wallet: " + connection_error.message
    
    // Step 3: Sync wallet and verify balance
    TRY:
        coldWallet.sync()
        currentBalance = coldWallet.getBalance()
        
        totalRequired = withdrawalRecord.amount + withdrawalRecord.fee
        
        IF (currentBalance.available < totalRequired):
            notifyAdminsLowBalance(currentBalance.available, totalRequired)
            THROW "Insufficient cold wallet balance"
        
    CATCH (sync_error):
        THROW "Wallet sync failed: " + sync_error.message
    
    // Step 4: Create and validate payment recipient
    recipient = {
        address: withdrawalRecord.destinationAddress,
        amount: withdrawalRecord.amount,
        fee_per_gram: 25, // Standard fee rate
        payment_type: "ONE_SIDED", // Always use one-sided for exchanges
        payment_id: withdrawalRecord.id // Use withdrawal ID as payment ID
    }
    
    // Step 5: Final security checks
    IF (isAddressCompromised(recipient.address)):
        THROW "Destination address flagged as compromised"
    
    // Step 6: Execute the transaction
    TRY:
        // Update status to processing
        updateWithdrawalStatus(withdrawalRecord.id, "processing")
        
        // Send the transaction
        transactionRequest = {
            recipients: [recipient]
        }
        
        response = coldWallet.transfer(transactionRequest)
        
        // Step 7: Validate transaction response
        IF (response.results.length == 0):
            THROW "No transaction result received"
        
        result = response.results[0]
        
        IF (NOT result.is_success):
            THROW "Transaction failed: " + result.failure_message
        
        transactionId = result.transaction_id
        
        // Step 8: Get transaction details for verification
        transactionDetails = coldWallet.getTransactionInfo([transactionId])
        
        IF (transactionDetails.length == 0):
            THROW "Could not retrieve transaction details"
        
        txInfo = transactionDetails[0]
        
        // Step 9: Update database records
        BEGIN_DATABASE_TRANSACTION()
        
        updateWithdrawalStatus(withdrawalRecord.id, "completed")
        updateWithdrawalTransactionInfo(withdrawalRecord.id, {
            transactionId: transactionId,
            transactionHash: txInfo.excess_sig,
            broadcastTime: getCurrentTimestamp(),
            fee: txInfo.fee
        })
        
        // Deduct from user's reserved balance
        deductReservedBalance(withdrawalRecord.userId, totalRequired)
        
        // Create audit log entry
        createAuditLog({
            action: "withdrawal_processed",
            userId: withdrawalRecord.userId,
            amount: withdrawalRecord.amount,
            transactionId: transactionId,
            destinationAddress: withdrawalRecord.destinationAddress,
            processedBy: getCurrentOperator(),
            timestamp: getCurrentTimestamp()
        })
        
        COMMIT_DATABASE_TRANSACTION()
        
        // Step 10: Notifications
        notifyUserWithdrawalCompleted(withdrawalRecord.userId, {
            amount: withdrawalRecord.amount,
            transactionId: transactionId,
            estimatedConfirmationTime: "10-15 minutes"
        })
        
        // Step 11: Monitoring setup
        addTransactionToMonitoring(transactionId, withdrawalRecord.id)
        
        LOG "Successfully processed withdrawal: " + withdrawalRecord.id + 
            " for user " + withdrawalRecord.userId + 
            " amount " + (withdrawalRecord.amount / 1_000_000) + " XTM"
        
        RETURN {
            success: true,
            transactionId: transactionId,
            transactionHash: txInfo.excess_sig,
            estimatedConfirmationTime: "10-15 minutes"
        }
        
    CATCH (transaction_error):
        // Rollback database changes
        ROLLBACK_DATABASE_TRANSACTION()
        
        // Update withdrawal status to failed
        updateWithdrawalStatus(withdrawalRecord.id, "failed")
        addWithdrawalErrorLog(withdrawalRecord.id, transaction_error.message)
        
        // Notify admins of failure
        notifyAdminsWithdrawalFailed(withdrawalRecord, transaction_error.message)
        
        THROW "Transaction processing failed: " + transaction_error.message
    
    FINALLY:
        // Always disconnect from cold wallet for security
        IF (coldWallet):
            coldWallet.disconnect()`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'grpcurl',
        content: (
            <CodeHighlight title="🧪 Process Withdrawal with grpcurl" variant="secondary">
                <CodeContent
                    code={`# Complete withdrawal processing script
#!/bin/bash

echo "=== Cold Storage Withdrawal Processing ==="

# Configuration
WALLET_HOST="localhost:18143"
RECIPIENT_ADDRESS="\${1:-}"
AMOUNT="\${2:-1000000}"
WITHDRAWAL_ID="\${3:-withdraw_$(date +%s)_$(openssl rand -hex 4)}"

if [ -z "$RECIPIENT_ADDRESS" ]; then
    echo "Usage: $0  [amount_microxtm] [withdrawal_id]"
    echo "Example: $0 12HVCEeZC2RGE4SDn3yGwqz... 1000000 withdraw_123_abc"
    exit 1
fi

# Authentication (if enabled)
AUTH_HEADER=""
if [ -n "$WALLET_USER" ] && [ -n "$WALLET_PASS" ]; then
    AUTH_HEADER="-H authorization: Basic $(echo -n "$WALLET_USER:$WALLET_PASS" | base64 -w 0)"
fi

echo "🔐 Step 1: Connecting to cold wallet..."

# Test connectivity
if ! grpcurl -plaintext -connect-timeout 5 $AUTH_HEADER $WALLET_HOST list > /dev/null 2>&1; then
    echo "❌ Cold wallet not accessible"
    exit 1
fi

echo "✅ Cold wallet accessible"

echo "🔄 Step 2: Syncing wallet..."

# Get wallet state (this triggers sync)
WALLET_STATE=$(grpcurl -plaintext $AUTH_HEADER $WALLET_HOST tari.rpc.Wallet/GetState 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "❌ Failed to get wallet state"
    exit 1
fi

# Extract sync status
SCANNED_HEIGHT=$(echo "$WALLET_STATE" | jq -r '.scanned_height // 0')
NETWORK_STATUS=$(echo "$WALLET_STATE" | jq -r '.network.status // "Unknown"')

echo "Wallet scanned height: $SCANNED_HEIGHT"
echo "Network status: $NETWORK_STATUS"

if [ "$NETWORK_STATUS" != "Online" ]; then
    echo "⚠️  Warning: Wallet not fully online"
fi

echo "💰 Step 3: Checking wallet balance..."

# Get current balance
BALANCE_RESPONSE=$(grpcurl -plaintext $AUTH_HEADER $WALLET_HOST tari.rpc.Wallet/GetBalance 2>/dev/null)
AVAILABLE_BALANCE=$(echo "$BALANCE_RESPONSE" | jq -r '.available_balance // 0')

echo "Available balance: $AVAILABLE_BALANCE microXTM"

# Calculate total required (amount + estimated fee)
FEE_PER_GRAM=25
ESTIMATED_FEE=$((FEE_PER_GRAM * 200))  # Rough estimate
TOTAL_REQUIRED=$((AMOUNT + ESTIMATED_FEE))

echo "Amount to send: $AMOUNT microXTM"
echo "Estimated fee: $ESTIMATED_FEE microXTM"
echo "Total required: $TOTAL_REQUIRED microXTM"

if [ "$AVAILABLE_BALANCE" -lt "$TOTAL_REQUIRED" ]; then
    echo "❌ Insufficient balance"
    echo "Available: $(echo "scale=6; $AVAILABLE_BALANCE / 1000000" | bc) XTM"
    echo "Required: $(echo "scale=6; $TOTAL_REQUIRED / 1000000" | bc) XTM"
    exit 1
fi

echo "✅ Sufficient balance"

echo "🚀 Step 4: Processing withdrawal..."

# Encode withdrawal ID as payment ID
PAYMENT_ID_B64=$(echo -n "$WITHDRAWAL_ID" | base64 -w 0)

# Execute withdrawal
WITHDRAW_RESPONSE=$(grpcurl -plaintext $AUTH_HEADER \
  -d "{
    \"recipients\": [{
      \"address\": \"$RECIPIENT_ADDRESS\",
      \"amount\": $AMOUNT,
      \"fee_per_gram\": $FEE_PER_GRAM,
      \"payment_type\": \"ONE_SIDED\",
      \"payment_id\": \"$PAYMENT_ID_B64\"
    }]
  }" \
  $WALLET_HOST \
  tari.rpc.Wallet/Transfer 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "❌ Withdrawal transaction failed"
    exit 1
fi

echo "✅ Withdrawal transaction sent"

# Parse response
IS_SUCCESS=$(echo "$WITHDRAW_RESPONSE" | jq -r '.results[0].is_success // false')
TRANSACTION_ID=$(echo "$WITHDRAW_RESPONSE" | jq -r '.results[0].transaction_id // empty')
FAILURE_MESSAGE=$(echo "$WITHDRAW_RESPONSE" | jq -r '.results[0].failure_message // empty')

if [ "$IS_SUCCESS" != "true" ]; then
    echo "❌ Transaction failed: $FAILURE_MESSAGE"
    exit 1
fi

echo "📋 Transaction ID: $TRANSACTION_ID"

echo "🔍 Step 5: Getting transaction details..."

# Get detailed transaction information
TX_INFO=$(grpcurl -plaintext $AUTH_HEADER \
  -d "{\"transaction_ids\": [$TRANSACTION_ID]}" \
  $WALLET_HOST \
  tari.rpc.Wallet/GetTransactionInfo 2>/dev/null)

if [ $? -eq 0 ] && [ -n "$TX_INFO" ]; then
    echo "Transaction details:"
    echo "$TX_INFO" | jq .
    
    # Extract transaction hash
    TX_HASH=$(echo "$TX_INFO" | jq -r '.transactions[0].excess_sig // empty')
    if [ -n "$TX_HASH" ]; then
        echo "📄 Transaction Hash: $TX_HASH"
    fi
else
    echo "⚠️  Could not retrieve transaction details"
fi

echo "✅ Withdrawal processing complete"

# Summary
echo "==================="
echo "WITHDRAWAL SUMMARY"
echo "==================="
echo "Withdrawal ID: $WITHDRAWAL_ID"
echo "Recipient: $RECIPIENT_ADDRESS"
echo "Amount: $(echo "scale=6; $AMOUNT / 1000000" | bc) XTM"
echo "Transaction ID: $TRANSACTION_ID"
echo "Status: Completed"
echo "Estimated confirmation: 10-15 minutes"
echo "==================="

# Optional: Monitor transaction status
echo "💡 To monitor transaction status:"
echo "grpcurl -plaintext $AUTH_HEADER -d '{\"transaction_ids\": [$TRANSACTION_ID]}' $WALLET_HOST tari.rpc.Wallet/GetTransactionInfo"`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Node.js',
        content: (
            <CodeContent
                code={`class TariWithdrawalProcessor {
    constructor(walletClient, metadata) {
        this.walletClient = walletClient;
        this.metadata = metadata;
    }
    
    async processApprovedWithdrawal(withdrawalRecord) {
        let transactionResult = null;
        
        try {
            // Step 1: Final validation
            if (withdrawalRecord.status !== 'approved') {
                throw new Error('Withdrawal not approved for processing');
            }
            
            if (this.isWithdrawalExpired(withdrawalRecord)) {
                await this.markWithdrawalAsExpired(withdrawalRecord.id);
                throw new Error('Withdrawal request has expired');
            }
            
            // Step 2: Sync wallet and check balance
            console.log('🔄 Syncing cold wallet...');
            await this.syncWallet();
            
            const balance = await this.getWalletBalance();
            const totalRequired = withdrawalRecord.amount + withdrawalRecord.fee;
            
            if (balance.available_balance < totalRequired) {
                await this.notifyAdminsLowBalance(balance.available_balance, totalRequired);
                throw new Error(\`Insufficient cold wallet balance: \${balance.available_balance / 1000000} XTM available, \${totalRequired / 1000000} XTM required\`);
            }
            
            console.log(\`✅ Sufficient balance: \${balance.available_balance / 1000000} XTM\`);
            
            // Step 3: Create payment recipient
            const recipient = {
                address: withdrawalRecord.destinationAddress,
                amount: withdrawalRecord.amount,
                fee_per_gram: 25,
                payment_type: 'ONE_SIDED',
                payment_id: Buffer.from(withdrawalRecord.id, 'utf8')
            };
            
            // Step 4: Final security checks
            if (await this.isAddressCompromised(recipient.address)) {
                throw new Error('Destination address flagged as compromised');
            }
            
            // Step 5: Update status to processing
            await this.updateWithdrawalStatus(withdrawalRecord.id, 'processing');
            
            // Step 6: Execute transaction
            console.log('🚀 Executing withdrawal transaction...');
            
            const response = await new Promise((resolve, reject) => {
                this.walletClient.Transfer(
                    { recipients: [recipient] },
                    this.metadata,
                    (error, response) => {
                        if (error) reject(error);
                        else resolve(response);
                    }
                );
            });
            
            // Step 7: Validate transaction response
            if (!response.results || response.results.length === 0) {
                throw new Error('No transaction result received');
            }
            
            const result = response.results[0];
            
            if (!result.is_success) {
                throw new Error(\`Transaction failed: \${result.failure_message}\`);
            }
            
            const transactionId = result.transaction_id;
            console.log(\`✅ Transaction sent successfully. ID: \${transactionId}\`);
            
            // Step 8: Get transaction details for verification
            const transactionDetails = await this.getTransactionDetails(transactionId);
            
            transactionResult = {
                transactionId: transactionId,
                transactionHash: transactionDetails.excess_sig ? 
                    Buffer.from(transactionDetails.excess_sig).toString('hex') : null,
                fee: transactionDetails.fee,
                broadcastTime: new Date()
            };
            
            // Step 9: Update database records (atomic transaction)
            await this.updateWithdrawalCompletion(withdrawalRecord, transactionResult);
            
            // Step 10: Notifications
            await this.notifyUserWithdrawalCompleted(withdrawalRecord.userId, {
                amount: withdrawalRecord.amount,
                transactionId: transactionId,
                estimatedConfirmationTime: '10-15 minutes'
            });
            
            // Step 11: Setup monitoring
            await this.addTransactionToMonitoring(transactionId, withdrawalRecord.id);
            
            console.log(\`✅ Successfully processed withdrawal \${withdrawalRecord.id} for user \${withdrawalRecord.userId}\`);
            
            return {
                success: true,
                transactionId: transactionId,
                transactionHash: transactionResult.transactionHash,
                estimatedConfirmationTime: '10-15 minutes'
            };
            
        } catch (error) {
            console.error(\`❌ Withdrawal processing failed: \${error.message}\`);
            
            // Update withdrawal status to failed
            await this.updateWithdrawalStatus(withdrawalRecord.id, 'failed');
            await this.addWithdrawalErrorLog(withdrawalRecord.id, error.message);
            
            // Notify admins
            await this.notifyAdminsWithdrawalFailed(withdrawalRecord, error.message);
            
            throw error;
        }
    }
    
    async syncWallet() {
        return new Promise((resolve, reject) => {
            this.walletClient.GetState({}, this.metadata, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            });
        });
    }
    
    async getWalletBalance() {
        return new Promise((resolve, reject) => {
            this.walletClient.GetBalance({}, this.metadata, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            });
        });
    }
    
    async getTransactionDetails(transactionId) {
        return new Promise((resolve, reject) => {
            this.walletClient.GetTransactionInfo(
                { transaction_ids: [transactionId] },
                this.metadata,
                (error, response) => {
                    if (error) reject(error);
                    else {
                        const tx = response.transactions[0];
                        resolve(tx || {});
                    }
                }
            );
        });
    }
    
    async updateWithdrawalCompletion(withdrawalRecord, transactionResult) {
        // Implement atomic database transaction
        try {
            // Start database transaction
            await this.database.beginTransaction();
            
            // Update withdrawal status
            await this.updateWithdrawalStatus(withdrawalRecord.id, 'completed');
            
            // Update transaction info
            await this.updateWithdrawalTransactionInfo(withdrawalRecord.id, transactionResult);
            
            // Deduct from user's reserved balance
            await this.deductReservedBalance(
                withdrawalRecord.userId, 
                withdrawalRecord.amount + withdrawalRecord.fee
            );
            
            // Create audit log
            await this.createAuditLog({
                action: 'withdrawal_processed',
                userId: withdrawalRecord.userId,
                amount: withdrawalRecord.amount,
                transactionId: transactionResult.transactionId,
                destinationAddress: withdrawalRecord.destinationAddress,
                processedBy: this.getCurrentOperator(),
                timestamp: new Date()
            });
            
            // Commit transaction
            await this.database.commitTransaction();
            
        } catch (error) {
            await this.database.rollbackTransaction();
            throw error;
        }
    }
    
    isWithdrawalExpired(withdrawalRecord) {
        const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
        return Date.now() - withdrawalRecord.createdAt.getTime() > expirationTime;
    }
    
    // Helper methods (implement based on your system)
    async updateWithdrawalStatus(withdrawalId, status) { /* Implementation */ }
    async markWithdrawalAsExpired(withdrawalId) { /* Implementation */ }
    async isAddressCompromised(address) { /* Implementation */ }
    async notifyAdminsLowBalance(available, required) { /* Implementation */ }
    async notifyUserWithdrawalCompleted(userId, details) { /* Implementation */ }
    async notifyAdminsWithdrawalFailed(withdrawal, error) { /* Implementation */ }
    async addTransactionToMonitoring(txId, withdrawalId) { /* Implementation */ }
    async addWithdrawalErrorLog(withdrawalId, error) { /* Implementation */ }
    async updateWithdrawalTransactionInfo(withdrawalId, txInfo) { /* Implementation */ }
    async deductReservedBalance(userId, amount) { /* Implementation */ }
    async createAuditLog(logEntry) { /* Implementation */ }
    getCurrentOperator() { return 'system'; }
}`}
            />
        ),
    },
    {
        label: 'Python',
        content: (
            <CodeContent
                code={`import asyncio
from datetime import datetime, timedelta
from typing import Dict, Optional

class TariWithdrawalProcessor:
    def __init__(self, wallet_client, metadata):
        self.wallet_client = wallet_client
        self.metadata = metadata
    
    async def process_approved_withdrawal(self, withdrawal_record: Dict) -> Dict:
        """Process an approved withdrawal through the cold storage wallet"""
        transaction_result = None
        
        try:
            # Step 1: Final validation
            if withdrawal_record['status'] != 'approved':
                raise Exception('Withdrawal not approved for processing')
            
            if self.is_withdrawal_expired(withdrawal_record):
                await self.mark_withdrawal_as_expired(withdrawal_record['id'])
                raise Exception('Withdrawal request has expired')
            
            # Step 2: Sync wallet and check balance
            print('🔄 Syncing cold wallet...')
            await self.sync_wallet()
            
            balance = await self.get_wallet_balance()
            total_required = withdrawal_record['amount'] + withdrawal_record['fee']
            
            if balance.available_balance < total_required:
                await self.notify_admins_low_balance(balance.available_balance, total_required)
                raise Exception(f'Insufficient cold wallet balance: {balance.available_balance / 1_000_000} XTM available, {total_required / 1_000_000} XTM required')
            
            print(f'✅ Sufficient balance: {balance.available_balance / 1_000_000} XTM')
            
            # Step 3: Create payment recipient
            recipient = wallet_pb2.PaymentRecipient(
                address=withdrawal_record['destination_address'],
                amount=withdrawal_record['amount'],
                fee_per_gram=25,
                payment_type=wallet_pb2.PaymentRecipient.PaymentType.ONE_SIDED,
                payment_id=withdrawal_record['id'].encode('utf-8')
            )
            
            # Step 4: Final security checks
            if await self.is_address_compromised(recipient.address):
                raise Exception('Destination address flagged as compromised')
            
            # Step 5: Update status to processing
            await self.update_withdrawal_status(withdrawal_record['id'], 'processing')
            
            # Step 6: Execute transaction
            print('🚀 Executing withdrawal transaction...')
            
            request = wallet_pb2.TransferRequest(recipients=[recipient])
            response = self.wallet_client.Transfer(request, metadata=self.metadata)
            
            # Step 7: Validate transaction response
            if not response.results or len(response.results) == 0:
                raise Exception('No transaction result received')
            
            result = response.results[0]
            
            if not result.is_success:
                raise Exception(f'Transaction failed: {result.failure_message}')
            
            transaction_id = result.transaction_id
            print(f'✅ Transaction sent successfully. ID: {transaction_id}')
            
            # Step 8: Get transaction details for verification
            transaction_details = await self.get_transaction_details(transaction_id)
            
            transaction_result = {
                'transaction_id': transaction_id,
                'transaction_hash': transaction_details.excess_sig.hex() if transaction_details.excess_sig else None,
                'fee': transaction_details.fee,
                'broadcast_time': datetime.now()
            }
            
            # Step 9: Update database records (atomic transaction)
            await self.update_withdrawal_completion(withdrawal_record, transaction_result)
            
            # Step 10: Notifications
            await self.notify_user_withdrawal_completed(withdrawal_record['user_id'], {
                'amount': withdrawal_record['amount'],
                'transaction_id': transaction_id,
                'estimated_confirmation_time': '10-15 minutes'
            })
            
            # Step 11: Setup monitoring
            await self.add_transaction_to_monitoring(transaction_id, withdrawal_record['id'])
            
            print(f'✅ Successfully processed withdrawal {withdrawal_record["id"]} for user {withdrawal_record["user_id"]}')
            
            return {
                'success': True,
                'transaction_id': transaction_id,
                'transaction_hash': transaction_result['transaction_hash'],
                'estimated_confirmation_time': '10-15 minutes'
            }
            
        except Exception as error:
            print(f'❌ Withdrawal processing failed: {error}')
            
            # Update withdrawal status to failed
            await self.update_withdrawal_status(withdrawal_record['id'], 'failed')
            await self.add_withdrawal_error_log(withdrawal_record['id'], str(error))
            
            # Notify admins
            await self.notify_admins_withdrawal_failed(withdrawal_record, str(error))
            
            raise error
    
    async def sync_wallet(self):
        """Sync wallet with blockchain"""
        request = wallet_pb2.GetStateRequest()
        response = self.wallet_client.GetState(request, metadata=self.metadata)
        return response
    
    async def get_wallet_balance(self):
        """Get current wallet balance"""
        request = wallet_pb2.GetBalanceRequest()
        response = self.wallet_client.GetBalance(request, metadata=self.metadata)
        return response
    
    async def get_transaction_details(self, transaction_id: int):
        """Get detailed transaction information"""
        request = wallet_pb2.GetTransactionInfoRequest(transaction_ids=[transaction_id])
        response = self.wallet_client.GetTransactionInfo(request, metadata=self.metadata)
        
        if response.transactions:
            return response.transactions[0]
        return None
    
    async def update_withdrawal_completion(self, withdrawal_record: Dict, transaction_result: Dict):
        """Update withdrawal completion with atomic database transaction"""
        try:
            # Start database transaction
            await self.database.begin_transaction()
            
            # Update withdrawal status
            await self.update_withdrawal_status(withdrawal_record['id'], 'completed')
            
            # Update transaction info
            await self.update_withdrawal_transaction_info(withdrawal_record['id'], transaction_result)
            
            # Deduct from user's reserved balance
            await self.deduct_reserved_balance(
                withdrawal_record['user_id'],
                withdrawal_record['amount'] + withdrawal_record['fee']
            )
            
            # Create audit log
            await self.create_audit_log({
                'action': 'withdrawal_processed',
                'user_id': withdrawal_record['user_id'],
                'amount': withdrawal_record['amount'],
                'transaction_id': transaction_result['transaction_id'],
                'destination_address': withdrawal_record['destination_address'],
                'processed_by': self.get_current_operator(),
                'timestamp': datetime.now()
            })
            
            # Commit transaction
            await self.database.commit_transaction()
            
        except Exception as error:
            await self.database.rollback_transaction()
            raise error
    
    def is_withdrawal_expired(self, withdrawal_record: Dict) -> bool:
        """Check if withdrawal request has expired"""
        expiration_time = timedelta(hours=24)
        return datetime.now() - withdrawal_record['created_at'] > expiration_time
    
    # Helper methods (implement based on your system)
    async def update_withdrawal_status(self, withdrawal_id: str, status: str):
        """Update withdrawal status"""
        pass
    
    async def mark_withdrawal_as_expired(self, withdrawal_id: str):
        """Mark withdrawal as expired"""
        pass
    
    async def is_address_compromised(self, address: str) -> bool:
        """Check if address is compromised"""
        return False
    
    async def notify_admins_low_balance(self, available: int, required: int):
        """Notify admins of low balance"""
        pass
    
    async def notify_user_withdrawal_completed(self, user_id: str, details: Dict):
        """Notify user of completed withdrawal"""
        pass
    
    async def notify_admins_withdrawal_failed(self, withdrawal: Dict, error: str):
        """Notify admins of failed withdrawal"""
        pass
    
    async def add_transaction_to_monitoring(self, tx_id: int, withdrawal_id: str):
        """Add transaction to monitoring system"""
        pass
    
    async def add_withdrawal_error_log(self, withdrawal_id: str, error: str):
        """Log withdrawal error"""
        pass
    
    async def update_withdrawal_transaction_info(self, withdrawal_id: str, tx_info: Dict):
        """Update withdrawal with transaction info"""
        pass
    
    async def deduct_reserved_balance(self, user_id: str, amount: int):
        """Deduct amount from user's reserved balance"""
        pass
    
    async def create_audit_log(self, log_entry: Dict):
        """Create audit log entry"""
        pass
    
    def get_current_operator(self) -> str:
        """Get current system operator"""
        return 'system'`}
            />
        ),
    },
    {
        label: 'Rust',
        content: (
            <CodeContent
                code={`use tokio::time::{sleep, Duration};
use chrono::{DateTime, Utc};
use std::error::Error;

pub struct TariWithdrawalProcessor {
    wallet_client: WalletClient,
    metadata: MetadataMap,
}

impl TariWithdrawalProcessor {
    pub fn new(wallet_client: WalletClient, metadata: MetadataMap) -> Self {
        Self {
            wallet_client,
            metadata,
        }
    }
    
    pub async fn process_approved_withdrawal(&mut self, withdrawal_record: &WithdrawalRecord) -> Result> {
        // Step 1: Final validation
        if withdrawal_record.status != WithdrawalStatus::Approved {
            return Err("Withdrawal not approved for processing".into());
        }
        
        if self.is_withdrawal_expired(withdrawal_record) {
            self.mark_withdrawal_as_expired(&withdrawal_record.id).await?;
            return Err("Withdrawal request has expired".into());
        }
        
        // Step 2: Sync wallet and check balance
        println!("🔄 Syncing cold wallet...");
        self.sync_wallet().await?;
        
        let balance = self.get_wallet_balance().await?;
        let total_required = withdrawal_record.amount + withdrawal_record.fee;
        
        if balance.available_balance < total_required {
            self.notify_admins_low_balance(balance.available_balance, total_required).await?;
            return Err(format!("Insufficient cold wallet balance: {} XTM available, {} XTM required",
                balance.available_balance as f64 / 1_000_000.0,
                total_required as f64 / 1_000_000.0).into());
        }
        
        println!("✅ Sufficient balance: {} XTM", balance.available_balance as f64 / 1_000_000.0);
        
        // Step 3: Create payment recipient
        let recipient = PaymentRecipient {
            address: withdrawal_record.destination_address.clone(),
            amount: withdrawal_record.amount,
            fee_per_gram: 25,
            payment_type: PaymentType::OneSided as i32,
            payment_id: withdrawal_record.id.as_bytes().to_vec(),
        };
        
        // Step 4: Final security checks
        if self.is_address_compromised(&recipient.address).await? {
            return Err("Destination address flagged as compromised".into());
        }
        
        // Step 5: Update status to processing
        self.update_withdrawal_status(&withdrawal_record.id, WithdrawalStatus::Processing).await?;
        
        // Step 6: Execute transaction
        println!("🚀 Executing withdrawal transaction...");
        
        let mut request = Request::new(TransferRequest {
            recipients: vec![recipient],
        });
        
        // Add authentication metadata
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        // Add authentication metadata
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        // Add authentication metadata
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        // Add authentication metadata
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }

        // Add authentication metadata
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }

        let response = self.wallet_client.transfer(request).await?;
        let response = response.into_inner();
        
        // Step 7: Validate transaction response
        let result = response.results.first()
            .ok_or("No transaction result received")?;
        
        if !result.is_success {
            let error_msg = format!("Transaction failed: {}", result.failure_message);
            self.update_withdrawal_status(&withdrawal_record.id, WithdrawalStatus::Failed).await?;
            self.add_withdrawal_error_log(&withdrawal_record.id, &error_msg).await?;
            return Err(error_msg.into());
        }
        
        let transaction_id = result.transaction_id;
        println!("✅ Transaction sent successfully. ID: {}", transaction_id);
        
        // Step 8: Get transaction details for verification
        let transaction_details = self.get_transaction_details(transaction_id).await?;
        
        let transaction_result = TransactionResult {
            transaction_id,
            transaction_hash: if !transaction_details.excess_sig.is_empty() {
                Some(hex::encode(&transaction_details.excess_sig))
            } else {
                None
            },
            fee: transaction_details.fee,
            broadcast_time: Utc::now(),
        };
        
        // Step 9: Update database records (atomic transaction)
        self.update_withdrawal_completion(withdrawal_record, &transaction_result).await?;
        
        // Step 10: Notifications
        self.notify_user_withdrawal_completed(&withdrawal_record.user_id, &WithdrawalNotification {
            amount: withdrawal_record.amount,
            transaction_id,
            estimated_confirmation_time: "10-15 minutes".to_string(),
        }).await?;
        
        // Step 11: Setup monitoring
        self.add_transaction_to_monitoring(transaction_id, &withdrawal_record.id).await?;
        
        println!("✅ Successfully processed withdrawal {} for user {}", 
            withdrawal_record.id, withdrawal_record.user_id);
        
        Ok(WithdrawalResult {
            success: true,
            transaction_id,
            transaction_hash: transaction_result.transaction_hash,
            estimated_confirmation_time: "10-15 minutes".to_string(),
        })
    }
    
    async fn sync_wallet(&mut self) -> Result<(), Box> {
        let mut request = Request::new(());
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }

        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }

        let _response = self.wallet_client.get_state(request).await?;
        Ok(())
    }
    
    async fn get_wallet_balance(&mut self) -> Result> {
        let mut request = Request::new(GetBalanceRequest::default());
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }

        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }

        let response = self.wallet_client.get_balance(request).await?;
        Ok(response.into_inner())
    }
    
    async fn get_transaction_details(&mut self, transaction_id: u64) -> Result> {
        let mut request = Request::new(GetTransactionInfoRequest {
            transaction_ids: vec![transaction_id],
        });
        
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        for (key, value) in &self.metadata {
            request.metadata_mut().insert(key.clone(), value.clone());
        }
        let response = self.wallet_client.get_transaction_info(request).await?;
        let response = response.into_inner();
        
        response.transactions.first()
            .cloned()
            .ok_or("Transaction not found".into())
    }
    
    async fn update_withdrawal_completion(&self, withdrawal_record: &WithdrawalRecord, transaction_result: &TransactionResult) -> Result<(), Box> {
        // Implement atomic database transaction
        // 1. Start database transaction
        // 2. Update withdrawal status
        // 3. Update transaction info
        // 4. Deduct from user's reserved balance
        // 5. Create audit log
        // 6. Commit transaction
        
        println!("Updating withdrawal completion for {}", withdrawal_record.id);
        Ok(())
    }
    
    fn is_withdrawal_expired(&self, withdrawal_record: &WithdrawalRecord) -> bool {
        let expiration_duration = chrono::Duration::hours(24);
        Utc::now() - withdrawal_record.created_at > expiration_duration
    }
    
    // Helper methods (implement based on your system)
    async fn update_withdrawal_status(&self, withdrawal_id: &str, status: WithdrawalStatus) -> Result<(), Box> {
        println!("Updating withdrawal {} status to {:?}", withdrawal_id, status);
        Ok(())
    }
    
    async fn mark_withdrawal_as_expired(&self, withdrawal_id: &str) -> Result<(), Box> {
        println!("Marking withdrawal {} as expired", withdrawal_id);
        Ok(())
    }
    
    async fn is_address_compromised(&self, address: &str) -> Result> {
        // Check against blacklist/compromised address database
        Ok(false)
    }
    
    async fn notify_admins_low_balance(&self, available: u64, required: u64) -> Result<(), Box> {
        println!("⚠️  Low balance alert: {} available, {} required", available, required);
        Ok(())
    }
    
    async fn notify_user_withdrawal_completed(&self, user_id: &str, notification: &WithdrawalNotification) -> Result<(), Box> {
        println!("Notifying user {} of completed withdrawal", user_id);
        Ok(())
    }
    
    async fn add_transaction_to_monitoring(&self, tx_id: u64, withdrawal_id: &str) -> Result<(), Box> {
        println!("Adding transaction {} to monitoring for withdrawal {}", tx_id, withdrawal_id);
        Ok(())
    }
    
    async fn add_withdrawal_error_log(&self, withdrawal_id: &str, error: &str) -> Result<(), Box> {
        println!("Error log for withdrawal {}: {}", withdrawal_id, error);
        Ok(())
    }
}

#[derive(Debug)]
struct TransactionResult {
    transaction_id: u64,
    transaction_hash: Option,
    fee: u64,
    broadcast_time: DateTime,
}

#[derive(Debug)]
struct WithdrawalNotification {
    amount: u64,
    transaction_id: u64,
    estimated_confirmation_time: String,
}

#[derive(Debug)]
pub struct WithdrawalResult {
    pub success: bool,
    pub transaction_id: u64,
    pub transaction_hash: Option,
    pub estimated_confirmation_time: String,
}`}
            />
        ),
    },
    {
        label: 'PHP',
        content: (
            <CodeContent
                code={`walletClient = $walletClient;
        $this->metadata = $metadata;
    }
    
    public function processApprovedWithdrawal(array $withdrawalRecord): array {
        $transactionResult = null;
        
        try {
            // Step 1: Final validation
            if ($withdrawalRecord['status'] !== 'approved') {
                throw new Exception('Withdrawal not approved for processing');
            }
            
            if ($this->isWithdrawalExpired($withdrawalRecord)) {
                $this->markWithdrawalAsExpired($withdrawalRecord['id']);
                throw new Exception('Withdrawal request has expired');
            }
            
            // Step 2: Sync wallet and check balance
            echo "🔄 Syncing cold wallet...\n";
            $this->syncWallet();
            
            $balance = $this->getWalletBalance();
            $totalRequired = $withdrawalRecord['amount'] + $withdrawalRecord['fee'];
            
            if ($balance->getAvailableBalance() < $totalRequired) {
                $this->notifyAdminsLowBalance($balance->getAvailableBalance(), $totalRequired);
                throw new Exception(sprintf(
                    'Insufficient cold wallet balance: %.6f XTM available, %.6f XTM required',
                    $balance->getAvailableBalance() / 1000000,
                    $totalRequired / 1000000
                ));
            }
            
            echo sprintf("✅ Sufficient balance: %.6f XTM\n", $balance->getAvailableBalance() / 1000000);
            
            // Step 3: Create payment recipient
            $recipient = new \Tari\Rpc\PaymentRecipient([
                'address' => $withdrawalRecord['destination_address'],
                'amount' => $withdrawalRecord['amount'],
                'fee_per_gram' => 25,
                'payment_type' => \Tari\Rpc\PaymentRecipient\PaymentType::ONE_SIDED,
                'payment_id' => $withdrawalRecord['id']
            ]);
            
            // Step 4: Final security checks
            if ($this->isAddressCompromised($recipient->getAddress())) {
                throw new Exception('Destination address flagged as compromised');
            }
            
            // Step 5: Update status to processing
            $this->updateWithdrawalStatus($withdrawalRecord['id'], 'processing');
            
            // Step 6: Execute transaction
            echo "🚀 Executing withdrawal transaction...\n";
            
            $request = new \Tari\Rpc\TransferRequest([
                'recipients' => [$recipient]
            ]);
            
            list($response, $status) = $this->walletClient->Transfer(
                $request,
                $this->metadata
            )->wait();
            
            if ($status->code !== Grpc\STATUS_OK) {
                throw new Exception("gRPC error: " . $status->details);
            }
            
            // Step 7: Validate transaction response
            $results = $response->getResults();
            if (empty($results)) {
                throw new Exception('No transaction result received');
            }
            
            $result = $results[0];
            
            if (!$result->getIsSuccess()) {
                throw new Exception("Transaction failed: " . $result->getFailureMessage());
            }
            
            $transactionId = $result->getTransactionId();
            echo "✅ Transaction sent successfully. ID: {$transactionId}\n";
            
            // Step 8: Get transaction details for verification
            $transactionDetails = $this->getTransactionDetails($transactionId);
            
            $transactionResult = [
                'transaction_id' => $transactionId,
                'transaction_hash' => $transactionDetails ? bin2hex($transactionDetails->getExcessSig()) : null,
                'fee' => $transactionDetails ? $transactionDetails->getFee() : 0,
                'broadcast_time' => date('Y-m-d H:i:s')
            ];
            
            // Step 9: Update database records (atomic transaction)
            $this->updateWithdrawalCompletion($withdrawalRecord, $transactionResult);
            
            // Step 10: Notifications
            $this->notifyUserWithdrawalCompleted($withdrawalRecord['user_id'], [
                'amount' => $withdrawalRecord['amount'],
                'transaction_id' => $transactionId,
                'estimated_confirmation_time' => '10-15 minutes'
            ]);
            
            // Step 11: Setup monitoring
            $this->addTransactionToMonitoring($transactionId, $withdrawalRecord['id']);
            
            echo "✅ Successfully processed withdrawal {$withdrawalRecord['id']} for user {$withdrawalRecord['user_id']}\n";
            
            return [
                'success' => true,
                'transaction_id' => $transactionId,
                'transaction_hash' => $transactionResult['transaction_hash'],
                'estimated_confirmation_time' => '10-15 minutes'
            ];
            
        } catch (Exception $error) {
            echo "❌ Withdrawal processing failed: " . $error->getMessage() . "\n";
            
            // Update withdrawal status to failed
            $this->updateWithdrawalStatus($withdrawalRecord['id'], 'failed');
            $this->addWithdrawalErrorLog($withdrawalRecord['id'], $error->getMessage());
            
            // Notify admins
            $this->notifyAdminsWithdrawalFailed($withdrawalRecord, $error->getMessage());
            
            throw $error;
        }
    }
    
    private function syncWallet() {
        $request = new \Tari\Rpc\GetStateRequest();
        
        list($response, $status) = $this->walletClient->GetState(
            $request,
            $this->metadata
        )->wait();
        
        if ($status->code !== Grpc\STATUS_OK) {
            throw new Exception("Failed to sync wallet: " . $status->details);
        }
        
        return $response;
    }
    
    private function getWalletBalance() {
        $request = new \Tari\Rpc\GetBalanceRequest();
        
        list($response, $status) = $this->walletClient->GetBalance(
            $request,
            $this->metadata
        )->wait();
        
        if ($status->code !== Grpc\STATUS_OK) {
            throw new Exception("Failed to get balance: " . $status->details);
        }
        
        return $response;
    }
    
    private function getTransactionDetails(int $transactionId) {
        $request = new \Tari\Rpc\GetTransactionInfoRequest([
            'transaction_ids' => [$transactionId]
        ]);
        
        list($response, $status) = $this->walletClient->GetTransactionInfo(
            $request,
            $this->metadata
        )->wait();
        
        if ($status->code === Grpc\STATUS_OK && $response->getTransactions()) {
            return $response->getTransactions()[0];
        }
        
        return null;
    }
    
    private function updateWithdrawalCompletion(array $withdrawalRecord, array $transactionResult): void {
        try {
            // Start database transaction
            $this->database->beginTransaction();
            
            // Update withdrawal status
            $this->updateWithdrawalStatus($withdrawalRecord['id'], 'completed');
            
            // Update transaction info
            $this->updateWithdrawalTransactionInfo($withdrawalRecord['id'], $transactionResult);
            
            // Deduct from user's reserved balance
            $this->deductReservedBalance(
                $withdrawalRecord['user_id'],
                $withdrawalRecord['amount'] + $withdrawalRecord['fee']
            );
            
            // Create audit log
            $this->createAuditLog([
                'action' => 'withdrawal_processed',
                'user_id' => $withdrawalRecord['user_id'],
                'amount' => $withdrawalRecord['amount'],
                'transaction_id' => $transactionResult['transaction_id'],
                'destination_address' => $withdrawalRecord['destination_address'],
                'processed_by' => $this->getCurrentOperator(),
                'timestamp' => date('Y-m-d H:i:s')
            ]);
            
            // Commit transaction
            $this->database->commit();
            
        } catch (Exception $error) {
            $this->database->rollBack();
            throw $error;
        }
    }
    
    private function isWithdrawalExpired(array $withdrawalRecord): bool {
        $expirationTime = 24 * 60 * 60; // 24 hours in seconds
        return time() - strtotime($withdrawalRecord['created_at']) > $expirationTime;
    }
    
    // Helper methods (implement based on your system)
    private function updateWithdrawalStatus(string $withdrawalId, string $status): void {
        // Implementation
    }
    
    private function markWithdrawalAsExpired(string $withdrawalId): void {
        // Implementation
    }
    
    private function isAddressCompromised(string $address): bool {
        // Implementation
        return false;
    }
    
    private function notifyAdminsLowBalance(int $available, int $required): void {
        // Implementation
    }
    
    private function notifyUserWithdrawalCompleted(string $userId, array $details): void {
        // Implementation
    }
    
    private function notifyAdminsWithdrawalFailed(array $withdrawal, string $error): void {
        // Implementation
    }
    
    private function addTransactionToMonitoring(int $txId, string $withdrawalId): void {
        // Implementation
    }
    
    private function addWithdrawalErrorLog(string $withdrawalId, string $error): void {
        // Implementation
    }
    
    private function updateWithdrawalTransactionInfo(string $withdrawalId, array $txInfo): void {
        // Implementation
    }
    
    private function deductReservedBalance(string $userId, int $amount): void {
        // Implementation
    }
    
    private function createAuditLog(array $logEntry): void {
        // Implementation
    }
    
    private function getCurrentOperator(): string {
        return 'system';
    }
}
?>`}
            />
        ),
    },
];
