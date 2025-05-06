---
layout: post
title: Tari Protocol Discussion 9
date: 2018-11-23 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-9.png
lead: A Counterparty type model for second layer instructions and the value of base layer primitives.
class: subpage
---

Yesterday’s Tari protocol discussion covered key points highlighted in the rough [GitHub documents](https://github.com/tari-project/RFC/tree/master/proposals) that were presented during last discussion. 

This is the TL;DR of yesterday's conversation (full transcript included below):

* How well could a Counterparty type model fit for instruction-transactions on the 2nd layer — where some things have to go via the base layer?

* Will base layer primitives help if we have a second layer failure where the checkpoints are not good enough to recover the second layer state?

* What kind of info should be on the base layer that could provide value to the second layer beyond what checkpoints provide?

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
3:15 AM <Hansie> Hi, anyone there?
3:16 AM <mikethetike> Hi Hansie
3:18 AM <Hansie> Hi @mikethetike
3:18 AM <Hansie> Was just thinking, with ‘181029-overview.md’ and the Tari two layers, and the 2nd layer fall back on the base layer’s security when required…
3:18 AM <Hansie> Will Merkle roots of some external information set be enough or do we need some other primitives in there as well?
3:23 AM <Hansie> So basically, how well could a Counterparty type model fit for certain types of instruction-transactions on the 2nd layer? Where some things have to go via the base layer.
3:25 AM <simian_za> So in counterparty what kind of extra meta-data do they use in a bitcoin transaction to facilitate actions on their second layer?
3:26 AM <Hansie> Some write-up here: https://tari-labs.github.io/tari-university/layer2scaling/more-landscape/landscape-update.html#a2-counterparty
3:36 AM <simian_za> So it feels like if we have a second layer failure where the checkpoints are not good enough to recover the second layer state that further base layer primitives will not help us anyway?
3:41 AM <Hansie> It is actually simple; if only checkpoint merkle roots are written into the base layer then that is the only thing the base layer can provide in case the base layer’s security is called upon.
3:42 AM <neonknight> We could introduce something like an archival node or an archival functionality on validator nodes to ensure all data is recoverable. It might help to improve data redundancy if all information is distributed between different validator nodes. Not sure how this would work..
3:44 AM <mikethetike> simian_za: I think that the second layer will have to be recoverable only via the second layer, otherwise we will lose scalability
3:45 AM <simian_za> Hansie: Yes, that makes sense. So what other kind of info were you thinking of putting on the base layer that could provide value to the second layer beyond what checkpoints provide?
3:46 AM <mikethetike> who chooses the merkle root of the checkpoint?
3:47 AM <simian_za> mikethetike: probably agreed upon by a committee of validator nodes under some kind of consensus rules?
3:47 AM <Hansie> @simian_za: Maybe transfer instructions of high value assets, as an example
3:49 AM <simian_za> Hansie: that could work, we would need to attach a hefty fee for an Asset issuer to do that though so that Asset issuers only do it if they really feel their asset is valuable
3:49 AM <simian_za> valuable enough to justify the extra security
3:51 AM <mikethetike> we don’t have any say in the value of the assets on tari, that’s entire up to the asset issuers
3:51 AM <simian_za> and I doubt asset issuers are going to sit and weigh up the risk profile of second layer vs base layer. They just want to issue assets
3:52 AM <simian_za> feels like an over-complication
3:52 AM <neonknight> Processing an “expensive” asset on the base layer will also be slow
3:53 AM <Hansie> Just as long as we understand what this means: “2nd layer fall back on the base layer’s security when required…”
3:55 AM <simian_za> Agreed, it just provides a way to confirm that a state at a given point in time (recorded fully on the second layer only) can be confirmed as true, not reconstructed without the second layer
3:56 AM <simian_za> confirmed as true meaning that it can be compared to the base layer checkpoint which cannot be altered once its in the PoW chain
3:57 AM <Hansie> Bye for now
```
