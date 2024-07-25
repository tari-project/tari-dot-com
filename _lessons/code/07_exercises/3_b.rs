pub fn withdraw(&mut self, fee: Bucket, nft: NonFungibleId) -> Bucket {
  assert!(fee.amount() >= FEE, "fee is too low");
  self.fee_vault.deposit(fee);
  // TODO: Withdraw requested token from NFT vault and return the Bucket.
  self.nft_vault.withdraw_non_fungible(nft)
}
