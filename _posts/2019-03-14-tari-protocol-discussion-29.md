---
layout: post
title: Tari Protocol Discussion 29
date: 2019-03-14 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-29.png
lead: Understanding The Tari Network Communication Protocol
class: subpage
---

On Thursday, the Tari community examined the Tari Network Communication Protocol. Specifically, the goal was to understand how communication nodes and communication clients interact with each other on the Tari network. Below is the TL;DR on Thursday's conversation (full transcript included below):

Tari Network Communication Protocol Elements

* A communication Node is a Validator Node or Base Node 
* A communication Client is a Wallet or Asset Manager 
* CNs propagate data messages such as discovery requests
* CCs make use of the network but don't propagate anything
* Network allows for sending encrypted/unencrypted messages between nodes and clients

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
3:57 AM <@cjs77> Exciting news! A first draft of the MuSig implementation for Ristretto is now available for review: https://github.com/tari-project/tari/pull/162
3:58 AM <@cjs77> To my knowledge it's the first implementation of MuSig on Rust/Ristretto and may be the first Rust implementation of MuSig of any kind.
5:18 AM <neonknight> I think it would be nice if we can discuss the network communication protocol (https://rfc.tari.com/RFC-0170_NetworkCommunicationProtocol.html)
5:22 AM <simian_za> Looks really good
5:23 AM <neonknight> The idea is to have one big network where all the VNs and BNs are communication nodes (CN) and all the Wallets and Token Wallets and communication clients (CC). CNs propagate data messages such as discovery requests. CCs only make use of the network but dont propagate anything.
5:26 AM <stanimal> Sounds interesting - would Validator nodes also propagate transactions to base nodes?
5:27 AM <simian_za> So in a DHT network like this if the nodes can choose their own Node IDs you would have the possibility of an attacker mining for a set of Node IDs that can eclipse a victim. I like how the inclusion of some Node IDs (of the VNs) that are not chosen by the node itself but are assigned as part of their base layer registration byt he network mean that as long as you include a VN in your peer list you can't really be eclipsed
5:28 AM <neonknight> Yes stanimal a VN could have some peer connections to BNs and forward incoming transactions to them
5:31 AM <neonknight> The network can also be more efficient as Kademlia style directed forwarding of messages can be performed where the destination is know, but also gossip based forwarding can be performed where a message is of importance to a large subset of the network.
5:33 AM <Hansie> cjs77: `Exciting news! A first draft ...` Great, well done!
5:35 AM <stanimal> neonknight: makes sense, the most efficient method can be used depending on the type of message simian_za: so the base layer is a kind of random oracle for the VNs which can be used to keep the base nodes themselves from being eclipsed (and just generally making the network harder to attack) - cool
5:36 AM <simian_za> neonknight: When you say Kademlia style directed forwarding do you mean that the messages are passed along the nodes to the destination? I thought the Kademlia style DHT is used for discovery? Aren't the message sent directly to peers afte ryou have discovered them via the DHT?
5:36 AM <Blackwolfsa> and I take it for basenodes this doesnt matter because their primary communication is gossip?
5:38 AM <stanimal> simian_za: I think thats right - although "direct connections" would probably be made through a mix net like Tor / I2P
5:40 AM <neonknight> Simian, lets say I want to do a quick discovery request to find a specific node that I want to communicate with. I know the identification public key and node id of that node, then the a message with my encrypted net address can be sent through the network but each CN will only forward it to other CNs that are closer to the destination CN. The entire network wont get my message.
5:41 AM <simian_za> So you send the actual message? I kind of thought you would use the DHT to find that guys address and then send it to him directly?
5:43 AM <neonknight> Blackwolf i think a BN will still do directed forwarding of discovery requests for other CNs but when it sends blocks and transactions it could propagated using gossip protocol.
5:46 AM <neonknight> Simian, I think there might be a few ways to do discovery, some are more private and others are quicker.
5:47 AM <Hansie> So I take it the wallets will only be 'clients' for communication, and not relay messages as well?
5:49 AM <Hansie> Oh I see ` CNs propagate data messages such as discovery requests. CCs only make use of the network but dont propagate anything.`
5:50 AM <stanimal> Ye lookups and messages can be conducted iteratively (query closest peer you know of, get result, query that peer and so on) or recursively (query the closest peer you have and that peer then queries the closest peer they have and so on until there is a result)
5:51 AM <Hansie> Will this communication network also facilitate general type of messages between nodes/clients?
5:53 AM <Hansie> `Dave, you forgot to pay me the 10 Tari you owe me`
5:54 AM <Blackwolfsa> nothing stops you from doing that
5:54 AM <neonknight> You can send general encrypted or unencrypted data message, but CNs might add you to their local "ban" list if you spam the network
5:58 AM <@fluffypony> also there's a mixnets mailing list that is pretty good
5:58 AM <@fluffypony> worth reading some of the backlog, it doesn't have a lot of traffic
5:59 AM <@fluffypony> I'll find the link
6:00 AM <neonknight> Will have a look at the mixnets mailing list, thanx
6:00 AM <Hansie> fluffypony: Cool
6:02 AM <Hansie> neonknight: Will CNs and CCs be able to communicate from behind company firewalls?
6:03 AM <Hansie> For example someone on the Pentagon WiFi network wants to buy a ticket.
6:05 AM <Blackwolfsa> that depends on the firewall
6:05 AM <neonknight> I guess it depends on how the firewall is setup, if it doesn't block outbound connections then it should work.
6:06 AM → cryptoIndio joined (~cryptoInd@110.54.244.170)
6:06 AM <Blackwolfsa> typically if its someplace like the pentagon, I would ban outgoing all traffic by default. Which means it wont work
6:07 AM <simian_za> For wallets the connections will be outbound and if you use https then most firewalls that allow browsing should be fine. Running a base node that will need to accept incoming connections will probably not work behind a strict firewall when using IPv4/IPv6 transport. Though using a mixnet should be fine I think
6:19 AM ⇐ cryptoIndio quit (~cryptoInd@110.54.244.170) Remote host closed the connection
6:47 AM <@fluffypony> https://lists.mixnetworks.org/listinfo/mixnetworks
6:48 AM <@fluffypony> this is good too: http://mixbib.censor.watch
```
