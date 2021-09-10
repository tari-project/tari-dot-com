use tari_wallet::util::emoji::EmojiId;
use tari_crypto::tari_utilities::hex::Hex;

fn main() {
    const EMOJI: &str = "🐎🍴🌷🌟💻🐖🐩🐾🌟🐬🎧🐌🏦🐳🐎🐝🐢🔋👕🎸👿🍒🐓🎉💔🌹🏆🐬💡🎳🚦🍹🎒";
    const EMOJI_SHORT: &str = "🐎🍴🌷🌟💻🐖🐩🐾🌟🐬🎧🐌🏦🐳🐎🐝🐢🔋👕🎸👿🍒🐓🎉💔🌹🏆🐬💡🎳🚦🍹";
    
    // Convert a public key into its emoji ID
    let eid = EmojiId::from_hex("70350e09c474809209824c6e6888707b7dd09959aa227343b5106382b856f73a").unwrap();
    println!("{}",eid);
    
    // Convert an emoji to public key (in hex)
    let pubkey = EmojiId::str_to_pubkey(EMOJI).unwrap().to_hex();
    println!("{}", pubkey);
    
    //Test if both constants declared at the top are valid
    assert!(EmojiId::is_valid(EMOJI));
    assert_eq!(EmojiId::is_valid(EMOJI_SHORT), false, "Missing checksum");
    // TODO - check that emoji ID protects against transcription errors
    println!("It's all good!");
}
