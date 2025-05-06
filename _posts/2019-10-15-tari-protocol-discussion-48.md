---
layout: post
title: Proof of Work for the Tari Chain
date: 2019-10-21 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-48.png
lead: Proof of work for the tari chain
class: subpage
topics:
- What should Tari's POW algorithm be?
- What will Tari have to do when Monero changes their POW algo?
---

On Monday, the Tari community discussed proof of work strategies.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion
```
18:04 <Hansie> Hi there
18:04 <@CjS77> Hi everyone
18:05 <@CjS77> Let's wait a few more minutes for folks to check in
18:05 <Hansie> Cool
18:06 <@CjS77> The transcript of our previous discussion is here for anyone who needs to catch up: https://www.tari.com/2019/10/14/tari-protocol-discussion-47.html
18:11 <@CjS77> All right, let's begin.
18:12 <@CjS77> I think there's broad community support for a hybrid mining strategy.
18:13 <Hansie> Agreed
18:14 <@CjS77> What the specifics of the strategy are, are still TBD. I think a little bit of modelling on what the costs for attacking different strategies would look like are a good idea
18:15 <Hansie> What options for strategies are there
18:15 <Hansie> ?
18:15 <@CjS77> It'll certainly please the folks who are constantly asking whether it'll be possible to mine "Tari only"
18:16 <Hansie> True
18:16 <@CjS77> ITO strategies, I think it just coes down to picking n merge-mined algos, and m standalone algos.
18:17 <@CjS77> My hunch says n=2, m=1 is best.; but we may not have time to convince another non-Monero currency to adopt Tari merge mining
18:18 <Hansie> There is also whether difficulties are adjusted independently, or alternating algos get a chance, foced blocks, etc.
18:19 <@CjS77> Yup.
18:21 <Hansie> Also targeted block time
18:22 <tar1b0t_> [mattermost] <stringhandler> Will wallets have to download n extra blockchains to verify?
18:22 <Hansie> I guess because we do not have a solution yet, it will be simpler to select the best outcome of all cost, dynamic and security analyses
18:24 <@CjS77> But I think a simple thought experiment might kill alternate blocks in some scenarios (n=0, m>1). In an alternating block scenario, you may as well  stop mining after mining a Block on Algo A and wait for a B block to arrive; otherwise you just waste power. But let's say that it's cheap to flip between algo A and B (because they're all GPU- or CPU-
18:24 <@CjS77> friendly). Then once an A block is found, you direct all your cycles to mining on Algo B. And so on. Each miner just flips the algo they mine on every block. So having 2 algos on alternate blocks is really just the same as having a single algo.
18:25 <Hansie> Yes cjs77, that seems to be the overriding sentiment
18:28 <@CjS77> So Q for the community - is there any point in supporting an Asic-based in "standalone" mode, like Sha256, Scrypt, or Equihash?
18:30 <Blackwolfsa> But having two cpu/gpu bound algo sounds very dangerous, so I think we have to have one cpu/gpu combined with either a merge mine or asic
18:31 <@CjS77> 1x Merge Mined is basically a definite  (XMR)
18:32 <neonknight64> With time, any cpu/gpu PoW algo will end up with an asic implementation.
18:34 <Hansie> How easy/difficult will it be to change one or more mining algos?
18:34 <@CjS77> Hard fork
18:34 <Hansie> So when Monero changes, does a network upgrade, it is a hard fork for Tari?
18:34 <@CjS77> Indeed
18:35 <Hansie> What is the sentiment w.r.t. regular network upgrades/hard forks for Tari?
18:36 <Blackwolfsa> I am not persay against them
18:36 <Blackwolfsa> They acn be useful if we need to change consensus rules
18:36 <@CjS77> It depends
18:37 <@CjS77> Contentious forks are very bad. Luckily in Monero, there haven't been many of them
18:37 <Hansie> So if we do merged mining with say Monero and SHA256d, I guess the stable hash rate will come from SHA256d
18:38 <Hansie> And we would only need to dove tail Monero's mining strategy
18:39 <Blackwolfsa> Ja, hard forks kan have bad consequences.. 
18:46 <Hansie> Looking at some stats for Myriad: SHA->7,540.17 Ph/s   |    Scrypt->85.19 Th/s   |   Yescrypt->2.79 Mh/s
18:46 <Hansie> Could not find the other 2 quickly
18:49 <moneromooo> With a traditional merge mining scheme, you are free to mine the merged mined coin only, right ? Mining the "parent" is optional AFAIK, but I just have this notion from general background, not having looked at it myself.
18:50 <Hansie> Yes, that is how I understand it as well
18:51 <Hansie> Usually the rewards are such that one would want to do both all the time
18:51 <Hansie> Have to go now, buy
19:08 <@CjS77> Unf the hashrates of the Myriad algos are not directly comparable
```
