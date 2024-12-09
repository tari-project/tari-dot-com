pub fn withdraw(&mut self, fee: Bucket, withdraw: ConfidentialWithdrawProof) -> Bucket {
  assert!(fee.amount() >= FEE, "fee is too low");
  self.fee_vault.deposit(fee);

  // TODO: Withdraw from confidential vault and return the Bucket.
  self.confidential_vault.withdraw_confidential(withdraw)
}