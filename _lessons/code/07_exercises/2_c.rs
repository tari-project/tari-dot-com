let state = Self {
  // TODO:
  // 1. Deposit the initial tokens into a supply vault and,
  supply_vault: Vault::from_bucket(bucket),
  // 2. create an empty XTR vault called `fee_vault`.
  fee_vault: Vault::new_empty(XTR2),
};