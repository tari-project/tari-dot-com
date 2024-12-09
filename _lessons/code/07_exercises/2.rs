use tari_template_lib::prelude::*;

/// The flat fee payed for each withdraw
const FEE: Amount = Amount(10);

#[template]
mod template {
    use super::*;

    /// Defines the component state
    pub struct Monerokon {
        // TODO: Add two vaults called `supply_vault` and `fee_vault`
    }

    impl Monerokon {
        /// Construct the component with an initial supply of fungible tokens.
        pub fn new(initial_supply: Amount) -> Component<Self> {
            // TODO: Create a fungible resource with an initial supply
            // let bucket = ResourceBuilder::fungible()

            let state = Self {
                // TODO:
                // 1. Deposit the initial tokens into a supply vault and,
                // 2. create an empty XTR vault called `fee_vault`.
            };

            Component::new(state)
                .with_access_rules(
                    ComponentAccessRules::new(), // TODO: allow anyone to call the "withdraw" method
                )
                .create()
        }

        pub fn get_balance(&self) -> Amount {
            // TODO: Return the supply vault balance
            todo!()
        }

        pub fn withdraw(&mut self, _fee: Bucket, _amount: Amount) -> Bucket {
            // 🏋️ EXERCISE 2f: check fee amount and deposit in the fee_vault. Withdraw requested amount from supply vault and return the Bucket.
            todo!()
        }
    }
}