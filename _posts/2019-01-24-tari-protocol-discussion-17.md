---
layout: post
title: Tari Protocol Discussion 17
date: 2019-01-24 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-17.png
lead: Understanding Asset IDs and digital issuer incentives
class: subpage
---

On Thursday’s architecture discussion, the Tari community examined the ways in which a digital asset issuer might identify themselves on the Tari network. One idea is that asset issuers can register a namespace similar to how website domains are registered today. Below is the TL;DR on Thursday's conversation (full transcript included below):

Asset issuers can register a namespace for identifying ownership of assets. How might the mechanics of these IDs work?

- Shorter namespaces could be more expensive than longer ones to reduce name-squatting
- Registering a namespace could have some additional tx fee associated with it
- Refundable time-locks and token burning are two possible fee mechanisms
- Must consider possible security implications of a static namespace key that never changes

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

````
4:03 AM <@cjs77> mikethetike posed a good question earlier
4:03 AM <@cjs77> > I'd like to see how some of the 2nd layer stuff gets squished in
4:04 AM <@cjs77> So this is a good time to put some proposals forward that lead into this question.
4:05 AM <@cjs77> One, that comes from @fluffypony, is that asset issuers can register a namespace (similar to domains in www) which will be used in asset ids.
4:06 AM <@cjs77> There was a reference to this in the Asset Template RFC, but hasn't really been elaborated on to this point
4:09 AM <@cjs77> The proposal states, _Assets are identified by <TLDI>.#_hhhhh on the Tari network_, where TLDI is a 2-16 bytes string of the Top Level Digital Issuer (TLDI). TLDIs would be registered on the base layer and associated with a public key
4:10 AM <@cjs77> Clearly, such a registration would require an extension to MW to allow such a thing
4:12 AM <Blackwolfsa> we should be able to add this easily
4:12 AM <Blackwolfsa> But to make sure namespaces are not abused we could make them more expensive the shorter they are
4:14 AM <neonknight> I think it is good mechanism that can help users visually see from the asset id that they are not buying a "fake" asset
4:17 AM <simian_za> It will hopefully mitigate asset name squatting because an organization could just start using a slightly different version of the TLDI and the squatted name will become worthless to some extent
4:18 AM <@cjs77> It could be implemented pretty easily if we extend `OutputFeatures' like so:
4:18 AM <@cjs77> ```pub enum OutputFeatures {
    Plain,
    Coinbase,
    TLDI(TLDIString),
}```
4:23 AM <Hansie> So how much is the TLDI registration worth? Just the transaction fee for the miner, or something else as well? Perhaps an amount to be burnt? An amount to be time locked? How to determine?
4:23 AM <Hansie> Apart from length as mentioned
4:29 AM <Blackwolfsa> I dont particularly like burning coins (seems such a waste), I would rather give it to the miner
4:30 AM <Hansie> Apart from the transaction fee?
4:31 AM <simian_za> having some subtle deflation is not really a waste, it just adds to scarcity
4:31 AM <simian_za> and makes the incentives in the system less complex
4:33 AM <Hansie> So the transaction fee for the miner, an amount to be burned as well as an amount to be time locked?
4:33 AM <@cjs77> So it definitely can't just be a normal mining fee, otherwise you could cheaply squat all over the namespace
4:35 AM <@cjs77> It needs to be a special mining fee, with a sliding scale according to length as blackwolfsa suggested; or a burnt output - in which case I think we'd need to store an additional pubkey in the UTXO representing the TLDI
4:36 AM <@cjs77> The benefit of a burnt output is that it never gets cut-through, so no need to mark it as a special "unprunable" output or anything like that
4:38 AM <mikethetike> seems to fit nicely with the mimblewimble way of doing things
4:39 AM <Hansie> Yip, makes sense
4:39 AM <simian_za> ja that is quite elegant
4:40 AM <Blackwolfsa> Having it locked is kinda nice
4:40 AM <@cjs77> I'm leaning towards a burnt output -- seems simpler in many ways; and you could still sell you TLDI by doing a ZKCP with the private key.
4:40 AM <@cjs77> I'm wondering if there should be a way to revoke a TLDI? in case the issuer's private key is compromised, or they just want to retire it?
4:41 AM <@cjs77> ZKCP = zero-knowledge contingent payment
4:42 AM <Hansie> I should make economic sense
4:43 AM <@cjs77> :thinking: hansie mentioned time locks. That could be a useful feature. Perhaps TLDIs are only valid for a year, and then you have to re-register them?
4:44 AM <@cjs77> sucks for UTXO bloat, but the idea is compelling
4:45 AM <Hansie> Each re-registry could invalidate the previous registration, keeping the UTXO set the same
4:46 AM <neonknight> During Asset creation, you could burn 90% of the Tari coins and lock 10% as a deposit. When asset creator spends the deposit then the Asset is destroyed.
4:46 AM <@cjs77> Would it? I think you'd find the math would start to break
4:46 AM <@cjs77> ^ hansie
4:47 AM <Hansie> Must be tested
4:48 AM <@cjs77> i mean the accounting math. Sum(UTXOs) - Supply = 0. If we overwrite UTXOs, this formula would fail
4:49 AM <Hansie> Not overwrite, just spend that which was time locked
4:52 AM <@cjs77> Ah, so you're saying you only pay the first time?
4:52 AM <Hansie> So verify(namespace, time lock) can be valid if it is registered and time lock/height not reached
4:53 AM <@cjs77> Are you assuming the UTXO is unspendable, or not?
4:54 AM <Hansie> Yes, basically
4:55 AM <Blackwolfsa> But we would probably have to build in some kind of consensus rule preventing the "burned" tari to stay there. I know its unprobable but if someone finds that key, they can remove the utxo and that domain name falls away
4:55 AM <@cjs77> " if someone finds that key" is roughly the same as saying "breaks the DL problem"
4:56 AM <Blackwolfsa> I know, but I am thinking about something like the large bitcoin collider project
4:56 AM <@cjs77> lolwut :)
4:57 AM <Blackwolfsa> domain registrations would be easy targets as those will be constant and stay there, eg not changeing and being quite large amounts
4:57 AM <Blackwolfsa> https://lbc.cryptoguru.org/about
4:58 AM <Blackwolfsa> Spending that transaction would potentially break quite a bit
5:02 AM <@cjs77> I'd say that the Large Bitcoin Collidor project is a cute waste of time. #ChangeMyMind
5:04 AM <@cjs77> It seems that there are 2 schools of thought on how to handle TLDIs: The burnt fee route, and the refundable deposit route (possibly with time lock). Is that a fair tl;dr?
5:04 AM <simian_za> +1
5:05 AM <Hansie> Spending burnt Tari coins should not invalidate registrations. Thus a  multi transaction of some sorts. When all the conditions are met the namespace can be registered or re-registered.
5:05 AM <@cjs77> I know the hour is up, but we should continue debating the merits of this until we reach rough consensus on the best way fwd, and then put out an RFC
5:06 AM <simian_za> Well by definition you should not be able to spend burnt Tari?
5:06 AM <Hansie> cjs77: It could also be combined with burning some fees together with a time locked amount
5:06 AM <Blackwolfsa> I like the idea of burning it, but I am scared that we rely too much on the security of that single transaction.
5:06 AM <Blackwolfsa> On a normal transaction if someone guesses that key, you lose a bit of money.
5:07 AM <@cjs77> Surely the security of that tx === security of the whole network?
5:07 AM <simian_za> the odds of actually guessing a key is not a real concern I believe
5:07 AM <Blackwolfsa> If someone spends your TLDI you lose potentially  a lot of assets
5:07 AM <Blackwolfsa> that might break tari as a use case
5:07 AM <@cjs77> A 51% double spend is waaaay more likely than someone finding the spending key
5:08 AM <simian_za> When we say we are going to burn the tari are we saying that it is only burnt because the owner will not spend it again? I thought by burning it we mean that the mining consensus will stop it from every being spent again
5:08 AM <@cjs77> By burning, I mean that the blinding factor is unknown to everyone via a NUMS process
5:09 AM <Blackwolfsa> Not disputing that, let put it this way. Some company registers TLDI with name "FTW", is only 3 chars, so its very expensive.
5:09 AM <@cjs77> so the kH of might base58 encode to "TariNameRegistrations73729Hgt"
5:09 AM <@cjs77> That sort of idea, simian_za
5:10 AM <Blackwolfsa> Now you have unlimited amount of time to guess that key, Its not going to change, the person cant spend it again. So you can keep guessing for 2, 3, 4, 5 years...Doesn't matter that target is not changing
5:10 AM <@cjs77> That's fine. Statistically, You need billions of years to guess the key
5:11 AM <@cjs77> Quantum computers will break things before that
5:11 AM <simian_za> the difference between this use case that the Collider project is that they are looking for any valid key in the whole UTXO set, not the key for a specific UTXO
5:11 AM <Blackwolfsa> but a normal utxo changes everytime you spend it, that wont, meaning easier target
5:12 AM <Blackwolfsa> and a normal utxo just means lost money
5:12 AM <Blackwolfsa> breaking TLDI is more expensive
5:12 AM <simian_za> its exactly that reason that it is more likely to find a collision in the UTXO set, the number of possible right guessing is huge
5:12 AM <Blackwolfsa> *problamatic not expensive
5:13 AM <simian_za> compared to a single UTCO
5:13 AM <Blackwolfsa> talk about bigNeon, so bignoen's key is geussed, this means that all tickets sold via bigneon will be dropped, as the asset domain name is now invalid
5:16 AM <simian_za> Sure but the simple fact is that guessing that specific key is not something that is going to happen in a lifetime
5:16 AM <Hansie> So these types of transactions should be perfectly binding not perfectly hiding. Thus not a Pedersen commitment. And not normal MW.
5:17 AM <Blackwolfsa> Its not suppose to happen, just like on beam you where not suppose to get duplicate commitments
5:17 AM <simian_za> that didn't happen by chance
5:17 AM <simian_za> that was a copied wallet
5:17 AM <Hansie> New question:
5:17 AM <Hansie> How will these types of fees (burning and/or locking) be determined at the onset when Tari coins may have low value vs. down the line when it may have grown to be worth a lot more? Example lets assume charging 10 Tari coins for a 100 character namespace and 100 Tari coins for a 10 character namespace with a sliding scale in between. This may broke the camel's back at some point in time.
5:17 AM <Blackwolfsa> true, but it broke the whole block chain
5:18 AM <Blackwolfsa> We can easily add a consensus rule that blocks that that UTXO from being spent, that way if it happens by chance, it will not change anything
5:19 AM <neonknight> I have an interesting idea.. what if an asset creator in the asset creation process, instead of burning the coins, pay 90% of the Tari coins to a known and verifiable charity and make 10% a deposit. The asset creation entry will not be removed from the blockchain until he spends the deposit, at which time the asset registration is removed. As an example, ravencoin currently burns coins during asset creation, currently it
5:19 AM <neonknight> account for only 0.04% of the total coins in circulation. No Tari coins are removed from circulation, No reregistration Assets are required and the value locked up is small.
5:20 AM <simian_za> Hansie: that is a good point, that is the function of the Gas price in Ethereum right? To help tune that?
6:33 AM <@cjs77> hansie: That's a good point and requires some economic modelling to come up with a good strategy for handling this problem
6:35 AM <@cjs77> A very blunt tool would be to make Registration fees proportional to the circulating supply.
6:44 AM <Hansie> Proportional or inversely proportional?
6:47 AM <Blackwolfsa> Propotional
6:47 AM <Blackwolfsa> You would like to keep it expensive
6:48 AM <Blackwolfsa> You only problem you have is that the value is not directly related to the circulation
6:48 AM <@cjs77> he he, scratch that -- making dynamic fees prop to supply is probably not a good idea -- but I do think it would be useful to think in terms of it when decided on what fees to charge.
6:50 AM <@cjs77> It could be something that gets adjusted in network upgrades, but this is something that must be approached with real caution -- the idea of messing with economic parameters makes me nervous
````
