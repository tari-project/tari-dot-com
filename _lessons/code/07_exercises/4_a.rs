// TODO: Create a confidential resource with an initial supply
let bucket = ResourceBuilder::confidential()
    .initial_supply(initial_supply)
    .build_bucket();

let state = Self {
    // TODO: Create and set confidential_vault and empty fee_vault
    fee_vault: Vault::new_empty(XTR2),
    confidential_vault: Vault::from_bucket(bucket),
};