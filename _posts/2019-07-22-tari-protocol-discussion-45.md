---
layout: post
title: Miltiparty Payment Channels
date: 2019-08-05 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-45.png
lead: Multiparty payment channels
class: subpage
topics:
- How to achieve scalability in a MW protocol
- How to enable payment channels in MW
---

On Monday, the Tari community discussed multiparty payment channels

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion
```
18:03 <@CjS77> Evening, everyone
18:03 <Hansie> W.r.t. scaling, I am not overly optimistic that the MW base layer can sustain a vibrant DAN.
18:04 <@CjS77> You're being a bit kind :) I'd say it's impossible
18:04 <Hansie> Current throughput in practice of MW is around 17 tps
18:05 <Hansie> cjs77: Agreed
18:05 <@CjS77> You simply can't map the type of throughput a digital asset like a set of tickets for a popular event going on sale to a PoW blockchain
18:05 <@CjS77> I think this is discussed in one of the RFCs..
18:06 <Hansie> So how do we scale?
18:06 <@CjS77> https://rfc.tari.com/RFC-0001_overview.html
18:07 <@CjS77> The RFC mentions payment channels as a means of bridging payments on the DAN to the base layer
18:08 <@CjS77> Obv Lightning is the most well-known payment channel solution
18:08 <Hansie> Something like Lightning perhaps?
18:08 <@CjS77> Yeah
18:09 <@CjS77> But I think we can take advantage of Mimblewimble's properties to come up with something a little more ergonomic.
18:09 <Hansie> Agreed, Lightning to my mind is somewhat complicated and restricted for the DAN
18:09 <@CjS77> Possibly with a different set of guarantees, but one that is still fast, secure and essentially trustless
18:10 <Blackwolfsa> the only problem with lighting is the that it can be seen as many strings with beads on them, not very flexable..
18:10 <@CjS77> Yeah, only allowing bilateral channels is something of a deathknell for non-fungiblr token
18:10 <Blackwolfsa> and its only two parties
18:10 <Hansie> The lack of scripting system in MW could be a potential drawback
18:10 <@CjS77> And the routing is very complicated
18:11 <@CjS77> Hansie - yes it makes things trickier..
18:11 <Blackwolfsa> technically its very possible to do two party payment channels in mw
18:12 <@CjS77> Indeed, are you referring to Beam's recent release?
18:13 <Hansie> Beam has a demo at this stage, with plans to take it to testnet then mainnet
18:13 <@CjS77> For Tari, I think it would be preferable for the payment channel topology to map the validator node topology very closelt
18:14 <@CjS77> i.e. multiparty payment channels, with parties being able to join (deposit) and leave (withdraw) roughly at will
18:14 <Hansie> Do you mean permissionless?
18:14 <Hansie> Ah ,ok
18:14 <Blackwolfsa> not even, the math/tech/know how to do it there
18:14 <Blackwolfsa> but I dont think its really the best of ideas
18:15 <Blackwolfsa> having a "built in" multiparty payment channel is a much better idea I think
18:15 <Hansie> "built-in" or "bolt-on"?
18:16 <@CjS77> What do you mean by built-in?
18:19 <Blackwolfsa> natively supported
18:19 <Blackwolfsa> its not just some extra after though or hacked on feature
18:20 <Hansie> Ah, do you mean with all the proper hooks?
18:20 <@CjS77> I see. yeah, although that said, the less you have to add to standard MW consensus rules, the better
18:21 <Blackwolfsa> true..
18:21 <Hansie> Lobbyists have been advocating for a long time now to add hooks to Bitcoin in support of side channels
18:21 <@CjS77> lol. "Lobbyists"
18:22 <Hansie> Ok, enthusiasts then?
18:22 <@CjS77> I'd love to see Paul Storcz's reaction at being called a lobbyist :)
18:23 <Hansie> oops
18:23 <@CjS77> Too funny
18:23 <Hansie> I can only claim to be native Afrikaans
18:23 <@CjS77> sarang, have you given any thought to this at all? We have some ideas that we can bounce off you
18:25 <@CjS77> We can expand on this next week perhaps. Seems you're not around today.
18:27 <Hansie> Yip, maybe enough food for thought for now?
18:28 <@CjS77> 👍
18:50 <sarang> I'm here, for a bit
18:51 <sarang> We've looked into sidechannels and PCNs for Monero... there's a preprint out with an idea for how to do it with a modification to our tx protocol, but it has big drawbacks and doesn't have an obvious crossover to MW
18:51 <sarang> But yes, it's the lack of scripting that gets ya

2019-08-12

18:03 <Hansie> Hi there, time for another dev chat. If anyone is present, I thought we could continue where we left of last week, i.e. further discussing permissionless multiparty payment channels as scaling solution.
18:13 <Hansie> If we could have any number of these payment channels, managed by committees that must some consensus voting mechanism for those transactions, what would the scaling issues be?
18:17 <neonknight64> When these committees want to submit an accumulated transaction to the base layer such as a checkpoint transaction. The size of the transaction will be limited by the block size.
18:17 <Hansie> Let us assume we can have a small footprint  (i.e. commitment) of the state of the payment channel represented in the base layer at certain checkpoint intervals, and that we could have a 1-1 peg.
18:18 <Hansie> neonknight64: Please explain what you mean by `accumulated transaction`
18:20 <Hansie> And yes, block size is certainly a limitation
18:20 <neonknight64> Potentially, a single large transaction that spends to large number of outputs.
18:22 <Hansie> Ah ok, so large numbers of outputs contain an equal amount of Bulletproof range proofs, thus the size limitation.
18:24 <Hansie> If I am not mistaken, a quick calculation reveals ~2,000 new UTXOs created per block
18:24 <Hansie> That is 17 tps, assume 2 outputs per transaction, x 60s.
18:25 <Hansie> With ~1,000 kernels
18:25 <Hansie> ^ as upper limit
18:28 <simian_za> So what would make up all these transaction outputs in a payment channel checkpoint?
18:28 <simian_za> individual withdrawals?
18:29 <Hansie> We could have deposits, withdrawals and possibly refunds.
18:35 <neonknight64> A committee with a large user base might have to split these base layer transaction into separate transactions to ensure they fit into blocks
18:38 <Hansie> Ok, so is it practical to assume that whatever scheme employed it will be limited by a collective creation of ~2,000 new UTXOs and ~1,000 transactions per block? As a sustained throughput.
18:40 <simian_za> Sure, so a Channel will be have to stagger/cascade a large amount of withdrawals, deposits or refunds across multiple blocks
18:41 <Hansie> Great. If the network is not busy a burst of activity could be staggered and after a while all will be dealt with.
18:43 <stanimal> Agree, greater throughput could potentially be achieved by splitting up transactions that would exceed these limits across more than one block - seems like a nice solution
18:45 <Hansie> So we have discussed block size and/or tps as an upper limit for payment channels' scaling issues. This can be used to calculate a theoretical sustained maximum throughput for all payment channels combined.
18:46 <simian_za> Well not exactly, we have discussed the throughput of deposits, withdrawals and refunds
18:47 <simian_za> if the transactions stay in the payment channel thats a different story?
18:50 <Hansie> I was trying to deduct scaling issues for payment channels from this discussion. There is a definite limit, depending on its design, if checkpoints involve multiple UTXOs from multiple users.
19:01 <Hansie> Thanks guys, this is then the end of the regular chat.
```
