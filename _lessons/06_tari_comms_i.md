---
layout: lesson
title: Tari Comms - An In-depth Introduction
date: 2020-04-28 12:00
author: Stanley Bondi
thumbnail: learn-how-tari-works.png
lead: Tari Comms is the p2p networking crate that powers the Tari protocol
subtitle:
class: subpage
---

In this first lesson we will shed some light on the distributed peer-to-peer
(p2p) networking crate [`tari_comms`](https://crates.io/crates/tari_comms/)
and do a deeper dive into what makes it tick.

Some of the higher level architecture has already been covered in [How Tari Works - Part I](/lessons/02_how_tari_works.html),
so be sure to give that a read if you haven't already.

In this lesson we'll discuss:

1. Transports
1. The Anatomy of a Peer Connection
1. Tor Integration
1. The Messaging Protocol
1. Building a Comms Stack

## The `tari_comms` and `tari_comms_dht` crates

Underlying the Tari network are two crates, namely `tari_comms` and `tari_comms_dht`.

At it's core, `tari_comms` is responsible for

-   keeping a peer list and
-   establishing/accepting secure connections to/from those peers.

The `tari_comms_dht` crate contains the Tari DHT code and uses `tari_comms` to form a DHT network.

It provides interfaces that allow for peer discovery and
message propagation, as well as a message pipeline (essentially inbound/outbound middlewares)
that processes message envelopes flowing to/from peers.

## Overview

The `tari_comms` crate makes use of these wonderful technologies:

-   TCP, Tor and SOCKS5 transports for reliable communcation,
-   [`Multiaddr`](https://multiformats.io/multiaddr/) for self-describing and future-proof addressing of peers,
-   the [noise protocol](https://noiseprotocol.org/noise.html) for encrypted peer connections and authentication,
-   [`yamux`](https://github.com/hashicorp/yamux/blob/master/spec.md) for multiplexed communication over a single transport-level connection,
-   [`LMDB`](http://www.lmdb.tech/doc/) for peer storage. In the near future, this may be replaced with SQLite to facilitate more complex queries,
-   [`Protobuf`](https://developers.google.com/protocol-buffers) for structured data serialization over the wire,
-   [`tokio`](https://docs.rs/tokio/) and [`futures-rs`](https://docs.rs/futures) for concurrency.

## Building a Comms Stack

The first point of contact to the `tari_comms` crate is the `CommsBuilder` struct. This struct is an example
of the commonly used [builder pattern](https://doc.rust-lang.org/1.0.0/style/ownership/builders.html).

The following is an example of constructing a comms node to illustrate what is required.
A bit more work needs to be done to make this example work. If you would like to experiment with
a working example, checkout the tari repo and look in the examples folder in `comms/`.

```
use tari_comms::CommsBuilder;

#[tokio_macros::main]
async fn main() {
  // Load a node identity from a file.
  // The NodeIdentity struct contains the node's public/private key pair and publicly-accessible
  // address.
  let node_identity = load_node_identity();
  let storage = setup_peer_storage();

  let comms = CommsBuilder::new()
    // Allow peers to use localhost as their address for testing purposes
    .enable_test_addresses()
    // The transport to use
    .with_transport(TcpTransport::default())
    // The address to listen for peer connections
    .with_listener_address("/ip4/127.0.0.1/tcp/8080".parse().unwrap())
    // Set the identity of this node.
    // This is used to authenticate via the noise protocol and when identity information is exchanged
    .with_node_identity(node_identity)
    // Set the peer list storage backend
    .with_peer_storage(storage)
    .build()
    .expect("Failed to build comms");

  // The comms components are built, there may be some things you want to setup here before
  // spawning the node

  // Channel for outgoing messages. Send messages (`OutboundMessage`) on outbound_tx, and the messaging protocol will
  // do it's best to send them to the correct peer in the peer list
  let (_outbound_tx, outbound_rx) = mpsc::channel(10);
  // Channel for incoming messages.
  // Read `InboundMessage`s off the inbound_rx stream.
  let (inbound_tx, _inbound_rx) = mpsc::channel(10);

  let comms_node = comms
      // Setup a messaging pipeline. This provides pipelines for incoming and outgoing messages. This is optional.
      // You could add [tower services](https://docs.rs/tower-service/0.3.0/tower_service/trait.Service.html) (kind of like middleware) to
      // process all incoming and outgoing messages.
      .with_messaging_pipeline(
         pipeline::Builder::new()
            // Outbound messages will be forwarded "as is" to outbound messaging
            .with_outbound_pipeline(outbound_rx, std::convert::identity)
            .max_concurrent_inbound_tasks(1)
            // Inbound messages will be forwarded "as is" to inbound_tx
            .with_inbound_pipeline(SinkService::new(inbound_tx))
            .finish(),
    )
    .spawn()
    .await
    .expect("Failed to spawn comms");

  do_things_with_comms(&comms_node).await;

  // Shut everything down when done
  comms_node.shutdown().await;
}
```

## Transports

Every connection needs to start somewhere, and in the `tari_comms` crate it starts with the `Transport` trait.
This trait is an abstraction of the different methods that exist to transfer data between nodes.
It exposes two functions, namely `listen` and `dial`. Both of these functions take a single multi-address argument.

Every implementation of this trait needs to provide the code required to

-   connect to an address (it's called `dial` to remind you to phone your grandmother)
-   listen on the given address.

Of course, not every kind of address is supported by every transport and the transport will error if given an address it does not know how to deal with. This is ok and part of the
`Transport` contract.

The following `Transport` implementations are provided:

-   `TcpTransport`

The `TcpTransport` listens on and establishes connections over TCP. Under the hood, it uses `tokio`'s asynchonous
[`TcpStream`](https://docs.rs/tokio/0.1.12/tokio/net/struct.TcpStream.html).

It supports speaking the TCP protocol at IPv4 and IPv6 endpoints. In multi-address format, examples are `/ip4/1.2.3.4/tcp/18141` or `/ip6/::1/tcp/8080`.

-   `SocksTransport`

This transport speaks the SOCKS5 protocol at the configured TCP address. Calls to `connect` are requested via the SOCKS5 protocol.

When a Tari node is configured with the "tor" transport, it is actually using a `SocksTransport` that has been configured automatically
to work with the tor proxy without the user having to configure it.

-   `TcpWithTorTransport`

This transport composes the Tcp and Socks transport to allow nodes that are configured to connect and listen over TCP to communicate
with nodes that advertise Tor onion addresses exclusively.

All .onion addresses are routed through the `SocksTransport` and all TCP addresses are routed through the `TcpTransport`.

-   `MemoryTransport`

The `MemoryTransport` mimics an internet socket without any I/O and is used extensively in unit and integration tests. Under the hood it uses `future-rs` mpsc channels and
therefore it can only transport data in-process. If you've used zeroMQ this is similar to the `inproc` transport.

The
[_memorynet_ example](https://github.com/tari-project/tari/tree/development/comms/dht/examples/memory_net) in the `tari_comms_dht` code uses this transport to bring up a network of
nodes that attempt to discover each other all in memory.

## Anatomy of a p2p connection

Now that we've covered the different transport options, let's take a deeper dive into how each p2p connection is established.

For the purposes of this section, let's invoke our _untrusted_ friends Alice and Bob. Alice (the initiator) wants
to connect to Bob (the responder).

Three guarantees are required for a connection between Alice and Bob.

1. No private information, such as Alice's or Bob's public keys, are leaked to a (wo)man-in-the-middle during the handshake,
1. once the connection is established, Alice is sure she is talking to Bob and vice versa, and
1. any further communications sent between them is end-to-end encrypted.

Alice already has Bob's public key and public address in her peer list. Bob may or may not know anything about Alice.
She begins by asking her configured transport to `dial` Bob on the address.
Assuming Bob is online and listening, the connection is accepted.
At this point Bob has no idea who he is speaking to. Alice (as the initiator) has a few seconds to
start sending some speaking the protocol, or she'll be disconnected.

### 1. Wire mode

Alice starts by sending a single hard-coded byte that identifies that she wants to speak the protocol. This byte is the same for all nodes.

### 2. Noise Protocol Handshake

Without delay, she begins the [noise protocol IX handshake](https://noiseprotocol.org/noise.html#interactive-handshake-patterns-fundamental).

Once both sides have completed their parts of the handshake, we say that the connection has been "upgraded".
Connection upgrades are just another way of saying that both sides agree on how to continue communications.
In this case, both sides have agreed on how to encrypt further data sent between them.

In addition to this, the handshake has proven to Alice that she is speaking to Bob (or someone with Bob's private key).

### 3. Multiplexing

At this point, Alice and Bob want to agree on a method for the various components to speak to each other at
the same time over the same connection without getting their messages mixed up. This is called multiplexing.
`tari_comms` uses the [`yamux` protocol](https://github.com/hashicorp/yamux/blob/master/spec.md).

From now on, both sides can negotiate many dedicated "channels" called _substreams_ on which to send data as needed.
Substreams are similar to a TCP socket. In fact, they implement the `AsyncRead` and `AsyncWrite` traits just as
tokio TcpStream sockets do.

Many Tari components use [the actor model](https://en.wikipedia.org/wiki/Actor_model), and communicate asynchonously using
using [MPSC](https://docs.rs/futures/0.3.4/futures/channel/mpsc/index.html) channels. Multiplexing and substreams
can be thought about in a similar way. A substream is a communication channel between an actor in Alice's node and
an actor in Bob's node, allowing them to communicate as required over a single connection without having to concern
themselves with other messages sent over that connection.

#### Negotiating a Substream

If Bob wants to open a new substream, Bob asks Alice to open a new channel. As the initiator of the substream, he must send let Alice know the protocol he wants to speak. A
protocol can be thought of as a language that both sides speak. Since there are typically many protocols that a system can speak, Bob (as the initiator) must send a protocol
identifier. In the Tari protocol, this is a string containing the name of the protocol and the version e.g. `/tari/messaging/1.0.0`, but this can be any string that identifies the
protocol. If Bob knows how to speak `Tari messaging protocol v1.0.0`, the negotiation succeeds and the actor that has registered its interest in the protocol is notified, and the
conversation can begin. If not, Bob could try another protocol identifier or give up.

### 4. Identity Exchange

At this point Alice and Bob are connected! That is, they both know how to open channels to each other over an
encrypted connection! But wait... Bob knows Alice's public key. Great. But if Alice disconnected now, how would
he contact her again? Also, it seems a bit rude to connect and not introduce oneself wouldn't you say?

Let's rectify this by speaking our first substream protocol: `/tari/identity/1.0.0`. Alice is the initiator, opens
the substream and Alice and Bob exchange details, such as their multi-addresses, their capabilities and the protocols
they speak. Both add or update those details in their peer lists and immediately close the substream.

After all this has succeeded, the connection is active and is available for higher-level components.

## The Messaging Protocol

Substreams are relatively low-level, so it makes sense to use them to build some higher-level communication protocols.
`tari_comms` comes bundled with fire-and-forget style messaging (identified as `/tari/messaging/0.1.0`) and provides
a simple yet robust messaging interface. At the time of writing, this is the primary interface on which all base node,
DHT and wallet messages are exchanged. In future, the community may decide to implement an RPC-style messaging protocol
to remove the need for boilerplate when implementing request/response interactions.

At its essence (putting aside pipelines which we'll discuss later), the interface to this protocol is:

1. Send a message to a peer
1. Message received from a peer

Two `mpsc` channels are used, one for outgoing messages and one for incoming.

For each incoming message sent from a peer, an `IncomingMessage` struct is constructed and sent
on the incoming channel. The `IncomingMessage` struct contains the peer that sent it and the raw
message body that higher-level components will presumably be able to interpret.

Similarly, for outgoing messages, the `OutboundMessage` struct contains the `NodeId`
of the destination peer as well as the body/payload of the message to be sent.

The messaging protocol actor receives these messages where the following takes place:

1. It asks the `ConnectionManager` for a connection to a peer matching the `NodeId`.
1. In the meantime, all messages queued to be sent to this peer are queued up.
1. Once it has the connection, it opens a substream speaking `/tari/messaging/0.1.0`.
1. Once the substream is open, any queued messages are sent over to the receiving peer.

### Message Framing

Bytes flowing over a transport are well and good, but how do you know when a complete message has been received?
This is where _framing_ comes into the picture.

Framing is loosely-defined as a container for a payload of data. There are many schemes used in networking to delimit a frame.
Perhaps the most basic one is _newline framing_ where each message is delimited by a newline character.
Of course, this has limited utility (what happens if your message contains a newline?).
A much more robust framing scheme, that is used in the Tari messaging protocol, is _length-delimited_ framing. As the name suggests,
each frame is delimited with a `n` byte integer that specifies how much data to read to make up a single message.

```text
----------------------------------------------------------------------------------
| len(msg1) |           msg1            | len(msg2) |           msg2             |
----------------------------------------------------------------------------------
```

## Conclusion

`tari_comms` has many features required to build a peer-to-peer network, so why not give it a try and let the community know what you think!
If you're a more hands-on individual and would like to contribute to `tari_comms` or the Tari codebase in general, the [good first issue](https://github.com/tari-project/tari/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) label on the Tari github repo is a good place to start.

Look out for the next post on the still-evolving Tari DHT crate.
