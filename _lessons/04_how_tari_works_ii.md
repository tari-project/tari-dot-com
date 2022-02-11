---
layout: lesson
title: How Tari Works - Part II
date: 2020-04-21 12:00
author: Cayle Sharrock
thumbnail: learn-how-tari-works-2.png
lead: A deeper dive into the world of tari and how it works
subtitle: 
class: subpage
---

Let’s lift the hood and look at what makes Tari tick.

Tari messages are serialised using
[protobuf](https://developers.google.com/protocol-buffers), encrypted and sent over the wire. Tari nodes can advertise
themselves using IP addresses, or Tor hidden services. Tor is the default and is recommended; but if Tor doesn’t work
for some reason, you can revert to IPv4/6. However, you will likely have a degraded experience because IP nodes don’t
know about Tor nodes; only other IP nodes. On the other hand, Tor nodes can speak to both Tor and IP nodes. You can also
expose an IP address and connect to onion nodes using a local Tor proxy.

Tari nodes will build up a database of peer nodes over time. But the first time they run, they don’t know anybody, so
how does the new Tari node on the block make any friends? The answer is that there’s a hard-coded list of nodes that
_should_ be running all the time included with the node or wallet installation. These nodes will bootstrap a node’s peer
database and introduce it to like-minded privacy and crypto aficionados in the node’s DHT neighbourhood.

As we discussed in the DHT section, distributed hash tables allow a network to make all the information on that network
discoverable without requiring every node in it to hold a full copy of that information. A Tari node will only
necessarily share its peer information with peers in its local neighborhood.

If a remote peer wants to send you a message, for example a new Tari transaction, it will send a Discovery Request
through the Tari network. Discovery Requests are inefficient. For privacy reasons, the sender is not identified in the
clear and therefore the usual DHT approach of hopping ever-closer

The discovery request hops from peer to peer, getting closer to your neighbourhood on every hop, until a node is found
that knows who you are. That node will then contact your node directly to complete the transaction.

Both nodes will add each others’ contact information in their peer databases so that future communication is direct and
very fast. You’ll notice this when you first send Tari to a new contact (e.g. after scanning their pubkey from a QR
code), it may take 30s - 60s before the transaction appears in your transaction list. But the second and subsequent
times you send Tari, the response is essentially instantaneous.


### Sending Tari from Aurora

When Alice sends Tari to Bob, she:

1. selects his name from her address book,
2. taps in the amount,
3. clicks send.

 After a few seconds the transaction will appear in both their transaction pending lists and after a minute or two the
 transaction will be finalized.

From a user perspective this is a seamless and very natural process that is actually fairly unique amongst
cryptocurrency projects. For Tari Aurora we have focused heavily on user experience to make the sending and receiving of
Tari so natural that it feels no different to sending a message on WhatsApp or a payment over Venmo.

However, under the hood a much more complex process and negotiation is taking place. The first thing that happens when
Alice clicks the send button is that her wallet looks up the public key of the recipient, derived from his Emoji Id.

Whether she typed in a name from her address book, pasted an emoji ID or scanned a QR code makes no difference to the
Tari wallet. All of these methods resolve to the same public key. If this public key is in Alice’s wallet’s peer
database then the wallet will try to establish a direct connection to Bob using the internet or onion address that is
stored in Alice’s peer database.

If Bob’s public key is not in the peer database, then the wallet will issue a Discovery Request, described above, to the
network before a connection is initiated.

Once the connection between Alice and Bob has been made, the transaction negotiations can begin.

Alice’s wallet will create an initial transaction that contains the amount she’s sending, change details and network
fee. Alice's wallet software will then select a suitable set of UTXOs to pay for the transaction [^6], sign the
transaction, and send the partially completed transaction message over the network to Bob's wallet. On receipt of this
message, Bob’s wallet will validate that the information provided is consistent with what it knows about the state of
the blockchain. It will complete the transaction by providing amongst other things a commitment for the amount of Tari
that it is receiving, which encodes Bob’s new spending key. Bob’s wallet will then sign this transaction and send it
back to the original sender. Once Alice receives the signed response from Bob, her wallet will do some final checks and
then sign the completed transaction.

At this point the transaction is ready to be broadcast to the blockchain. This entails the node sending a copy of the
transaction to its peers. They in turn, will validate it, and if it is valid propagate it further to the rest of the
network.

Phew. There’s a lot going on there. Here’s a sequence diagram illustrating this process:

![transaction_protocol.svg](../assets/lessons/img/transaction_protocol.svg)

Eventually a mining node will find a new block and include this transaction in its transaction list for that block. At
this point the transaction can be considered somewhat finalized.

Obviously with any proof of work blockchain, no transaction is ever truly 100% finalized, but with every block that is
added to the chain, there is less and less chance that a transaction can be reversed.

For the purposes of user experience for testnet we are assuming that a transaction is considered finalised once it has
been mined into the blockchain. As main net approaches and users become more familiar with the transaction flow, we may
consider expanding the definition of transaction finality to something that is more accurate in terms of traditional
proof of work blockchain terminology.

[^6]: Wallets can employ a variety of UTXO selection algorithms. Presently, the Tari wallet library has two very simple
selection algorithms: Spend smallest first; and spend oldest first. “Spend oldest” first is the default algorithm.
