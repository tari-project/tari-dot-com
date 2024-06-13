pub fn mint_non_fungible(&self, nft: NonFungibleId) {
  #[derive(serde::Serialize)]
  struct MyData {
      data: String,
  }

  let manager = ResourceManager::get(self.nft_vault.resource_address());

  // TODO: Mint an NFT with data and deposit it in the nft_vault
  let bucket: Bucket = manager.mint_non_fungible(
      nft,
      &(),
      &MyData {
          data: "nft-data".to_string(),
      },
  );
  self.nft_vault.deposit(bucket)
}