---
layout: post
title: Tari Protocol Discussion 33
date: 2019-04-18 15:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-33.png
lead: Mempools in the Tari Network
class: subpage
---

On Thursday, the Tari community discussed the aggregating bulletproofs for transactions. Below is the TL;DR on Thursday's conversation (full transcript included below):

* Concerns where risen about reducing the security
* Aggregating bulletproofs reduces size dramatically

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion
```
11:03 <@CjS77>  Proof aggregation is possible already actually
11:04 <@CjS77>  On the point of bullet proof range proofs (I just call them range proofs, or RPs from now on), as many of you know, you get space savings for aggregating multiple proofs together.
11:06 <@CjS77>  In a transaction context, a single RP is ±670 bytes, but if you had 10 outputs, and you knew all the values and spend keys, you could create a single range proof that's significantly less than 6700 bytes
11:08 <@CjS77>  If there are multiple parties, and the parties don't want to share their values/spend keys (which is 100% of the time), there's also a multiparty protocol which allows the parties to construct the joint proof. This goes over 3 rounds and so, in theory, could be pulled into our multi-recipient transaction protocol.
11:09 <@CjS77>  So here's my thoughts on why ding all this isn't worthwhile (but open to counter-arguments):
11:11 <@CjS77>  * 90%+ transactions will have 2 outputs, and the savings in size aren't that much for 1 aggregated 2-party proof over 2x single party proofs.
11:11 <@CjS77>  * Aggregated proofs link UTXOs together in a block, reducing privacy
11:11 <@CjS77>  * I'm sure there are some non-trivial considerations when implementing block validation with aggregated RPs
11:20 <Blackwolfsa>  My thoughts are kinda plain on this, I dont think its worth the effort to increase the complexity in code to support this as will wont be seeing much longterm benefits and they reduce privacy
11:21 <Blackwolfsa>  The only positives I can see is that they might reduce transaction costs
11:21 <Blackwolfsa>  if you have multiple utxo's and if they are in multiples of 2
11:33 <neonknight64>  When 2 or more outputs share a RP, that RP with linking data will have to live as long as the last unspent output. I think it adds unnecessary complexity for that amount of space saving.
11:38 <Blackwolfsa>  that is true as well, you cant prune one output as long as its linked to another. 
11:42 <Hansie>  I kind of like the idea that we can have aggregate-able RPs, apart from all the counter arguments here and possible implementation challenges. It depends on how Tx fees will be calculated; this could mean much cheaper Txs for end users and could reduce blockchain size.
11:44 <Hansie>  Imagine the amount of collective savings in fees if an employer wants to pay 10s or 100s of employees in one Tx.
11:57 <Blackwolfsa>  if you have 128 (used this cuz the bulletproof paper has agg sizes on this) outputs the total bytes for the output is 90624 bytes, if you aggregated them you required 541796 bytes
11:57 <Blackwolfsa>  that means you actually pay more
11:57 <Blackwolfsa>  this is going by the assumption that every utxo needs to store its sibling utxos
11:58 <Blackwolfsa>  math = 33 *128 + 675*128 for multi outputs
11:58 <Blackwolfsa>  33*128*128 + 1124 for aggregated rp
11:59 <Blackwolfsa>  where a commitment is 33 bytes and the single RP is 675 while the aggregated one is 1124
12:15 <neonknight64>  For 128 outputs, If you use a RP pool and every output stores the a link (u64) to the RP in the pool then you need 13540 bytes compared to every output storing its own RP which will be 90624 bytes. Calc: total_bytes=n_outputs x (commitment_byte + u64_link_bytes)+agg_RP_bytes
12:17 <neonknight64>  Only need 14.9% of the original bytes
12:27 <neonknight64>  Sorry, made a small mistake. The aggregate RP version will use 13540 bytes as previously posted but having a RP for every output of the 100 outputs (not 128) will require 74100 bytes. Aggregate RP with links only need 18.2% of the original bytes.
12:29 <tar1b0t_>  [mattermost] <CjS77> How big are 2 aggregated RPS?
12:41 <Hansie>  From Benedikt Bünz's slides on 'Bulletproofs: SHORT PROOFS FOR CONFIDENTIAL TRANSACTIONS AND MORE'
12:42 <Hansie>  1x RP -> 672 bytes,    2x RP -> 738 bytes,    10x RP -> 928bytes
12:45 <tar1b0t_>  [mattermost] <CjS77> Wow, that is actually quite a big saving, even for 2 RPs
12:48 <Hansie>  From: https://cyber.stanford.edu/sites/g/files/sbiybj9936/f/bpase18.pptx
12:49 <Hansie>  It is impressive yes
13:52 <sarang>  Batching the verification is also hugely useful for time savings, but I don't believe dalek supports it yet like Monero does
13:53 <sarang>  Also the MPC security for 3 rounds is still very unclear
```
