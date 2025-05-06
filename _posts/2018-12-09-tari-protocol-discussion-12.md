---
layout: post
title: Tari Protocol Discussion 12
date: 2018-12-09 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-12.png
lead: Tari protocol base layer module design
class: subpage
---

Monday’s Tari protocol architecture discussion was all about the base layer modules of [Tari’s architecture proposal](https://github.com/tari-project/RFC/blob/master/proposals/181107-base-layer-architecture.md). Specifically, a few questions needed to be answered, as the above architecture proposal is only a rough draft. Questions like:

* Are the main moving parts of the base layer covered in the architecture proposal?
* Should the design layout for the code be grouped by function or by software stack?
* Does the Tari protocol architecture align with the folder structure proposal?
* Are Tari’s base layer modules sufficiently decoupled from each other?

The full discussion was one of the most vibrant Tari community discussions to date, and set the stage for a Thursday discussion on 2nd layer protocol architecture.

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
10:01 AM <@cjs77> Hey all
10:01 AM <simian_za> Hiya
10:02 AM <neonknight> Hello..
10:02 AM <@cjs77> I thought we’d discuss the project layout tonight
10:02 AM <Hansie> Hi there
10:02 AM <Hansie> Sounds interesting yes
10:03 AM <@cjs77> ref: https://github.com/tari-project/tari/pull/2
10:04 AM <@cjs77> with context: https://github.com/tari-project/RFC/tree/master/proposals
10:04 AM <@cjs77> In particular the high-level and base-layer proposals
10:04 AM <tk___> hey
10:05 AM <@cjs77> mikethetike had a suggestion:
10:05 AM <@cjs77> > I would have put all the base_layer folders in the root, and just had the digital_assets_layer as digital_assets
10:06 AM <stanimal> Hey everyone
10:06 AM <@cjs77> For those who don’t RTFM, here’s a summary:
10:06 AM <@cjs77> > The code follows a domain-driven design layout, with top-level folders falling into infrastructure, domain, or application layers.
10:06 AM <@cjs77> The infrastructure folder contains code that is not Tari-specific. It holds the following crates:
10:06 AM <@cjs77> comms: The networking and messaging subsystem
10:06 AM <@cjs77> crypto: All cryptographic services, including a Curve25519 implementation
10:06 AM <@cjs77> storage: Data persistence services, including LMDB
10:06 AM <@cjs77> The base_layer is a domain-level folder and contains:
10:06 AM <@cjs77> core: common classes and traits, such as Transactions and Blocks
10:06 AM <@cjs77> blockchain: The Tari consensus code
10:06 AM <@cjs77> mempool: The unconfirmed transaction pool implementation
10:06 AM <@cjs77> mining: The merge-mining modules
10:06 AM <@cjs77> p2p: The block and transaction propagation module
10:06 AM <@cjs77> api: interfaces for clients and wallets to interact with the base layer components
10:06 AM <@cjs77> The digital_assets_layer is a domain-level folder contains code related to the management of native Tari digital assets. Substructure TBD.
10:06 AM <@cjs77> It’s envisaged that at least the following applications are built on top of the domain layer libraries:
10:06 AM <@cjs77> A standalone miner (tari_miner)
10:06 AM <@cjs77> A pool miner (tari_pool_miner)
10:06 AM <@cjs77> A CLI wallet for the Tari cryptocurrency (cli_wallet)
10:06 AM <@cjs77> A full node executable (tari_basenode)
10:07 AM <simian_za> wont the digital assets layer also have its own p2p and api crates? If so then it would make sense to keep the current structure
10:08 AM <@cjs77> https://www.irccloud.com/pastebin/I5ZeLnAX/
10:08 AM <@cjs77> That’s better :)
10:08 AM <@cjs77> simian_za: that’s why I ultimately proposed the current structure
10:09 AM <@cjs77> There will be name clashes since we’re not just building a mimblewimble implem,entation, but a digital assets network as well
10:10 AM <simian_za> In terms of the applications I feel like the tari_miner and tari_pool_miner will be more tightly coupled
10:10 AM <Blackwolfsa> this makes more since, putting the da layer and base layer seperate
10:11 AM <Hansie> Yip, I would go with functional groupings rather than software stack groupings
10:12 AM <Hansie> We may potentially have multiple consensus algorithms/schemes/protocols, where would they live? Infrastructure?
10:13 AM <simian_za> if they relate to the base-layer in /base_layer/blockchain and for the digital_assets_layer in a folder related to consensus?
10:14 AM <@cjs77> If they’re blockchain agnostic, then they should go in infrastructure; with a suitable abstraction layer; If they use blockchain language, then they’re domain layer
10:16 AM <@cjs77> A more clearcut example is a datastore like LMDB. It’s infra. A websocket library is infra. I’d argue that ECC libraries are also infra
10:17 AM <Hansie> I think it would potentially be applicable to both layers, but more so the 2nd layer
10:17 AM <Hansie> Plug-gable consensus perhaps…
10:18 AM <simian_za> my gut says consensus algorithms would be fairly closely tied to their respective layers? But I suppose we might get really good at writing very modular code
10:18 AM <neonknight> The “Blockchain” section of “infrastructure” already says “The Tari consensus code”, might work well there.
10:19 AM <@cjs77> yeah it depends what you mean by consensus algo. Nakamoto consensus is pretty tightly coupled to the base layer :)
10:19 AM <Blackwolfsa> but going by the design, the consensus on the base and second layer would be fundamentally different
10:21 AM <simian_za> what else would be in the base_layer/blockchain folder? the datastructures to store the blockchain, all the merkle proofs to determine the chains validity and?
10:21 AM <Hansie> We may have some consensus re-use if there is a case where consensus is needed on the base layer for some arbitration on the 2nd layer?
10:22 AM <simian_za> I feel like that consensus code would like in the second layer crates and then be pulled into the base_layer from there
10:22 AM <simian_za> like = live
10:23 AM <@cjs77> In any event, with the folder structure ±locked in, and given the alignment with the high-level architecture, we can start to map out some milestones and initial tickets for the independent modules
10:23 AM <@cjs77> and then you guys can go and play with some code :)
10:24 AM <simian_za> woop woop, finally!
10:24 AM <neonknight> That will be a good day
10:24 AM <Hansie> @simian_za, “what else would be in the base_layer/blockchain folder?” maybe something to do with emission schedule, token management, inflation, block times, etc.
10:28 AM <simian_za> 👌
10:28 AM <Hansie> Where ‘smart contracts’, ‘script-less scripts’?
10:29 AM <simian_za> hmm that’s a good question. Those will be coupled to both the base-layer and second layer
10:29 AM <Blackwolfsa> I would probably think more base layer
10:31 AM <Hansie> Also, perhaps an asset_management application for the asset issuer?
10:32 AM <simian_za> perhaps just a GUI wallet that can handle interaction with the base and second layers?
10:32 AM <mikethetike> I think most of the other coins build that into the default wallet
10:35 AM <Hansie> I feel uneasy about that @mikethetike, adding things in one application with very little in common, or am I mistaken?
10:36 AM <simian_za> traditionally the wallet application is where the client functionality lives
10:36 AM <mikethetike> The wallet functionality is really small
10:36 AM <mikethetike> in most coins
10:36 AM <@cjs77> scriptless scripts are split between domain and infra. e.g. a generic signature aggregation scheme (e.g. MuSig) falls under infra, but an atomic swap would be built on those primitives in the domain layer
10:36 AM <Blackwolfsa> Both would likely be written as a small library, to implement both would be trivial
10:37 AM <@cjs77> a wallet is an executable though, and shouldn’t be in the libraries
10:37 AM <Blackwolfsa> yes, but I would believe most of the functionality should be written as libraries
10:37 AM <@cjs77> yeah the API will be a library
10:38 AM <@cjs77> That makes it easy to write a CLI wallet and a GUI wallet without repeating any code
10:39 AM <Hansie> @cjs77, you lost me with ‘domain layer’, is that in the folder structure? Or should I read between the lines…
10:41 AM <@cjs77> Domain layers are layers that contain the business language & logic. For Tari there are basically 2 domain layers: The base_layer and digital_asset_layer. They’re broadly independent, hence they’re separate, but they’re both built using domain language terms like `Block`, `Transaction`, `TariAmount` etc. Does that make sense?
10:42 AM <Hansie> Perfect thanks :-)
10:45 AM <Hansie> So i.t.o. applications, if we have a ‘tari_basenode’ should we have a ‘tari_validator_node’?
10:45 AM <@cjs77> blackwolfsa: re: If I infer where you were getting at with your comment about applications — if we do this properly, the applications are mostly just wiring things up, right? I mean the CLI app code shouldn’t be more than a few hundred lines (read config; get input; relay to API, return results)
10:45 AM <@cjs77> Hansie: yup
10:45 AM <@cjs77> but we haven’t really discussed what the 2nd layer looks like yet
10:45 AM <Blackwolfsa> yes, correct
10:46 AM <Hansie> Good
10:46 AM <@cjs77> Maybe we should start that conversatoin on Thurs
10:47 AM <Hansie> Great idea
10:51 AM <simian_za> It is a nice context to start thinking about the components we need to build
10:51 AM <@cjs77> +1
10:55 AM <@cjs77> Cool, so I’ll merge that PR in; and then there’s a small PR for some crypto primitives that sort of illustrate my thinking around abstraction, documentation and testing, which everyone is welcome to comment on
10:56 AM <Hansie> Cool
10:56 AM <simian_za> 👍
```
