---
layout: post
title: Tari Protocol Discussion 30
date: 2019-03-18 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-30.png
lead: Directed Acyclic Graphs and the Tari Network
class: subpage
---

On Monday, the Tari community discussed how Directed Acyclic Graphs might play a role on the Tari network. Below is the TL;DR on Monday's conversation (full transcript included below):

DAGs on the Tari Network

- Should be on the asset layer (second layer)
- Used as a tool to converge on asset state

Questions to Consider

- Should single instructions be executed as nodes in the DAG?
- Should sets of instructions be aggregated in a block and then have DAG rules applied to the block?
- How should instructions be ordered?

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
12:19 PM <stanimal> Hey all, so I was wondering how a DAG might be used in Tari - I haven't finished watching this video from a few years ago but there are some pretty interesting ideas https://www.youtube.com/watch?v=62Y_BW5NC1M&feature=youtu.be [Dr Bob McElrath - Braiding the Blockchain]
12:21 PM <Blackwolfsa> I think Tari will use a dag for the second layer
12:21 PM <Blackwolfsa> The asset layer
12:23 PM <stanimal> Ok so if there are concurrent instructions it will be used to converge on an asset state?
12:24 PM <Blackwolfsa> Yes
12:24 PM <simian_za> Yes, So for each asset we will represent its state and the rules for updating its state by a DAG?
12:25 PM <Blackwolfsa> A dag state will essentially be an instruction with a link back to the prev state
12:25 PM <Hansie> There are some fundamental differences between DAG types SPECTRE/PHANTOM and Braiding
12:25 PM <Hansie> Short summary here: https://tlu.tarilabs.com/layer2scaling/more-landscape/landscape-update.html#directed-acyclic-graph-dag-derivative-protocols
12:26 PM <Hansie> If I remember correctly it has to do with how conflicting Tx are handled
12:26 PM <Blackwolfsa> There are small technical implementation differences, but I disagree that there are fundamental differences.
12:27 PM <Blackwolfsa> Conflicting TX handling is not something fundamental.
12:28 PM <neonknight> I think conflicting instructions will result in orphaned branches and a branch with a supermajority consensus will live on.
12:28 PM <Hansie> Point of view then, Tx vs. block
12:29 PM <Blackwolfsa> Agreed
12:29 PM <simian_za> so we execute either single instructions as nodes in the dag or do we aggregate a set of instruction into a block and apply the dag rules to the block?
12:29 PM <Blackwolfsa> We can also ignore conflict or bad instructions indefinitely
12:30 PM <Blackwolfsa> I am of the opinion single instructions will be easier
12:31 PM <Blackwolfsa> Atleast from a syncing point of view, as each instruction modifies the state
12:31 PM <Blackwolfsa> Because there is no pow we don't have batch instructions for speed
12:32 PM <neonknight> I do not think blocks are necessary, instruction level seems better. An asset can be treated as a single large DAG that should merge to a single state at every checkpoint
12:33 PM <Hansie> Let us go with that...
12:33 PM <Hansie> What about Tx ordering?
12:33 PM <Blackwolfsa> We don't need instruction ordering?
12:33 PM <Hansie> So the 1st valid Tx is valid, the ones after is marked as invalid?
12:34 PM <Blackwolfsa> Each instruction should be independant
12:34 PM <Hansie> A -> B -> C and later on A -> D
12:34 PM <neonknight> Each instruction creates a single branch, branches that have not been verified by majority at the checkpoint should be discarded.
12:35 PM <simian_za> I think it should work to just have each node order the instructions as it receives them and then the DAG protocol will sort out the state as the nodes keep talking going forward
12:35 PM <Blackwolfsa> If you have instructions that follow one other, you have to wait for eached to be confirmed
12:35 PM <Blackwolfsa> Yes agreed
12:36 PM <Hansie> Maybe if there are no blocks there is no DAG, just Txs with super majority votes to make it valid
12:36 PM <Hansie> And a Tx voted valid cannot be reversed
12:36 PM <neonknight> You could have a DAG without blocks.
12:37 PM <simian_za> I think we will find that the different rule variant will respond differently to varying network conditions. Will be good to build them and test them
12:38 PM <Blackwolfsa> We are going to need a dag
12:38 PM <simian_za> a modular network stack should make building and testing fairly easy
12:38 PM <Blackwolfsa> We cannot have a single process line, we need concurrent
12:39 PM <Hansie> In my mind we will have states somehow linked to previous states, including concurrent Txs
12:40 PM <simian_za> Ja I agree you need to deal with the concurrency, you need to have the DAG rules to merge the ordering of each nodes instruction stream to compensate for the latency between them
12:40 PM <Blackwolfsa> We don't nessasarily have TXs, we might but its more likely to just be an instruction
12:40 PM <neonknight> I think every token will form a chain of state changes, but each asset will have a DAG.
12:40 PM <Blackwolfsa> Yes
12:41 PM <Blackwolfsa> On the minimal, we will need to have link to prev state, and new instruction. Those two could make up a state
12:42 PM <Hansie> If one allows late votes to be added to majority votes, the state changes, but the outcome not
12:45 PM <Hansie> In a DAG miners mine blocks of Txs they have validated, and contnue to do so as long as they believe it is valid. Then later on another branch of blocks can join to form the DAG
12:45 PM <Hansie> In our system we need a super majority vote to cement each Tx. This is fundamentally different to miners that can go solo for a certain time.
12:45 PM <neonknight> Simian I agree, a modular network stack can make testing these ideas easier.
12:47 PM <Hansie> The only way I can see a DAG-like structure is if each VN can build their own view of the truth without voting, and then later every VN votes to confirm all Txs for that period of time.
12:47 PM <neonknight> A single VN can go solo for a short period of time, he will create the instruction branches but only once he shares it with other VNs that verify the branches do the become valid.
12:49 PM <Hansie> Yes, something like a local state which is merged into a global state where all VNs vote
12:49 PM <simian_za> Ja, I think it will be more fluid than that. As the VNs propagate their signed instructions the instructions will acquire signatures and after some time they will all reach the super majority and the VNs will chain their new instructions from these states (the ones that have a supermajorities worth of signatures)
12:49 PM <Blackwolfsa> We don't really need a super majority, just plain majority will work fine
12:50 PM <Hansie> Do not agree `We don't really need a super majority, just plain majority will work fine`
12:50 PM <simian_za> A bigger majority scales the security of the network upwards. An attacker will need control more nodes
12:50 PM <Hansie> Check pointing must be BFT resistant
12:51 PM <neonknight> I think at the checkpoint some negotiation has to happen between the VNs where they share and combine their local DAGs so that a final checkpoint state (global DAG)can be constructed
12:51 PM <simian_za> at a regular period?
12:51 PM <neonknight> probably..
12:53 PM <simian_za> what is a period measured in? The number of instructions a node receives (i.e. checkpoint every 100 instructions)?
12:53 PM <neonknight> Majority voting can only work if there is a very structured and restrictive validation process in place. Supermajority allows for a much simpler validation process with less communication.
12:54 PM <simian_za> and then some protocol for the nodes to propose a checkpoint, wait for each other to acknowledge and then synchronise state?
12:54 PM <Hansie> Period: volume limit or time, whichever comes first
12:54 PM <neonknight> I like that idea Simian, an instruction limit is much better than time based.
12:54 PM <simian_za> could have time based as a backup threshold easily enough
12:55 PM <Hansie> So confirmation to users can only be given at checkpoints
12:55 PM <Hansie> Or 'synchronized state' points
12:55 PM <neonknight> Confirmation can happen at any point as long as a supermajority has verified it.
12:56 PM <simian_za> or just the first message the wallet receives where the supermajority of VNs has signed the instruction? Then it is sure to become part of the DAG
12:56 PM <Hansie> Thus just counting all the signatures that verified a particular Tx?
12:57 PM <simian_za> ja, more message of that transaction might come from other nodes later with more signatures but once the threshold has been reached you are confirmed
12:57 PM <neonknight> Agreed
12:57 PM <Hansie> In that case checkpoints only consists of validated Txs
12:58 PM <Hansie> No special synchronization is needed
12:58 PM <Blackwolfsa> If the signed VNs are more. Than the required threshold, we know it's approed
12:58 PM <simian_za> I think it could work with enough network bandwidth
12:59 PM <Hansie> Does a wallet pull for verification, or is it pushed?
12:59 PM <Blackwolfsa> Verification
12:59 PM <Blackwolfsa> There is no push to a block
12:59 PM <neonknight> Synchronisation is still needed as some VNs do not have the states of the tokens that were verified without them.
12:59 PM <Hansie> Agreed
12:59 PM <simian_za> ja there should be the periodic consolidation so the branches of the DAGs dont have a chance to get too long
1:01 PM <Blackwolfsa> Do we need that? If we receive a block pointing to a unknown state we just ask ans sync
1:01 PM <neonknight> I think a wallet should pull the verification status of his instruction.
1:02 PM <Hansie> Yip
1:03 PM <Blackwolfsa> He could ask? But how and why?
1:05 PM <simian_za> I think you will see a higher rate of orphan branches in the DAG but we are speculating, building the different prototypes will reveal the issues
1:06 PM <neonknight> A pull will result in one message transfer, a push will result in every VN sending the verification message.
1:07 PM <Hansie> I think so yes
1:08 PM <Hansie> erification = enough VN signatures for the instruction , and can be easily validated by a wallet
1:08 PM <Hansie> So verification = enough VN signatures for the instruction , and can be easily validated by a wallet?
1:09 PM <neonknight> Yes
1:10 PM <simian_za>  so the wallet will poke single VNs until it gets a copy of the instruction with threshold signatures? Or it will wait for the first VN who gets a copy of the instruction with the threshold of signatures to send the result to the wallet?
1:17 PM <neonknight> I don't think VNs should send anything unless it is request of them. You could ask a VN to send you the verification messages as soon as it has enough signatures, but it is different from submitting an instruction. Every VN in a committee doesn't have a P2P channel open with the wallet, it could only be one.
2:12 PM <Blackwolfsa> From a user experience stand point, I think VNs should push back. Once when it accepts, second when threshold is reached.
```
