---
layout: post
title: What Needs Committing
date: 2019-07-18 11:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-43.png
lead: What needs committing
class: subpage
topics:
- What Tari needs to commit to range proofs
- Why Tari needs to commit to UTXO's not TXO's
---

On Thursday, the Tari community discussed what we need to commit to. Below is the TL;DR on Thursday's conversation (full transcript included below):

* We need to commit to rangeproofs
* We need to commit to UTXO's and not TXO's


Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion
```
11:06 <@CjS77>  Welcome to Thursday's dev discussion
11:08 <Blackwolfsa>  are we continuing monday's discussion? 
11:08  * Kellanved (~Kellanved@41.217.127.241) has joined the channel
11:11 <@CjS77>  Yes, let's wrap up a few points on that
11:11 <Blackwolfsa>  I have a proposal to ensure that we commit to the UTXO set and not the TXo set
11:12 <Blackwolfsa>  In the header, we usually put the mr (merkle root) to the txo set
11:12 <@CjS77>  So one thing that's not provable at the point we left of is, given a Merkle proof that a TXO is in the set, we _still_ can't tell if it is spent or not
11:12 <@CjS77>  Right, so go ahead Blackwolfsa
11:13 <Blackwolfsa>  that commits to the txo set. But if we add a roaring bitmap of index (as the leaves of the MMR) to keep track of all the positions of the UTXO's in the MMR. We know which ones are STXO, and which are UTXO
11:14 <Blackwolfsa>  So we modify the field that whould have been MR of TXO, to be Hash(MR_TXO||Hash(roaring bitmap of UTXO positions))
11:14 <Blackwolfsa>  that should gives a commitment to the TXO and the UTXO...
11:14 <@CjS77>  Right
11:16 <@CjS77>  So a UTXO proof now consists of the commitment hash (from the block header), the merkle proof for the MMR, and the Roaring Bitmap. You can verify that the TXO is in the MMR, and use the bitmap to confirm that it is unspent; and also that the H(MMR root || H(RB)) equals what's in the header
11:19 <Blackwolfsa>  yes
11:23 <@CjS77>  And the bitmap isn't that big a data structure; 80 million TXOs would be ~10 MB, and probably get very good compression of 80%+ (thumb sucked), so about 2MB
11:24 <@CjS77>  And presumably it doesn't grow indefinitely -- as older TXOs all become spent, there will be times when you can prune those "all-spent" part off the MMR for good. Correct?
11:25 <Blackwolfsa>  should be yes
11:36 <Blackwolfsa>  What about rangeproofs, should be commit to those as well?
11:43 <tar1b0t>  [mattermost] <stringhandler> Committing to a roaring bitmap seems very implementation specific
11:44 <Blackwolfsa>  it does, I agree. but we need a condeced way of commiting to the UTXO somehow thats fast and compact, roaring bitmap solves this
11:45 <tar1b0t>  [mattermost] <stringhandler> and limits others from adopting different techs as they arise
11:45 <Blackwolfsa>  Its kinda the same, we dont commit to a merkle tree root, or hash of all txo's etc. We commit to a merkle mountain range root for the txo
11:47 <tar1b0t>  [mattermost] <stringhandler> Rangeproofs are proofs of other data, if you have a commitments to that data already, do you need to have a commitment to the proof as well?
11:50 <Blackwolfsa>  rangeproofs can be mutable...
11:50 <Blackwolfsa>  https://github.com/mimblewimble/grin/issues/627

Remove the range proof MMR · Issue #627 · mimblewimble/grin
It occurred to me today that committing to range proof hashes in a MMR doesn&#39;t really help us for anything except malleability. And that we didn&#39;t really care about range proof malleability...
11:56 <Blackwolfsa>  my opinion of this is, we need to commit to them as well. 
12:03 <Hansie>  Blackwolfsa: Committing to range proofs seems to be a good idea yes, as per info above, specifically Apoelstra's comment.
12:06 <Hansie>  And the overlay of TXO Merkle tree with Roaring Bitmap and committing to it seems like a great idea as well. Can be really usable functionally.
12:08 <tar1b0t>  [mattermost] <stringhandler> Whatever you commit to you will have to transfer over the network at some point
12:08 <tar1b0t>  [mattermost] <stringhandler> are we saying we will transfer the full roaring bitmap on the network?
12:18 <@CjS77>  Yes, you have to commit to the range-proofs, but I believe you only need to commit to the proofs *per block*; comitting to every single range proof in every block is overkill imo
14:15 <Blackwolfsa>  stringhandler: you only need full bitmap when syncing...
14:15 <Blackwolfsa>  If you sync and the block was constructed correctly the bitmaps should sync up. 

```
