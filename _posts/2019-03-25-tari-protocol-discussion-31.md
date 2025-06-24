---
layout: post
title: Tari Protocol Discussion 31
date: 2019-03-25 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-31.png
lead: Serializing messages on the Tari communication network
class: subpage
---

On Monday, the Tari community discussed various methods for sending messages on the Tari communication network. Below is the TL;DR on Monday's conversation (full transcript included below):

Serializing messages the Tari communication network

- Proposed solution is to use MessagePack for wire serialization, JSON and Base64 for human-facing interfaces
- gRPC is a schema-driven serialization protocol, and is unnecessary with ZeroMQ as a message delivery system
- ZeroMQ allows for multi-frame messages, supporting metadata in messages

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
12:04 PM <@cjs77> Another Monday night, another dev chat!
12:06 PM <@cjs77> I'd like to chat about serialisation quickly. There's a still WIP RFC on github that has some ideas: https://github.com/tari-project/tari/pull/182
12:07 PM <Hansie> Hi there
12:08 PM <@cjs77> We have basic tx merged in, some guys incl @stanimal and @neonknight are working on the comms network. If those are up and running, we can start to pass messages around, which is a big step towards getting testnet going
12:09 PM <@cjs77> But how to serialise those messages on the wire? And which formats to use where messages interface with human beings?
12:09 PM <Blackwolfsa> Is it possible to support both at the same time?
12:09 PM <@cjs77> tl;dr, #182 proposes MessagePack for wire serialisation and JSON and Base64 for human-facing interfaces
12:10 PM <stanimal> Good topic - I had previously thought GRPC was a good fit but I agree that MessagePack +  serde should give us everything we need to do compact RPC over the wire
12:11 PM <simian_za> Can you explain how those two options differ? (GRPC vs MessagePack)
12:11 PM <@cjs77> yes, agree. I'm a big fan of gRPC, but zeroRPC is exactly what you're referring to :)
12:11 PM <Hansie> MessagePack  looks great on face value
12:15 PM <stanimal> With gRPC you write a IDL definition (what your message interface looks like) and use a tool to generate code which is responsible for marshalling/demarshalling the raw message into structs
12:15 PM <simian_za> Ah so its not just the message format
12:16 PM <@cjs77> simian_za: gRPC is a schema-driven serialization protocol; you share the schema around and can then generate code to read/write messages over say, websocket. This is great for building a RPC-driven API, right?
12:16 PM <@cjs77> MessagePack is a much simpler protocol (think JSON, but in binary). So if you want to build an RPC-type API, you need some message delivery system to go with it.
12:16 PM <@cjs77> Since we've already landed on zMQ as a message delivery system, it would be neat if we could just use that.  Using gRPC as well would kinda be like solving the same problem twice.
12:17 PM <@cjs77> (I know I've re-answered the Q, but I'd done all that typing. Didn't feel like giving up on it :)
12:17 PM <@cjs77> https://www.zerorpc.io/
12:18 PM <stanimal> ^ that :)
12:18 PM <@cjs77> ^ Proof that it works
12:18 PM ⇐ el00ruobuob_[m] quit (~el00ruobu@212.121.161.50) Ping timeout: 250 seconds
12:18 PM <simian_za> Hehe, thanks that does answer it. A con that is mentioned in the RFC is that MessagePack doesn't support metadata, but we can support metadata ourselves by just adding a metadata message alongside the main message?
12:18 PM <neonknight> MessagePack seem like a great extension when used in combination with zeromq
12:19 PM <@cjs77> Yeah, zMQ allows multi-frame messages, so you can easily design your messages to have a "header" with the desired metadata in it
12:20 PM <stanimal> Yup, the header message part can also be in message pack format
12:23 PM <@cjs77> And MessagePack is supported by serde :)
12:23 PM <Blackwolfsa> Are we looking to encrypt those from the get go, or only rely on network encryption
12:23 PM <@cjs77> The ZMQ messages?
12:24 PM <@cjs77> neonknight, do you want to answer?
12:25 PM <Hansie> Oh oh, the ZeroMq book is not particularly fond of MessagePack: http://zguide.zeromq.org/py:chapter7#Serialization-Libraries
12:26 PM <neonknight> Messages between peers will probably need to be encrypted using something like a session token, but also messages that  that are routed through the network might have to be encrypted using a second mechanism so only the destination can open it.
12:26 PM <@cjs77> Hansie: Hintjens advocates JSON for control messages, and handrolled binary for everything else
12:27 PM <simian_za> I am guessing that the lower level wire protocol/transport layer will always have its own point-to-point per-session encryption like HTTPS or via Tor etc
12:27 PM <@cjs77> I've thought about this and I think the benefit of handrolled over MessagePack is unlikely to pay off the time and debugging taken to implement it
12:28 PM <simian_za> Especially if there is solid Rust/Serde support...then its a beautifully solved problem
12:28 PM <@cjs77> That's a gut feel rather than a data-driven exercize btw
12:28 PM <Hansie> cjs77: Just so long we are aware of pros and cons
12:29 PM <@cjs77> Yeah, as mentioned in the RFC, the default "just serialise it" function + serde attributes should do 95% of our serialisation work for us
12:29 PM <@cjs77> hansie: sure
12:30 PM <neonknight> Serialisation and Deserialisation using serde is going to accelerate development compared to handrolled.
12:31 PM <@cjs77> AND it's easier to write binding in python, node etc
12:31 PM <@cjs77> because you can deserialise messages using a standard library
12:31 PM <stanimal> We'll be able to try messagepak out without much dev time spent anyway, I feel there won't be an issue but if there is we should be able to drop in another solution without throwing away much - it's worth writing a small test/benchmark app  I think
12:32 PM <Hansie> Maybe we can just add a small section in the RFC about the "fast and small" (MessagePack ) vs "cheap and nasty" (handrolled). The reasons mentioned here
12:32 PM <@cjs77> Will do
12:33 PM <stanimal> neonknight: Nice thing about zMQ is that you get a kind of session token handled for you by using a router socket
12:33 PM <mikethetike> is there any danger is serde leaking or not clearing sensitive messages?
12:33 PM <mikethetike> not clearing meaning wiping keys from memory
12:34 PM <simian_za> mikethetike: hmmm that is a good point. I am guessing that part of our review and auditing process should be looking for that all through the system
12:34 PM <@cjs77> we'll have to look into what `Drop` traits are implemented
12:34 PM <neonknight> Stanimal, zMQ keeps on giving!
12:36 PM <@cjs77> So generally, it sounds good. If there are any other thoughts, you can stick them in the PR comments, or add them to the chat here
12:36 PM <mikethetike> it may be worthing thinking about how some of these will be saved to disk
12:36 PM <Hansie> Just wondering about different message sizes
12:37 PM <Hansie> Say a VN needs the initial asset state, which could be small or very very large
12:37 PM <Hansie> Will all of that be handled by one implementation? Or do we foresee further optimization?
12:38 PM <stanimal> mikethetike: currently there is an LMDB implementation which I'd think can also make use of the MessagePack format
12:39 PM <mikethetike> the storage format is up to the implementer of the library, but in rust if we are going to handcraft the serialization of storage, might be two implementations
12:56 PM <stanimal> For over the wire encryption, zMQ implements Curve25519 and every connection would need a new "server" and "client" key pair - need to understand what zMQ gives us and haven't so far found good examples of it's usage  - so far I made a small test app with this: http://api.zeromq.org/4-0:zmq-curve which very didn't work :P
1:47 PM <@cjs77> I got zmq-curve working and confirmed that there was encryption by inspecting the raw tcp packets with wireshark
```
