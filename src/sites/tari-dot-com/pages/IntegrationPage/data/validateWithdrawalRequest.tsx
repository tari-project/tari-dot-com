import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const validateWithdrawalRequest = [
    {
        label: 'Pseudocode',
        content: (
            <CodeHighlight title="🧠 Withdrawal Validation Logic">
                <CodeContent
                    code={`FUNCTION validateWithdrawalRequest(userId, destinationAddress, amount):
    // Step 1: Validate user authentication and KYC status
    user = database.getUser(userId)
    IF (user IS null):
        THROW "User not found"
    
    IF (NOT user.isKYCVerified):
        THROW "User not KYC verified"
    
    IF (user.isBlocked OR user.withdrawalsSuspended):
        THROW "User account restricted"
    
    // Step 2: Validate withdrawal amount
    IF (amount <= 0):
        THROW "Invalid withdrawal amount"
    
    minimumWithdrawal = getMinimumWithdrawalAmount()
    IF (amount < minimumWithdrawal):
        THROW "Amount below minimum withdrawal: " + minimumWithdrawal + " XTM"
    
    // Step 3: Check user balance (including fees)
    withdrawalFee = calculateWithdrawalFee(amount)
    totalRequired = amount + withdrawalFee
    
    IF (user.availableBalance < totalRequired):
        THROW "Insufficient balance. Required: " + totalRequired + " XTM, Available: " + user.availableBalance + " XTM"
    
    // Step 4: Validate destination address
    IF (NOT isValidTariAddress(destinationAddress)):
        THROW "Invalid Tari address format"
    
    // Step 5: Check if address is interactive (not allowed for exchanges)
    IF (isInteractiveAddress(destinationAddress)):
        THROW "Interactive addresses not supported for withdrawals"
    
    // Step 6: Security checks
    IF (isBlacklistedAddress(destinationAddress)):
        THROW "Destination address is blacklisted"
    
    // Step 7: Rate limiting and daily limits
    dailyWithdrawalLimit = getDailyWithdrawalLimit(user.kycLevel)
    todayWithdrawals = getTodayWithdrawals(userId)
    
    IF (todayWithdrawals + amount > dailyWithdrawalLimit):
        THROW "Daily withdrawal limit exceeded"
    
    // Step 8: Check for suspicious activity
    IF (detectSuspiciousActivity(userId, amount, destinationAddress)):
        THROW "Withdrawal flagged for manual review"
    
    // Step 9: Create withdrawal record
    withdrawalId = generateUniqueId()
    withdrawalRecord = {
        id: withdrawalId,
        userId: userId,
        destinationAddress: destinationAddress,
        amount: amount,
        fee: withdrawalFee,
        status: "pending_approval",
        createdAt: getCurrentTimestamp(),
        approvalRequired: (amount > getManualApprovalThreshold())
    }
    
    database.saveWithdrawal(withdrawalRecord)
    
    // Step 10: Reserve user balance
    database.reserveUserBalance(userId, totalRequired)
    
    RETURN {
        withdrawalId: withdrawalId,
        amount: amount,
        fee: withdrawalFee,
        estimatedProcessingTime: "15-30 minutes",
        approvalRequired: withdrawalRecord.approvalRequired
    }`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'grpcurl',
        content: (
            <CodeHighlight title="🧪 Test Withdrawal with grpcurl" variant="secondary">
                <CodeContent
                    code={`# Step 1: Check wallet balance before withdrawal
echo "=== Checking Wallet Balance ==="
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetBalance

# Step 2: Get wallet state to ensure sync
echo "=== Checking Wallet State ==="
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState

# Step 3: Send test withdrawal (ONE_SIDED transaction)
echo "=== Sending Test Withdrawal ==="

# Important: Replace with actual test addresses
RECIPIENT_ADDRESS="12HVCEeZC2RGE4SDn3yGwqz..." # One-sided address only
AMOUNT=1000000  # 1 XTM in microXTM
FEE_PER_GRAM=25
PAYMENT_ID="withdraw-test-$(date +%s)"
PAYMENT_ID_B64=$(echo -n "$PAYMENT_ID" | base64 -w 0)

grpcurl -plaintext \
  -d "{
    \"recipients\": [{
      \"address\": \"$RECIPIENT_ADDRESS\",
      \"amount\": $AMOUNT,
      \"fee_per_gram\": $FEE_PER_GRAM,
      \"payment_type\": \"ONE_SIDED\",
      \"payment_id\": \"$PAYMENT_ID_B64\"
    }]
  }" \
  localhost:18143 \
  tari.rpc.Wallet/Transfer

# Step 4: Check transaction status
echo "=== Checking Recent Transactions ==="
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompletedTransactions | \
  jq '.transaction | select(.direction == "TRANSACTION_DIRECTION_OUTBOUND")' | head -20

# Complete withdrawal test script
#!/bin/bash
echo "=== Withdrawal Test Script ==="

# Configuration
RECIPIENT_ADDRESS="\${1:-}"
AMOUNT="\${2:-1000000}"  # Default 1 XTM
FEE_PER_GRAM=25

if [ -z "$RECIPIENT_ADDRESS" ]; then
    echo "Usage: $0  [amount_in_microxtm]"
    echo "Example: $0 12HVCEeZC2RGE4SDn3yGwqz... 1000000"
    exit 1
fi

# Validate address format (basic check)
if [ \${#RECIPIENT_ADDRESS} -lt 50 ]; then
    echo "❌ Address too short (must be 50+ characters)"
    exit 1
fi

# Check wallet connectivity
if ! grpcurl -plaintext -connect-timeout 5 localhost:18143 list > /dev/null 2>&1; then
    echo "❌ Wallet not accessible"
    exit 1
fi

echo "✅ Wallet accessible"

# Check balance
echo "📊 Checking balance..."
BALANCE_RESPONSE=$(grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetBalance 2>/dev/null)
AVAILABLE_BALANCE=$(echo "$BALANCE_RESPONSE" | jq -r '.available_balance // 0')

echo "Available balance: $AVAILABLE_BALANCE microXTM"

# Calculate total required (amount + estimated fee)
ESTIMATED_FEE=$((FEE_PER_GRAM * 200))  # Rough estimate
TOTAL_REQUIRED=$((AMOUNT + ESTIMATED_FEE))

if [ "$AVAILABLE_BALANCE" -lt "$TOTAL_REQUIRED" ]; then
    echo "❌ Insufficient balance. Required: $TOTAL_REQUIRED, Available: $AVAILABLE_BALANCE"
    exit 1
fi

echo "✅ Sufficient balance"

# Generate payment ID
PAYMENT_ID="withdraw-test-$(date +%s)-$(openssl rand -hex 4)"
PAYMENT_ID_B64=$(echo -n "$PAYMENT_ID" | base64 -w 0)

echo "🔍 Payment ID: $PAYMENT_ID"

# Send withdrawal
echo "💸 Sending withdrawal..."
WITHDRAW_RESPONSE=$(grpcurl -plaintext \
  -d "{
    \"recipients\": [{
      \"address\": \"$RECIPIENT_ADDRESS\",
      \"amount\": $AMOUNT,
      \"fee_per_gram\": $FEE_PER_GRAM,
      \"payment_type\": \"ONE_SIDED\",
      \"payment_id\": \"$PAYMENT_ID_B64\"
    }]
  }" \
  localhost:18143 \
  tari.rpc.Wallet/Transfer 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "✅ Withdrawal sent successfully"
    echo "$WITHDRAW_RESPONSE" | jq .
    
    # Extract transaction ID for tracking
    TX_ID=$(echo "$WITHDRAW_RESPONSE" | jq -r '.results[0].transaction_id // empty')
    if [ -n "$TX_ID" ]; then
        echo "📋 Transaction ID: $TX_ID"
        
        # Get transaction details
        echo "🔍 Getting transaction details..."
        grpcurl -plaintext \
          -d "{\"transaction_ids\": [$TX_ID]}" \
          localhost:18143 \
          tari.rpc.Wallet/GetTransactionInfo
    fi
else
    echo "❌ Withdrawal failed"
fi`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Node.js',
        content: (
            <CodeContent
                code={`class TariWithdrawalManager {
    constructor(walletClient, metadata) {
        this.walletClient = walletClient;
        this.metadata = metadata;
        this.MIN_WITHDRAWAL = 1000000; // 1 XTM in microXTM
        this.WITHDRAWAL_FEE = 25000;   // 0.025 XTM
        this.MANUAL_APPROVAL_THRESHOLD = 100000000000; // 100,000 XTM
    }
    
    async validateWithdrawalRequest(userId, destinationAddress, amount) {
        try {
            // Step 1: Validate user
            const user = await this.getUser(userId);
            if (!user) {
                throw new Error('User not found');
            }
            
            if (!user.isKYCVerified) {
                throw new Error('User not KYC verified');
            }
            
            if (user.isBlocked || user.withdrawalsSuspended) {
                throw new Error('User account restricted');
            }
            
            // Step 2: Validate amount
            if (amount <= 0 || amount < this.MIN_WITHDRAWAL) {
                throw new Error(\`Amount below minimum withdrawal: \${this.MIN_WITHDRAWAL / 1000000} XTM\`);
            }
            
            // Step 3: Check user balance
            const withdrawalFee = this.calculateWithdrawalFee(amount);
            const totalRequired = amount + withdrawalFee;
            
            if (user.availableBalance < totalRequired) {
                throw new Error(\`Insufficient balance. Required: \${totalRequired / 1000000} XTM, Available: \${user.availableBalance / 1000000} XTM\`);
            }
            
            // Step 4: Validate address
            if (!this.isValidTariAddress(destinationAddress)) {
                throw new Error('Invalid Tari address format');
            }
            
            if (this.isInteractiveAddress(destinationAddress)) {
                throw new Error('Interactive addresses not supported for withdrawals');
            }
            
            // Step 5: Security checks
            if (await this.isBlacklistedAddress(destinationAddress)) {
                throw new Error('Destination address is blacklisted');
            }
            
            // Step 6: Rate limiting
            if (await this.exceedsWithdrawalLimits(userId, amount)) {
                throw new Error('Withdrawal limits exceeded');
            }
            
            // Step 7: Detect suspicious activity
            if (await this.detectSuspiciousActivity(userId, amount, destinationAddress)) {
                throw new Error('Withdrawal flagged for manual review');
            }
            
            // Step 8: Create withdrawal record
            const withdrawalId = this.generateWithdrawalId();
            const approvalRequired = amount > this.MANUAL_APPROVAL_THRESHOLD;
            
            const withdrawalRecord = {
                id: withdrawalId,
                userId: userId,
                destinationAddress: destinationAddress,
                amount: amount,
                fee: withdrawalFee,
                status: 'pending_approval',
                createdAt: new Date(),
                approvalRequired: approvalRequired
            };
            
            await this.saveWithdrawal(withdrawalRecord);
            
            // Step 9: Reserve user balance
            await this.reserveUserBalance(userId, totalRequired);
            
            return {
                withdrawalId: withdrawalId,
                amount: amount,
                fee: withdrawalFee,
                estimatedProcessingTime: '15-30 minutes',
                approvalRequired: approvalRequired
            };
            
        } catch (error) {
            throw new Error(\`Withdrawal validation failed: \${error.message}\`);
        }
    }
    
    isValidTariAddress(address) {
        // Basic Tari address validation
        const base58Regex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
        return base58Regex.test(address) && address.length >= 50 && address.length <= 70;
    }
    
    isInteractiveAddress(address) {
        try {
            // Decode base58 and check the address type byte
            const decoded = this.base58Decode(address);
            if (decoded.length < 2) return false;
            
            // Check the second byte (address type)
            // IMPORTANT: This logic must match official Tari address specification            // 0x01 = interactive, 0x00 = one-sided
            return (decoded[1] & 0x01) === 0x01;
        } catch {
            return false;
        }
    }
    
    calculateWithdrawalFee(amount) {
        // Simple flat fee for now, could be percentage-based
        return this.WITHDRAWAL_FEE;
    }
    
    async exceedsWithdrawalLimits(userId, amount) {
        const dailyLimit = 100000000000; // 100,000 XTM
        const hourlyLimit = 10000000000; // 10,000 XTM
        
        const todayWithdrawals = await this.getTodayWithdrawals(userId);
        const hourlyWithdrawals = await this.getHourlyWithdrawals(userId);
        
        const dailyTotal = todayWithdrawals.reduce((sum, w) => sum + w.amount, 0);
        const hourlyTotal = hourlyWithdrawals.reduce((sum, w) => sum + w.amount, 0);
        
        return (dailyTotal + amount > dailyLimit) || (hourlyTotal + amount > hourlyLimit);
    }
    
    async detectSuspiciousActivity(userId, amount, destinationAddress) {
        // Implement your fraud detection logic
        // Examples:
        // - Multiple withdrawals to same address
        // - Withdrawal immediately after deposit
        // - Unusual withdrawal patterns
        // - Address appears in fraud database
        
        return false; // Placeholder
    }
    
    generateWithdrawalId() {
        return \`withdraw_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    }
    
    // Database helper methods (implement based on your database)
    async getUser(userId) { /* Implementation */ }
    async saveWithdrawal(record) { /* Implementation */ }
    async reserveUserBalance(userId, amount) { /* Implementation */ }
    async getTodayWithdrawals(userId) { /* Implementation */ }
    async getHourlyWithdrawals(userId) { /* Implementation */ }
    async isBlacklistedAddress(address) { /* Implementation */ }
}`}
            />
        ),
    },
    {
        label: 'Python',
        content: (
            <CodeContent
                code={`import re
import base58
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional

class TariWithdrawalManager:
    def __init__(self, wallet_client, metadata):
        self.wallet_client = wallet_client
        self.metadata = metadata
        self.MIN_WITHDRAWAL = 1_000_000  # 1 XTM in microXTM
        self.WITHDRAWAL_FEE = 25_000     # 0.025 XTM
        self.MANUAL_APPROVAL_THRESHOLD = 100_000_000_000  # 100,000 XTM
    
    async def validate_withdrawal_request(self, user_id: str, destination_address: str, amount: int) -> Dict:
        """Validate a withdrawal request and return withdrawal details"""
        try:
            # Step 1: Validate user
            user = await self.get_user(user_id)
            if not user:
                raise ValueError('User not found')
            
            if not user.get('is_kyc_verified'):
                raise ValueError('User not KYC verified')
            
            if user.get('is_blocked') or user.get('withdrawals_suspended'):
                raise ValueError('User account restricted')
            
            # Step 2: Validate amount
            if amount <= 0 or amount < self.MIN_WITHDRAWAL:
                raise ValueError(f'Amount below minimum withdrawal: {self.MIN_WITHDRAWAL / 1_000_000} XTM')
            
            # Step 3: Check user balance
            withdrawal_fee = self.calculate_withdrawal_fee(amount)
            total_required = amount + withdrawal_fee
            
            if user['available_balance'] < total_required:
                raise ValueError(f'Insufficient balance. Required: {total_required / 1_000_000} XTM, '
                               f'Available: {user["available_balance"] / 1_000_000} XTM')
            
            # Step 4: Validate address
            if not self.is_valid_tari_address(destination_address):
                raise ValueError('Invalid Tari address format')
            
            if self.is_interactive_address(destination_address):
                raise ValueError('Interactive addresses not supported for withdrawals')
            
            # Step 5: Security checks
            if await self.is_blacklisted_address(destination_address):
                raise ValueError('Destination address is blacklisted')
            
            # Step 6: Rate limiting
            if await self.exceeds_withdrawal_limits(user_id, amount):
                raise ValueError('Withdrawal limits exceeded')
            
            # Step 7: Detect suspicious activity
            if await self.detect_suspicious_activity(user_id, amount, destination_address):
                raise ValueError('Withdrawal flagged for manual review')
            
            # Step 8: Create withdrawal record
            withdrawal_id = self.generate_withdrawal_id()
            approval_required = amount > self.MANUAL_APPROVAL_THRESHOLD
            
            withdrawal_record = {
                'id': withdrawal_id,
                'user_id': user_id,
                'destination_address': destination_address,
                'amount': amount,
                'fee': withdrawal_fee,
                'status': 'pending_approval',
                'created_at': datetime.now(),
                'approval_required': approval_required
            }
            
            await self.save_withdrawal(withdrawal_record)
            
            # Step 9: Reserve user balance
            await self.reserve_user_balance(user_id, total_required)
            
            return {
                'withdrawal_id': withdrawal_id,
                'amount': amount,
                'fee': withdrawal_fee,
                'estimated_processing_time': '15-30 minutes',
                'approval_required': approval_required
            }
            
        except Exception as e:
            raise Exception(f"Withdrawal validation failed: {str(e)}")
    
    def is_valid_tari_address(self, address: str) -> bool:
        """Validate Tari address format"""
        base58_pattern = re.compile(r'^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$')
        return bool(base58_pattern.match(address)) and 50 <= len(address) <= 70
    
    def is_interactive_address(self, address: str) -> bool:
        """Check if address is interactive (not supported for withdrawals)"""
        try:
            decoded = base58.b58decode(address)
            if len(decoded) < 2:
                return False
            
            # Check the second byte (address type)
            // IMPORTANT: This logic must match official Tari address specification            # 0x01 = interactive, 0x00 = one-sided
            return (decoded[1] & 0x01) == 0x01
        except:
            return False
    
    def calculate_withdrawal_fee(self, amount: int) -> int:
        """Calculate withdrawal fee"""
        # Simple flat fee for now, could be percentage-based
        return self.WITHDRAWAL_FEE
    
    async def exceeds_withdrawal_limits(self, user_id: str, amount: int) -> bool:
        """Check if withdrawal exceeds daily/hourly limits"""
        daily_limit = 100_000_000_000  # 100,000 XTM
        hourly_limit = 10_000_000_000  # 10,000 XTM
        
        today_withdrawals = await self.get_today_withdrawals(user_id)
        hourly_withdrawals = await self.get_hourly_withdrawals(user_id)
        
        daily_total = sum(w['amount'] for w in today_withdrawals)
        hourly_total = sum(w['amount'] for w in hourly_withdrawals)
        
        return (daily_total + amount > daily_limit or 
                hourly_total + amount > hourly_limit)
    
    async def detect_suspicious_activity(self, user_id: str, amount: int, destination_address: str) -> bool:
        """Detect suspicious withdrawal patterns"""
        # Implement your fraud detection logic
        # Examples:
        # - Multiple withdrawals to same address
        # - Withdrawal immediately after deposit
        # - Unusual withdrawal patterns
        # - Address appears in fraud database
        
        return False  # Placeholder
    
    def generate_withdrawal_id(self) -> str:
        """Generate unique withdrawal ID"""
        import uuid
        return f"withdraw_{int(time.time())}_{uuid.uuid4().hex[:8]}"
    
    # Database helper methods (implement based on your database)
    async def get_user(self, user_id: str) -> Optional[Dict]:
        """Get user from database"""
        pass
    
    async def save_withdrawal(self, record: Dict):
        """Save withdrawal record in database"""
        pass
    
    async def reserve_user_balance(self, user_id: str, amount: int):
        """Reserve user balance for withdrawal"""
        pass
    
    async def get_today_withdrawals(self, user_id: str) -> List[Dict]:
        """Get user's withdrawals today"""
        pass
    
    async def get_hourly_withdrawals(self, user_id: str) -> List[Dict]:
        """Get user's withdrawals in last hour"""
        pass
    
    async def is_blacklisted_address(self, address: str) -> bool:
        """Check if address is blacklisted"""
        pass`}
            />
        ),
    },
    {
        label: 'Rust',
        content: (
            <CodeContent
                code={`use chrono::{DateTime, Utc, Duration};
use regex::Regex;
use base58;
use uuid::Uuid;
use std::error::Error;

pub struct TariWithdrawalManager {
    min_withdrawal: u64,
    withdrawal_fee: u64,
    manual_approval_threshold: u64,
}

impl TariWithdrawalManager {
    pub fn new() -> Self {
        Self {
            min_withdrawal: 1_000_000,         // 1 XTM in microXTM
            withdrawal_fee: 25_000,            // 0.025 XTM
            manual_approval_threshold: 100_000_000_000, // 100,000 XTM
        }
    }
    
    pub async fn validate_withdrawal_request(
        &self,
        user_id: &str,
        destination_address: &str,
        amount: u64
    ) -> Result> {
        // Step 1: Validate user
        let user = self.get_user(user_id).await?
            .ok_or("User not found")?;
        
        if !user.is_kyc_verified {
            return Err("User not KYC verified".into());
        }
        
        if user.is_blocked || user.withdrawals_suspended {
            return Err("User account restricted".into());
        }
        
        // Step 2: Validate amount
        if amount == 0 || amount < self.min_withdrawal {
            return Err(format!("Amount below minimum withdrawal: {} XTM", 
                self.min_withdrawal as f64 / 1_000_000.0).into());
        }
        
        // Step 3: Check user balance
        let withdrawal_fee = self.calculate_withdrawal_fee(amount);
        let total_required = amount + withdrawal_fee;
        
        if user.available_balance < total_required {
            return Err(format!("Insufficient balance. Required: {} XTM, Available: {} XTM",
                total_required as f64 / 1_000_000.0,
                user.available_balance as f64 / 1_000_000.0).into());
        }
        
        // Step 4: Validate address
        if !self.is_valid_tari_address(destination_address) {
            return Err("Invalid Tari address format".into());
        }
        
        if self.is_interactive_address(destination_address)? {
            return Err("Interactive addresses not supported for withdrawals".into());
        }
        
        // Step 5: Security checks
        if self.is_blacklisted_address(destination_address).await? {
            return Err("Destination address is blacklisted".into());
        }
        
        // Step 6: Rate limiting
        if self.exceeds_withdrawal_limits(user_id, amount).await? {
            return Err("Withdrawal limits exceeded".into());
        }
        
        // Step 7: Detect suspicious activity
        if self.detect_suspicious_activity(user_id, amount, destination_address).await? {
            return Err("Withdrawal flagged for manual review".into());
        }
        
        // Step 8: Create withdrawal record
        let withdrawal_id = self.generate_withdrawal_id();
        let approval_required = amount > self.manual_approval_threshold;
        
        let withdrawal_record = WithdrawalRecord {
            id: withdrawal_id.clone(),
            user_id: user_id.to_string(),
            destination_address: destination_address.to_string(),
            amount,
            fee: withdrawal_fee,
            status: WithdrawalStatus::PendingApproval,
            created_at: Utc::now(),
            approval_required,
        };
        
        self.save_withdrawal(&withdrawal_record).await?;
        
        // Step 9: Reserve user balance
        self.reserve_user_balance(user_id, total_required).await?;
        
        Ok(WithdrawalDetails {
            withdrawal_id,
            amount,
            fee: withdrawal_fee,
            estimated_processing_time: "15-30 minutes".to_string(),
            approval_required,
        })
    }
    
    fn is_valid_tari_address(&self, address: &str) -> bool {
        let base58_regex = Regex::new(r"^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$")
            .unwrap();
        
        base58_regex.is_match(address) && address.len() >= 50 && address.len() <= 70
    }
    
    fn is_interactive_address(&self, address: &str) -> Result> {
        let decoded = base58::decode(address)?;
        
        if decoded.len() < 2 {
            return Ok(false);
        }
        
        // Check the second byte (address type)
            // IMPORTANT: This logic must match official Tari address specification        // 0x01 = interactive, 0x00 = one-sided
        Ok((decoded[1] & 0x01) == 0x01)
    }
    
    fn calculate_withdrawal_fee(&self, _amount: u64) -> u64 {
        // Simple flat fee for now, could be percentage-based
        self.withdrawal_fee
    }
    
    async fn exceeds_withdrawal_limits(&self, user_id: &str, amount: u64) -> Result> {
        let daily_limit = 100_000_000_000u64;  // 100,000 XTM
        let hourly_limit = 10_000_000_000u64;  // 10,000 XTM
        
        let today_withdrawals = self.get_today_withdrawals(user_id).await?;
        let hourly_withdrawals = self.get_hourly_withdrawals(user_id).await?;
        
        let daily_total: u64 = today_withdrawals.iter().map(|w| w.amount).sum();
        let hourly_total: u64 = hourly_withdrawals.iter().map(|w| w.amount).sum();
        
        Ok(daily_total + amount > daily_limit || hourly_total + amount > hourly_limit)
    }
    
    async fn detect_suspicious_activity(&self, _user_id: &str, _amount: u64, _destination_address: &str) -> Result> {
        // Implement your fraud detection logic
        Ok(false) // Placeholder
    }
    
    fn generate_withdrawal_id(&self) -> String {
        format!("withdraw_{}_{}", 
            Utc::now().timestamp(),
            Uuid::new_v4().to_string()[..8].to_string()
        )
    }
    
    // Database helper methods (implement based on your database)
    async fn get_user(&self, user_id: &str) -> Result, Box> {
        // Implementation
        Ok(None)
    }
    
    async fn save_withdrawal(&self, record: &WithdrawalRecord) -> Result<(), Box> {
        // Implementation
        Ok(())
    }
    
    async fn reserve_user_balance(&self, user_id: &str, amount: u64) -> Result<(), Box> {
        // Implementation
        Ok(())
    }
    
    async fn get_today_withdrawals(&self, user_id: &str) -> Result, Box> {
        // Implementation
        Ok(vec![])
    }
    
    async fn get_hourly_withdrawals(&self, user_id: &str) -> Result, Box> {
        // Implementation
        Ok(vec![])
    }
    
    async fn is_blacklisted_address(&self, address: &str) -> Result> {
        // Implementation
        Ok(false)
    }
}

#[derive(Debug)]
struct User {
    id: String,
    available_balance: u64,
    is_kyc_verified: bool,
    is_blocked: bool,
    withdrawals_suspended: bool,
}

#[derive(Debug)]
struct WithdrawalRecord {
    id: String,
    user_id: String,
    destination_address: String,
    amount: u64,
    fee: u64,
    status: WithdrawalStatus,
    created_at: DateTime,
    approval_required: bool,
}

#[derive(Debug)]
struct WithdrawalDetails {
    withdrawal_id: String,
    amount: u64,
    fee: u64,
    estimated_processing_time: String,
    approval_required: bool,
}

#[derive(Debug)]
enum WithdrawalStatus {
    PendingApproval,
    Approved,
    Processing,
    Completed,
    Failed,
    Cancelled,
}`}
            />
        ),
    },
    {
        label: 'PHP',
        content: (
            <CodeContent
                code={`getUser($userId);
            if (!$user) {
                throw new Exception('User not found');
            }
            
            if (!$user['is_kyc_verified']) {
                throw new Exception('User not KYC verified');
            }
            
            if ($user['is_blocked'] || $user['withdrawals_suspended']) {
                throw new Exception('User account restricted');
            }
            
            // Step 2: Validate amount
            if ($amount <= 0 || $amount < self::MIN_WITHDRAWAL) {
                throw new Exception('Amount below minimum withdrawal: ' . (self::MIN_WITHDRAWAL / 1000000) . ' XTM');
            }
            
            // Step 3: Check user balance
            $withdrawalFee = $this->calculateWithdrawalFee($amount);
            $totalRequired = $amount + $withdrawalFee;
            
            if ($user['available_balance'] < $totalRequired) {
                throw new Exception(sprintf(
                    'Insufficient balance. Required: %.6f XTM, Available: %.6f XTM',
                    $totalRequired / 1000000,
                    $user['available_balance'] / 1000000
                ));
            }
            
            // Step 4: Validate address
            if (!$this->isValidTariAddress($destinationAddress)) {
                throw new Exception('Invalid Tari address format');
            }
            
            if ($this->isInteractiveAddress($destinationAddress)) {
                throw new Exception('Interactive addresses not supported for withdrawals');
            }
            
            // Step 5: Security checks
            if ($this->isBlacklistedAddress($destinationAddress)) {
                throw new Exception('Destination address is blacklisted');
            }
            
            // Step 6: Rate limiting
            if ($this->exceedsWithdrawalLimits($userId, $amount)) {
                throw new Exception('Withdrawal limits exceeded');
            }
            
            // Step 7: Detect suspicious activity
            if ($this->detectSuspiciousActivity($userId, $amount, $destinationAddress)) {
                throw new Exception('Withdrawal flagged for manual review');
            }
            
            // Step 8: Create withdrawal record
            $withdrawalId = $this->generateWithdrawalId();
            $approvalRequired = $amount > self::MANUAL_APPROVAL_THRESHOLD;
            
            $withdrawalRecord = [
                'id' => $withdrawalId,
                'user_id' => $userId,
                'destination_address' => $destinationAddress,
                'amount' => $amount,
                'fee' => $withdrawalFee,
                'status' => 'pending_approval',
                'created_at' => date('Y-m-d H:i:s'),
                'approval_required' => $approvalRequired
            ];
            
            $this->saveWithdrawal($withdrawalRecord);
            
            // Step 9: Reserve user balance
            $this->reserveUserBalance($userId, $totalRequired);
            
            return [
                'withdrawal_id' => $withdrawalId,
                'amount' => $amount,
                'fee' => $withdrawalFee,
                'estimated_processing_time' => '15-30 minutes',
                'approval_required' => $approvalRequired
            ];
            
        } catch (Exception $e) {
            throw new Exception("Withdrawal validation failed: " . $e->getMessage());
        }
    }
    
    private function isValidTariAddress(string $address): bool {
        $pattern = '/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/';
        return preg_match($pattern, $address) && strlen($address) >= 50 && strlen($address) <= 70;
    }
    
    private function isInteractiveAddress(string $address): bool {
        try {
            $decoded = $this->base58Decode($address);
            if (strlen($decoded) < 2) {
                return false;
            }
            
            // Check the second byte (address type)
            // IMPORTANT: This logic must match official Tari address specification            // 0x01 = interactive, 0x00 = one-sided
            return (ord($decoded[1]) & 0x01) === 0x01;
        } catch (Exception $e) {
            return false;
        }
    }
    
    private function calculateWithdrawalFee(int $amount): int {
        // Simple flat fee for now, could be percentage-based
        return self::WITHDRAWAL_FEE;
    }
    
    private function exceedsWithdrawalLimits(string $userId, int $amount): bool {
        $dailyLimit = 100000000000;  // 100,000 XTM
        $hourlyLimit = 10000000000;  // 10,000 XTM
        
        $todayWithdrawals = $this->getTodayWithdrawals($userId);
        $hourlyWithdrawals = $this->getHourlyWithdrawals($userId);
        
        $dailyTotal = array_sum(array_column($todayWithdrawals, 'amount'));
        $hourlyTotal = array_sum(array_column($hourlyWithdrawals, 'amount'));
        
        return ($dailyTotal + $amount > $dailyLimit) || ($hourlyTotal + $amount > $hourlyLimit);
    }
    
    private function detectSuspiciousActivity(string $userId, int $amount, string $destinationAddress): bool {
        // Implement your fraud detection logic
        // Examples:
        // - Multiple withdrawals to same address
        // - Withdrawal immediately after deposit
        // - Unusual withdrawal patterns
        // - Address appears in fraud database
        
        return false; // Placeholder
    }
    
    private function generateWithdrawalId(): string {
        return 'withdraw_' . time() . '_' . bin2hex(random_bytes(4));
    }
    
    private function base58Decode(string $input): string {
        // Implementation of base58 decode
        // You might want to use a library like BitWasp\Bitcoin\Base58
        return $input; // Placeholder - implement proper Base58 decoding (e.g., BitWasp\Bitcoin\Base58)
    }
    
    // Database helper methods (implement based on your database)
    private function getUser(string $userId): ?array {
        // Implementation
        return null;
    }
    
    private function saveWithdrawal(array $record): void {
        // Implementation
    }
    
    private function reserveUserBalance(string $userId, int $amount): void {
        // Implementation
    }
    
    private function getTodayWithdrawals(string $userId): array {
        // Implementation
        return [];
    }
    
    private function getHourlyWithdrawals(string $userId): array {
        // Implementation
        return [];
    }
    
    private function isBlacklistedAddress(string $address): bool {
        // Implementation
        return false;
    }
}
?>`}
            />
        ),
    },
];
