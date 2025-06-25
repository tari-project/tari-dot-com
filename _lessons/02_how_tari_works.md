---
layout: lesson
title: How Tari Works - Part I
date: 2020-04-17 12:00
author: Cayle Sharrock
thumbnail: learn-how-tari-works.png
lead: A high level view of the world of Tari and how it works
subtitle:
class: subpage
---

\- Hi. I’m 😂👻😿🖐⛑🐙 [^1]. This is literally all you need to know to send Tari to me on the network. Any time of
day or night.

Now hang on a minute; last I heard, Tari was a Mimblewimble-based cryptocurrency. Everybody knows that there's no such
thing as an “address” in Mimblewimble. 😂👻😿🖐⛑🐙 looks an awful lot like an address, even if it is a cute and
cuddly one. Not only that, but I heard that it's impossible to send coins using Mimblewimble without the other party
being online.

\- Well yes, Tari makes use of the Mimblewimble protocol under the hood. But contrary to common belief, both parties
don’t need to be online simultaneously in order to transact in Tari. And you can reuse that same emoji ID that you
know and love over and over, without compromising your privacy or revealing your identity.

\- Let’s see how Tari achieves this.

[^1]: Names have been changed to protect the victims of tragic boating accidents.

## The Tari DHT network

The Tari communications stack, or comms stack, as we like to call it, is the technology behind the Tari peer-to-peer
messaging network. All Tari base nodes, wallets and (eventually) validator nodes are first-class citizens on this
network.

Each node maintains a database of other peers they know about, but not necessarily all of the peers in the network.

![dht.png](../assets/lessons/img/dht.png)

When viewed as a whole, the Tari network comprises overlapping neighbourhoods, with every node knowing about a few other
peers in its immediate vicinity. When a node needs to contact another peer that it doesn't know, it will send a
“Discovery Request” through the network. Nodes will pass the message along, getting closer and closer to the recipient
until someone is able to pass the message on to the intended destination. At this point the recipient will make direct
contact with the original sender and from that point on the two will communicate via end-to-end encryption.

