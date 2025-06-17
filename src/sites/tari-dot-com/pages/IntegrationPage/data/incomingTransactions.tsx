import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const incomingTransactions = [
    {
        label: 'Pseudocode',
        content: (
            <CodeHighlight title="🧠 Transaction Monitoring Logic">
                <CodeContent
                    code={`FUNCTION monitorIncomingTransactions():
    processedTransactions = loadProcessedTransactionsList()
    
    WHILE (service_is_running):
        TRY:
            // Method 1: Real-time streaming (preferred)
            IF (streaming_available):
                transactionStream = walletClient.StreamTransactionEvents()
                
                FOR EACH event IN transactionStream:
                    IF (event.type == "Mined" AND event.direction == "Inbound"):
                        processTransactionEvent(event)
            
            // Method 2: Polling (backup)
            ELSE:
                completedTransactions = walletClient.GetCompletedTransactions()
                
                FOR EACH transaction IN completedTransactions:
                    IF (shouldProcessTransaction(transaction)):
                        processTransaction(transaction)
        
        CATCH (connection_error):
            LOG "Connection lost, retrying in 5 seconds..."
            SLEEP(5)
            CONTINUE
        
        SLEEP(30) // Poll every 30 seconds if streaming not available

FUNCTION shouldProcessTransaction(transaction):
    RETURN (
        transaction.direction == "INBOUND" AND
        transaction.status == "CONFIRMED" AND
        NOT isAlreadyProcessed(transaction.tx_id)
    )

FUNCTION processTransaction(transaction):
    // Step 1: Extract and validate payment ID
    paymentId = extractPaymentIdFromBytes(transaction.payment_id)
    IF (paymentId IS empty):
        LOG "Transaction without payment ID: " + transaction.tx_id
        RETURN
    
    // Step 2: Look up deposit record
    depositRecord = database.findByPaymentId(paymentId)
    IF (depositRecord IS null):
        LOG "Unknown payment ID: " + paymentId
        RETURN
    
    // Step 3: Validate transaction amount
    amountXTM = transaction.amount / 1_000_000 // Convert microXTM to XTM
    IF (amountXTM < MINIMUM_DEPOSIT_AMOUNT):
        LOG "Deposit amount too small: " + amountXTM + " XTM"
        RETURN
    
    // Step 4: Credit user account
    TRY:
        accountBalance = getUserBalance(depositRecord.userId)
        newBalance = accountBalance + amountXTM
        
        // Atomic transaction
        BEGIN_DATABASE_TRANSACTION()
        
        updateUserBalance(depositRecord.userId, newBalance)
        markDepositAsProcessed(depositRecord.id, transaction.tx_id)
        createDepositHistoryRecord(depositRecord.userId, amountXTM, transaction.tx_id)
        
        COMMIT_DATABASE_TRANSACTION()
        
        // Step 5: Notify user
        sendDepositNotification(depositRecord.userId, amountXTM, transaction.tx_id)
        
        LOG "Processed deposit: " + amountXTM + " XTM for user " + depositRecord.userId
        
    CATCH (database_error):
        ROLLBACK_DATABASE_TRANSACTION()
        LOG "Failed to process deposit: " + database_error.message
        // Add to retry queue
    
    // Step 6: Mark as processed to avoid double-processing
    processedTransactions.add(transaction.tx_id)`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'grpcurl',
        content: (
            <CodeHighlight title="🧪 Test Transaction Monitoring with grpcurl" variant="secondary">
                <CodeContent
                    code={`# Method 1: Stream all completed transactions
echo "=== Streaming All Completed Transactions ==="
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompletedTransactions

# Method 2: Get transactions for specific payment ID
PAYMENT_ID="deposit-user123-1234567890-abcd1234"
PAYMENT_ID_B64=$(echo -n "$PAYMENT_ID" | base64 -w 0)

echo "=== Transactions for Payment ID: $PAYMENT_ID ==="
grpcurl -plaintext \
  -d "{\"payment_id\": {\"utf8_string\": \"$PAYMENT_ID\"}}" \
  localhost:18143 \
  tari.rpc.Wallet/GetCompletedTransactions

# Method 3: Stream real-time transaction events (preferred)
echo "=== Real-time Transaction Events ==="
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/StreamTransactionEvents

# Method 4: Get transactions for specific block
BLOCK_HASH="your_block_hash_here"
grpcurl -plaintext \
  -d "{\"block_hash\": {\"hash\": \"$BLOCK_HASH\"}}" \
  localhost:18143 \
  tari.rpc.Wallet/GetCompletedTransactions

# Complete monitoring test script
#!/bin/bash
echo "=== Transaction Monitoring Test ==="

# Check wallet connectivity
if ! grpcurl -plaintext -connect-timeout 5 localhost:18143 list > /dev/null 2>&1; then
    echo "❌ Wallet not accessible"
    exit 1
fi

echo "✅ Wallet accessible"

# Test 1: Get current wallet state
echo "📊 Current wallet state:"
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetState

# Test 2: Stream recent transactions (timeout after 10 seconds)
echo "📥 Streaming transactions for 10 seconds..."
timeout 10s grpcurl -plaintext localhost:18143 tari.rpc.Wallet/GetCompletedTransactions

# Test 3: Check for specific payment IDs in your database
echo "🔍 Testing specific payment ID lookup..."
# Replace with actual payment IDs from your database
for PAYMENT_ID in "deposit-test1" "deposit-test2"; do
    echo "Checking payment ID: $PAYMENT_ID"
    grpcurl -plaintext \
      -d "{\"payment_id\": {\"utf8_string\": \"$PAYMENT_ID\"}}" \
      localhost:18143 \
      tari.rpc.Wallet/GetCompletedTransactions | \
      jq '.transaction | select(.direction == "TRANSACTION_DIRECTION_INBOUND")'
done

# Test 4: Real-time monitoring simulation
echo "🔄 Starting real-time monitoring (Ctrl+C to stop)..."
grpcurl -plaintext localhost:18143 tari.rpc.Wallet/StreamTransactionEvents | \
while read -r line; do
    echo "$(date): $line"
    # In real implementation, parse JSON and process transactions
done`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Node.js',
        content: (
            <CodeContent
                code={`class TariDepositMonitor {
    constructor(depositManager) {
        this.depositManager = depositManager;
        this.processedTransactions = new Set();
        this.running = false;
    }
    
    startMonitoring() {
        this.running = true;
        console.log('Starting deposit monitoring...');
        
        // Option 1: Stream real-time events (preferred)
        this.streamTransactionEvents();
        
        // Option 2: Poll for completed transactions (backup)
        setInterval(() => {
            if (this.running) this.pollCompletedTransactions();
        }, 30000);
    }
    
    streamTransactionEvents() {
        const call = this.depositManager.client.StreamTransactionEvents(
            {}, 
            this.depositManager.metadata
        );
        
        call.on('data', (response) => {
            if (response.transaction) {
                this.processTransactionEvent(response.transaction);
            }
        });
        
        call.on('error', (err) => {
            console.error('Stream error:', err);
            // Restart stream after delay
            setTimeout(() => {
                if (this.running) this.streamTransactionEvents();
            }, 5000);
        });
        
        call.on('end', () => {
            console.log('Stream ended, restarting...');
            if (this.running) {
                setTimeout(() => this.streamTransactionEvents(), 1000);
            }
        });
    }
    
    async pollCompletedTransactions() {
        try {
            const call = this.depositManager.client.GetCompletedTransactions(
                {}, 
                this.depositManager.metadata
            );
            
            call.on('data', (response) => {
                if (response.transaction) {
                    this.processTransaction(response.transaction);
                }
            });
            
        } catch (error) {
            console.error('Error polling transactions:', error);
        }
    }
    
    processTransactionEvent(event) {
        // Process real-time events
        if (event.event === 'Mined' && event.direction === 'Inbound') {
            // Get full transaction details if needed
            const txId = parseInt(event.tx_id);
            this.getAndProcessTransaction(txId);
        }
    }
    
    async processTransaction(transaction) {
        // Only process inbound, confirmed transactions
        if (transaction.direction !== 'TRANSACTION_DIRECTION_INBOUND' ||
            transaction.status !== 'TRANSACTION_STATUS_MINED_CONFIRMED' ||
            this.processedTransactions.has(transaction.tx_id)) {
            return;
        }
        
        try {
            // Extract payment ID
            const paymentId = Buffer.from(transaction.payment_id).toString('utf8');
            
            if (!paymentId) {
                console.log(\`Transaction \${transaction.tx_id} has no payment ID\`);
                return;
            }
            
            // Look up deposit record
            const depositRecord = await this.findDepositRecord(paymentId);
            
            if (!depositRecord) {
                console.log(\`Unknown payment ID: \${paymentId}\`);
                return;
            }
            
            // Validate amount
            const amountXTM = parseInt(transaction.amount) / 1_000_000;
            if (amountXTM < 0.001) { // Minimum deposit
                console.log(\`Deposit amount too small: \${amountXTM} XTM\`);
                return;
            }
            
            // Credit user account (with database transaction)
            await this.creditUserAccount(
                depositRecord.userId,
                amountXTM,
                transaction.tx_id,
                paymentId
            );
            
            // Mark as processed
            this.processedTransactions.add(transaction.tx_id);
            
            console.log(\`✅ Processed deposit: \${amountXTM} XTM for user \${depositRecord.userId}\`);
            
        } catch (error) {
            console.error('Error processing transaction:', error);
        }
    }
    
    async findDepositRecord(paymentId) {
        // Query your database for the payment ID
        // Return { userId, paymentId, status } or null
        console.log(\`Looking up payment ID: \${paymentId}\`);
        return null; // Placeholder - implement your database query
    }
    
    async creditUserAccount(userId, amount, txId, paymentId) {
        // Implement atomic database transaction
        try {
            // 1. Start database transaction
            // 2. Update user balance
            // 3. Create deposit history record
            // 4. Mark deposit as processed
            // 5. Commit transaction
            // 6. Send user notification
            
            console.log(\`Crediting user \${userId} with \${amount} XTM (tx: \${txId})\`);
            
        } catch (error) {
            // Rollback transaction
            throw error;
        }
    }
    
    stopMonitoring() {
        this.running = false;
        console.log('Deposit monitoring stopped');
    }
}`}
            />
        ),
    },
    {
        label: 'Python',
        content: (
            <CodeContent
                code={`import asyncio
import threading
import time
import json
from typing import Optional, Dict, Set

class TariDepositMonitor:
    def __init__(self, deposit_manager):
        self.deposit_manager = deposit_manager
        self.processed_transactions: Set[int] = set()
        self.running = False
    
    def start_monitoring(self):
        """Start monitoring for deposits"""
        self.running = True
        
        # Start real-time event streaming in separate thread
        stream_thread = threading.Thread(target=self.stream_transaction_events)
        stream_thread.daemon = True
        stream_thread.start()
        
        # Start polling backup in separate thread
        poll_thread = threading.Thread(target=self.poll_completed_transactions)
        poll_thread.daemon = True
        poll_thread.start()
        
        print("✅ Deposit monitoring started")
    
    def stream_transaction_events(self):
        """Stream real-time transaction events"""
        while self.running:
            try:
                request = wallet_pb2.TransactionEventRequest()
                
                for response in self.deposit_manager.client.StreamTransactionEvents(
                    request, metadata=self.deposit_manager.metadata
                ):
                    if not self.running:
                        break
                    
                    if response.transaction:
                        self.process_transaction_event(response.transaction)
                        
            except grpc.RpcError as e:
                print(f"Stream error: {e}, retrying in 5 seconds...")
                time.sleep(5)
    
    def poll_completed_transactions(self):
        """Poll for completed transactions as backup"""
        while self.running:
            try:
                request = wallet_pb2.GetCompletedTransactionsRequest()
                
                for response in self.deposit_manager.client.GetCompletedTransactions(
                    request, metadata=self.deposit_manager.metadata
                ):
                    if not self.running:
                        break
                    
                    if response.transaction:
                        self.process_transaction(response.transaction)
                        
            except grpc.RpcError as e:
                print(f"Poll error: {e}")
            
            time.sleep(30)  # Poll every 30 seconds
    
    def process_transaction_event(self, transaction_event):
        """Process a real-time transaction event"""
        if (transaction_event.event == "Mined" and 
            transaction_event.direction == "Inbound"):
            
            # Get full transaction details if needed
            tx_id = int(transaction_event.tx_id)
            self.get_and_process_transaction(tx_id)
    
    def process_transaction(self, transaction):
        """Process a completed transaction"""
        # Only process inbound, confirmed transactions
        if (transaction.direction != wallet_pb2.TRANSACTION_DIRECTION_INBOUND or
            transaction.status != wallet_pb2.TRANSACTION_STATUS_MINED_CONFIRMED or
            transaction.tx_id in self.processed_transactions):
            return
        
        try:
            # Extract payment ID
            payment_id = transaction.payment_id.decode('utf-8', errors='replace')
            
            if not payment_id:
                print(f"Transaction {transaction.tx_id} has no payment ID")
                return
            
            # Look up deposit record
            deposit_record = self.find_deposit_record(payment_id)
            
            if not deposit_record:
                print(f"Unknown payment ID: {payment_id}")
                return
            
            # Validate amount
            amount_xtm = transaction.amount / 1_000_000
            if amount_xtm < 0.001:  # Minimum deposit
                print(f"Deposit amount too small: {amount_xtm} XTM")
                return
            
            # Credit user account
            self.credit_user_account(
                deposit_record['user_id'],
                amount_xtm,
                transaction.tx_id,
                payment_id
            )
            
            # Mark as processed
            self.processed_transactions.add(transaction.tx_id)
            
            print(f"✅ Processed deposit: {amount_xtm} XTM for user {deposit_record['user_id']}")
            
        except Exception as e:
            print(f"Error processing transaction: {e}")
    
    def find_deposit_record(self, payment_id: str) -> Optional[Dict]:
        """Find deposit record by payment ID"""
        # Query your database
        print(f"Looking up payment ID: {payment_id}")
        return None  # Placeholder - implement your database query
    
    def credit_user_account(self, user_id: str, amount: float, tx_id: int, payment_id: str):
        """Credit user's account with atomic database transaction"""
        try:
            # 1. Start database transaction
            # 2. Update user balance  
            # 3. Create deposit history record
            # 4. Mark deposit as processed
            # 5. Commit transaction
            # 6. Send user notification
            
            print(f"Crediting user {user_id} with {amount} XTM (tx: {tx_id})")
            
        except Exception as error:
            # Rollback transaction
            print(f"Failed to credit account: {error}")
            raise
    
    def stop_monitoring(self):
        """Stop monitoring"""
        self.running = False
        print("Deposit monitoring stopped")`}
            />
        ),
    },
    {
        label: 'Rust',
        content: (
            <CodeContent
                code={`use tokio::time::{interval, Duration};
use tokio::sync::mpsc;
use std::collections::HashSet;
use tonic::Request;

pub struct TariDepositMonitor {
    deposit_manager: TariDepositManager,
    processed_transactions: HashSet,
    running: bool,
}

impl TariDepositMonitor {
    pub fn new(deposit_manager: TariDepositManager) -> Self {
        Self {
            deposit_manager,
            processed_transactions: HashSet::new(),
            running: false,
        }
    }
    
    pub async fn start_monitoring(&mut self) -> Result<(), Box> {
        self.running = true;
        println!("✅ Starting deposit monitoring...");
        
        // Channel for communication between tasks
        let (tx, mut rx) = mpsc::channel(100);
        
        // Start real-time event streaming
        let stream_tx = tx.clone();
        let mut stream_client = self.deposit_manager.client.clone();
        tokio::spawn(async move {
            Self::stream_transaction_events(stream_client, stream_tx).await;
        });
        
        // Start polling backup
        let poll_tx = tx.clone();
        let mut poll_client = self.deposit_manager.client.clone();
        tokio::spawn(async move {
            Self::poll_completed_transactions(poll_client, poll_tx).await;
        });
        
        // Process incoming transactions
        while let Some(transaction) = rx.recv().await {
            if !self.running {
                break;
            }
            self.process_transaction(transaction).await?;
        }
        
        Ok(())
    }
    
    async fn stream_transaction_events(
        mut client: WalletClient,
        tx: mpsc::Sender
    ) {
        loop {
            match client.stream_transaction_events(Request::new(tari_rpc::TransactionEventRequest {})).await {
                Ok(mut stream) => {
                    while let Some(response) = stream.get_mut().message().await.ok().flatten() {
                        if let Some(transaction_event) = response.transaction {
                            if transaction_event.event == "Mined" && 
                               transaction_event.direction == "Inbound" {
                                // Would need to fetch full transaction details here
                                // and send via tx.send(transaction_info).await
                            }
                        }
                    }
                }
                Err(e) => {
                    eprintln!("Stream error: {}, retrying in 5 seconds...", e);
                    tokio::time::sleep(Duration::from_secs(5)).await;
                }
            }
        }
    }
    
    async fn poll_completed_transactions(
        mut client: WalletClient,
        tx: mpsc::Sender
    ) {
        let mut interval = interval(Duration::from_secs(30));
        
        loop {
            interval.tick().await;
            
            match client.get_completed_transactions(Request::new(tari_rpc::GetCompletedTransactionsRequest {})).await {
                Ok(mut stream) => {
                    while let Some(response) = stream.get_mut().message().await.ok().flatten() {
                        if let Some(transaction) = response.transaction {
                            let _ = tx.send(transaction).await;
                        }
                    }
                }
                Err(e) => {
                    eprintln!("Poll error: {}", e);
                }
            }
        }
    }
    
    async fn process_transaction(&mut self, transaction: TransactionInfo) -> Result<(), Box> {
        // Only process inbound, confirmed transactions
        if transaction.direction != 1 || // TRANSACTION_DIRECTION_INBOUND
           transaction.status != 6 || // TRANSACTION_STATUS_MINED_CONFIRMED
           self.processed_transactions.contains(&transaction.tx_id) {
            return Ok(());
        }
        
        // Extract payment ID
        let payment_id = String::from_utf8_lossy(&transaction.payment_id);
        
        if payment_id.is_empty() {
            println!("Transaction {} has no payment ID", transaction.tx_id);
            return Ok(());
        }
        
        // Look up deposit record
        if let Some(deposit_record) = self.find_deposit_record(&payment_id).await? {
            // Validate amount
            let amount_xtm = transaction.amount as f64 / 1_000_000.0;
            if amount_xtm < 0.001 {
                println!("Deposit amount too small: {} XTM", amount_xtm);
                return Ok(());
            }
            
            // Credit user account
            self.credit_user_account(
                &deposit_record.user_id,
                amount_xtm,
                transaction.tx_id,
                &payment_id
            ).await?;
            
            // Mark as processed
            self.processed_transactions.insert(transaction.tx_id);
            
            println!("✅ Processed deposit: {} XTM for user {}", 
                amount_xtm, deposit_record.user_id);
        } else {
            println!("Unknown payment ID: {}", payment_id);
        }
        
        Ok(())
    }
    
    async fn find_deposit_record(&self, payment_id: &str) -> Result, Box> {
        // Query your database
        println!("Looking up payment ID: {}", payment_id);
        Ok(None) // Placeholder - implement your database query
    }
    
    async fn credit_user_account(&self, user_id: &str, amount: f64, tx_id: u64, payment_id: &str) -> Result<(), Box> {
        // Implement atomic database transaction
        println!("Crediting user {} with {} XTM (tx: {})", user_id, amount, tx_id);
        Ok(())
    }
    
    pub fn stop_monitoring(&mut self) {
        self.running = false;
        println!("Deposit monitoring stopped");
    }
}

#[derive(Debug)]
struct DepositRecord {
    user_id: String,
    payment_id: String,
}`}
            />
        ),
    },
    {
        label: 'PHP',
        content: (
            <CodeContent
                code={`depositManager = $depositManager;
    }
    
    public function startMonitoring() {
        $this->running = true;
        echo "✅ Starting deposit monitoring...\n";
        
        // Start monitoring in a loop
        while ($this->running) {
            try {
                $this->pollCompletedTransactions();
                sleep(30); // Poll every 30 seconds
            } catch (Exception $e) {
                error_log("Monitoring error: " . $e->getMessage());
                sleep(5); // Wait before retrying
            }
        }
    }
    
    private function pollCompletedTransactions() {
        $request = new \Tari\Rpc\GetCompletedTransactionsRequest();
        
        try {
            list($stream, $status) = $this->depositManager->client->GetCompletedTransactions(
                $request,
                $this->depositManager->metadata
            );
            
            if ($status->code !== Grpc\STATUS_OK) {
                throw new Exception("gRPC error: " . $status->details);
            }
            
            // Process each transaction in the stream
            foreach ($stream->responses() as $response) {
                if ($response && $response->getTransaction()) {
                    $this->processTransaction($response->getTransaction());
                }
            }
            
        } catch (Exception $e) {
            error_log("Error polling transactions: " . $e->getMessage());
        }
    }
    
    private function processTransaction($transaction) {
        // Only process inbound, confirmed transactions
        if ($transaction->getDirection() !== \Tari\Rpc\TransactionDirection::TRANSACTION_DIRECTION_INBOUND ||
            $transaction->getStatus() !== \Tari\Rpc\TransactionStatus::TRANSACTION_STATUS_MINED_CONFIRMED ||
            in_array($transaction->getTxId(), $this->processedTransactions)) {
            return;
        }
        
        try {
            // Extract payment ID
            $paymentId = $transaction->getPaymentId();
            
            if (empty($paymentId)) {
                error_log("Transaction {$transaction->getTxId()} has no payment ID");
                return;
            }
            
            // Look up deposit record
            $depositRecord = $this->findDepositRecord($paymentId);
            
            if (!$depositRecord) {
                error_log("Unknown payment ID: {$paymentId}");
                return;
            }
            
            // Validate amount
            $amountXTM = $transaction->getAmount() / 1_000_000;
            if ($amountXTM < 0.001) { // Minimum deposit
                error_log("Deposit amount too small: {$amountXTM} XTM");
                return;
            }
            
            // Credit user account
            $this->creditUserAccount(
                $depositRecord['user_id'],
                $amountXTM,
                $transaction->getTxId(),
                $paymentId
            );
            
            // Mark as processed
            $this->processedTransactions[] = $transaction->getTxId();
            
            echo "✅ Processed deposit: {$amountXTM} XTM for user {$depositRecord['user_id']}\n";
            
        } catch (Exception $e) {
            error_log("Error processing transaction: " . $e->getMessage());
        }
    }
    
    private function findDepositRecord($paymentId) {
        // Query your database for the payment ID
        error_log("Looking up payment ID: {$paymentId}");
        return null; // Placeholder - implement your database query
    }
    
    private function creditUserAccount($userId, $amount, $txId, $paymentId) {
        try {
            // 1. Start database transaction
            // 2. Update user balance
            // 3. Create deposit history record
            // 4. Mark deposit as processed
            // 5. Commit transaction
            // 6. Send user notification
            
            error_log("Crediting user {$userId} with {$amount} XTM (tx: {$txId})");
            
        } catch (Exception $error) {
            // Rollback transaction
            error_log("Failed to credit account: " . $error->getMessage());
            throw $error;
        }
    }
    
    public function stopMonitoring() {
        $this->running = false;
        echo "Deposit monitoring stopped\n";
    }
}
?>`}
            />
        ),
    },
];
