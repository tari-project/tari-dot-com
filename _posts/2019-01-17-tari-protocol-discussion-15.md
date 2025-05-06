---
layout: post
title: Tari Protocol Discussion 15
date: 2019-01-17 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-15.png
lead: Building communication networks for the different components of the Tari ecosystem
class: subpage
---

On Thursday’s architecture discussion, the Tari community analyzed the different protocols - or communication networks - that might be useful to satisfy the goals of the Tari ecosystem. This is the TL;DR on the topics that were covered (full transcript included below):

* Which communication networks are well-suited for processes like tx transmission, checkpoint validation, and node discovery?
* The importance of building different protocols - or communication networks - for the different actors in the Tari ecosystem (base nodes, wallets, miners, validator nodes, asset managers)
* Weighing the different needs (speed, discoverability, privacy, security) of different actors in the Tari ecosystem 
* How end-users can maintain their privacy while making digital asset transactions
* The process by which asset issuers and wallets will discover network nodes

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
4:06 AM <@cjs77> Hi everyone
4:09 AM <@cjs77> We've got a bunch of RFCs in the pipeline; if there's anything anyone wants to discuss related to those, feel free to engage here.
4:10 AM <@cjs77> I've also started putting up issues on the Tari Github repo, many of which are tagged as "Good first issue". If you want to get involved with Tari development and are fairly new to Rust / Blockchain development, you might want to take a stab at one of those
4:11 AM <@cjs77> The issues are also tracked on the waffle board -- https://waffle.io/tari-project/tari if you'd rather use that platform
4:43 AM <@cjs77> Something that hasn't really been discussed yet are the various comm networks that will have to be constructed; both base and digital assets layer.
4:43 AM <@cjs77> We've mentioned that zMQ is a great library for building out protocols, but we haven't had much talk about what those protocols should be.
4:45 AM <@cjs77> So for example, there are several actors in the Tari ecosystem: Base Nodes, Wallets, Miners, Validator Nodes, Asset managers (i.e. digital asset wallets)
4:45 AM <Hansie> So any thoughts on the protocols?
4:45 AM <@cjs77> There could be different needs for the different actors' interaction viz. speed, discoverability, privacy, security and so on
4:47 AM <Hansie> So how can a digital asset wallet end user be private and able to buy a ticket, for example?
4:47 AM <Blackwolfsa> For example base layer might need gossip to find peers and broadcast blocks, while also using dandelion for tx transmission
4:48 AM <neonknight> I think a kademlia DHT network between Validator Nodes and/or Asset Managers will help discovery when only something like a Public key is known.
4:50 AM <simian_za> Hansie: in that case the user's  Asset manager+wallet is the one doing the discovery of which VN's manage the asset he wants to buy and then his Asset Manager+wallet will talk to the VNs directly once he has discovered them
4:50 AM <Hansie> So if I connect with my digital asset wallet to some VN to buy a ticket, will my details not be publicly available after that, open for spam?
4:52 AM <simian_za> Your asking if the discovery process will leak the details of the node doing the discovering?
4:53 AM <Hansie> Well, let's say my PK/details are now part of the DHT, am I not exposed?
4:55 AM <neonknight> Maybe you can create a shared secret using your private key and the VN's public key to encrypt your communication address so only the VN you are trying to talk to can decrypt it when he receives your messages. After discovery a direct comm channel can then be established.
4:56 AM <Hansie> Right, so something like Diffe-Hellman exchange to establish a trusted comms channel then P2P after that.
4:56 AM <simian_za> that will work, the only info thats leaked then is your public key itself and potentially that you are looking for a given PK but the actual comms will all be encrypted
4:57 AM <Hansie> So can digital asset wallet to some VN be similarly treated as VN to VN? Or do we need something different?
4:58 AM <Hansie> Or broadcasts?
4:58 AM <Blackwolfsa> I dont see any differance between the two
4:58 AM <Blackwolfsa> you dont want to broadcast, you would just send the instructions directly to a/or every vn
4:59 AM <Blackwolfsa> encrypted that is
4:59 AM <Hansie> Cool. So what are the performance implications of P2P on the 2nd layer then? Any issues?
5:01 AM <neonknight> To make the discovery slightly more efficient the Asset Manager should send the discovery request instruction only to VNs that have NodeIDs that are close to the VN he wants to talk to, but he could just send it to every VN he knows.
5:03 AM <neonknight> He could also just send it to any randomly selected VN and he will still reach the correct VN. It will just be more inefficient.
5:04 AM <Hansie> So how does the Asset Manager (Asset Issuer?) come to know any VNs?
5:05 AM <neonknight> The Asset Manager software should always have an initial list of VNs that can be expanded with usage of the network.
5:05 AM <simian_za> The VNs will register themselves on the base layer and when an asset is issued on the base layer the contract should also contain the VN's that are responsible for managing that asset
5:07 AM <Blackwolfsa> and that contract should be updated as the VN change about
5:09 AM <neonknight> When an asset is issued on the base layer, I think that it might only have the public keys of the VNs that are servicing that asset and not the comm address. The comm addresses of VNs needs to be found using discovery on the dht network.
5:09 AM <Hansie> simian_za: I do not follow you here "...when an asset is issued on the base layer..."
5:10 AM <simian_za> The contract that represents the asset will be written to the baselayer in some form
5:10 AM <simian_za> maybe a summary of the parameters as a hash but the public keys of the VNs in the committee will need to be in that base layer transaction
5:11 AM <@cjs77> There are lots of good ideas here. Is this a fair summary of what we have so far?
5:11 AM <@cjs77> https://www.irccloud.com/pastebin/CiAYinGt/
5:13 AM <simian_za> LGTM
5:13 AM <neonknight> I agree
5:14 AM <@cjs77> I think the pros/cons of a single DHT "directory" vs multiple should be examined a bit
5:14 AM <Hansie> cjs77: Please explain 'Whitelist' and why W <-> BN discovery is different to BN <-> BN discovery?
5:16 AM <@cjs77> Usually your wallet will connect to a single trusted node. In general, this is a whitelist (of one).
5:16 AM <@cjs77> A wallet doesn't usually care to maintain a full list of nodes (though maybe there might be a use case??)
5:17 AM <Hansie> So how is the 1st trusted node discovered? Or another on if the previous one is not available?
5:18 AM <@cjs77> from the whitelist
5:20 AM <Hansie> So a "permissioned" type setup?
5:23 AM <Hansie> And what about the digital asset wallets? I think they are missing from your table perhaps?
5:23 AM <@cjs77> maybe not in the sense that I think you mean, but you the wallet is pretty dumb and must talk to a base node to get txs  onto the network. If you run your own full node, then you want your wallet to connect to just that node.
5:24 AM <@cjs77> digital asset wallets are the AMs in the table
5:24 AM <@cjs77> If I've missed a combination, lmk
5:25 AM <Hansie> Cool, I think the table is a good summary yes.
5:26 AM <@cjs77> Ok, so I'll add an Issue to write up an RFC to bring all this stuff together.. it looks like some digging into the capabilities of Kademlia and how it could be integrated into Tari is warranted
5:27 AM <@cjs77> Of course one of the nicest things about all this is that you kinda get Bitcoin-like address functionality on Mimblewimble
5:29 AM <Hansie> We may also summarize somewhere how Grin and Beam do all of this for the applicable parts, as a reference.
5:47 AM <@cjs77> hansie: To add to the answer to your Q, So using the same approach as BNs to use a small whitelist and build a list of peers from that; and then randomly select some nodes to communicate to would work too if you trust random nodes
5:47 AM <@cjs77> and +1 on the Grin?Beam comparison 
5:52 AM <@cjs77> Added - https://github.com/tari-project/tari/issues/66
6:48 AM <Blackwolfsa> One thing we might need to look for, that a DHT might solve, is that we might have a lot of discovery request from wallets to find VNs 
7:37 AM <stanimal> Found it interesting to look at how a bit torrent client bootstraps the DHT - This rust implementation configures a bootstrap node (https://github.com/Luminarys/synapse/blob/257961614024f2fdfd6999b0b4ba8895689ce8e6/example_config.toml#L31) and if the routing table isn't bootstrapped it adds it to the route table (https://github.com/Luminarys/synapse/blob/257961614024f2fdfd6999b0b4ba8895689ce8e6/src/tracker/dht/mod.rs#L53) -
7:37 AM <stanimal> seems in many/all implementations you need a bootstrap node for DHTs
7:49 AM <mikethetike> Maybe we can use DNS seeds for the bootstrap?
9:48 AM <@fluffypony> Monero's bootstrap process is DNS seeds -> fallback nodes -> start randomly scanning IP addresses
```
