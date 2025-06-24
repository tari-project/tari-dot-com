---
layout: post
title: Tari Protocol Discussion 5
date: 2018-11-09 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-5.png
lead: Speed, decentralization, and security trade-offs on the Tari protocol's second layer.
class: subpage
---

Yesterday, the Tari community discussed the trade-offs needed for the Tari protocol's second layer. Speed, decentralization, and security are all opposing forces, and yesterday’s discussion was about balancing each component.

This is the TL;DR of yesterday’s conversation (full transcript included below):

Speed vs. decentralization trade-off

- Every second layer node doesn’t need to execute every asset’s instructions (instructions refer to digital asset state changes)
- Speed is valuable for digital assets — even if it comes at the expense of some second layer decentralization

Syncing first and second layers by invoking collateral requirements

- Helps punish bad actors
- Makes it expensive to run a sybil attack
- How long should collateral be locked up?

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**
**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
10:07 AM <@cjs77> Onto the architecture discussion; we seem to be converging on this idea of a MimbleWimble base layer merge-mined with Monero; and a fast second layer handling digital assets
10:14 AM <simian_za> Has there been any thought to the options for BFT on the second layer. Which ones are “fast”?
10:17 AM <@cjs77> On the 2nd layer, there’s no need for every 2nd-layer node to validate every instruction wrt to every digital asset that exists on the network. I’d argue that it’s a necessary (and desirable tbh) trade off to offer up some decentralisation to gain speed. With that said, what about this (very rough) idea:
10:17 AM <@cjs77> — A user/wallet submits an instruction to the network (Transfer 100 Tari to (output) for this token on DA #ta123)
10:17 AM <@cjs77> — A 2nd-layer node picks up the instruction and looks up in a hash table that it’s keeping in sync with it’s peers, which Nodes are responsible for executing transactions for that asset
10:17 AM <@cjs77> — It relays the instruction (via the messaging layer, which might go via Tor, I2P, or whatever) to those node(s).
10:17 AM <@cjs77> — The node(s) execute the instruction and reach consensus on the new state for DA #ta123 (consensus mechanism TBD)
10:17 AM <@cjs77> — Every so often, 2nd-layer nodes bundle up the asset state into a merkle tree and post a checkpoint transaction onto the base layer
10:19 AM <Blackwolfsa> I believe we need to look at some kind of “offline” solution here for speed, because we are looking at very high throughput for some scenarios we cant rely on the slow speed of the blockchain for each transaction
10:19 AM <@fluffypony> offline as in?
10:21 AM <Blackwolfsa> Not requiring input from the blockchain each time. I am thinking perhaps almost like lightning network operates, but not in a channel between 2 peer’s but more than that
10:21 AM <@cjs77> I forgot to mention In Step 2, the node would have to check that the Tari transfer is a valid base layer transaction too. This leads to a question around payment channels on the 2nd layer, since if there’s a ~1:1 Tari transaction for each asset instruction, that won’t scale if every Tari tx has to be reflected on the base layer.
10:21 AM <@cjs77> balckwolfsa: you mean offchain :)
10:21 AM <simian_za> So how do nodes indicate they are responsible for processing a specific DA? Do they opt in on certain assets or does the network dish the responsibility out?
10:23 AM <mikethetike> Maybe something like how the tor hidden services have a meeting point?
10:23 AM <neonknight> If multiple 2nd layer nodes can provide a verifiable history of a token, then you probably do not have to query the block chain
10:24 AM <@cjs77> In the early days, I wouldn’t be surprised if asset issuers would want the ability to authorise specific nodes to handle their assets; so we should support that. But we should also introduce a mechanism for nodes to opt in in some way so that Tari is also a permissionless network
10:24 AM <Blackwolfsa> yes, but you need to have a way of dealing with funds. Someone needs to pay some fee for modify/transfer of tokens. Those require tari, which requires base layer
10:26 AM <Blackwolfsa> @cjs77, @mikethetike, what about either you chose your own specific nodes(on their keys), or the network choses specific nodes for you(in some non deterministic way)?
10:26 AM <mikethetike> With the second layer running out of step with the first layer, the fees might need to be prepaid/locked up before you can invoke second layer actions
10:27 AM <Blackwolfsa> That would be fine with for example tickets. We know they will be redeemed once, so we can lock those up before hand with the ticket. But what about transfer or modify
10:28 AM <tk___> will the node opt-in include some sort of Tari token staking?
10:28 AM <mikethetike> It has to be expensive to 51% attack an asset on the second layer
10:30 AM <mikethetike> so staking could work (although staking sounds like proof of stake, which is different)
10:30 AM <neonknight> Staking is important, it should be expensive enough to limit bad players from spawning many bad nodes but cheap enough so you have multiple nodes storing the same data to create redundancy.
10:32 AM <tk___> I was thinking of this vector: DA1 chooses Node2 & Node4. Node4 says he is available to handle the asset, a few mins after DA1 chooses Node4, the node suddenly disappears. Leaving DA1 with eggface
10:33 AM <tk___> mikethetike: maybe we call it something else then so it doesn’t sound like POS 😋
10:34 AM <mikethetike> let’s call it bail money :D
10:34 AM <havik> collateral :)
10:35 AM <simian_za> collateral is good
10:35 AM <@cjs77> tk: DA1 needs to trust the nodes though, right?. Permissioned networks are not trustless.
10:38 AM <mikethetike> I think for the simple hobbiest wanting to earn some fees, they will just download a 2nd node binary and select a bunch of assets from a select box
10:38 AM <tk___> ok true. But whether trustless or trust(ful?), is Tari thinking of staki……collateral?
10:40 AM <simian_za> So collateral has two uses, punishing a detected bad actor but also, as neonknight said, making it expensive to conduct a sybil attack
10:42 AM <Hansie> The assets on the 2nd layer should only go live when there has been a valid transaction to the base layer confirming the conditions, i.e. which 2nd layer nodes will serve the asset, bonded contracts between the asset issuer and the 2nd layer nodes, etc. So even the simple hobbiest will have to pay something.
10:44 AM <neonknight> tk.. the “slow” base layer will use PoW, while the “fast” 2nd layer will use Collateral locked using the bonded contracts
10:44 AM <tk___> 👍
10:47 AM <mikethetike> So does the asset issuer choose how much collateral is needed for the nodes to process their asset?
10:48 AM <Blackwolfsa> I think so yes?
10:48 AM <simian_za> Will need to make it easy for them so will need to express some sort of risk profile based on the value of the assets in question
10:51 AM <simian_za> Will probably also be a trade off of how much risk they want to take (i.e. the number of nodes that need to validate every instruction on their asset and the amount of collateral they have put up) vs the speed at which an asset needs to be processed
10:52 AM <mikethetike> I assume this will be time based?
10:52 AM <simian_za> Now that is an interesting point…consensus on time in a distributed network is a bit tricky…
10:53 AM <mikethetike> otherwise eventually the fees I’m earning are above my collateral
10:53 AM <mikethetike> I meant more like, after a few months, my stake is returned to me
10:54 AM <mikethetike> and I have to put down collateral again
10:54 AM <mikethetike> potentially at a higher price
10:55 AM <simian_za> hmm does the fact that you have made a profit (more fees earned that collateral) reduce the disincentive of losing your collateral? That would be a relative thing vs how much you total capital is and we cannot know that.
10:55 AM <simian_za> if you have 1 000 000 tari in the bank and the collateral was 100 tari, you earn 110 tari in fees. Is the disincentive much less?
10:58 AM <neonknight> For how long should the Collateral be locked, the lifetime of an asset? Probably ok for tickets but not for game assets..
10:58 AM <Blackwolfsa> colleteral should be more than the fees, risk /reward should be > 1
11:01 AM <@cjs77> neonknight: assuming the notion of asset lifetime is clearly defined, I’d argue collateral is locked up for lifetime + ΔT
11:02 AM <@cjs77> ΔT might be a few weeks or months — the right amount of time is something that needs to be modelled
11:02 AM <Blackwolfsa> we could always do checkpoint + ΔT
```
