---
layout: post
title: RFC-340 Consensus
date: 2019-07-08 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-41.png
lead: RFC-340 consensus
class: subpage
topics:
    - HotStuff looks promising for the DAN's BFT
    - DAG is not required as there cannot be conflicting states
---

On Monday, the Tari community discussed RFC-340. Below is the TL;DR on Monday's conversation (full transcript included below):

- HotStuff looks promising for the DAN's BFT.
- DAG is not required as there cannot be conflicting states

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion

```
17:56 <@CjS77>  I propose we discuss the proposal ni https://github.com/tari-project/tari/pull/475 tonight
RFC-340 VN Consensus overview by CjS77 · Pull Request #475 · tari-project/tari
Description Provide an overview for a proposal for smart contract consensus in Tari. This PR also removes some RFC stubs that are either no longer relevant or cannot be defined at this time. Types...
18:00 <simian_za>  sounds good
18:04 <Blackwolfsa>  It looks good
18:04 <@CjS77>  Let's take some time to read thru it if you haven't already and then ask Q's / make comments / suggestions
18:04 <Hansie>  Cool
18:07 <Hansie>  Looks good. Some questions...
18:07 <Hansie>  How is `super-majority of these messages` determined?
18:07 <Hansie>  ... as `proposal for the next state`
18:14 <simian_za>  I am guessing that the number of members of the committee is known before hand
18:14 <@CjS77>  All the details are in the HotStuff paper, basically when we move to a view _v_, replicas send a `NewView` msg to the leader waits for that view. The leader waits for at least (n - f) NewView messages before proceeding with its proposal. where f is  (n-1)/3
18:14 <Blackwolfsa>  Members should know who are in the commitee at a time
18:14 <@CjS77>  n is known and fixed
18:15 <simian_za>  You mention in the report that a fork can only be a mximum of 3 views deep, is this another implementation detailof HotStuff?
18:16 <@CjS77>  Beyond 3 views, the state has been finalised; so as long as we have 2/3 honest nodes, they'll never try to branch off a finalised state and produce incompatible states (i.e. a fork)
18:17 <simian_za>  oh is that because of the three phases of the view pipeline?
18:17 <@CjS77>  yes
18:17 <simian_za>  I see
18:17 <@CjS77>  Yeah, it's quite slick
18:17 <Blackwolfsa>  Only problem there I acn see is with branching...
18:17 <Blackwolfsa>  But that should be minor
18:18 <@CjS77>  Branching?
18:18 <Hansie>  Seems to me `super-majority of these messages` will be the collection of instructions for a next block, am I right?
18:19 <Blackwolfsa>  What Cpus do with if statements
18:19 <Blackwolfsa>  Eg it makes an assumption on a future state based on the current state
18:20 <@CjS77>  We require that Every replica must deterministically get the same state when running the same input over  the same smart contract. Therefore they'll all select the same branches on conditionals, surely
18:20 <Blackwolfsa>  Yes but of we try to run the states in a pipeline
18:21 <Blackwolfsa>  If it's run single staged, it should never give issues
18:21 <@CjS77>  @hansie there are several places where a super-majority of votes are required.
18:22 <Hansie>  Ok, so practically, will a bunch of instructions be collected as a proposal for a new state?
18:22 <neonknight64>  I like the idea of running parallel leaders for different instructions as mentioned in the rfc.
18:23 <@CjS77>  In the pipeline, there could be temporary forks with competing states, yes; but the HotstuffBFT algo guarantees that this will be resolved. So VN's might have to temp run multiple copies of the contract until one of them gets selected as the "truth"
18:24 <@CjS77>  @hansie, yes, each proposal consists of: We had state at view n, I ran these k instructions, rejected these r instructions and achieved state n+1. Do the rest of you agree?
18:25 <@CjS77>  Then the replicas check this and vote Yes or No.
18:25 <simian_za>  neonknight64: I don't think there was mention of parallel leaders? There is only one leader per view?
18:26 <@CjS77>  Yes, one leader per view
18:26 <Hansie>  cjs77: Great, that makes sense yes. So the `super-majority of these messages` for a new state change can be tweaked for throughput.
18:27 <simian_za>  The signature aggregation that is discussed is it done to produce a single aggregate signature or is it essentially a concatenated list of partial sigs?
18:27 <@CjS77>  That's up to us
18:28 <@CjS77>  We need a k-of-n signature scheme
18:29 <@CjS77>  If that can be done without an array of sigs, it makes communication much more efficient. LinBFT uses BLS threshold sigs, for example
18:29 <neonknight64>  Sorry, I misinterpreted the "possible to stagger and layer these rounds on top of each other, so that there are always four voting rounds
18:29 <neonknight64>  happening simultaneously"
18:30 <@CjS77>  yes, at different stages
18:30 <simian_za>  Think you can get away without a full array of sigs but you will need a list of which members signed to produce a given sig but that could be a list of member indices or something much smaller than sigs
18:31 <Hansie>  Yip, the signature scheme must be as efficient as possible while still being secure
18:31 <@CjS77>  Agreed. HotStuff leaves that implementation detail out
18:31 <Blackwolfsa>  Personally I think we should keep the multiple stages as a later rivision and not 1st release
18:34 <Hansie>  Just to be clear, no DAGs anymore?
18:34 <@CjS77>  I recommend everyone go and read the HotStuff paper. You get the gist on the first reading; I'm still synthesising some of the nuances myself; but it resonates on an intuitive level
18:35 <tar1b0t>  [mattermost] <stringhandler> Tried to find an ELI5 of it
18:35 <@CjS77>  I spent a lot of time on my vacation thinking about DAGs, and I cam to the conclusion that this achieves almost the same degree of performance and throughput while being way simpler
18:36 <Blackwolfsa>  Agreed...
18:36 <neonknight64>  A great property of using the XOR Metric(Not Hamming Distance) for distance is that you can never have duplicate distances except if they have the same Node ID
18:36 <Blackwolfsa>  Dag might have a get a simple mayorrity and not bft and still be secure. But this has alot less messages and is much simpler
18:36 <Hansie>  cjs77: Seems like a reasonable conclusion yes
18:36 <stanimal>  "the leader expects a set of `NewView` messages from the other replicas" - will read the paper but what is the purpose of the NewView message? Could there be a disagreement in leader election?
18:37 <@CjS77>  The problem I always came up against with DAG was how to effectively re-order things when branches were being joined;
18:37 <@CjS77>  No, the leader is chosen deterministically, but the leader must wait until 67% are ready for her
18:38 <Hansie>  DAG: With HotStuff correct ordering is guaranteed after forks
18:38 <stanimal>  Ah so a kind of stage synchronisation
18:41 <@CjS77>  I need to run, but great chat guys!
18:42 <Hansie>  Thank you for the effort!

```
