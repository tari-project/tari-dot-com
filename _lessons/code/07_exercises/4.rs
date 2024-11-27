use tari_template_lib::prelude::*;

/// The flat fee payed for each withdraw
const FEE: Amount = Amount(10);

#[template]
mod template {
    use super::*;

    pub struct Monerokon {
        fee_vault: Vault,
        confidential_vault: Vault,
    }

    impl Monerokon {
        /// Construct the component with an initial supply of confidential tokens.
        pub fn new(initial_supply: ConfidentialOutputStatement) -> Component<Self> {
            // TODO: Create a confidential resource with an initial supply

            let state = Self {
                // TODO: Create and set confidential_vault and empty fee_vault
            };

            Component::new(state)
                .with_access_rules(
                    ComponentAccessRules::new().add_method_rule("withdraw", AccessRule::AllowAll),
                )
                .create()
        }

        pub fn withdraw(&mut self, fee: Bucket, withdraw: ConfidentialWithdrawProof) -> Bucket {
            assert!(fee.amount() >= FEE, "fee is too low");
            self.fee_vault.deposit(fee);

            // TODO: Withdraw from confidential vault and return the Bucket.
        }

        pub fn mint_confidential(&self, mint: ConfidentialOutputStatement) {
            let manager = ResourceManager::get(self.confidential_vault.resource_address());
            // TODO: Mint confidential tokens and deposit them in the confidential_vault
        }
    }
}