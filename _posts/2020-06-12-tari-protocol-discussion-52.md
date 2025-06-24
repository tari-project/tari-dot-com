---
layout: post
title: Tari Proof of Work Discussion
date: 2020-06-12 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-52.png
lead: What is digital asset ownership?
class: subpage
topics:
    - What does the proof-of-work algorithm for Tari mainnet look like?
---

On Friday the Tari community discussed the Tari Proof of Work algorithm for mainnet on the Tari [Telegram](https://t.me/tariproject) (bridged to #Tari on Freenode).

The primary question discussed was **“What does the proof-of-work algorithm for Tari mainnet look like?”**

The following options were proposed by Cayle Sharrock.

1. Merge mine with Monero only.
2. Hybrid mining, with 50% - 75% of blocks being mined through Monero merge mining and the remainder using a CPU/GPU-friendly algorithm to mine Tari directly.
3. Hybrid mining: 50% - 75% of blocks merge mining Monero, and the remainder merge mining another coin.
4. Other

A pre-discussion update was available [here](/updates/2020-06-08-update-22.html).

While a final conclusion was not reached, next steps were proposed by Cayle and confirmed by other community members.

_We need to wrap up the formal part of this discussion._

_While there hasn’t been a firm decision for the affirmative; I haven’t seen any screaming hate towards either the original proposal, or any of the tweaks that have been proposed here tonight._

_May I propose the next step would be for the dev community to continue the discussion in #tari-dev over the next week or so; reach a broad consensus, and then drop that proposal here for another discussion?_

Below is a full transcript of the conversation.

### **Transcript of Friday discussion**

This is a snapshot taken of the Telegram conversation (bridged to #Tari on Freenode) on Friday, June 12, 2020.

```
Cayle, [12.06.20 11:00]

Welcome to the Tari Proof of work discussion

Q: What does the proof-of-work algorithm for Tari mainnet look like?

A: That’s what we’re here to find out!

The developer community discussed this topic late last year, but the broader Tari community has grown since then and we thought it would be prudent to re-open the discussion to determine whether the decision made in October still has broad consensus.

There are several options available to us:

1. Merge mine with Monero only.

2. Hybrid mining, with 50% - 75% of blocks being mined through Monero merge mining and the remainder using a CPU/GPU-friendly algorithm to mine Tari directly.

3. Hybrid mining: 50% - 75% of blocks merge mining Monero, and the remainder merge mining another coin.

4. Other

Option 1 is the simplest.

Tari can instantly leverage Monero’s hash-rate security; and given the relationship between the Monero and Tari communities, we are optimistic that Tari will get the support of several large Monero pool operators.

However, there are significant risks to “putting all your eggs in one merge-mined basket”. Cheap 51% attacks are possible, as this report and a few members of the Monero development community have pointed out.

Option 2 is the next easiest.

Testnet is already a Tari-only Proof-of-work chain. Mainnet could mitigate the merge-mined 51% attack risks by hybrid mining using a Tari-only algorithm in addition to Monero merge-mining.

The choice of algorithm, and overall contribution to the block emission is yet to be decided. Testnet uses a double Blake hashing algorithm, but this isn’t an optimal choice for several reasons.

A better choice would be a “memory hard” hashing algorithm, like Argon2; or go in the opposite direction and choose one that is likely to become an ASIC-based commodity in future, like SHA-3.

Algorithms that already have high hash rates on other coins, including SHA-256, Ethash, Scrypt and Equihash are not good choices (because you could buy an attack on nicehash).

Option 3 is tougher

Mainly because it requires convincing an additional set of pool operators to support Tari. But it is not much more difficult to implement from a technical point of view.

FYI - The result of the Development Discussion back in October was to take Option 2.

John Tromp, [12.06.20 11:03]

the simplest is of course not to merge mine. but apparently that's off the table:(

Hansie Odendaal, [12.06.20 11:03]

I think all options are open for discussion

Dominik F, [12.06.20 11:03]

[In reply to John Tromp]

4. Other

lsquared, [12.06.20 11:05]

Could 2 and 3 be combined together

Cayle, [12.06.20 11:05]

Yeah, so maybe a good starting point is to cover the risks of ONLY doing merge mining

Hansie Odendaal, [12.06.20 11:05]

I think it can be put together in many different ways

Hansie Odendaal, [12.06.20 11:05]

Agreed

lsquared, [12.06.20 11:06]

Only merge mining with 1 coin or multiple coins?

Cayle, [12.06.20 11:06]

@hansieodendaal can better explain

Cayle, [12.06.20 11:06]

1 coin

lsquared, [12.06.20 11:06]

That inherently sounds bad due to 51% attacks from a large mining pool

Hansie Odendaal, [12.06.20 11:06]

Let me share this TLU: [Merged Mining Introduction](https://tlu.tarilabs.com/merged-mining/merged-mining-scene/MergedMiningIntroduction.html)

sw, [12.06.20 11:06]

Hybrid mining allows you to try an leverage many differant types of pow, And hopefully get the best of both worlds

lsquared, [12.06.20 11:06]

Would it be possible to merge mine with a non PoW coin 😜

Hansie Odendaal, [12.06.20 11:07]

That will not be mining...

sw, [12.06.20 11:07]

I am not personally convinced in doing more than  50% mergeming as that to me negates the advtanges we have with hybrid mining.

Cayle, [12.06.20 11:07]

Great to have @johntromp here. You basically wrote the Grin PoW algos, am I right?

Hansie Odendaal, [12.06.20 11:08]

This is the best work I could find explaining risks and attack vectors of merge mining: Thesis by Alexei Zamyatin: [Merged Mining: Analysis of Effects and Implications](http://repositum.tuwien.ac.at/obvutwhs/download/pdf/2315652)

John Tromp, [12.06.20 11:08]

yes, i'm the author of Cuckoo Cycle

sw, [12.06.20 11:08]

My biggest concern currently is the monero mining pool centralisation. 2 pools, have > 50% hash trate, 1 pool above 33% and 1 pool above 25%

Cayle, [12.06.20 11:08]

Welcome 🙂

Hansie Odendaal, [12.06.20 11:09]

What were the objectives John?

John Tromp, [12.06.20 11:09]

make a simple memory hard pow

John Tromp, [12.06.20 11:09]

that's instantly verifiable

Hansie Odendaal, [12.06.20 11:10]

Please explain the last point?

Cayle, [12.06.20 11:10]

So @hansieodendaal, for everyone that’s not going to read that thesis right now, what’s the tl;dr of the single merge mining risks?

Hansie Odendaal, [12.06.20 11:11]

Double spend; alter history:

- needs >50% hash power

Selfish mining; Eclipse attacks:

- needs >33% hash power for a poorly connected attacker (at ~10% network connectivity)

- needs >25% hash power for a well connected attacker (at ~50% network connectivity)

John Tromp, [12.06.20 11:11]

verifying a PoW should take negligible resources, esp. if it's to be used as spam control

John Tromp, [12.06.20 11:12]

or to counter DDos attacks

Tal, [12.06.20 11:13]

[In reply to Paull Smalls]

There's a fix for that going out next week — low power mode for Android. Check out the Tari Android repo if you're interested in how it works exactly or have ideas

Hansie Odendaal, [12.06.20 11:13]

@ cayle, all merged mined coins were highly exposed according to those indices, except Myriadcoin that has a hybrid mining strategy.

Hansie Odendaal, [12.06.20 11:13]

[In reply to John Tromp]

👍

TariIRCBouncer, [12.06.20 11:14]

[irc] &lt;stringhandler> is the gist that if only say 40% of monero miners are mining tari and that's 2 pools, then one of those pools could have more than 51%?

sw, [12.06.20 11:14]

[In reply to John Tromp]

Is there a specific reason why merge mining is bad? I know it has its caveats. But I think those can be overcome

Edwin, [12.06.20 11:16]

There is a decentralised pool implementation for Monero that would improve things if the biggest pools could implement it

Hansie Odendaal, [12.06.20 11:16]

[In reply to TariIRCBouncer]

Yes, one cannot control who will do merge mining

Cayle, [12.06.20 11:16]

Basically, as @Lsquared pointed out, a large pool can come in and attempt a 51% attack, but _because it’s merge mined_ their opportuntity cost is relatively low. Normally if you attempt a 51% attack and fail, you lose all the block rewards that you would have received by just playing along.

By attacking the child chain in merge mining, the attacker does not risk the parent chain rewards

TariIRCBouncer, [12.06.20 11:16]

[irc] &lt;stringhandler> the size needed for the proof of work for merge mining is large

Edwin, [12.06.20 11:16]

Only a few tiny pools use it currently

Edwin, [12.06.20 11:16]

Someone called jtgrassie made it

Hansie Odendaal, [12.06.20 11:16]

[In reply to sw]

I think merge mining only with one algo is risky, exposed to being controlled

sw, [12.06.20 11:16]

[In reply to TariIRCBouncer]

Yip, if you have more than 1/3 of the hash rate, you can start mucking around. If you have 1/3 of the merge mined pow, and the pow is weighted to count more than 50%, you automatically get more than 51% hash rate.

sw, [12.06.20 11:17]

[In reply to Cayle]

thats even worse than I had it

TariIRCBouncer, [12.06.20 11:19]

[irc] &lt;stringhandler> you need the whole monero header plus a fair amount extra, compared to a few inputs needed for a standard PoW

Edwin, [12.06.20 11:20]

https://github.com/jtgrassie/monero-pool/blob/master/stratum-ss.md

Cayle, [12.06.20 11:20]

So hybrid mining is an attempt to remedy that drawback.

In it’s simplest incarnation, half of blocks on average go to one chain (e.g. merge-mined XMR) and half to another (say, independent PoW)

Edwin, [12.06.20 11:20]

That took forever to find

Hansie Odendaal, [12.06.20 11:20]

[In reply to TariIRCBouncer]

#### Additional Blockchain Storage Requirements

- monero_coinbase_tx

- tx_merkle_proof (one pathway of the tx_merkle_tree) - amount of hashes in a tx_merkle_proof is log2(Txs count)

Riccardo Spagni, [12.06.20 11:20]

also it's not the same as BTC's stratum, I don't think

Riccardo Spagni, [12.06.20 11:20]

[In reply to Edwin]

404

David Main, [12.06.20 11:20]

[In reply to Edwin]

404

Edwin, [12.06.20 11:20]

Damn it

John Tromp, [12.06.20 11:21]

you only need the parts of the monero header that commit to the tari chain state

Edwin, [12.06.20 11:21]

https://www.reddit.com/r/Monero/comments/cecmrf/can_this_be_done_to_monero_mining_pools_as_well/eu2g4j5

John Tromp, [12.06.20 11:21]

but depending on implementation, that may be pretty much all of it

Edwin, [12.06.20 11:22]

The repo is gone but I remember him talking about it

TariIRCBouncer, [12.06.20 11:22]

[irc] &lt;stringhandler> Not sure if it's a factor, but the miners may not refresh the transactions in both chains immediately

TariIRCBouncer, [12.06.20 11:22]

[irc] &lt;stringhandler> depending on the implementation

sw, [12.06.20 11:23]

[In reply to Hansie Odendaal]

Short of this is, on merge mine. You need to prove the mined monero header. Then you need to prove the hash of your header is in the data that was just mined for monero.

Thats why you need the coinbase, and then the proof the coinbase is that mined monero block

Hansie Odendaal, [12.06.20 11:23]

#### High Level Pseudo Code

#process

- tari_header_hash = hash(tari_header)

- monero_coinbase_tx.include(tari_header_hash)

- tx_merkle_tree = merkle_tree(monero_coinbase_tx).

    include([txs])

- tx_tree_root_hash = merkle_tree_root_hash(tx_merkle_tree)

- block_hashing_blob = blob(monero_header).

    append(tx_tree_root_hash, size(tree_root_hash)).

    append(num_txs_in_block+1)

- block_hash = hash(block_hashing_blob)

- (achieved_difficulty, nonce) = random_x(block_hash, target_difficulty)

#proof

- proof_coinbase_tx(monero_coinbase_tx, tx_merkle_proof) == true

- achieved_difficulty >= target_difficulty

- achieved_difficulty == random_x_proof(block_hash, nonce)

Hansie Odendaal, [12.06.20 11:25]

Merged mining provides cost of security almost for free, but not security itself._

Cayle, [12.06.20 11:25]

Back to overall PoW strategies — hybrid mining has its drawbacks too

sw, [12.06.20 11:25]

Yip in dead pow

Hansie Odendaal, [12.06.20 11:26]

Yes it does

Cayle, [12.06.20 11:26]

Would you mind elaborating on that a bit, @sw or @hansieodendaal

Hansie Odendaal, [12.06.20 11:26]

The selection strategy and difficulty algo block window is really important

neonknight, [12.06.20 11:26]

If hybrid mining, how many PoW algos?

sw, [12.06.20 11:26]

If you spike the hash rate of single pow, and you drop out. That algo is effectively dead

John Tromp, [12.06.20 11:26]

grin has 34

sw, [12.06.20 11:27]

[In reply to John Tromp]

algos?

John Tromp, [12.06.20 11:27]

yes

John Tromp, [12.06.20 11:27]

C29 and C31,C32,...C63

John Tromp, [12.06.20 11:28]

of course most are not being solved since they take too much memory

Hansie Odendaal, [12.06.20 11:28]

[In reply to neonknight]

Myriadcoin has 5 algos running, with a limit on consecutive blocks

Edwin, [12.06.20 11:28]

https://mobile.twitter.com/jtgrassie/status/1150480615688609795

Hansie Odendaal, [12.06.20 11:28]

[In reply to John Tromp]

So can you choose any one to solve?

John Tromp, [12.06.20 11:29]

yes

sw, [12.06.20 11:29]

[In reply to sw]

The reason for this is: The required difficulty will not drop until after you have mined a new block. If the one algo's delay in mining a new block is greater than the target of the other one, he will mine another block and you have to start over again.

John Tromp, [12.06.20 11:29]

but nobody is choosing C33 or higher

Hansie Odendaal, [12.06.20 11:29]

[In reply to John Tromp]

👍

sw, [12.06.20 11:30]

[In reply to Hansie Odendaal]

If you do hybrid mining, you will have to do something like this to stop dead algo's. Or you need a difficulty adjustment algo that takes into account the current time, like TSA

Cayle, [12.06.20 11:30]

PErsonally I feel that if hybrid mining has a choice of algos that can be run with _the same hardware_ you don’t really gain much, and open yourself up to being gamed with large miners running up difficulty in one of them, and then flipping over to an alternative with a simple software config to grab a bunch of lower difficulty blcks.

Riccardo Spagni, [12.06.20 11:31]

yes I agree

TariIRCBouncer, [12.06.20 11:31]

[irc] &lt;stringhandler> agree

Riccardo Spagni, [12.06.20 11:31]

it would have to be Monero + ASICs or somethign

Hansie Odendaal, [12.06.20 11:31]

[In reply to Cayle]

Agreed

TariIRCBouncer, [12.06.20 11:31]

[irc] &lt;stringhandler> in fact, you want to ideally want there to be no overlap in miners

Cayle, [12.06.20 11:31]

@fluffypony Are there GPU versions of RandomX yet?

Riccardo Spagni, [12.06.20 11:32]

not that I'm aware of

Riccardo Spagni, [12.06.20 11:32]

and if there are then I don't think they'd be performant enough to warrant use

sw, [12.06.20 11:32]

Ideally I think we can go up to, one CPU, one GPU, one ASIC

Cayle, [12.06.20 11:32]

So potentially, CPU = RandomX + GPU Algo + ASIC Algo. But I wouldn’t choose more for my reasoning above

Cayle, [12.06.20 11:32]

lol - snap

Riccardo Spagni, [12.06.20 11:33]

I would suspect that any GPU load we can come up with will become ASICable

sw, [12.06.20 11:33]

But the GPU/ASIC one is diffcult as it could soon become asic

Riccardo Spagni, [12.06.20 11:33]

so I would say just skip that part and go RandomX + SHA3

Riccardo Spagni, [12.06.20 11:33]

[In reply to sw]

precisely

Cayle, [12.06.20 11:33]

Yes, it’s always a time-based thing

TariIRCBouncer, [12.06.20 11:33]

[irc] &lt;stringhandler> well you still need to get some adoption, so ASIC

Cayle, [12.06.20 11:33]

+1

sw, [12.06.20 11:33]

You could potentially do 2 ASIC's

sw, [12.06.20 11:34]

or more

TariIRCBouncer, [12.06.20 11:34]

[irc] &lt;stringhandler> * so asics would need to be merge mined with another coin

sw, [12.06.20 11:34]

But there needs to some cap if go this route

Cayle, [12.06.20 11:34]

Yes, ‘cos all ASIC hashpower is rentable on nicehash

Riccardo Spagni, [12.06.20 11:34]

not for something like double-SHA3

Hansie Odendaal, [12.06.20 11:34]

Personally I like Myriacoin's approach to hybrid mining the best:

- merged mined (sha256d, scrypt);

- independent (groestl, yescript, argon2d).

These could be altered or swapped out for others of coarse

Riccardo Spagni, [12.06.20 11:34]

which would be GPU for now, and ASIC at some point in the future

sw, [12.06.20 11:34]

[In reply to TariIRCBouncer]

Its not required

Riccardo Spagni, [12.06.20 11:35]

I don't like the idea of a memory-hard GPU algo that is just a band-aid and ends up with complex & expensive ASICs, I'd rather go for something cheap to ASIC

Cayle, [12.06.20 11:35]

So one parameter we haven’t discussed and this is a good segue, is that it doesn’t have to be a 1/n block split

Cayle, [12.06.20 11:36]

We _could_ have 75% XMR MM and 25% ASIC

TariIRCBouncer, [12.06.20 11:36]

[irc] &lt;stringhandler> interesting

Cayle, [12.06.20 11:36]

for instance

Riccardo Spagni, [12.06.20 11:36]

that would be my preference

Riccardo Spagni, [12.06.20 11:36]

not sure what split, but heavily Monero weighted

Cayle, [12.06.20 11:36]

75% MM would require 2x the “honest” hashrate to execute an overall 51% attack

Edwin, [12.06.20 11:36]

If you were to go for GPUs, what algorithm?

Cayle, [12.06.20 11:37]

(if my memory serves)

Hansie Odendaal, [12.06.20 11:37]

Opening up to attacks

neonknight, [12.06.20 11:38]

Does that mean on average 3 blocks merged mined with Monero and then 1 block Asic mined

Riccardo Spagni, [12.06.20 11:38]

[In reply to Edwin]

something like double-SHA3 would by GPU right now, but it's cheap and easy to produce ASICs in the future

Hansie Odendaal, [12.06.20 11:41]

I do not understand the reasoning why 75% blocks for MM. Just making the attack vectors larger.

Cayle, [12.06.20 11:42]

It makes one set of vectors larger and others smaller.

Riccardo Spagni, [12.06.20 11:42]

yes

sw, [12.06.20 11:44]

There might be some problems with the difficulty on the merge-mining.

Currently we have 2 min blocks, same as monero.

I am just putting this at 50% for ease of use explaining.

That means we have one monero block every 4 min. This means that our difficulty will be much higher than the monero one. If we get all of the miners in. This wont be the case, I know.

But the problem is that if we have a higher diff than monero, the miner will find a monero block before a tari one. That means that the miner will start mining a new monero block. And start over mining again. Unless he gets lucky he will never find a tari block

TariIRCBouncer, [12.06.20 11:44]

[irc] &lt;moneromooo> If the main argument against merge mining only is "one pool can get > 50%", then 75% merged mining means the pool can get 3/4 of that still, so the proportion can't be too high. If a pool has 70%, 75% of 70% is 52%, which is still too much.

TariIRCBouncer, [12.06.20 11:45]

[irc] &lt;moneromooo> (70% of the merged mining hash rate, ie one large monero pool while the other large pool does not mine tari)

Hansie Odendaal, [12.06.20 11:54]

Good observation

TariIRCBouncer, [12.06.20 11:54]

[irc] &lt;moneromooo> Blackwolfsa: in your example, he should fine a tari block every second block. Actual targets are randomly distributed.

TariIRCBouncer, [12.06.20 11:55]

[irc] &lt;moneromooo> (I think, but am not sure, that the argument was he'd find a monero block first, but that'll happen only half the time with those parameters, since the search is progressless. Sorry if I misunderstood the point).

mr bulb, [12.06.20 11:56]

w/ "Hybrid mining: 50% - 75% of blocks merge mining Monero, and the remainder merge mining another coin" what other coins are you considering?

Edwin, [12.06.20 11:57]

Grin

Dominik F, [12.06.20 11:57]

[In reply to Edwin]

😄

Edwin, [12.06.20 11:58]

Tari becomes the NFT MW bridge between Monero and Grin.

mr bulb, [12.06.20 11:59]

triple threat

Cayle, [12.06.20 11:59]

[In reply to TariIRCBouncer]

Correct; My comment was predicated on the assumption that you have an “honest” pool, and a large malicious pool(s)

sw, [12.06.20 12:00]

[In reply to TariIRCBouncer]

Not per say? Because you are mining monero at the monero diff.

The idea being that if you find a monero header at a tari diff, you submit that to the tari chain as pow.

sw, [12.06.20 12:00]

[In reply to sw]

But if your tari diff is much higher you need to mine a monero block at that higher diff before you can submit it to the tari chain

TariIRCBouncer, [12.06.20 12:01]

[irc] &lt;moneromooo> Ah, I get it, it'll be monero block because you get the monero coinbase too. Ignore my comment.

Cye, [12.06.20 12:01]

Recieved some tips, thanks guys/girls😀🚀👍

Cayle, [12.06.20 12:09]

We need to wrap up the formal part of this discussion.

While there hasn’t been a firm decision for the affirmative; I haven’t seen any screaming hate towards either the original proposal, or any of the tweaks that have been proposed here tonight.

May I propose the next step would be for the dev community to continue the discussion in #tari-dev over the next week or so; reach a broad consensus, and then drop that proposal here for another discussion?

Cayle, [12.06.20 12:10]

That proposal wouldn’t necessarily be asking for permission; but to see if there’s any major opposition

sw, [12.06.20 12:10]

👍

neonknight, [12.06.20 12:10]

Sounds good!

Riccardo Spagni, [12.06.20 12:11]

sounds good to me

Cayle, [12.06.20 12:11]

Great, then thanks to everybody who participatedm and have a lovely weekend!

salvo mantix, [12.06.20 12:11]

👏

G C, [12.06.20 12:11]

Thanks Cayle and all 👏🏻

Dominik F, [12.06.20 12:12]

👍

C.Lee Taylor, [12.06.20 12:36]

👌

```
