---
layout: post
title: Tari Protocol Discussion 20
date: 2019-02-04 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-20.png
lead: Archival nodes, pruned nodes, and understanding pruning horizons
class: subpage
---

On Monday, the Tari community discussed how pruned and archival nodes might sync with each other and handle re-orgs. Below is the TL;DR on Monday's conversation (full transcript included below):

Archival nodes:

- Necessary as a safety backstop
- At least one honest archival node required to recover from a deep re-org (a deep re-org is one that goes further back than a node's pruning horizon)

Pruned nodes:

- Maintain a subset of all past blocks
- How many blocks should pruned nodes track before pruning (pruning horizon)?

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
10:58 AM <@cjs77> We'll be answering your questions -- particularly around how nodes can sync / seed /  handle re-orgs in pruned mode & archival node
10:58 AM <@cjs77> But any other Qs are ok too :)
11:02 AM <Blackwolfsa> Thanks, that's probably the biggest negative point with typora, no built in spell checker
11:04 AM <@cjs77> IntelliJ's Markdown navigator plugin does a great job -- maybe check that out
11:05 AM <@cjs77> Instead of repeating everything here, I think the RFC PR https://github.com/tari-project/tari/pull/102 covers all the bases ..
11:05 AM <@cjs77> Thanks blackwolfsa for writing it up;
11:06 AM <@cjs77> If there are any comments about it, feel free to brig it up.
11:07 AM <@cjs77> One thing that one might pick up is that a big re-org happens past the point of the `PruningHorizon`, pruning nodes are stuffed.
11:08 AM <Blackwolfsa> Yes please
11:08 AM <@cjs77> So it highlights why some archival nodes are necessary as a safety backstop
11:08 AM <Blackwolfsa> Yes you have two choices there, find an archive node or a node with a higher pruning horizon
11:08 AM <@cjs77> (But also note that Grin implements the same strategy)
11:09 AM <Blackwolfsa> Technically it's not a nessasity. You can just sync with the node that provided you with the longest chain
11:09 AM <Blackwolfsa> Pow chain that is
11:09 AM <tk___> if im not a block explorer (or the NSA) what would be the incentive (not financial per se) to run an archival node?
11:10 AM <@cjs77> Or an exchange..
11:10 AM <@cjs77> But none, really :)
11:10 AM <tk___> hmm i see
11:10 AM <@cjs77> Blackwolfsa: good point. There may be a distribution of nodes with different pruning horizons
11:11 AM <@cjs77> I was assuming that most folk run with the default setting :)
11:13 AM <Blackwolfsa> Even then it's not required. We should just ensure our defaults are chosen in such a way to ensure its statistically safe
11:14 AM <Blackwolfsa> For example let's say it's something stupid like 5, you will get the complete header information and then the 5 blocks to satisfy your horizon
11:15 AM <simian_za> what is the proposed default horizon?
11:15 AM <Hansie> Wallets may benefit from services provided by archival nodes as they need some kind of proof that the view of the blockchain they see is real. Some wallets could potentially offer better security than SPV.  This may mean that they want to look at a pruned view of the blockchain going past the pruning horizon.
11:17 AM <Blackwolfsa> But why would a wallet want to look at the history?
11:17 AM <@cjs77> It's 5,000 on Grin, right? But maybe we can have an installer that allows users to select "safe" (10,000), "med" (5,000), "small" (2,500) -- in the absence of an installer the docs for the config file provides this guidance. That way we can be more confident of getting a distribution
11:17 AM <Blackwolfsa> It has even less motivation to due to then a base node
11:18 AM <Hansie> Trust
11:18 AM <Blackwolfsa> Unless I am missing something completely. Wallets only care about its own utxo, not even the other utxo
11:18 AM <Blackwolfsa> What trust? Wallets don't track consensus rules?
11:19 AM <simian_za> The only benefit of seeing the full history is to recover from a reorg, other than a major reorg a non-pruned view of the blockchain has no extra security features?
11:19 AM <neonknight> It seems as if the largest bitcoin reorg was 53 blocks in 2010 and after that only 4.
11:19 AM <simian_za> so 5000 blocks is 3.5 days which seems fairly solid
11:20 AM <simian_za> assuming a 1 minute block time
11:22 AM <@cjs77> Big reorgs are either: a 51% attack, or due to a network partition. Either is really bad if it leads to a reorg of even 100 blocks; but you should be able to get the entire network back in sync no matter how deep the re-org.
11:23 AM <ixside> Is there a ratio of archival nodes to pruned nodes that must be met to recover from a deep re-org?
11:24 AM <@cjs77> Assuming the majority of Monero miners merge-mine Tari the risk of a re-org like that is really miniscule, but you still have to be able to recover from it imho
11:25 AM <@cjs77> ixside: Nope. You only need one honest archival node (Blackwolfsa - check my math ;) )
11:25 AM <Blackwolfsa> I am. Missing why you need one?
11:26 AM <simian_za> yes even one will be enough to recover...as long as you trust it. So more archival nodes = more trust due to lower likelihood of sybil
11:26 AM <simian_za> attack
11:26 AM <Blackwolfsa> The node that has the longest pow chain should also have the required header and most likely blocks as well
11:26 AM <Blackwolfsa> Some base node had to have assembled that longest chain?
11:27 AM <simian_za> but if it is reorged beyond its Horizon how do we recover?
11:27 AM <Hansie> One does not need to trust the archival node, must just be able to verify everything.
11:27 AM <Hansie> Full sync to archival node
11:27 AM <@cjs77> Do you need to trust it? When you reach your pruning horizon, you'll be able to compare UTXO sets again
11:28 AM <Hansie> Yip, do not trust, verify
11:28 AM <Blackwolfsa> Yes if you go beyond your horizon. But remember for some base node that has not happened
11:29 AM <Blackwolfsa> How else do you get a new longest chain?
11:31 AM <Hansie> How is the UTXO set verified?
11:32 AM <Blackwolfsa> He has to have a valid set of utxo + headers
11:32 AM <Blackwolfsa> Otherwise he can't have a longer chain
11:32 AM <@cjs77> doh - you're right. Sorry -- was doing something else and not thinking clearly
11:35 AM <Hansie> So if a reorg goes past the pruning horizon there is a problem, even though highly unlikely?
11:36 AM <Blackwolfsa> No, you sync to the node which has it
11:36 AM <Blackwolfsa> The only case where we might have an issue is if the node supplying the re org has a horizon of 1
11:37 AM <Blackwolfsa> In that case I am in favor of ignoring the reorg. That just smells fishy
11:38 AM <Hansie> Hence cjs77 suggestion of "allows users to select "safe" (10,000), "med" (5,000), "small" (2,500) "
11:38 AM <Blackwolfsa> Yes
11:38 AM <Blackwolfsa> But nothing stop that node from making his 1
11:39 AM <Hansie> So can we assume/fix in the code that if a node is unable to provide the small set that node can never have the longest chain?
11:41 AM <Blackwolfsa> Yes, if he can't prove he has the longest chain, then he doesn't have it
11:42 AM <Hansie> Meaning at least  full blocks for the last 2500 blocks?
11:43 AM <@cjs77> An horizon of 1?
11:44 AM <@cjs77> That's node won't sync anyone though, so why worry?
11:44 AM <Blackwolfsa> It's if he has the longest chain
11:44 AM <@cjs77> The horizon is the # of blocks you track without pruning
11:45 AM <Blackwolfsa> I am thinking in the lines of if some node can't supply you of a valid chain, meaning log enough for your horizon, then you ignore it ans go on
11:45 AM <@cjs77> right? So my node with a horizon of 2,500 blocks will either handle the re-org or be in the same boat as that guy
11:45 AM <Blackwolfsa> So your node has a horizon of 2500. Some block with horizon 1 comes along with the correct headers for a chain of longer pow
11:45 AM <Blackwolfsa> What do you do?
11:46 AM <Blackwolfsa> He can only supply you with one node? This seems to me a vector for attack and he should just be ignored
11:46 AM <@cjs77> You mean supply me with one block?
11:47 AM <ixside> Why would a node have a horizon of 1?
11:47 AM <Blackwolfsa> That's my point, if he has a horizon that small, he is most likely an attacker
11:48 AM <@cjs77> If the reorg is beyond my pruning horizon, the RFC says I must get blocks from a node with  longer horizon or an archoval node (infinite horizon), so by that logic, yes, I ignore the node with horizon 1
11:48 AM <@cjs77> That makes sense to me, unless I'm missing something
11:49 AM <Blackwolfsa> Yes
11:49 AM <@cjs77> So I'd also ignore a node with a 2,499 block horizon
11:49 AM <Hansie> So logically a reorg cannot be promoted by any node if the full blocks for the impacted portion of the blockchain cannot be provided?
11:49 AM <@cjs77> ^ yes
```