It's a bit like when you wanted to send a note to someone on the other side of the class in grade school. You would fold
it up and ask the person next to you to pass it on. The difference is that in grade school the intermediaries would open
up your note and read what you had written there. On the Tari network, the messages are encrypted so that no one can
read the message. All they know is who the recipient is. They do not know what the message contains or who it is from.
This is done using an encryption protocol called asymmetric
[ECC encryption](https://cryptobook.nakov.com/asymmetric-key-ciphers/ecc-encryption-decryption).[^2]

This bears repeating: In a discovery message, it does mean that some nodes on the network will know that there is a
message being sent to the destination peer, but they will not know its contents, nor will they know from where the
message originated.

This type of network is called a distributed hash table. It’s based on a technology called
[Kademlia](https://en.wikipedia.org/wiki/Kademlia) and is very similar to how Bitorrent finds the, uh, totally
legitimate bits of files they’re downloading from disparate parts of the internet.

The upside of all of this is that anyone can find anyone else on the Tari network without

1. Any servers or central databases,
2. Having to keep a database of the entire network; you only need to track the peers in your neighbourhood.

This is great for privacy because there’s no central point of failure to get hacked and have the information sold on the
dark web; no trove of relationship data to sell to state apparatus to influence elections; no risk of catastrophic
hardware failure causing the entire network to collapse.

On the downside, it’s significantly slower than a central database. You can find anyone on a centralised social network
with a single lookup; while a lookup on the DHT takes log(n) queries. In practise, peer lookups on the Tari network can
take up to 60 seconds, especially with the added complexity of Tor thrown into the mix.

[^2]: An earlier version of the comms stack used symmetric encryption with a shared Diffie-Hellman key, which meant that the sender had to share his public key with the message; so everyone one would know that Alice was sending a message to Bob. We got tired of the gossip and speculation that there was something going on between those two, so we switched to the more private method.

### Tari and Tor

Tor is [The Onion Router](https://www.torproject.org/).

It’s called the onion router because it
[makes spies cry.](https://blog.torproject.org/thank-you-edward-snowden-tor) In actual fact, it’s called onion routing
because messages are wrapped in layers of encryption. Each layer, like a high-tech game of pass the parcel, is only able
to be unwrapped by a specific intermediary. When an intermediary unwraps a message, the details of another intermediary
are revealed. And the parcel gets passed around the internet until the final layer reveals the final destination of the
message. We wrote a fairly in-depth article about Tor at
[Tari Labs University](https://tlu.tarilabs.com/protocols/intro-to-tor-i2P/MainReport.html#tor-network).

Tari nodes use Tor by default. The advantages of Tor are manifold:

Firstly, Tor preserves your privacy by hiding your IP address from anyone snooping on the network’s traffic.

Secondly, Tor enables users behind firewalls to access the network without having to configure their routers or open
ports on their LAN.

And finally, Tor is what allows us to have mobile phones connect directly to each other on the Tari network without
having to go through a proxy server.

This last feature is what sets Tari aside from most other cryptocurrency projects that ship with mobile wallets,
including the Bitcoin Lightning Network. Lightning wallets cannot open channels directly from phone to phone over the
wider internet, but have to go through a server-based lightning router. Try it. I’ll wait.

It’s a bit of a pain, isn’t it? This is a major usability drawback and one which Tari is proud to have solved to some degree [^3].

The drawback of using Tor, as we mentioned above is that all this bouncing around the internet makes the Tari network
significantly slower. But you know what? It’s a bit like those cosmetics products: worth it.

[^3]: We haven’t solved it fully; wallets do need to talk to a node to obtain blockchain information for some things, including watching for transaction confirmations, but we have some ideas on how to reduce this in the future.

## How do we have “addresses”? I thought Tari used Mimblewimble.

When you send someone Bitcoin to someone’s address, what you’re really doing is locking up a UTXO with a cryptic message
saying `OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG. `Like when Harry Potter uncovers some ancient vessel
containing a scroll with the message “whosoever knows the number corresponding to the public key described herein may
seek their riches”; it’s basically the same thing. You’re not really sending Bitcoin to a mailbox; you’re leaving a
challenge open to the public that whoever can provide proof that they know the private key corresponding to the public
key in the script, the locked up bitcoin is theirs. Maybe it’s more Sword in the Stone; I was never a big fantasy guy.

Speaking of Harry Potter, Mimblewimble doesn’t have a concept of addresses. There’s no scripting in Mimblewimble, and
[participants in a transaction have to interact](https://tlu.tarilabs.com/protocols/mimblewimble-1/MainReport.html)
before it can be broadcast to the network.

So how does Tari claim to have a single, long-lived identifier, your emoji id, to handle all your transactions.

The trick is that your emoji id is really an address, more so than a Bitcoin address.

Peers on the network are identified via a unique public key. When a wallet or node registers on the network, it makes
the announcement, “Hi, I’m 😂👻😿🖐⛑”. That id is your identifier on the Tari DHT, and determines which
neighbourhood your node is in and allows other nodes and wallets to find you on the network as was described in the
section on the DHT.

So where does this id come from? Can I choose my own? I mean, that id is great, but I really want to have 🐴❤️🔑⛵️😢
as my emoji. The short answer is that you don’t get to choose your emoji id [^4].

What's actually happening is that when a wallet gets created a master seed is used. This seed is literally the key to
your entire Tari identity and wealth, so it’s really important to keep it safe.

Everything is derived from this seed, including your emoji id as well as every private key that is used in Tari
transactions.

This is behind the magic that lets it look like you have a Tari address. The emoji id, which is tied to your master
seed, allows your friends and family to find you on the network; which solves the interaction part of the Mimblewimble
transaction. The seed is also used to generate as many private keys as we like to use in transactions; which solves the
second part.

As long as you know your master seed, you can reconstruct your identity and wallet balance on another device.

### Staged Security

At this stage you may be asking yourself why you weren't asked to back up your seed phrase when you installed the Tari
wallet on your device. Most crypto wallets ask users to back up their seed phrase the first time they use the app. Why
didn’t we?

What is this, a New York nightclub? We aren’t going to charge you just to get into the door. You just want to look
around without being hassled. There’s no value in the wallet, so what’s the risk?

As if stopping the onboarding flow by asking users to back up a phrase isn’t bad enough -- on paper mind you, we’re
watching to make sure that you don't do something silly like take a screenshot. Some wallets even force their users to
write a test before letting them into the app. A test? Really? Guys, where is the trust?

Honestly, when new users have a new app in front of them what they really want to do is get involved and play with it as
soon as possible. I’m sure I’m not alone when I say I’ve uninstalled plenty of crypto wallets because of the hoops the
developers try to make me jump through to keep my huge balance of zero safu. Tari Aurora simply gets out of the user’s
way and let’s you play with the technology and the cryptocurrency immediately while there is little to no value stored
on the wallet.

It’s still really important to keep that master seed safe. I said that very thing eight paragraphs back. I stand by
that. It’s just not that critical when you have a zero balance.

Once the balance of your wallet exceeds a certain value the app will then prompt you to backup your seed phrase. At this
point you will be familiar with the app and how it works. This is the right time for us to start to nudge you to take
more precautions about the funds that are stored on your wallet.

I’ll bet that asking users to do things like backup a seed phrase too early on in their exploration process is actually
detrimental. They will either not back it up (and say they did) in which case the phrase is lost, or they comply not
knowing what the hell it is they’re doing and “back the phrase up” by emailing it to themselves, or posting it on
Instragram or doing any of a million other dumb things we all did when we first started our journey into crypto.

For Tari, we believe that the staged approach to security is better from _both_ a user experience as well as from a
security point of view in the long run [^5].

[^4]: But we have some pretty exciting ideas on how this can change in the future.

[^5]: The current testnet version of Tari Aurora does not have the staged security process. This feature is planned ahead of the mainnet release version.
