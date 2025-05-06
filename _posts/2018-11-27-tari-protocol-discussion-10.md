---
layout: post
title: Tari Protocol Discussion 10
date: 2018-11-27 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-10.png
lead: Do range proofs need their own merkle roots in the transaction kernel?
class: subpage
---

Yesterday’s Tari protocol discussion revolved around one specific technical idea.

After reading through one of Tari’s rough GitHub documents, Tari community member ‘@mikethetike’ had a question about range proofs and merkle roots.

Specifically, ‘@mikethetike’ wanted to know if range proofs need their own merkle roots in the transaction kernel. The transcript below captures the opinions and thoughts presented by the Tari community.

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
1:01 PM <@cjs77> Hey everyone
1:04 PM <Krakaw> Evening
1:16 PM <@cjs77> It’s quiet this evening
1:17 PM <@cjs77> People still getting over their turkey comas?
1:23 PM <@fluffypony> I don’t believe in turkeys
1:26 PM <lurkinandlearnin> so you’re saying you weren’t thankful for today over the weekend?
1:27 PM <mikethetike> reading through this:
1:27 PM <mikethetike> https://github.com/tari-project/RFC/blob/master/proposals/181107-base-layer-architecture.md
1:27 PM <mikethetike> do the range proofs need their own merkle root?
1:27 PM <mikethetike> from this section:
1:27 PM <mikethetike> https://www.irccloud.com/pastebin/2hoFmHpq/
1:30 PM <@fluffypony> lurkinandlearnin: hurrrrrrr :)
1:31 PM <@cjs77> good Q, mikethetike. Where would the merkleroot come in handy? If you need to prove that a given proof is part of the range proof set, right?
1:33 PM <mikethetike> I suppose it might have to do with the pruning?
1:33 PM <mikethetike> when you prune, which parts get cut?
1:34 PM <@cjs77> I’m not sure where that would be required. In fact, some part of me thinks that in pruned mode, the range proofs are something that could potentially be chucked once a transaction is in the blockchain (the thinking being that if it’s in the chain, it’s passed a range check).
1:34 PM <mikethetike> for some reason I thought the range proofs would live with the actual transactions
1:34 PM <@cjs77> Range proofs themselves are in the outputs, yes.
1:37 PM <mikethetike> On this note: A Commitment which blinds the value of the output (MW protocol suggests Pedersen commitments — is it worthwhile abstracting this to allow other commitment types?)
1:39 PM <mikethetike> What other commitments are there?
1:39 PM <sarang> hash commitments
1:39 PM <Hansie> Hi there. @mikethetike, not sure if this is worthwhile, except if one would like open/non-confidential commitments
1:40 PM <@cjs77> Hansie mentioned an alternative once. The name escapes me now
1:40 PM <Hansie> ElGmal — but to make Pedersen more secure in future
1:40 PM <@cjs77> ^ That was it
1:41 PM <Hansie> Has more calculational overhead
1:41 PM <Hansie> ElGamal…
1:42 PM <mikethetike> like elgamal custard?
1:44 PM <Hansie> Going from Pedersen to ElGamal will change commitment properties: Perfectly hiding to computationally hiding, computationally binding to perfectly binding.
1:44 PM <Hansie> @mikethetike, do not know about custard :-)
1:51 PM <@cjs77> mike, if you store the range proof merkle root as a pruning node, you can discard the range proofs, but still verify later that a given set of proofs (provided by an archival perr node perhaps) are the correct ones if you wish to verify at a later stage.
1:53 PM <mikethetike> I’m just wondering if there’s a way to use a single tree
1:53 PM <mikethetike> or a need
1:53 PM <@cjs77> i see
1:54 PM <mikethetike> basically: what parts of the block we going to be transferring over the wire at different stages
1:59 PM <mikethetike> let me think over it for a bit and see if I can work it out in my head
1:59 PM <@cjs77> 💯
1:59 PM <Hansie> great
2:00 PM <mikethetike> btw: from a quick scan, it doesn’t seem like elgamal is necessary unless the discrete log is broken
2:00 PM <Hansie> Yip, for when it happens
```
