pub fn mint_confidential(&self, mint: ConfidentialOutputStatement) {
  let manager = ResourceManager::get(self.confidential_vault.resource_address());

  // TODO: Mint confidential tokens and deposit them in the confidential_vault
  let bucket = manager.mint_confidential(mint);
  self.confidential_vault.deposit(bucket)
}