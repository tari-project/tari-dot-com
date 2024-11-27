// TODO: Create a Non-Fungible resource with two NFTs in a new vault named 'nft_vault'
let bucket = ResourceBuilder::non_fungible()
    .with_non_fungibles(initial_nfts)
    .build_bucket();