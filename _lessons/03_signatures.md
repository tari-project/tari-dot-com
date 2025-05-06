---
layout: lesson
title: Signing a Message
date: 2020-04-20 12:00
author: Cayle Sharrock
thumbnail: learn-signing-a-message.png
lead: Let's sign a message with our private key 🔐
subtitle:
class: subpage
---

For details on the mathematics behind digital signatures,
[Tari Labs University](https://tlu.tarilabs.com/cryptography/digital_signatures/introduction_schnorr_signatures.html)
has a good introduction.

For now let's have Alice sign a message and have Bob verify that it is from her.

Let's assume that Alice has published her public key as `42b0c615e38cc7deaf574fd7127c8c58a3e654137415feb59770f3c110dca378`.

```
use tari_crypto::{
    keys::{PublicKey, SecretKey},
    ristretto::{RistrettoPublicKey, RistrettoSecretKey, RistrettoSchnorr},
    common::Blake256,
};
// Imports the to_hex trait method
use tari_utilities::hex::Hex;
// imports the as_bytes trait method
use tari_utilities::byte_array::ByteArray;
use digest::Digest;

/// The signature challenge is Hash(P || R || message)
fn create_challenge(pubkey: &RistrettoPublicKey, r: &RistrettoPublicKey, msg: &str) -> Vec<u8> {
    Blake256::new()
        .chain(pubkey.as_bytes())
        .chain(r.as_bytes())
        .chain(msg.as_bytes())
        .result()
        .to_vec()
}

fn main() {
    let mut rng = rand::thread_rng();
    let alice_k = RistrettoSecretKey::from_hex("df5f802bf33ff4d80198ec604b1413e25d1f53cd20fb4039901a7c34c1cafb0b").unwrap();
    let alice_p = RistrettoPublicKey::from_secret_key(&alice_k);
    println!("Alice's public key is {}", alice_p);
    // Alice must generate a single-use random number for every signature
    let (nonce, pub_nonce) = RistrettoPublicKey::random_keypair(&mut rng);
    // The message to sign
    let msg = "Hello, Bob.";
    // TODO -- create the challenge
    let e =
    let sig =  RistrettoSchnorr::sign(alice_k, nonce, &e).unwrap();
    let s = sig.get_signature().to_hex();
    let r = sig.get_public_nonce().to_hex();
    println!("Alice sends the message and signature to Bob:\nmsg: {}\nsig: {},{}\n\n", msg, s, r);

    // Now Bob wants to verify the signature
    // TODO - recreate the public nonce for Bob using the hex values Alice provided
    let r_bob = RistrettoPublicKey::...
    let s_bob = RistrettoSecretKey::...
    // Recreate Alice's public key from the value she publiched
    let alice_pubkey = RistrettoPublicKey::from_hex("42b0c615e38cc7deaf574fd7127c8c58a3e654137415feb59770f3c110dca378").unwrap();
    // TODO - Bob has everything he needs to generate the challenge now
    let e_bob = ...
    // Create the signature instance
    let sig_bob = RistrettoSchnorr::new(r_bob, s_bob);
    let result = sig_bob.verify_challenge(&alice_pubkey, &e_bob);
    if result {
        println!("The message is signed by Alice");
    } else {
        println!("Someone is trying to impersonate Alice!");
    }
}
```

```
Alice's public key is `42b0c615e38cc7deaf574fd7127c8c58a3e654137415feb59770f3c110dca378`
Alice sends the message and signature to Bob:
msg: `Hello, Bob.`
sig: `97938897220dcff9016af881d547d1ba1ef07b8465b1885f183c3872e142f40e`, `8e1cfbb2973d9d5b52e84816a78f6adc876b91d31cde7ea9cd16f1093927be4a`
The message is signed by Alice
```
