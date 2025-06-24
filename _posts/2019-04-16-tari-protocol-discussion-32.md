---
layout: post
title: Tari Protocol Discussion 32
date: 2019-04-16 09:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-32.png
lead: Using aggregating bulletproofs for transactions
class: subpage
---

On Monday, the Tari community discussed the mempool RFC. Below is the TL;DR on Monday's conversation (full transcript included below):

RFC 0190 Mempool

- Proposed to use 4 mempools: ransaction Pool, Pending Pool, Orphan Pool and Reorg Pool
- The mempools should be ordered with a priority
- Transactions should be ordered with a priority

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
18:00 <neonknight64>  Hello, I wonder if we can't talk about RFC0190 - Mempool: https://github.com/tari-project/tari/pull/229
18:02 <neonknight64>  The basic idea is that the Mempool consist of four sub pools: Transaction Pool, Pending Pool, Orphan Pool and Reorg Pool.
18:03 <Blackwolfsa3>  whats the reason for the reorg pool?
18:06 <neonknight64>  The Reorg pool is used as a short term backup for transactions that have been included in blocks. In case a blockchain reorganisation happens, the transactions used in the discarded blocks can be recovered and added back into the transaction pool so that they can be added to future blocks.
18:07 <neonknight64>  This will ensure that high priority transactions wont be discarded and wont need to be retransmitted
18:07 <Blackwolfsa3>  so its basically a nice to have so that the wallets dont have to watch for it?
18:07 <@CjS77>  hansie: Ok, I got you. Indeed it's non-trivial
18:08 <neonknight64>  I think, adding a Reorg pool could make the Mempool a bit more dependable
18:09 <Blackwolfsa3>  it should
18:12 <neonknight64>  So the Transaction pool contains only valid and ready-to-go transactions that could be added to blocks. The Pending Pool and Orphan pool deal with transactions that have timelocks, attempt to spend invalid UTXOs or UTXOs with timelocks.
18:14 <@CjS77>  Yeah,I don't see there being much overhead to running multiple pools, so you may as well have separate ones rather than having to sort & filter a global pool all the time. No TX sits in more than one pool (except the reorg pool I guess), so it sounds good to me
18:14 <Blackwolfsa3>  do we need to separate two, I see no reason for a pending and orphan pool?
18:15 <Blackwolfsa3>  a tx can also theoretically sit in both
18:15 <@CjS77>  The pending pool could also be sorted by block so that it's really easy to pop off tx's into the main pool when a new block is found
18:16 <@CjS77>  I suggest: If it's an orphan, it should go to the orphan pool, even if it would also be pending. If its parent appears, it should move to pending.
18:17 <neonknight64>  I think a transaction should only every exist in one pool at a time. I agree with CjS77, the pools could be prioritized like that.
18:20 <neonknight64>  Blackwolfsa3, currently the pending pool deals with timelock restricted transactions that could be sorted efficiently like CjS77 suggested. The transactions in the Orphan pool might get discarded regularly as they reach the maturity threshold and could not be moved to the transaction pool.
18:21 <neonknight64>  Managing them separately might make implementation easier.
18:22 <stanimal>  "Pending transactions that have matured past the discard threshold MUST be discarded and removed from the Pending Pool." - what is the discard threshold and why would a transaction sit in the mempool long enough to be discarded?
18:24 <neonknight64>  Mmmm that doesn't seem right, that mechanism is for the Orphan Pool or Reorg Pool.
18:25 <stanimal>  Ah yes, that makes more sense
18:26 <neonknight64>  If an orphaned transaction could not be moved to the transaction pool within a specified amount of time (threshold) its might never be spendable and should be removed at some point
18:28 <neonknight64>  The RFC proposes a priority metric to prioritise transactions when storage limits are reached, any ideas how this could be improved?
18:30 <neonknight64>  Currently, transactions spending UTXOs with higher block height maturity must be prioritized over transactions spending UTXOs
18:30 <neonknight64>   with lower block height maturity. Also, transactions with higher fees per transaction message size must be prioritized over lower fee transactions.
18:35 <stanimal>  What data points do we have? Obviously not value of the transaction. Maturity (age), fees... anything else?
18:35 <Blackwolfsa3>  type?
18:36 <Hansie>  Hi
18:41 <neonknight64>  Type maybe.. I fear that time-locked transactions will be discarded to make room for higher priority valid transactions that could be included into blocks.
18:41 <Blackwolfsa3>  whould timelocked not be in pending anyway?
18:42 <Blackwolfsa3>  I was thinking more along the lines of vn registration etc
18:42 <stanimal>  Would the time spent locked not count towards the maturity?
18:42 <Hansie>  It should
18:42 <Hansie>  But is maturity not just binary? Mature or not mature?
18:43 <neonknight64>  Aaah I see, that "type" could possibly work.
18:43 <stanimal>  Think type can definitely enter in the heuristic - though initially we only have coinbase (timelocked) and regular?
18:45 <Hansie>  Maybe the 'must' should turn to 'should'. Miners will decide what they want to do, which valid Txs they want to include.
18:45 <Hansie>  stanimal: I think yes
18:49 <Hansie>  neonknight: Will `threshold expiration time` for the reorg pool be similar to the horizon for fast sync?
18:51 <neonknight64>  The threshold expiration time will be short for transactions in the Reorg pool, probably something like 30-60min
18:51 <neonknight64>  Not sure if it is similar to horizon for fast sync..
18:53 <Hansie>  Ok
18:53 <Hansie>  Just wondering about the enforce-ability of the 'transaction priority metric '...
18:56 <Hansie>  I think miners will be motivated by higher earnings.
18:58 <neonknight64>  I agree miner are earning driven, probably not enforceable but recommended
18:58 <Hansie>  I like the idea that wallets can track incoming payments, and possibly the state of a particular Tx
19:02 <Hansie>  This may assist front-running: "mechanism to estimate fee categories from the current Mempool state" ?
19:03 <Hansie>  neonknight64: I think the RFC seems solid, apart from some of the comments made here that warrants some thought.
19:06 <neonknight64>  Thank you for the suggestions and comments, I will go think how it can be improved.
19:09 <stanimal>  Agree, think there's some great ideas to run with!
```
