---
layout: post
title: Proofs
date: 2019-07-22 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-44.png
lead: proofs
class: subpage
topics:
    - Cryptographic proofs and Tari
---

On Monday, the Tari community discussed a few technical things around proofs.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion

```
17:51 <Hansie>  Hi there
17:52 <Hansie>  I thought we could open the floor tonight for any off the cuff or other tar-dev related matter to be discussed
17:55 <sarang>  Hi, sarang here lurking and observing :)
17:59 <Hansie>  Hi Sarang, watched a video on one of your talks at the Monero conference, was really good, about optimizations.
17:59 <sarang>  Great, glad you enjoyed it
18:03 <Hansie>  Maybe to throw something out there, could there possibly a way to compress MW kernels and provide some sort of ZK proof for that? Each kernel has unique signatures and contributes to verifying zero inflation.
18:04 <sarang>  Compress in what way?
18:06 <Hansie>  Let us say there is a MW block and we want to condense all inputs, outputs and excesses in the kernels into a single MW Tx
18:09 <sarang>  So what's the statement you want to prove with a zk/wi proving system?
18:10 <sarang>  If it's general but neatly algebraically defined, a bulletproof could be useful (but costly in verification)
18:10 <sarang>  anything smaller/faster is going to be far more specialized or require trust
18:11 <sarang>  (which I assume is an absolute no-go here)
18:11 <tar1b0t>  [mattermost] <stringhandler> What's a use case hansie?
18:12 <Hansie>  Ok, so a base node can validate a block by `sum(outputs) - sum(inputs) = sum(excesses in all kernels)`
18:12 <sarang>  (purely looking at pedersen commitments, right?)
18:13 <Hansie>  Yes
18:13 <sarang>  Fortunately you can do nifty small proofs involving pedersen commitments...
18:13 <sarang>  depending on what you wish to show
18:13 <Hansie>  Use case stringhandler: Wondering if the block validation can be converted into a single Tx with a single kernel
18:15 <Hansie>  Each Tx's excess can be proved by verifying the signature in its kernel, so this may involve some sort of a super kernel
18:16 <Hansie>  Sarang, does my question make sense? Any ideas?
18:17 <Hansie>  I do not think this use case is "neatly algebraically defined" as you out it
18:17 <Hansie>  put^
18:18 <sarang>  I'm still not seeing the total picture of the formal statement you'd want to prove
18:19 <sarang>  but I'm far less experienced in MW than others in this room
18:20 <sarang>  I suspect this is not possible non-interactively, or without either knowledge of all input secret data or a suitable MPC
18:20 <sarang>  (and those are notoriously tricky to get right while maintaining proper security)
18:21 <Hansie>  Yep, the Schnorr signatures in the kernels have different challenges, specifically designed to guard against inflation.
18:22 <sarang>  I see
18:26 <Blackwolfsa>  What about if you have multiple commitments, that you have aggregated by summing them (vH+kG = v1H+k1G + v2H+k2G .. etc). If all those have valid commitments and bulletproofs. And you as prover only wants to give the aggregated commitment to a verifiy, is there someway you can provide a rangeproof of a kind to the verifier to prove that aggregared commitment is 0<v<2^n ?
18:29 <sarang>  Are you assuming a single range proof by someone with knowledge of all commitment secret data?
18:29 <sarang>  Or an MPC bulletproof
18:29 <sarang>  Which has very tricky security properties
18:30 <Blackwolfsa>  a singe rangeproof.
18:31 <Blackwolfsa>  I am trying to see if there is a way to calculate such a rangeproof, without providing the verifier all the commitments and their individual rangeproofs
18:31 <sarang>  Depends on how you want to aggregate the proof
18:31 <Blackwolfsa>  is there a way?
18:32 <Blackwolfsa>  I am trying to find a way that can be done.
18:32 <sarang>  There's aggregation in the sense of proving range of separate commitments efficiently
18:32 <Blackwolfsa>  The idea behind it is, that the prover only has the commitments with their bulletproofs (or some other rangeproof). He does not know the v's or the k's
18:32 <sarang>  And aggregation in the sense of proving the range of a sum of commitments, which does not prove range for any of the subcommitments
18:33 <Blackwolfsa>  aggregation is proving the sum of the commitments
18:33 <sarang>  That shows nothing about the individual commitment ranges
18:33 <Blackwolfsa>  the verifier does not need to know the individual commitments, or if possible that they even exists
18:33 <Blackwolfsa>  the verifier does not care about the individual ones, he only cares about the aggregated one
18:36 <sarang>  What does the prover know?
18:36 <sarang>  If you sum a bunch of commitments and know _all_ secret data, you can of course construct a range proof showing the value sum is within a given range, but nothing more
18:36 <Blackwolfsa>  he can see the individual commitments and their rangeproofs.
18:36 <sarang>  If the prover only has the individual commitments and bulletproofs, you can't do anything
18:37 <sarang>  The closest you can come is an MPC on the individual commitments, but it's interactive
18:37 <sarang>  (and, again, perilous)
18:38 <Blackwolfsa>  darn...
18:38 <Blackwolfsa>  There is not some other rangeproof you can use?
18:39 <sarang>  How inefficient do you want to be? =p
18:39 <sarang>  Bulletproofs are the most efficient that I know of
18:39 <Blackwolfsa>  well first I want it to be secure and useable... :P
18:39 <sarang>  But no, I don't see a way it's possible to generate such a rangeproof with access to no secret data
18:40 <sarang>  or interactivity among the original committers
18:43 <Blackwolfsa>  darn it, because the prover should not have access to those values, since they become vulnerable.
18:45 <sarang>  I would love such a technique for Monero too...
18:45 <sarang>  even ignoring the idea of summing commitments, of course
18:45 <sarang>  We have a whole block of bulletproofs
18:46 <sarang>  FWIW the bulletproofs MPC was written with CoinJoin in mind (although the security model is a bit wonky)
18:47 <Blackwolfsa>  mmm but thats interactive. we require something non-interactive
18:47 <sarang>  yup
18:47 <sarang>  and therein lies the problem
18:47 <sarang>  If you ignore the interactivity (or handle it poorly) you break the zk property
18:48 <sarang>  (and possibly WI too, dunno)
19:00 <Hansie>  Thanks guys, we some really interesting discussions here! Thank you sarang, for humoring us.
19:01 <Blackwolfsa>  yes thanks for the time
```
