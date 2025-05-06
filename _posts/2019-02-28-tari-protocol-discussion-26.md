---
layout: post
title: Tari Protocol Discussion 26
date: 2019-02-28 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-26.png
lead: The mechanics of Validator Node registration
class: subpage
---

On Thursday, the Tari community gathered to analyze different ways to make sure the high-performance second layer of the Tari network (The DAN) could leverage the high security of the base layer. Below is the TL;DR on Thursday's conversation (full transcript included below):

One way to achieve a high security second layer is to require Validator Nodes to register themselves on the Base layer. This achieves:

* Sybil resistance (if we require a fee / deposit to be paid)
* A register of known VNs

At a high level, the registration process could look something like this:

* The Validator Node posts a MW transaction with a flag marking it as a VN registration TX.
* The tx contains a time-locked output for at least the registration fee amount that is *paid back to the VN owner*
* This time lock could be for say, 6 months

Another great thing about the refundable deposit model of registration is that the Active VN register is self-maintaining. You need to re-register every 6 months (ala SSL certificates) rather than requiring de-registration.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
4:00 AM <@cjs77> time for another dev chat :)
4:03 AM <simian_za> awesome, lets chat
4:09 AM <@cjs77> So if we imagine the base layer being a high trust, low performance layer; and the DAN being a high performance, lower trust layer; it makes sense to leverage the Base Layer where possible to effect high trust, high performance on the DAN.
4:10 AM <@cjs77> One way to do this is to require Validator Nodes to register themselves on the Base layer
4:11 AM <@cjs77> This achieves:
4:11 AM <@cjs77> i) Sybil resistance (if we require a fee / deposit to be paid)
4:11 AM <@cjs77> ii) A register of known VNs
4:14 AM <simian_za> Makes sense, could the deposit be used for anything else i.e. losing it could be a penalty for bad behaviour (determined via consensus)?
4:14 AM <simian_za> Or is punishment of this sort poor design?
4:14 AM <@cjs77> On a high level, I imagine registration going something like this:
4:14 AM <@cjs77> * The VN posts a MW transaction with a flag marking it as a VN registration TX.
4:14 AM <@cjs77> * The tx contains a time-locked output  for at least the  registration fee amount that is *paid back to the VN owner*
4:14 AM <@cjs77> * This time lock could be for say, 6 months
4:15 AM <@cjs77> simian_za: Great Q. I think the challenge is how to implement punishment in an elegant and simple way
4:15 AM → bordecraft joined (~bordecraf@37.165.118.246)
4:16 AM <@cjs77> I like Bob McElrath's tweet from a few weeks ago saying that any slashing / punishment mechanism can be gamed. I'm not sure I agree 100%, but I resonate with the sentiment. Rather let it "just work" through clever incentives
4:16 AM ⇐ bordecraft quit (~bordecraf@37.165.118.246) Client Quit
4:17 AM <Blackwolfsa> yip I agree with that, we should try and make it work without punishment
4:17 AM <simian_za> The challenge with any punishment mechanism is that it can be used maliciously.
4:17 AM <@cjs77> As it is, posting a refundable deposit via a time-locked output achieves Sybil resistance, which is a big step already
4:18 AM <simian_za> How will the fee be determined?
4:18 AM → bordecraft joined (~bordecraf@37.165.118.246)
4:19 AM <Blackwolfsa> Does it have to be timelocked?
4:19 AM <@cjs77> What I also love about the refundable deposit model is that the Active VN register is self-maintaining. You need to *re-register* every 6 months (ala SSL certificates) rather than requiring de-registration.
4:19 AM <@cjs77> blackwolfsa: ^^ is why time locks are highly desirable
4:19 AM <Blackwolfsa> As long as it exists, the node is"registered", if the node spends that utxo, the node is "de-registered"
4:20 AM <@cjs77> simian_za: Another good Q
4:20 AM <neonknight> The hash of the registration location could also be used as unique identifier for a VN
4:21 AM <Blackwolfsa> cjs77: for that to work we have to either check that the registration is newer than 6 months or something
4:22 AM <Blackwolfsa> a dormant node wont spend that as well.
4:22 AM <@cjs77> blackwolfsa: Having an auto-spend in 6 months guarantees that we get a check-in from a VN if they want to stay registered. If a VN operator loses interest and doesn't care about his deposit, it should auto-deregister, no?
4:23 AM <simian_za> How will an Auto-spend/Auto-refund work though?
4:23 AM <simian_za> will the transaction sit in the mempool?
4:24 AM <neonknight> Also not sure how to do an auto spend with mimblewimble
4:24 AM <@cjs77> yeah, it would have to sit in the mempool.
4:25 AM <Blackwolfsa> 6 months sitting in the mempool might does not seem very reliable.
4:25 AM <Blackwolfsa> I think its safer to just check how old his utxo is.
4:25 AM <@cjs77> So I reckon there would need to be 2 txs: One locking the output, and one that hangs around.
4:25 AM <@cjs77> >not very reliable
4:25 AM <@cjs77> perhaps - fair comment
4:25 AM <simian_za> So rather when an Asset Creator is looking for VN's he will ignore registrations that are older than 6 months
4:26 AM <Blackwolfsa> If we need to check how old his utxo is, we might as well remove the timelock
4:26 AM <simian_za> so a VN cannot use his old registration to take part in DAN activity
4:27 AM <Blackwolfsa> Yes, its not ideal, but its better than flooding the VN list with inactive VN's
4:27 AM <@cjs77> The timelock must stay -- otherwise it's cheap to run a VN, do something nasty, shut it down, get a refund; and repeat
4:27 AM <simian_za> Also a VN could register, get picked for a committee and then deregister and repeat
4:28 AM <simian_za> all with the same deposit amount
4:28 AM <@cjs77> The auto-refund is debateable; but the timelock is crucial for sybil resistance
4:28 AM <Blackwolfsa> ok makes sense
4:28 AM <neonknight> Agreed, timelock is important
4:30 AM <neonknight> If the deposit is high enough, inactive VNs wont forget to release the deposit
4:30 AM <@cjs77> Yeah, I guess we can't *force* auto-deregistration
4:31 AM <simian_za> you sort of can if you ignore old registrations for all the listing and validation operations
4:33 AM <@cjs77> So the question of how much to lock up. I don't know the answer, but some things to think about:
4:33 AM <@cjs77> * needs to be high enough to make Sybil attacks expensive
4:33 AM <@cjs77> * needs to be low enough to produce a "reasonable return" for VN operators running VNs as a business
4:33 AM <@cjs77> * high enough to encourage dormant VNs to claim the deposit ASAP
4:34 AM <simian_za> That is going to be a moving target as the value of Tari fluctuates
4:34 AM <@cjs77> sure
4:34 AM <simian_za> Can it be a function of the amount of Tari in circulation?
4:35 AM <simian_za> hmm but that doesn't take into account the market value
4:36 AM <neonknight> A function of mining reward could also be considered.
4:37 AM <Hansie> simian_za : Yes, and any direct link with fiat currency will be volatile
4:38 AM <Blackwolfsa> mining fee's should stay kinda in line with fiat
4:40 AM <Hansie> Yes, and therefor somewhat self regulated, but not so the block reward
4:45 AM <simian_za> So a function of fees does make sense. Though keeping track of the average fees in a decentralized manner is a challenge
4:46 AM <Hansie> cjs77: I am wondering about a registration term of say 6 months. Let's say I am an asset creator, looking to appoint VNs in a "permissionless" network appointed manner with some boundary conditions I specify for them. These could be some minimum collateral amount, some network credibility rating and "time-to-live" (i.e. time till auto de-registration). So I would like to know how many "terms" have been served, are they light
4:46 AM <Hansie> weight or heavy weight VNs and how long I can depend on them. Any ideas?
4:48 AM <Blackwolfsa> avg fee's should be easy to calc = (reward-block reward) /  kernels
4:48 AM <Blackwolfsa> and we have some rolling limit of the avg between the last 10 blocks
4:50 AM <Hansie> Maybe the amount of collateral above a certain threshold could be self determined, thus market regulated.
4:52 AM <Hansie> Do we envisage a method whereby a VN can extend its registration window, for example renew it some time before it becomes invalid?
4:52 AM <@cjs77> Hansie: I think those are important questions, but possibly independent of the VN registration process? Personally I think VN metrics will probably be a second layer function
4:55 AM <Hansie> Yes, agreed not all for base layer. So maybe a mechanism to top up collateral, extend the registration window, and build up some sort of embedded track record?
4:58 AM <Blackwolfsa> extending could be easy, one reg-utxo -->> another reg-utxo
4:58 AM <Blackwolfsa> we could allow the properties like id etc to cary over
4:59 AM ⇐ bordecraft quit (~bordecraf@37.165.118.246) Ping timeout: 250 seconds
5:04 AM <Hansie> Yes, makes sense. So this could also take care of topping up the collateral, as the new Tx can combine the old collateral with a new input, or making it less.
5:07 AM <Hansie> So maybe the 'VN registration TX' could also employ a simple counter in the registration meta data that increases every time a re-registration is done without a lapse in active service?
5:16 AM ↔ oneiric_ nipped out  
5:18 AM <mikethetike> > yeah, it would have to sit in the mempool
5:18 AM <mikethetike> I think it has to be on the blockchain, but locked up like a coinbase
5:18 AM <mikethetike> No autospend, although the VN could choose to create the autospend if they wished
5:19 AM <mikethetike> The registration can't actually be in the mempool, because then the locked up funds are not confirmed
5:19 AM <mikethetike> Unless I'm wrong
5:20 AM <mikethetike> or I have misunderstood what the registration tx is
5:21 AM — mikethetike reads previous messages 
5:30 AM <neonknight> registration is on baselayer, but autospending needs to live in mempool
```
