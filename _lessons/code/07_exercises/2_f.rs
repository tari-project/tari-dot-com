pub fn withdraw(&mut self, _fee: Bucket, _amount: Amount) -> Bucket {
  // 🏋️ EXERCISE 2f: check fee amount and deposit in the fee_vault. Withdraw requested amount from supply vault and return the Bucket.
  assert!(_fee.amount() >= FEE, "Unsufficient fee provided!");
  self.fee_vault.deposit(_fee);
  self.supply_vault.withdraw(_amount)
}