---
layout: post
title: UTXO Commitment
date: 2019-07-15 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-42.png
lead: UTXO commitment
class: subpage
topics:
- We only require a TXO, but a UTXO can be beneficial
- A MMR looks to be the best compromise between the ways to commit a UTXO
---

On Monday, the Tari community discussed UTXO commitment. Below is the TL;DR on Monday's conversation (full transcript included below):

* We only require a TXO, but a UTXO can be beneficial 
* A MMR looks to be the best compromise between the ways to commit a UTXO


Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion
```
14:05 <Blackwolfsa>  Hi Everyone, I thought perhaps we can talk a bit about the need to commit to the UTXO set for later's discussion at 16:00 UTC
14:06 <Blackwolfsa>  If you want a bit more background info on this, these are good reads to quickly get some good info: https://sanket1729.github.io/utxo-commitments
A survey on UTXO commitments schemes for bitcoin

The Unspent Transaction Output (UTXO) set is the subset of Bitcoin transaction outputs that have not been spent at a given moment. Whenever a new transaction...
14:06 <Blackwolfsa>  https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2016-May/012715.html
[bitcoin-dev] Making UTXO Set Growth Irrelevant With Low-Latency Delayed TXO Commitments

14:08 <Blackwolfsa>  Basic problem we need to discuss is how do we commit to the UTXO set, we have a few options: naive hash, merkle tree, MMR, rolling utxo hash, or a mix of the previously mentioned. All have advantages and disatvantages
14:10 <Blackwolfsa>  A big constraint we have on it, is that we need to be easily able to rewind it, so we can handle reorgs
16:19 <tar1b0t>  [mattermost] <Cayle> We also need to efficiently implements a `is_in_utxo_set(this_utxo)`, i.e. a proof that a given utxo is in the current set
16:19 <tar1b0t>  [mattermost] <Cayle> And of course, provide a commitment to the UTXO set
16:27 <@CjS77>  Side note: If I can get some agreement on this small PR, that'd be 💯- https://github.com/tari-project/tari/pull/510

Remove RFC-315 by CjS77 · Pull Request #510 · tari-project/tari
Description Transfers are a privilege, not a right ;) There is no requirement that assets be transferable, therefore this shouldn&#39;t be a generic RFC, but soemthing that is left to the individua...
18:02 <Blackwolfsa>  I forgot about prooving a utxo in a spesific set
18:03 <Blackwolfsa>  but then we can leave out naive hashing, I dont think thats possible
18:04 <@CjS77>  Yeah, it's the worst from a performance pov
18:04 <Blackwolfsa>  if want to proove a utxo I think the only real contenders is merkle tree and MMR
18:04 <@CjS77>  I've been grokking Grin's code a bit more and it actually looks like they commit to the entire TXO set, not just UTXOs
18:05 <@CjS77>  I agree Blackwolfsa
18:05 <Blackwolfsa>  I read around that they where looking at commiting to the stxo as well
18:05 <simian_za>  Why commit to those?
18:06 <Blackwolfsa>  but a MMR well indirectly commit to the whole txo
18:06 <Blackwolfsa>  I could not really pickup why
18:06 <@CjS77>  ^ this, so that's why I think grin does it
18:07 <@CjS77>  It's easier? 🤷‍♂️
18:07 <simian_za>  So you mean they don't ever discard the data in the leaves of the MMR even if a whole subtree is spent?
18:07 <Blackwolfsa>  no you can
18:08 <Blackwolfsa>  but only if the whole sub tree is spent can you remove
18:08 <Blackwolfsa>  and only the leaves then
18:08 <simian_za>  depends on the height of the subtree surely?
18:09 <neonknight64>  If one utxo is abandoned then the sub tree can never be removed?
18:09 <Blackwolfsa>  yes
18:09 <simian_za>  but ok I see that you are commiting to the spent TXOs in that case essentially
18:10 <Blackwolfsa>  if you spent the two leaves, you can prune the two leaves and leave the root
18:10 <Blackwolfsa>  till you spent the sub tree next to it etc
18:14 <@CjS77>  So my question is (and maybe I'm answering it as I write, but anyway).. if we are committing to the whole TXO set (not just UTXOs), is this even safe? (ignoring info leaking concerns)..
18:14 <neonknight64>  It would be nice if people can be encouraged to coin join dust utxos rather than abandoning them.
18:15 <@CjS77>  e.g. Set at t0 = 1 2 3 4 5 => Commit a1b2...
18:15 <Blackwolfsa>  neonknight64 grin was discussing some insentive to encourage it
18:16 <Blackwolfsa>  CjS77 I am missing why it is unsafe? I think its the safest we can be
18:16 <@CjS77>  Now if 2 is spent, we have 1 x 3 4 5 6 => H(a1b2..| H(6))
18:17 <@CjS77>  Ok, let me say it this way. Changing a UTXO to a STXO doesn't actually change the local peaks hash, correct?
18:18 <@CjS77>  i.e. Hash(1 2 3 4 5) = Hash(1 x x 4 5)
18:18 <@CjS77>  where x is a STXO
18:19 <Blackwolfsa>  yes
18:19 <@CjS77>  Our protection from malleability attacks is that you always need a NEW utxo to prevent inflation, so the root hash still changes
18:19 <Blackwolfsa>  correct
18:19 <@CjS77>  Ok, so if we had zero-valued commitments, you could potentially play some games
18:20 <@CjS77>  That's thebasic core point I need to be convinced about before agreeing that MMRs are the way to go
18:20 <Blackwolfsa>  well if you add a zero-value commitment you still need to add it the utxo set
18:21 <Blackwolfsa>  and you cant just delete a utxo so you will spend it to something if not just a zero value commitment
18:22 <@CjS77>  I was thinking when the zero-valued UTXO gets spent; but I get you always have the Coinbase UTXO in a block anyway
18:22 <@CjS77>  *guess
18:23 <Blackwolfsa>  yes, there is no way where you can just spend any utxo without adding one as well
18:23 <Blackwolfsa>  MMR's are add only by design
18:23 <Hansie>  Which games cjs77?
18:24 <Blackwolfsa>  but because we spend some leaves over time, we can delete some old data since they will never get asked for anymore
18:24 <@CjS77>  Ok, now what are the downsides of a straight MMR or sparse MMR?
18:25 <@CjS77>  I beg your pardon. Strsight Merkle Tree or Sparse Merkle tree
18:26 <Hansie>  Blackwolfsa so the pruning happens randomly as it goes along, but more with older UTXOs?
18:27 <Blackwolfsa>  pruning happens with spent utxo's thats random
18:27 <Blackwolfsa>  CjS77 I dont see how we can effectivly use sparse tree's
18:27 <Blackwolfsa>  and comparing a straight merkle tree to a MMR, the MMR is the the way better one
18:28 <@CjS77>  well besides the fact that you must keep hashes of all our TXOs
18:28 <Blackwolfsa>  Yes but you dont have to hash the whole utxo every time
18:28 <Blackwolfsa>  with a merkle tree you have to
18:30 <@CjS77>  For completeness, here's a decent write-up of sparse merkle trees, https://medium.com/@kelvinfichter/whats-a-sparse-merkle-tree-acda70aeb837

What’s a Sparse Merkle Tree? - Kelvin Fichter - Medium
If you’ve been around the Ethereum research community lately, you might’ve heard of something called a sparse Merkle tree. They might sound…
18:30 <@CjS77>  and I tend to agree that this isn't the right use case for them
18:31 <Blackwolfsa>  comparing hashes, at this moment, grin has 5762 utxo's, the last block had 5. You on a worst case senario, you are hashing 25 hashes, compared to 5762 hashes
18:31 <Hansie>  They talk about `Proving Non-inclusion` - do we need that?
18:32 <@CjS77>  So Blackwolfsa, if we commit to the TXO, and not the UTXO, how do you validate that your UTXO set is correct when you're syncing -- is it indirect?
18:32 <Blackwolfsa>  compare merkle roots
18:33 <@CjS77>  You know that the UTXO set that you have is _at least_ a subset of the full UTXO set,
18:33 <Blackwolfsa>  we commit to that every block
18:33 <@CjS77>  That includes Spent and Unspent
18:33 <@CjS77>  You can't calculate the root from just a UTXO set, you need the merkle proof as well, no?
18:34 <Blackwolfsa>  they are the same
18:34 <Blackwolfsa>  the proof of the MMR/tree is the merkle root, and the utxo proof is that as well
18:35 <@CjS77>  Hear me out -- the MMR looks like (1 x x 4 5) with root b1a1
18:35 <@CjS77>  Now I'm syncing with you, so you send me (1 4 5).
18:35 <Blackwolfsa>  no
18:36 <Blackwolfsa>  I will have to send you (1, null, null, 4, 5)
18:36 <@CjS77>  Ok, sure. But also 1, null's parent and null,4's parent surely
18:36 <Blackwolfsa>  or something like (1,1; 4,3;5,5)
18:37 <@CjS77>  Cool, that's what I was calling amerkle proof
18:37 <Blackwolfsa>  with this tree spesifically you will actually send 1,2,3,4,5
18:37 <@CjS77>  You'll send the STXOs?
18:38 <Blackwolfsa>  because 1 and 4 was not spent you cannot prune 2,3 yet
18:38 <@CjS77>  Do you send the whole thing, or just heir hashes?
18:38 <Blackwolfsa>  just the hashes
18:39 <Blackwolfsa>  you dont need to send the actual utxo
18:39 <@CjS77>  stxo
18:39 <Blackwolfsa>  yes
18:40 <@CjS77>  right, so you could lie to me and *say* that 3 was spent when it wasn't; just send me the hash and I'd be non-the-wisert
18:40 <@CjS77>  The hash would be the same
18:40 <@CjS77>  The only time I'd eventually figure out something was wrong was when I summed the UTXOs and checked the accumulated excess
18:41 <Blackwolfsa>  potentially
18:41 <Blackwolfsa>  but you have to check that anyway I think
18:41 <@CjS77>  Yes -- I was being a bit Socratic, but wanted to follow the logic through
18:42 <@CjS77>  The point is that you can't actually trust that the UTXO set is complete from the commitment and a provided set when using an MMR
18:42 <@CjS77>  you have to do the inflation check too, and then you're ok
18:43 <Blackwolfsa>  the mmr proof of the utxo will only help you syncing a block or so, I think it will help you just syncing the whole chain
18:44 <Hansie>  Interesting conclusion, that the Merkle proof does not proof the UTXO set.
18:44 <@CjS77>  When you sync, you get the UTXO set at a given block, don't you?
18:44 <Blackwolfsa>  yes
18:45 <@CjS77>  Hansie, only because it's a commitment to the whole TXO set, not just UTXOs
18:45 <Blackwolfsa>  But that might be why grin was investiagting commiting the stxo
18:46 <@CjS77>  I've got to run, but it would be great to continue this line of thinking.
18:46 <Blackwolfsa>  https://github.com/mimblewimble/grin/issues/859

Question - STXO MMR (aka the rm_log)? · Issue #859 · mimblewimble/grin
[Just thinking out loud here, but wanted to put it somewhere for reference.] Right now we have a &quot;remove log&quot; and a &quot;prune list&quot; but we do not explicitly commit to these anywher...
18:46 <Hansie>  Makes sense, thanks for the interesting discussion
18:46 <Blackwolfsa>  thats them discussing the issue, they have some solution to it, but I have not yet completly dug through how it works
18:46 <@CjS77>  ^^ Nice, thanks

```
