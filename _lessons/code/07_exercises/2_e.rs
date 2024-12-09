pub fn get_balance(&self) -> Amount {
  // TODO: Return the supply vault balance
  self.supply_vault.balance()
}