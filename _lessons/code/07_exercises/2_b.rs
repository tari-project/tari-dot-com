// TODO: Create a fungible resource with an initial supply
let bucket = ResourceBuilder::fungible()
    .initial_supply(initial_supply)
    .build_bucket();