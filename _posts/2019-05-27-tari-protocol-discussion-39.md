---
layout: post
title: Tari Protocol Discussion 39
date: 2019-05-27 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-39.png
lead: Tari Digital Assets Network
class: subpage
---

On Monday, the Tari community discussed the Tari Digital Assets Network. Below is the TL;DR on Monday's conversation (full transcript included below, only edited for spelling):

* Comprises exist between speed and decentralisation
* Should try and minimize communication
* Dag's seem promising

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion
```
Today's dev chat should be pretty interesting
18:02 <@CjS77>  For those not familiar with the idea, the Tari Digital Assets Network is our proposed smart contracts platform as described here: https://rfc.tari.com/RFC-0300_DAN.html
18:04 <@CjS77>  We've chatted at length about Validator nodes and committees, but we've never discussed how these VN committees reach consensus on the state of the contracts they're managing
18:04 <@CjS77>  I think it's a good time to open up this topic to discussion
18:06 <@CjS77>  To summarise, VN committees are
18:06 <@CjS77>  * A set of servers entrusted by an Asset Issuer (AI) to manage the state and handle state transitions for the AI's digital asset(s).
18:06 <@CjS77>  * Ultimately selected by the AI, but _could have been_ self-nominated
18:07 <@CjS77>  * Potentially adversarial (One doesn't need permission to operate a VN and nominate it for Asset Committees)
18:08 <Hansie>  How big would the committees typically be? I guess that could influence the consensus mechanism.
18:08 <@CjS77>  So therefore, if an AI wanted to run a decentralised digital asset; operated by nodes that it doesn't know or control, then there needs to be a solid consensus and incentive system to maintain the integrity of the DAN
18:10 <@CjS77>  Hansie: The AI will have a say, but I'd imagine most committees would be 1-5 large. But I envisage a long tail with some DAs desiring high censorship resistance requesting around 100 nodes
18:10 <simian_za>  So a users wallet will issue instructions to a single VN in the committee or all of them?
18:11 <Hansie>  Yes, there is the communication angle as well.
18:12 <@CjS77>  IRC  RFC-0172 covers that
18:13  * simian_za reminds himself
18:14 <Blackwolfsa>  But 100 nodes would take long to reach consensus 
18:14  * @CjS77 A quick scan of 172 suggests it hasn't been explicitly stated there
18:14 <Hansie>  I think we can assume the way wallets will communicate with committees will be independent of the consensus mechanism they employ
18:15 <@CjS77>  ^ Yes.
18:15 <Hansie>  So what are the driving forces to pick a consensus mechanism? Could there be a choice?
18:15 <@CjS77>  Yes, there's a definite trade-off between speed and decentralisation Blackwolfsa
18:16 <simian_za>  Hansie: I don't think that is strictly true, consensus protocols often deal with how instructions are distributed/passed around the committee?
18:17 <@CjS77>  Hansie: Off the top of my head, I'd say that we need something with good liveness properties (i.e. is fast), while being resistant to indeterminate errors (i.e. BFT)
18:18 <neonknight642>  The choice of consensus mechanism also affects the amount of communication required, which should be minimized
18:19 <simian_za>  so the goal is to minimize the amount of data passed around and how many rounds it takes to reach consensus which is proportional to latency?
18:19 <Blackwolfsa>  Bft should reduce traffic, but majority should make consensus easier
18:19 <@CjS77>  Which is a different issue to how the initial instruction is presented to the network
18:20 <Hansie>  simian_za: Maybe we can separate delivering wallet instructions/requests from the consensus itself, i.e. assume all/enough VNs know what to do next.
18:21 <@CjS77>  Bandwidth minimisation is a secondary goal imho. Priority is safety and liveness. (Although I suspect high liveness will favour lower bandwidth consumption anyway)
18:21 <simian_za>  Sure, though if the wallet sends the instruction to all VNs simultaneously then there is an element of the consensus algorithm taken care of: All VNs receive an uncorrupted instruction
18:21 <neonknight642>  I don't think a wallet should trust a single VN, but should select a subset of the committee
18:22 <@CjS77>  Though I could send an invalid instruction :)
18:22 <@CjS77>  "Send all teh stuffs to me"
18:23 <@CjS77>  neonknight642: Doesn't the message get sent to any Node first?
18:23 <simian_za>  if one VN would reject that then all of them would. Isn't the consensus algorithm more about how the VNs distribute the instruction they are voting on AND their and any other VNs votes they have collected during the negotiation?
18:24 <Hansie>  One consensus model is for a VN to process instructions as fast as possible and to then communicate their decision/vote to all other committee members. When enough VNs have signed an instruction it becomes valid.
18:25 <neonknight642>  only if the wallet hasn't previously performed the discovery of the committee members, otherwise the wallet can establish direct P2P with them
18:26 <@CjS77>  What you didn't know, simian_za is that the VN is colluding with me and signs it as a valid instruction. So it's up to the other nodes to reach agreement that we're up to shananigans
18:26 <Hansie>  I do not think it would hurt if a wallet knows who all the committee members are and to then send the same instruction to all of them.
18:27 <simian_za>  Man I love me some shenanigans!
18:28 <@CjS77>  Not to get too off-track here, but may I suggest that a PoW blockchain is UNSUITABLE for this task?
18:28 <Blackwolfsa>  Agreed
18:29 <simian_za>  agreed, so what is the main issue? The VNs telling the rest of the committee what their vote is?
18:30 <Hansie>  Something like that, and to get others to agree
18:30 <@CjS77>  Also, tyo decide on the ORDER of competing, incompatible instructions
18:30 <@CjS77>  (these might not even be malicious)
18:30 <simian_za>  ahhh, that's a tricky addition
18:31 <@CjS77>  e.g. If Instruction 1 -> 2 -> 3 is valid, but 2 -> 1 -> 3 would be invalid for some reason
18:32 <Hansie>  We have the checkpoints as well, that can act as some sort of forced syncing of the asset state. Where all validated (i.e. with enough votes) instructions can be confirmed.
18:33 <Hansie>   A little bit of chaos could maybe be allowed between checkpoints.
18:34 <Blackwolfsa>  If the order of 2-1-3 is important, two should point to some order 1 which the vn should see as missing or orphaned
18:35 <@CjS77>  Well, that's the nub of the consensus problem. Everyone needs to agree on the same order
18:35 <neonknight642>  The consensus protocol should also handle cases where a bad VN signs two or more competing instructions and distribute them to different subsets of the committee.
18:36 <@CjS77>  Yup
18:36 <@CjS77>  Only a BFT algo can deal with that (AFAIK)
18:37 <Hansie>  Yes, the instructions (or sequence of instructions) with the BFT threshold votes must win.
18:37 <@CjS77>  Bear in mind that order isn't ALWAYS important. e.g. if 1 -> 2 -> 3 and 2-> 1 -> 3 lead to the same state, we should just let that go
18:38 <Hansie>  Yup
18:38 <@CjS77>  So this leads me to think that a DAG-like structure might be what we're after
18:39 <Hansie>  There, you said it, the magic word
18:40 <Hansie>  Do we know of DAG implementations that are in production?
18:41 <simian_za>  If memory serves the ones described in TLU are described as handling blocks of transactions, do they also work well for single instructions?
18:42 <@CjS77>  Isn't a single tx just a special case of a block?
18:44 <simian_za>  I guess so, let me rephrase: How do they scale in the case of a single TX per block?
18:46 <simian_za>  in terms of how many rounds of comms are required between N nodes for each instruction for all the nodes to end up with the same DAG?
18:46 <Hansie>  Maybe we should consider removing the block layer, just DAG-stitch all valid instructions together, and wait for pending (not yet valid) instructions to mature.
18:47 <@CjS77>  mature = reach consensus?
18:47 <Hansie>  Yup
18:48 <@CjS77>  Yeah -- I mean we _could|_ have "blocks" -- more like small batches of instructions. Esp if tx's are flying in thick and fast (e.g. in a hypothetical future where Big Neon is selling out a Beyonce concert)
18:49 <@CjS77>  But otherwise I agree
18:49 <Hansie>  The batches makes sense yes
18:50 <@CjS77>  And consensus will typically be reached within a few ms. -- depending on the the number of rounds and messages, which is the issue simian_za has been trying to raise :)
18:50 <@CjS77>  For comparison, PBFT has O(n^4) messages
18:50 <@CjS77>  where n is the size of the committee
18:51 <@CjS77>  but linBFT makes some adjustments and reduces that to O(n)
18:52 <@CjS77>  https://arxiv.org/abs/1807.01829
18:52 <simian_za>  Ja, its feels to me that the main metric for evaluating how efficient a given consensus algorithm is when running at the ragged edge (i.e. instructions are validated as quickly as they arrive) is how many rounds of comms there need to be.
18:52 <simian_za>  that sounds promising
18:52 <Hansie>  Agreed
18:53 <@CjS77>  I suspect that any robust system will have at least 3 rounds (ala a Sigma protocol). Anything less than that and my hunch is that there's an attack of some sort lurking. This is just an opinion and isn't backed up by any evidence
18:55 <@CjS77>  linBFT tl;dr:
18:55 <@CjS77>  There's a leader for the round, who submits a hash of the new state to all peers (n messages)
18:55 <Hansie>  On the earlier topic, because we can do not have 'block' to be mined will and 'batch' the instructions, a batch of valid (consented) instructions could be ordered in some special deterministic way to represent a block. So that all VNs can arrive at the same answer.
18:55 <@CjS77>  Nodes, confirms receipt of the hash (n messages)
18:56 <Hansie>  CjS77: Agreed
18:56 <@CjS77>  The leader collects 67% confirmations and again sends out a message to all nodes saying "y'all can commit to this" along with a n-of-m signature proving as much
18:57 <@CjS77>  The nodes reply with "sweet, updated".
18:57 <@CjS77>  The leader responds with "67% have updated, you can finalise", along with a threshold signature
18:57 <@CjS77>  So it's a lot of messages, but O(n)
18:58 <@CjS77>  If there are problems, there are a different set of messages (I just described the happy path)
18:58 <simian_za>  It sounds so easy going, I like it
18:58 <@CjS77>  And there's another optimisation that can reduce things to O(log n) messages that I won't get into
18:59 <neonknight642>  If there is a problem, the wallet can always resubmit the instruction to a different VN in the committee
18:59 <simian_za>  What happens when the leader doesn't perform? A timeout?
18:59 <@CjS77>  Yeah, another leader gets elected after a timeout
18:59 <@CjS77>  But the election is straightforward and takes n messages again
19:01 <@CjS77>  The algorithm is evocatively named "Hot Stuff, the BFT devil"
19:01 <simian_za>  How often does the leader change?
19:01 <@CjS77>  And on that bombshell, it's time to go
19:01 <simian_za>  Should probably just read the paper :)
19:01 <Hansie>  Greatness
19:01 <simian_za>  g'night
19:02 <@CjS77>  simian_za: I'm thinking that the first VN that gets an instruction from "outside" can just take leadership for that instruction.
19:03 <@CjS77>  So leaders potentially change with every instruction
19:03 <simian_za>  then there is just an issue with ordering if two VNs get different instructions at the same time. Does the election process break a tie like that?
19:04 <Hansie>  My thinking as well. Multiple VNs can receive the same instruction almost simultaneously.
19:04 <@CjS77>  We'll have to think that through, because linBFT just describes the algo and doesn't try and use it in a DAG context
19:05 <@CjS77>  Indeex the race condition scenario must be handled without any snags
19:06 <@CjS77>  I suspect, when the hash is sent round, nodes will start to say "I've already seen this one" and not send the receipt
19:06 <@CjS77>  But we must work through the logic very carefully
19:06 <@CjS77>  Perhaps in our next meeting :)
19:07 <simian_za>  Awesome, the leader based method does seem like the way forward to me
19:07 <@CjS77>  My initial aversion to LB methods is abating somewhat; but only because there's a very elegant way to pick a new leader very quickly
19:08 <Blackwolfsa>  But what do we do if you keep attacking the leader? 
19:09 <simian_za>  indeed, the leader needs to be very transient but a mediator simplifies many parts of the protocol
19:10 <Hansie>  What about leaderless BFT protocols?
19:10 <Hansie>  "The protocols differ from the traditional consensus protocols and the Nakamoto consensus protocols by not requiring an elected leader. Instead, the protocol simply guides all the nodes to consensus."
19:11 <@CjS77>  > if you keep attacking the leader?
19:11 <@CjS77>  Implies you're attacking the entire VN
19:11 <@CjS77>  committee
19:12 <@CjS77>  Assuming it takes time to a) Find out the Ip of the new leader and b) switch DDOS resources onto that machine
19:13 <@CjS77>  ^^ I don't know of those assumptions are valid or not. Network experts can advise. fluffypony?
19:13 <@CjS77>  Hansie: Leaderless BFT would be better, but all the ones I've read about are MUCH more complicated
19:14 <@CjS77>  and complexity is the enemy of good (or whatever) )
19:14 <Hansie>  True
19:15 <@CjS77>  lol. My typing. Blackwolfsa -- maybe you should run this transcript through a spell checker before posting as a blog :)
19:16 <Blackwolfsa>  Will do, my vscode has one, will fix spelling 
19:18 <@CjS77>  Here's a reference for HotStuff: https://ui.adsabs.harvard.edu/abs/2018arXiv180305069Y/abstract
19:19 <@CjS77>  Here's a better one: https://arxiv.org/abs/1803.05069
```
