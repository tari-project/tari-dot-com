---
layout: post
title: Tari Protocol Discussion 25
date: 2019-02-25 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-25.png
lead: Script Based Multisigs and Aggregated Schnorr Signatures
class: subpage
---

On Monday, the Tari community compared the pros and cons of different Multisig approaches. Mostly, the conversation revolved around Aggregated Schnorr signatures and Bitcoin-style script based multisigs. Below is the TL;DR on Monday's conversation (full transcript included below):

Considerations for multisig approaches

- N-of-N scenarios can be solved with aggregated schnorr signatures
- They are flexible, small, and confidential between parties

- N-of-M scenarios could leverage Shamir's secret sharding
- How do you tie final assembly of the secret to a transaction that all parties have agreed to without requiring the asset issuer to always be online?

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
11:06 AM <Blackwolfsa> Hi everyone, wat do you guys think about aggregated vs multisigs in mimble wimble
11:06 AM <Blackwolfsa> The pros ans cons of each
11:07 AM <simian_za> are we talking n-of-n?
11:08 AM <simian_za> because what's the difference between aggregated sigs in MW and multisig?
11:10 AM <simian_za> do you mean Bitcoin style script based multisig vs aggregated schnorr?
11:14 AM <Blackwolfsa> Yes bitcoin type sigs vs musig type sigs
11:19 AM <simian_za> so for n-of-n Multisig seems great. The signature is small and completely confidential between the parties
11:20 AM <simian_za> for n-of-n is there any downside to musig vs script style?
11:20 AM <Blackwolfsa> Yes I agree, it does seem to be very flexible, but the problem is 'n of m
11:21 AM <Blackwolfsa> But as far as I have it, we might be able to do so something like a shamirs secret sharding
11:23 AM <neonknight> Having a compact n-of-m sig without relying on generating all combinations of signatures, in the mempool, would be nice.
11:24 AM <simian_za> ja n-of-m seems quite difficult. so pure Shamir sharding is a a little tricky because how do you tie the final assembly of the secret to a transaction that all the parties have agreed to?
11:25 AM <neonknight> In some cases such as with Validator nodes, I think the asset creator could possible create and share the secrets for each validator node. Only he knows the full secr
11:26 AM <neonknight> secret, but combining the secrets remain a problem.
11:31 AM <Blackwolfsa> But then he as to be online 100% of the time
11:32 AM <Blackwolfsa> Not exactly undoable, but undesirable
11:33 AM <simian_za> the second layer aspect is definitely important but I do think we need to find a general solution on the base layer for a number of applications
11:35 AM <neonknight> The asset creator could pre-generate different secrets and share the partial secrets at asset creation or some other event, ensuring that he doesn't always need to be online. Agreed, a generic n-of-m sig mechanism would be better.
11:37 AM <simian_za> so Shamir sharding of the complete key is quite tricky but I heard in passing Andy Poelstra talking about an approach where the members of the multisig shard their individual portions of a n-of-n MuSig. This means that if there is a majority of the members available they could collaborate to reconstruct the missing members portions of the MuSig during a MuSig style protocol
11:39 AM <Blackwolfsa> That's definitely something we need
11:45 AM <mikethetike> mw - all the participants in a transaction need to sign (n-of-n) the excess
11:45 AM <mikethetike> that's still using schnorr right?
11:47 AM <simian_za> I am not actually sure about that in the MuSig context, in MuSig they definitely all have to collaborate to reconstruct the blinding factor
11:47 AM <simian_za> which I guess is then used to sign the excess in the usual MW way?
11:48 AM <simian_za> and that signature will be aggregated with the blinding factor chosen by the recipient of the payment
11:49 AM <simian_za> but that MW aggregation of the sender (the MuSig) and the receiver is not a MuSig itself
11:52 AM <mikethetike> so we are discussing n-of-m spending of an output?
11:52 AM <simian_za> Ja, MuSig seems to neatly solve the n-of-n case
11:56 AM <mikethetike> so in shamir sharding, there is the actual blinding factor, that none of the m know. A party could then communicate with N-1 other parties to retrieve their point and then find the actual blinding factor?
11:58 AM <simian_za> So that implies that someone knew the blinding factor to start with and sharded it, I think that is why the approach of sharding the blinding factor directly is not possible
11:59 AM <Blackwolfsa> One thing to remember thou is the signing of the excess and the blinding of the output, is sperate.
11:59 AM <Blackwolfsa> And both very important
12:00 PM <simian_za> Andy Poelstra's approach was that the participants each choose their constituent keys and aggregate using the MuSig protocol but they each member shard's their component secret and distributes the shards to the other participants. This means that the threshold majority of the members can reconstruct the missing MuSig components
12:01 PM <simian_za> right Blackwolfsa? You explained it to me, I didn't actually read it myself :P
12:04 PM <Blackwolfsa> That's as far as I have it. But I have not properly gone over the math fully yet.
12:05 PM <simian_za> sounds plausible though it will add a round or two of comms to distribute the shards
```
