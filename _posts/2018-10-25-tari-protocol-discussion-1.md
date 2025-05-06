---
layout: post
title: Tari Protocol Discussion 1
date: 2018-10-25 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-1.png
lead: The first of many Tari protocol architecture discussions on Freenode in #tari-dev.
class: subpage
---

Today we hosted the first of many discussions about the architecture for the Tari protocol on Freenode in #tari-dev.

The primary goal was to collaborate with the Tari community to generate high-level architecture ideas for how the Tari protocol could be built.

Join us for our next architecture discussion.

Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**
**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
[11:02:11] <lessless> Hi
[11:03:00] <@fluffypony> hi frenz
[11:04:27] <Krakaw> Hey
[11:05:00] <cjs77> Ok, let's kick things off. To begin with today, we'd like to get some ideas rolling on what the very high-level architecture for Tari will look like. To build out this picture, however, it's probably pertinent to get an idea of what Tari should do as a protocol.
[11:06:15] <cjs77> If we consider that The Tari protocol is all about *native digital assets*. So the architecture should really support the particular requirements of a digital assets platform.
[11:07:01] <@fluffypony> so...Ethereum?
[11:07:02] <@fluffypony> :-P
[11:07:40] <Krakaw> Haha
[11:12:18] <jnsmk> I had in mind from the start that Tari was about issuance of non fungible tokens
[11:16:52] <@fluffypony> well fungible and non-fungible
[11:16:58] <@fluffypony> I don't see why it shouldn't be able to do both
[11:17:17] <@fluffypony> if you can solve for non-fungible then you're effectively solving for fungible, given sufficient privacy
[11:18:27] <jnsmk> That is a fact indeed
[11:18:30] <@cjs77> So what kind of NFTs or digital assets might Tari want to handle; and what would the user expectation for interacting with those be?
[11:18:30] <@cjs77> e.g.: for tickets, there tends to be very high demand on the network when tickets go on-sale (suggesting we need high throughput), but also when tickets get redeemed, the validation and redemption of the ticket needs to happen really quickly (so that queues of people can move quickly)
[11:20:20] <jnsmk> What about card games for example ?
[11:20:29] <@fluffypony> same goes for ICO tokens / security tokens, there's that massive throughput during a token sale
[11:20:50] <@fluffypony> jnsmk: I think they'd have non-fungibility and ease of transfer properties
[11:20:53] <minamoo> in-game items? if Tari will be doing any of that
[11:20:59] <@fluffypony> minamoo: definitely
[11:21:18] <@fluffypony> card games and in-game items have similar properties
[11:21:26] <@fluffypony> I suspect loyalty points and in-game currencies do, too
[11:21:29] <@cjs77> otoh, in-game items might have significant amounts of metadata attached to it (e.g. graphics), and tons of state (item history / experience); so there needs to be some way of effectively managing that state. In this case, I hope it's clear that it would be nuts to expect *every* node to manage *every* digital asset (so... NOT Ethereuem, @fluffypony ;) )
[11:21:43] <@cjs77> Though I know you knew that :-)
[11:21:58] <@fluffypony> cjs77: does that metadata need to be expressed in Tari in any meaningful way?
[11:22:02] <@fluffypony> why can't it just be a hash of some data set?
[11:22:24] <@cjs77> Yeah, I think that's a reasonable approach
[11:22:26] <jnsmk> I don't see the need either, hash can just be a key to locally stored asset amirite ?
[11:22:28] <Blackwolfsa> we just need to prove the state of it
[11:24:16] <@cjs77> but someone still needs to deliver that metadata at some point. If it's a single game server, and the asset issuer is happy with that, then so be it. Other issuers may want some redundancy, but I think the Tari protocol can be agnostic about that in general
[11:24:17] <@fluffypony> Blackwolfsa: you mean the state of individual metadata pieces, or the state overall?
[11:28:04] <neonknight> So the Tari token should rather focus on storing the ownership information and a unique identifier or DNA of the actual media content
[11:29:15] <Blackwolfsa> @fluffypony that bring up an interesting question. Proving state overall should be easy, but state of each individual meta data piece will not be trivial. But what happens when you change one meta data piece, then the whole thing becomes "changed". This might be one of those things that can be a case by case thing depending on the meta data
[11:29:19] <lessless> Is it ok to just agree on a size of the metadata that individual token can hold?
[11:29:37] <jnsmk> Yup I was thinking that, we need to prove ownership and carry some basic informations (in case of IG token would be an UUID for that item for example)
[11:30:05] <jnsmk> +lessless or that indeed
[11:30:12] <@cjs77> Metadata aside, there is still state that needs to be tracked, which is non-negligible. Let's say a concert has 10,000 tickets. At the minimum, someone needs to track who owns each of the 10,000 tickets and redemption state (has it been used).
[11:30:49] <simian_za> and some inherent conditions under which it can be transferred?
[11:31:22] <lessless> proving ownership is a topic of a paramount importance! how to prove that only one person owns an asset?
[11:31:29] <@cjs77> Is it fair to say that it's infeasible to have this state data live on a blockchain?
[11:31:38] <@cjs77> ^ on the base layer, at least
[11:32:09] <minamoo> will every node be required to track that or can there be e.g nodes that issue, nodes that track state, and relay info or will that be convoluted?
[11:32:26] <lessless> cjs77 ownership transfer should be secured as much as possible
[11:32:43] <@cjs77> lessless: If we track the public key of an owner, a simple digital signature by the owner will suffice
[11:33:55] <lessless> cjs77 what about receiving reoccurring dividends - should it be possible to verify ownership automatically, so payments can go through w/o any delay?
[11:34:45] <@cjs77> Can you explain a bit more? I'm not sure I follow your use case. Are you talking about a hypothetical security token?
[11:35:10] <@fluffypony> minamoo: which bit, the metadata or the ownership?
[11:36:40] <@cjs77> minamoo: imho, I think it would be crazy to expect every node to track every state change. It's one of the main issues with ethereum.
[11:37:37] <@fluffypony> what if we had a merkle tree
[11:37:49] <@fluffypony> and each bit of metadata was represented on that tree
[11:37:53] <@fluffypony> and then only the merkle root changes
[11:37:54] <minamoo> fluffypony: I was refering to the ownership aspect as per the example that csj77 gave about tracking ticket states
[11:38:09] <jnsmk> And ETH don't even have "that much" tokens. In case of wide adoption only for concert tickets, with everything happening in only one big city if would be crazy amount to track
[11:38:49] <@cjs77> to be clear though, Tari transfers (Tari being the fungible token of the network) should proceed via usual consensus
[11:38:50] <@fluffypony> minamoo: I think that "state" is often somewhat localised, eg. the only people that care about the redemption state of a ticket are the people at the gate and the people buying tickets in the parking lot, and they can connect to a single server or a cluster of servers
[11:40:53] <jnsmk> @fluffypony in the case of tickets I see the localisation. I see less localisation in the case of an MMORPG somehow
[11:41:23] <@fluffypony> jnsmk: well they're still "localised" wrt to needing to hit a central server / group of servers right?
[11:41:39] <lessless> cjs77 I just think that it should be possible to verify ownership without owner signing anything off
[11:41:53] <jnsmk> That's right
[11:42:37] <lessless> fluffypony what if those are tickets for the online webinar? then auditory can be geographically distributes. There are a bunch of online learning classes with limited number of seats
[11:43:00] <@fluffypony> lessless: to clarify I didn't mean geographically localised
[11:43:07] <@fluffypony> I meant that localised among a small group of people
[11:43:17] <lessless> ah, thanks, got it
[11:43:18] <moneromooo> lessless: Do you mean "I just think it should be possible for a central party to track down a target without the target's knowledge" ?
[11:43:39] <jnsmk> Would that mean that somehow only the localised interested people would maintain the state of ownership and for example only the supply information would be globally stored ?
[11:44:00] <@fluffypony> jnsmk: I think what cjs77 is correct, ownership is a special state and should use consensus
[11:44:09] <@fluffypony> but something like "is this ticket redeemed" is not special
[11:44:17] <@fluffypony> and it can be shared among that localised group
[11:44:58] <lessless> moneromooo fair enough
[11:44:58] <@cjs77> fluffypony: the merkle root is perfect for "checkpointing" DA state. Then if I want to make a request to the network that says "Who owns ticket 5124 for asset #a3fabb212344?", then a node tracking that state must reply with a result and a merkle proof; and it's easy to verify.
[11:47:48] <AlexAnarcho> sup everybody
[11:48:50] <moneromooo> Since it's silent now, I think thought should be given to how old stuff is going to get kicked off the chain after it gets obsolete. Like all these concert tickets should not be taking space long after the concert is over.
[11:48:59] <hahsun> hi all
[11:49:26] <@fluffypony> moneromooo: well
[11:49:27] <@fluffypony> yes and no
[11:49:33] <minamoo> so special states would need to be defined and node functionality, correct? The state ("is this ticket redeemed") determining which node to query (ie. "localised" or every node)?
[11:49:34] <moneromooo> So, a way to excise a prticular asset type (or most of it) from the chain at some (possibly predetermined) time.
[11:49:41] <@fluffypony> what if you went to the last Michael Jackson concert and want to keep your ticket stub?
[11:50:15] <moneromooo> You can keep a local proof.
[11:50:18] <@fluffypony> and if we're doing it the MimbleWimble way then just the kernel is stored to represent ownership
[11:50:23] fluffypony ponders
[11:50:48] <simian_za> and for auditing purposes by the promoters and artists? There could be a way to archive stuff though and just store a merkle root of it?
[11:50:50] <moneromooo> A local proof might need chain input though...
[11:50:59] <jnsmk> We still need possibility to "burn" assets
[11:51:34] <@fluffypony> jnsmk: agreed
[11:51:48] <@fluffypony> maybe the asset issuer can mark it as "burnable"?
[11:51:52] <jnsmk> Consider the case of ingame item that can be broken by a "durability" system of whatever
[11:52:14] <@cjs77> That's just a piece of state though
[11:52:49] <moneromooo> Subchains might fix the "old stuff takes space" problem.
[11:53:01] <moneromooo> However that might work ^_^
[11:53:02] <neonknight> The game can limit the use of that asset, even if the asset still exists
[11:53:17] <@cjs77> jnsmk: in principle, the "durability" field could be updated in the DA state
[11:56:09] <jnsmk> It might be more "responsive" to give the possibility to completely forget it though, not sure
[11:57:45] <Hansie> Not sure if ownership of a ticket can live in the Mimblewimble base layer though, maybe just a merkle root pointing to a persistent data set somewhere. Don't we need a 2nd layer for assets?
[11:57:52] <@cjs77> It seems like there needs to be two (at least) layers: A base layer that tracks low volume data that needs to be highly secure, e.g. Tari token ownership; DA checkpoints; etc.
[11:57:52] <@cjs77> and a state management layer that keeps local track of all DA state (that the node cares about), can handle state change instructions and can interacts with a base layer as needed. This 2nd layer can be much more centralised, since we're not as concerned with security as we are with performance and speed, but the base layer is there to fall back on in case of issues.
[11:58:49] <@fluffypony> cjs77: yeah agreed - hence moneromooo's subchains suggestion
[11:58:57] <mikethetike> how will a new node get the latest state of the digital assets
[11:59:03] <@fluffypony> mikethetike: "sharding"
[11:59:52] <@cjs77> mikethetike: It would have to request a sync and verify against the last checkpoint
[12:00:55] <neonknight> What if the asset owner willingly decides to mark an asset for destruction so he can claim a small deposit, like a glass bottle deposit?
[12:01:20] <@fluffypony> neonknight: that's a VERY interesting idea
[12:01:28] <@fluffypony> incentivised to save space
[12:02:28] <jnsmk> "burn after reading"
[12:03:20] <neonknight> Some people might want to keep their ticket stubs for their collection, but the majority probably do not care.
[12:04:20] <minamoo> neonknight: +1
[12:04:47] <Hansie> Similar to BEAM's re-usable Mimblewimble kernels, users being incentivized for it
[12:06:10] <@fluffypony> it could even be a nice prompted thing where the wallet is like "now that you've gone to the concert, do you want to keep your ticket stub or delete it and get a 1 Tari bonus?"
[12:07:00] <jnsmk> That's great imo
[12:07:34] <AlexAnarcho> what about in-game items or cosmetics that remain. if i buy a skin i want it to remain in my possession and not disappear after first use
[12:08:15] <moneromooo> Gotta make sure the 1 tari tx is smaller than the original ticket thing :)
[12:08:33] <@fluffypony> AlexAnarcho: those are going to have to live on, but tickets are temporal
[12:08:46] <@fluffypony> DRM tokens (eugh) is also temporal
[12:08:55] <@fluffypony> s/is/are
[12:09:08] <Blackwolfsa> @moneromooo it can probably be a % of the contract/amount of tickets thing
[12:10:03] <@cjs77> Some other things to get some thoughts on re: the base layer:
[12:10:03] <@cjs77> * implemented using a PoW chain merge-mined with Monero,
[12:10:03] <@cjs77> * use MimbleWimble protocol
[12:10:41] <Hansie> One can even opt in for ticket stub deletion when the ticket is purchased, minimizing network interaction
[12:10:45] <jnsmk> I like the merge-mining, would give great security right ?
[12:11:00] <@fluffypony> I think short of something else amazing being dropped on Tor in the next week, MW is the most sound, scalable "base layer" protocol we know
[12:11:07] <@fluffypony> jnsmk: yup
[12:11:26] <jnsmk> But what if (and I don't hope that :D) monero network dies off ?
[12:11:32] <Hansie> Mimblewimble is great
[12:12:15] <@fluffypony> jnsmk: I think that's a disaster scenario, but merge-mined chains can continue independently
[12:12:43] <@fluffypony> presumably with weaker security, but if Monero is dying then the miners would switch to mining something else, possibly Tari, so not sure if it would even lead to weaker security
[12:12:51] <@fluffypony> but that's really an unimaginable scenario
[12:13:09] <moneromooo> It was clearly just imagined :P
[12:13:29] <@fluffypony> lol
[12:13:31] <@fluffypony> unfathomable
[12:14:03] <jnsmk> Yea I just wondered about the level of dependency of the mergemined network
[12:14:14] <@cjs77> lol
[12:14:30] <jnsmk> Then merge-mined seems like a great option to me given the high level of security that would be inherited from the first minute
[12:14:34] <@fluffypony> jnsmk: there's a Tari Labs University on merge mining
[12:14:37] <@cjs77> ^ this
[12:15:08] <Hansie> Merged mining can also suffer from mining power centralization issues
[12:15:27] <@fluffypony> https://tari-labs.github.io/tari-university/merged-mining/merged-mining.html
[12:15:29] <Hansie> It must be distributed to multiple players
[12:15:36] <@fluffypony> https://tari-labs.github.io/tari-university/merged-mining/merged-mining-scene/MergedMiningIntroduction.html
[12:15:43] <@cjs77> and there are various strategies we could employ if things go wrong. See the TLU writeup https://tari-labs.github.io/tari-university/merged-mining/merged-mining.html
[12:15:47] <jnsmk> @fluffypony I indeed need to read up all the Tari book :D
[12:16:54] cjs77 must get some lunch
[12:18:22] <moneromooo> About the "redeeming for kickback" thing above. AIUI, MW removes "internal" links between original inputs and existing outputs.
[12:18:46] <moneromooo> So, thinking about this redeeming a ticket for a kickback would not actually do much overall, would it ?
[12:19:01] moneromooo doesn't know much about MW
[12:19:13] <Hansie> If it is the 2nd layer it might
[12:19:17] <@fluffypony> ^^
[12:19:27] <simian_za> That would be for the fungible Tari on the base layer but for the non-fungible tokens you wouldnt want to prune
[12:19:41] <simian_za> unless its on purpose of course
[12:19:53] <moneromooo> OK, so no MW for tickets and stuff, is what you're saying ?
[12:20:28] <Hansie> Yes, preferably all of that on a 2nd layer
[12:35:35] <@fluffypony> ok now I'm all architected out
[12:35:56] <@fluffypony> cjs77: do you want to have some sort of cadence for these discussions or just keep it ad-hoc?
[12:38:32] <jnsmk> I also start to see the big picture. BTW I like what you guys are doing the the tari-university, it will surely give the opportunity to guys like me to contribute
[12:44:25] <AlexAnarcho> yes, the education is so essential! Great job, at first glance it looks very informative
[12:50:20] <@cjs77> FluffyPony: I suggest we keep things going adhoc, but keep this time every week as a "formal" discussion slot so as to maintain momentum.
[12:50:30] <@fluffypony> sounds good
[12:50:35] <@cjs77> We can increase the frequency if needed
[12:50:41] <@fluffypony> weekly architecture meeting
[12:50:54] <@fluffypony> time might be inconvenient for Americans - thoughts on doing it a bit later?
[12:51:19] <@cjs77> Also give some thought to an evening slot for Pacific folks to interact live
[12:54:57] <@cjs77> What about Tuesdays 8pm and Thursdays 11am?
[12:55:47] <@fluffypony> Tuesday evenings are bad for me...Monday?
[12:55:53] <p3t3_R> +1
[12:56:12] <@cjs77> Jnsmk: glad you like tlu. That was the idea behind getting it going
[12:57:07] <@cjs77> Monday is good
[12:57:20] <@fluffypony> kk
```
