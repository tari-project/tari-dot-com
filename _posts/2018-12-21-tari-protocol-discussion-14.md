---
layout: post
title: Tari Protocol Discussion 14
date: 2018-12-21 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-14.png
lead: Block sizes, block intervals, and network propagation speed.
class: subpage
---

Monday’s architecture discussion was a debate on the optimal block size and block time for Tari’s base layer to support its second layer ‘digital assets network’. The key questions up for debate included:

* What is the minimum viable block interval for Tari’s base layer?
* How might block propagation time constrain the possible range of block intervals?
* How should the Tari protocol balance the speed requirements of the second layer ‘digital assets network’ with block orphan rates?
* Should the base layer have a ‘transactions per second’ upper limit?

The full discussion introduced many possible block implementations including a proposal for a testnet experiment to ascertain the optimal block interval & size. After the architecture discussion, this [Medium article](https://medium.facilelogin.com/the-mystery-behind-block-time-63351e35603a?gi=a4ffa0c4fa20) and this [Bitcoin data](https://drive.google.com/file/d/12zNSpyoaA5avTiTVngK6wSEmtB3eA2Kt/view) was presented on Freenode to help the Tari community understand the fundamentals of block times and network latency.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
1:04 PM <@cjs77> fluffypony: Does the dynamic blocksize work well in Monero? How often has it been tested (i.e. have there been sustained periods of full blocks?)
1:07 PM <@cjs77> Clearly the **correct** way to have this debate is to haggle over it for 2 years; get some suits to pick a side, then have a user uprising to force the status quo; and then hard fork away to TariFV (Fluffy’s vision). But we don’t have that much time, so hopefully we can come to broad consensus in a few days ;)
1:09 PM <simian_za> Optimistic, if it could be done that way surely someone would have tried it already?
1:10 PM <moneromooo> There was an attack which required such a sustained high traffic period. The increase worked. That was before a lot of the recent related changes though.
1:10 PM <moneromooo> The best way to test it is to run testnet locally with a couple daemons, and spam away.
1:10 PM <@cjs77> And can you share why Monero switched to 2min block intervals from 1min?
1:11 PM <moneromooo> And maybe mine with 45% of the hash keeping empty blocks, and 55% mining default rules blocks.
1:11 PM <moneromooo> s/maybe/probably/
1:12 PM <moneromooo> The block target thing was to decrease orphan rate, and also size to some extent.
1:12 PM <moneromooo> Maybe other reasons, pony might know/remember.
1:13 PM <mikethetike> the limiting factors on minimizing the block interval in my mind are: 1. The time to broadcast across the entire network. 2. The number of transactions bundled together for privacy
1:14 PM <mikethetike> too low a block time and there will be higher possiblity of chain splits
1:14 PM <mikethetike> but also, there will be sparse blocks
1:15 PM <mikethetike> not sure if that is as big a problem for mw as it is for ring sigs
1:17 PM <mikethetike> but I’m no monero expert, so disregard if I’m talking rubbish
1:18 PM <@cjs77> I think ideally we’d want 1min blocks (or quicker) to support the 2nd layer (digital assets network); there have been huge strides in BTC to improve network propagation times. IIRC BlueMatt saying on some podcast that FIBRE has brought this down to a few seconds
1:19 PM <simian_za> Is there a rust implementation of FIBRE?
1:19 PM <@cjs77> ha ha
1:19 PM <@cjs77> I’m sure it’s next on Matt’s list after Lightning-Rust :>
1:20 PM <Hansie> Cayle: Please explain 1 minute reasoning, say vs. 2 minutes.
1:21 PM <mikethetike> What are our options given that we are merge mined with monero?
1:21 PM <mikethetike> can it be larger than monero’s 2 mins?
1:21 PM <simian_za> It should be fairly simple to model a block size vs mean propagation time that determine the rates of oprhan blocks and forks caused by the longer latencies
1:21 PM <Hansie> Can be smaller, equal or larger
1:21 PM <@cjs77> woah.. http://bitcoinfibre.org/stats_ng.html shows 95% of nodes seeing a block in 25ms
1:22 PM <simian_za> Are we linked to moneros block time? We are just using their proof of work
1:22 PM <simian_za> We set our difficulty
1:22 PM <Hansie> Block time can be smaller, equal or larger
1:22 PM <Hansie> It is totally independent to being merged mined
1:24 PM <simian_za> What is the typical traffic on the fibre network to sync mempools?
1:24 PM <@cjs77> hansie: Users of the DAN will be used to things being fast. When the base layer gets involved (e.g. node registration), things slow down considerably. I’m thinking that the difference between a few confirmations at 1min blocks vs 2min blocks will feel like eternity
1:24 PM <@cjs77> node = Validator Node
1:27 PM <@cjs77> Actually I must be reading that graph wrong. It takes ±100ms for light to travel halfway around the world
1:28 PM <simian_za> Typical sustained pings to the US are around 200–400ms
1:28 PM <Hansie> Cayle: Ok so specific use cases of 2nd layer transactions touching the base layer will be on the value system to determine block times. Along with other practical aspects and possible attack vectors.
1:29 PM <mikethetike> trying to catch us out hey @cjs77
1:31 PM <mikethetike> “the time-to-receive a block can be seen as the time taken in excess of the speed of light through fiber”
1:33 PM <@cjs77> ah.. thanks. so 200–350ms ..that’s ridiculously quick. BTC could have 10s blocks with that kind of efficiency :)
1:36 PM <@cjs77> Hansie: yes, I think as fast as we can without orphan rate getting out of hand.
1:37 PM <@cjs77> I’d argue that other things being equal, 1min 500kB blocks > 2min 1MB blocks
1:37 PM <@cjs77> wdyt?
1:38 PM <Hansie> What about an upper limit to the tps?
1:38 PM <simian_za> typical transaction size will be around 1.5kb?
1:38 PM <Hansie> Then block size is dynamic
1:39 PM <@cjs77> “dynamic”, in that it’s not strictly limited. Grin’s weight system is pretty good
1:39 PM <@cjs77> It caps blocks to 1.3–1.5MB depending on what the txs look like
1:40 PM <@cjs77> Monero is dynamic in that the blocks can grow with demand.
1:41 PM <@cjs77> simian_za, how does Beam size their blocks?
1:41 PM <neonknight> At 1.5kb for a typical transaction, it will result in only 5.55 transactions per second.
1:41 PM <simian_za> 500kb 1-minute blocks is still about 7.2 gb a day. What is acceptable on that front?
1:41 PM <Hansie> I think an upper limit to tps, say 100 tps, would be a good upper limit to calculate maximum block size.
1:42 PM <@cjs77> I think you’ll come up with a pretty big number, Hansie
1:42 PM <mikethetike> we have a second layer that increases tps
1:42 PM <Hansie> But it is demand driven, not fixed
1:43 PM <simian_za> sorry am I off by one order of magnitude? its actually 720 meg a day…
1:43 PM <mikethetike> simian_za: only archival nodes will have that size
1:43 PM <Hansie> Just allows higher base layer throughput when needed, without scaling on the base layer
1:46 PM <@cjs77> You can target X tps, but the reality is that we’re limited by network speeds and the efficiency of our implementation. The only real way to check, imho, is to pick a block interval, then start with huge blocks on testnet and then scale back until the orphan rate drops to an acceptable level (±0%)
1:46 PM <Hansie> That would give us a sweet spot yes
1:50 PM <@cjs77> tryna think.. would difficulty & hash rate impact orphan rate? Only if diff is really low, or hashrate is pushing blocks well outside the target interval right?
1:53 PM <Hansie> I think orphan rate could be minimized with efficient communication/propagation, more than anything else. Dynamic difficulty will equalize with hash rate
2:03 PM <@cjs77> This conversation has made me realise something. BTC needs a huge block INTERVAL war, not a block size one :)
2:04 PM <Hansie> :-)
```
