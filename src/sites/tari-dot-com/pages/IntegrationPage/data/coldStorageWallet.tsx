import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const coldStorageWallet = [
    {
        label: 'Pseudocode',
        content: (
            <CodeHighlight title="🧠 Cold Storage Setup Logic">
                <CodeContent
                    code={`FUNCTION setupColdStorageWallet():
    // Step 1: Air-gapped environment validation
    IF (networkConnected() OR usbDevicesConnected()):
        THROW "Environment not sufficiently isolated"
    
    // Step 2: Generate seed phrase securely
    seedPhrase = generateMnemonic(24) // 24-word BIP39 mnemonic
    validateMnemonic(seedPhrase)
    
    // Step 3: Create physical backup
    printSeedPhrase(seedPhrase) // On paper, never digital
    createMetalBackup(seedPhrase) // Fire/water resistant
    
    // Step 4: Initialize wallet from seed
    coldWallet = createWalletFromSeed(seedPhrase)
    
    // Step 5: Generate multiple addresses for rotation
    addresses = []
    FOR i = 0 TO 9:
        address = coldWallet.deriveAddress(i)
        addresses.append(address)
    
    // Step 6: Export public keys only for monitoring
    publicKeys = []
    FOR EACH address IN addresses:
        publicKeys.append(address.getPublicKey())
    
    // Step 7: Secure the seed
    securelyDestroySeedFromMemory()
    storeInSecureSafe(seedPhrasePaper)
    
    // Step 8: Create watch-only wallet for hot system
    watchOnlyWallet = createWatchOnlyWallet(publicKeys)
    
    RETURN {
        watch_only_keys: publicKeys,
        addresses: addresses,
        backup_completed: true
    }`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Setup Process',
        content: (
            <CodeContent
                code={`# Cold storage setup on air-gapped machine

# 1. Disconnect from all networks
sudo systemctl stop networking
sudo systemctl disable networking

# 2. Remove WiFi/Bluetooth capability
sudo rfkill block all

# 3. Create cold wallet
minotari_console_wallet --create-id --seed-words

# 4. Backup seed phrase (write on paper)
# Store in multiple secure locations

# 5. Export public key for monitoring
minotari_console_wallet --export-spent-outputs > cold_wallet_outputs.json

# 6. Transfer public key data to hot system via secure method
# (QR code, encrypted USB, etc.)`}
            />
        ),
    },
    {
        label: 'Security Measures',
        content: (
            <CodeContent
                code={`# Security measures for cold storage

## Physical Security
- [ ] Dedicated air-gapped machine
- [ ] No network interfaces
- [ ] Secure facility storage
- [ ] Access logging

## Seed Phrase Security
- [ ] 24-word BIP39 mnemonic
- [ ] Multiple physical copies
- [ ] Fireproof/waterproof storage
- [ ] Geographic distribution

## Operational Security
- [ ] Multi-person approval process
- [ ] Hardware security modules (HSM)
- [ ] Transaction signing ceremony
- [ ] Audit trail logging

## Emergency Procedures
- [ ] Seed phrase recovery process
- [ ] Emergency contact procedures
- [ ] Insurance coverage
- [ ] Legal documentation`}
            />
        ),
    },
];
