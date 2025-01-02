use tari_template_lib::prelude::*;

/// The flat fee payed for each withdraw
const FEE: Amount = Amount(10);

#[template]
mod template {
    use super::*;

    /// Defines the component state
    pub struct Monerokon {
        fee_vault: Vault,
        nft_vault: Vault,
    }

    impl Monerokon {
        /// Construct the component with an initial supply of non-fungible tokens.
        pub fn new(initial_nfts: Vec<NonFungibleId>) -> Component<Self> {
            let initial_nfts = initial_nfts
                .into_iter()
                .map(|nft| (nft, (&(), &())))
                .collect::<Vec<_>>();

            // TODO: Create a Non-Fungible resource with two NFTs in a new vault named 'nft_vault'

            let state = Self {
                nft_vault: Vault::from_bucket(bucket),
                fee_vault: Vault::new_empty(XTR2),
            };

            Component::new(state)
                .with_access_rules(
                    ComponentAccessRules::new().add_method_rule("withdraw", AccessRule::AllowAll),
                )
                .create()
        }

        pub fn withdraw(&mut self, fee: Bucket, nft: NonFungibleId) -> Bucket {
            assert!(fee.amount() >= FEE, "fee is too low");
            self.fee_vault.deposit(fee);
            // TODO: Withdraw requested token from NFT vault and return the Bucket.
        }

        pub fn mint_non_fungible(&self, nft: NonFungibleId) {
            #[derive(serde::Serialize)]
            struct MyData {
                data: String,
            }

            let manager = ResourceManager::get(self.nft_vault.resource_address());
            // TODO: Mint an NFT with data and deposit it in the nft_vault
        }
    }
}