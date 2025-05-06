---
layout: post
title: Proof of Work for the Tari Chain
date: 2019-10-14 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-47.png
lead: Proof of work for the tari chain
class: subpage
topics:
- How to prevent 51% attacks on a new chain
- How merge mining prevents 51% attacks on new chains
---

On Monday, the Tari community discussed proof of work strategies.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion
```
18:02 <@CjS77> Hi everybody
18:03 <simian_za> Heya
18:03 <neonknight64> Hi
18:04 <Blackwolfsa> Hi
18:05 <stanimal6> Hey
18:06 <@CjS77> I know we're having a discussion around PoW next monday, but it won't hurt to get some context out of the way now
18:06 <@CjS77> So tl;dr, Tari's original plan was to go 100% merge mined with Monero
18:07 <@CjS77> However, that strategy has some significant risks, particularly wrt 51% attacks.
18:09 <Blackwolfsa> How does monero's pool devision look these days
18:09 <@CjS77> Essentially, if you don't have the majority of the network "on your side"; you can be 51% attacked by the remainder of the Monero hashrate.. _with very little opportunity cost_ (because normally, a 51% attack means a miner is giving up mining rewards by not co-operating; in this case he's still getting his Monero, and is only potentially losing out
18:09 <@CjS77>  on Tari)
18:09 <@CjS77> I don't know -- neonknight64 might have some numbers
18:10 <Hansie> Hi
18:10 <@CjS77> hey Hansie
18:10 <neonknight64> https://minexmr.com/pools.html
18:11 <@CjS77> Hansie did some nice work on 51% attacks here: https://tlu.tarilabs.com/merged-mining/merged-mining-scene/MergedMiningIntroduction.html#51-attacks
18:11 <simian_za> Wow that is actually a better distribution than the last time we looked at the Monero hashrate
18:12 <neonknight64> Jip, the distribution of hashrate looks good.
18:13 <simian_za> but either way if we don't get the buy in of the majority of those pools we will be vulnerable and that will be quite a task
18:14 <@CjS77> It'll be very interesting to see what happens when RandomX goes live
18:14 <Hansie> Did some digging into Myriad, which was reported on in the TLU report mentioned
18:15 <Hansie> Myriad has 3 PoW and 2 merged mined PoW algos
18:16 <Hansie> Seems to be very 51% resistant
18:16 <Blackwolfsa> We need to simulate that
18:17 <Hansie> https://yac.metalworks.tarilabs.com/uploads/c46de3c2d4837f3a/BlockExplorers.ods
18:17 <Hansie> https://yac.metalworks.tarilabs.com/uploads/e301f69d2ec27e60/BlockExplorers.xlsm
18:17 <simian_za> Myriad seems very interesting but the variance in blocktime is pretty extreme
18:17 <Hansie> Depends on the value system I guess
18:17 <Blackwolfsa> From the newest data their variance is, I agree
18:18 <Hansie> Myriad PoW was designed to be 51% attack resistant, not necessarily with smooth block times
18:19 <Hansie> The spreadsheet shows history of a thousand blocks
18:20 <@CjS77> How does their algo work?
18:20 <Hansie> Each of the 5 algos has equal probability to solve the PoW
18:20 <Hansie> Difficulty adjusted to 5 min for each
18:20 <Blackwolfsa> Having block times that almost 50% in the low end opens you up toe other attacks 
18:20 <Hansie> Target block rate at 1 min
18:21 <Hansie> Any algo can build on top of the longest chain, even consecutively
18:21 <Blackwolfsa> We need to simulate it too see if it's more stable if it's more active 
18:22 <@CjS77> Ok, so the consensus rules just accept any PoW at the requisite difficulty
18:22 <Hansie> So with the 5 algos, any 1 pool can only achieve 20% of the efficient hash rate
18:22 <Hansie> Yes cjs77
18:22 <Hansie> https://cryptapus.org/myr/myrstat/
18:23 <Hansie> See above for share of algos that solved the PoW
18:23 <Hansie> Yes blackwolfsa, agreed
18:24 <Hansie> We can do some studies
18:24 <simian_za> I look forward to a parametrised sim of this approach. I suspect that it can be tuned to be far better than that data shows
18:25 <tar1b0t_> [mattermost] <stringhandler> We need to investigate how it is affected by selfish mining
18:25 <simian_za> indeed, I suspect it will be fine but the sim should be able to show the effect of that
18:26 <@CjS77> So if we went for 1x merge-mined and 1x PoW (where the PoW is not necessarily ASIC resistant but is unique -- i.e. not currently available on hashnice), would could have good 51% attack resistance too? One doesn't need to have 5x algos I'd say
18:26 <@CjS77> *nicehash*
18:27 <Hansie> So quoted from the web: "Myriadcoin has 5 algorithms (SHA256d, Scrypt, Skein, Qubit, and Myriad-Groestl) that can independently solve blocks. They have independent difficulties that are adjusted using the same formula. Any algorithm can solve the next block even if it is the same algorithm. Each algorithm targets the same block time and the block r
18:27 <Hansie> ewards are the same no matter which algorithm solves the block. From Multi-vPoW: Myriadcoin's Solution to Merge-Mining https://99bitcoins.com/myriadcoin-merge-mining/"
18:27 <Hansie> cjs77, I think more than 2 is better
18:28 <Blackwolfsa> But I suspect their will be a thing as too much as well
18:30 <Hansie> Yes, one has to be practical
18:30 <sarang> Jumping in after lurking... has anyone followed the earlier Zcash discussion where they were also investigating the use of multiple mining algorithms?
18:30 <@CjS77> Hansie, my gut says that 1x merge mined and 2x PoW is worse than 1-1.
18:30 <sarang> They called it "harmony mining" (because why not have a classy name too)
18:30 <@CjS77> If you go for 3, you should have 2x MM and 1x PoW
18:31 <@CjS77> Hey sarang
18:31 <Hansie> cjs77, maybe merged mined with Monero, Bitcoin and then standalone
18:31 <@CjS77> But do you see why I say that?
18:32 <Hansie> Hi sarang, I did not
18:32 <@CjS77> It's a hunch though, and not fully thought through
18:32 <sarang> I _think_ that this is the GitHub thread I am thinking of: https://github.com/zcash/zcash/issues/3672
18:32 <sarang> They concluded the risk of 51% was too great to adopt at the time
18:32 <sarang> It is absolutely worth a read
18:32 <sarang> (Daira had run some simulations as well)
18:32 <@CjS77> Thanks Sarang. I've got to go, but I think we've set up a good platform for next week
18:33 <Hansie> No cjs77, I do not. In essence if you have 1 GPU mining standalone, it has equal probability to solve the PoW to say a pool of Monero miners
18:33 <Hansie> Thanks sarang, will definately look at it
18:35 <@CjS77> If we assume merge miners don't want to leave the parent chain; and the fact that GPU PoW algos are pretty fungible, so you can grab 66% of the hashrate in a 1-2 split. Whereas in a 1-1 split, you have at most 50%.
18:36 <@CjS77> In a 2-1 split, you have at most 33%
18:37 <Blackwolfsa> You just have to whatch that each pow has enough pow to keep it secure... 
18:37 <Hansie> And it works the other way round as well, depending on which pools will do the mining
18:38 <tar1b0t_> [mattermost] <simian> That'd only if the algos are run in sequence if any algo can solve a given block and the difficulty retargeting is applied correctly I don't think those assumptions are strictly correct
18:38 <Blackwolfsa> If a pow has too little one can easily mine a few blocks in a row cheaply... 
18:39 <tar1b0t_> [mattermost] <stringhandler> The difficulty would need to be adjusted every block to stop 6 blocks being mined by the same algo
18:39 <Hansie> See here for dangers of merged mining: https://tlu.tarilabs.com/merged-mining/merged-mining-scene/MergedMiningIntroduction.html#analysis-of-mining-power-centralization-issues
18:40 <tar1b0t_> [mattermost] <stringhandler> You actually want consensus to be achieved only when every algo has a block
18:40 <tar1b0t_> [mattermost] <stringhandler> So perhaps 2 * num algos
18:42 <tar1b0t_> [mattermost] <simian> I think that if you get the difficulty adjustment right you don't need that. However we are speculating, a sim would answer a lot of these questions
18:43 <Hansie> stringhandler I guess it depends on the strategy. Different options definitely worth looking into
18:43 <tar1b0t_> [mattermost] <stringhandler> The thing is that if not all the algos are included then you only need to control 51% of the algos that are
18:43 <Hansie> simian yes, I agree we need to do the simulations
18:44 <tar1b0t_> [mattermost] <simian> But the difficulty of those algorithms will go up
18:44 <tar1b0t_> [mattermost] <stringhandler> Just some ideas to add to the simulations
18:44 <Hansie> stringhandler see Myriads "Algorithm Share" graph - link above. They have very few transactons, but it seems all 5 algos are always represented
18:45 <tar1b0t_> [mattermost] <stringhandler>  The difficulties must go up, but they only provide a probability of finding a block
18:45 <tar1b0t_> [mattermost] <stringhandler> But I'm saying that if you have 7 algos then 6 blocks is not enough for consensus
18:46 <tar1b0t_> [mattermost] <stringhandler> Just my gut feeling though
18:47 <Hansie> Ok, so you are talking about confirmation times. Makes sense
18:47 <Blackwolfsa> I think I follow your reasoning 
18:47 <Blackwolfsa> And I tend to agree
18:48 <Hansie> I have to run, thanks for the chat
19:17 <moneromooo> Would someone not need 50% of the monero network to double spend on tari if it were merged mined ?
19:18 <moneromooo> Oh, because most of the network will not care. OK. You still need the attacker to have more than the part of the monero network which merges mines (though variance is higher) AFAICT.
19:19 <moneromooo> And therefore better than not merge mining, presumably.
19:20 <moneromooo> I'm assuming that if someone tries to double send some tari, the part of the monero network that merge mines will reject it, the part controlled by the attacker will try to mine it, and the remainder of the monero network will ignore it.
19:20 <moneromooo> Is that correct ?
19:25 <tar1b0t_> [mattermost] <stringhandler> I think the remainder of the network will mine non Tari blocks, but there could be a problem where a large percentage of the miners mine valid monero blocks but alternate between 2 chains of Tari in each block
19:25 <tar1b0t_> [mattermost] <stringhandler> Kind of hedging
19:26 <tar1b0t_> [mattermost] <stringhandler> The same problem that PoS has. Then only the miners that choose a particular chain are contributing to the hash rate
19:26 <tar1b0t_> [mattermost] <stringhandler> Not 100% sure though
19:27 <moneromooo> You mean... if the "neutral" miners could be paid off by the attacker to mine the double spending tx ?
19:27 <moneromooo> Effectively becoming the attacker.
19:29 <tar1b0t_> [mattermost] <stringhandler> Thinking about it, I dont think my scenario makes financial sense
19:29 <tar1b0t_> [mattermost] <stringhandler> Think we need cjs77 to elaborate a bit
19:31 <tar1b0t_> [mattermost] <stringhandler> But there definitely is a case where an attacker can delay or confuse the Tari chain while still earning monero
06:51 <Hansie> If Tari is merged mined with Monero, and only one pool is interested, Tari will be at the mercy of that pool. The hash power distribution that Monero has will not be a given for Tari.
08:00 <tar1b0t_> [mattermost] <the_square> Hmm is it easy to merge mine multiple chains at the same time?
08:02 <tar1b0t_> [mattermost] <the_square> Oh I guess it would be trivially easily
08:25 <@CjS77> Not trivially easy, there's work that goes into it; and every merge mined coin needs pools to buy into it
08:26 <@CjS77> i.e. Monero pool operators have to change their pool software to merge mine Tari
08:26 <@CjS77> same for Bitcoin, if we choose that
```
