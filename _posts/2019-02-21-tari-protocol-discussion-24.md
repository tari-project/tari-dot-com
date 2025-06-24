---
layout: post
title: Tari Protocol Discussion 24
date: 2019-02-21 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-24.png
lead: Payment time-locks on the Tari network
class: subpage
---

On Thursday, the Tari community gathered for a discussion on payment time-locks. Specifically, the conversation examined the various methods for time-locking payments, the pros and cons of each method, and how each method might be useful in the scope of digital assets. Below is the TL;DR on Thursday's conversation (full transcript included below):

**Multiple UTXO approach**

Pros:

- It's simpler - no change to basic MW is required
- Could possibly make payments to different people (like a stokvel)
- Any payment schedule formula is possible (linear, exponential, sinusoidal)

Cons:

- One huge transaction upfront
- It's less granular because of TX size (limited to ~10 - 100 payouts)

**Single UTXO approach**

Pros:

- Standard TX size
- Maturity schedule is very finely grained; receivers can spend as little or as much of their entitlement as they wish

Cons:

- Requires new feature to MW UTXO set
- Each schedule type requires a new implementation (linear, exponential etc.)

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
4:05 AM <@cjs77> Good morning
4:07 AM <mikethetike> let's do this
4:07 AM <mikethetike> what's the topic for today?
4:09 AM <Hansie> What about discussing different types of time locks on payments?
4:11 AM <@cjs77> Yes. Assuming we want to do atomic swaps, we'll need HTLCs (https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) in addition to the UTXO time locks that already exist (e.g. on Coinbase outputs)
4:12 AM <@cjs77> I think there's even some scope for innovation on UTXO timelocks. Right now, it's a delta function: You can spend 0 until time t, and after t, you can spend 100%
4:13 AM <@cjs77> There could be some interesting use cases for allowing that spending function, to follow different maturity schedules
4:13 AM <Hansie> So Grin only have immediate payment and delayed payment for coinbase transactions, right?
4:14 AM <@cjs77> I think you can put a time lock on any UTXO, but I may be mistaken
4:14 AM <@cjs77> It's enforced on CB though
4:15 AM <Hansie> Ok
4:16 AM <simian_za> So a maturity schedule would say that after x blocks you can spend f(x) (ranges from 0% to 100%) of the UTXO
4:16 AM <simian_za> ?
4:17 AM <simian_za> but when you spend a UTXO you spend all of it and then generate change outputs so you would need to spend the allowed portion and then the remaining value would need to be put into a new UTXO with a new maturity time lock?
4:17 AM <@cjs77> Yeah, a linear maturity schedule. It could be useful for say, a subscription "debit order", or a pocket-money kind of arrangement.
4:17 AM <@cjs77> simian_za: yes, that would be required
4:17 AM <Blackwolfsa> every grin kernel has a lock height built in
4:17 AM <Hansie> But using a single UTXO for that sounds a bit complicated
4:19 AM <Hansie> Is it not possible to split the micro payouts in fixed amounts linked to different terms?
4:19 AM <Blackwolfsa> depending on the amount, that might flood a block
4:19 AM <@cjs77> So you're saying make all the split payments upfront with diffrent timelocks
4:20 AM <@cjs77> I can see pros and cons with either approach
4:20 AM <Blackwolfsa> side note, does it matter if all them are in the same block?
4:20 AM <Hansie> cjs77: Yes, I think so. If the same UTXO is morphed every time into a payout and remainder, who will sign all those  Txs?
4:21 AM <@cjs77> The receiver --  he/she owns those coins all along. Is just not able to spend them
4:22 AM <@cjs77> *all of them
4:22 AM <Hansie> So in that model a payout schedule must also be published somehow
4:23 AM <Blackwolfsa> yes, but that  could be some function in place of a lockheight
4:24 AM <Hansie> That seems complex, as the values are blinded
4:25 AM <Hansie> How can you apply a function to an amount that is hidden?
4:25 AM <Blackwolfsa> but you could do that with a rangeproof
4:25 AM <Blackwolfsa> You dont really care about the value, you only care its below a certain limit
4:27 AM <Hansie> I do not think use of a range proof can guarantee say 1% payout of initial funds every so many blocks.
4:28 AM <Hansie> blackwolfsa: In Grin. why is 'HeightLocked' in 'pub enum KernelFeatures' and not in 'enum OutputFeatures'? Surely what we want to do must be linked to the UTXO?
4:29 AM <Hansie> https://www.irccloud.com/pastebin/85WF9eM0/
4:30 AM <@cjs77> So Pros of the multiple UTXO approach:
4:30 AM <@cjs77> * It's simpler - no change to basic MW is required
4:30 AM <@cjs77> * Could possibly make payments to different people (like a stokvel)
4:30 AM <@cjs77> * Any payment schedule formula is possible (linear, exponential, sinusoidal)
4:30 AM <@cjs77> Cons:
4:30 AM <@cjs77> * One huge transaction upfront
4:30 AM <@cjs77> * It's less granular because of TX size (limited to ~10 - 100 payouts)
4:30 AM <@cjs77> Pros of single UTXO approach:
4:30 AM <@cjs77> * Standard TX size
4:30 AM <@cjs77> * Maturity schedule is very finely grained; receivers can spend as little or as much of their entitlement as they wish
4:30 AM <@cjs77> Cons:
4:30 AM <@cjs77> * Requires new feature to MW UTXO set
4:30 AM <@cjs77> * Each schedule type requires a new implementation (linear, exponential etc.)
4:30 AM <@cjs77> What else am I missing?
4:31 AM <Blackwolfsa> Hansie: You block the transaction from being mined, you dont lock the output. You are disallowed from having a kernel with a lockheight greater than current block height in.
4:34 AM <Blackwolfsa> Hansie, you can construct a graph of function block height. You then supply a rangeproof that the amount of the utxo left is higher than the graph point on mined height
4:35 AM <Hansie> So these amounts would have to be known then?
4:37 AM <simian_za>  The schedule will need to be attached to UTXO in some non-confedential way so the miners can see it?
4:37 AM <simian_za> or can you maybe construct a series of rangeproof conditions ahead of time?
4:38 AM <Blackwolfsa> Stupid example:
You have 100 Tari.
you lock the funds with y = x -10000.
This means every block after block 10000 you can extract 1 tari.
Transaction is mined with rangeproof saying there is more than 99 in the output.
When you extrat funds at block 10050 worth 30 tari.
You leave the remaining 70 Tari with a rangeproof of more than 50.
4:40 AM <Hansie> So the lower limit of the series of range proofs must be linked to every payout? `[100 - 2^64]`, `[99 - 2^64]`, `[98 - 2^64]`, etc.  Right?
4:41 AM <Hansie> Then there is no confidentiality, really.
4:41 AM <Blackwolfsa> no you have
4:42 AM <Blackwolfsa> look at the example, although the rangeproof says there is more than 50, you dont know how much is in there.  It could be anywhere from 50 uponto max tari in cerculation
4:42 AM <Blackwolfsa> *circulation
4:42 AM <Hansie> cjs77: Another con of  single UTXO approach: Confidentiality may be compromized.
4:43 AM <Blackwolfsa> Hansie: How? I am missing how it may
4:43 AM <Hansie> Blackwolfsa: If the lower limits are known, much is revealed
4:45 AM <Hansie> To confirm what simian_za also said
4:45 AM <Blackwolfsa> I dont see exactly how? Technically speaking every grin transaction has a lower limit 0. With these you just increase it a bit
4:45 AM <@cjs77> True, the single UTXO approach requires the values to be transparent. Not so for the multi-UTXO.
4:45 AM <@cjs77> I guess if you wanted proof that the multi-UTXO approach *actually followed a given schedule*, you could do that out of band, with a bulletproof or something
4:45 AM <mikethetike> in the case of a debit order
4:46 AM <Blackwolfsa> why does the values need to be transparent?
4:47 AM <Blackwolfsa> Am I missing something here?
4:47 AM <mikethetike> Maybe this is possible: inputs -> n debits orders. The receiver of the debit orders gets the blinded amounts for n outputs. They know the amounts, (the miners don't need to). They also can't receive all the outputs because the time locks are in the partial signature
4:47 AM <mikethetike> so no need for rangeproofs or revealing the amounts
4:47 AM <mikethetike> what is the use case that we are trying to solve?
4:48 AM <@cjs77> ^ That's the Multi-UTXO case above
4:48 AM <Hansie> <mikethetike> you described the multi UTXO approach
4:49 AM <@cjs77> Just on simplicity alone, I think the MultiUTXO case is the stringer of the two.
4:49 AM <@cjs77> stronger*
4:49 AM <Blackwolfsa> You have 100 Tari.
you lock the funds with y = x -10000.
This means every block after block 10000 you can extract 1 tari. You dont know how much is locked away? You only have a  lower limit of the amount left in the funds.
When you extract funds at block 10050 worth 30 tari.
You leave the remaining 70 Tari with a rangeproof of more than 50. From a external perspective, you only know the user extracted somewhere between 0.00000000001 > 50 Tari.
It could be anyvalue between that.
4:49 AM <mikethetike> you can't prevent people from using the multiUTXO method
4:50 AM <Blackwolfsa> I made a mistake, in the previous snippet, when you commit the initial one, you dont have to say how much funds are in the transaction
4:50 AM <simian_za> It is simpler but the number of installments is quite a limiting factor
4:50 AM <mikethetike> the only question is whether we need to support a smaller one and hope people will use it
4:50 AM <mikethetike> the amount in the input UTXOs is also a limiting factor
4:51 AM <Hansie> So from a blockchain perspective, for either approach, we at least need to  add coinbase type functionality to normal transactions
4:52 AM <Blackwolfsa> yes, that does not exist
4:52 AM <mikethetike> again which problem are we trying to solve
4:52 AM <Hansie> Scheduled payouts
4:53 AM <Hansie> Let's say someone wants to leave Tari for their grand children, but do not want to give it to them to spend all at once, like some amount every 5 years.
4:54 AM <Hansie> The receiver should own the Tari coins, just not be able to spend it
4:55 AM <simian_za> Hansie: So coinbase maturity in the form of lock_heights is a core part of the Grin-style MW implementation so that exists
4:55 AM <Hansie> Yes, that seems to be something that can be extended
4:57 AM <Hansie> So Blackwolfsa responded: "You block the transaction from being mined, you dont lock the output."
4:58 AM <Hansie> That seems different than what we need. A transaction that was minded, but prevented from being spent.
4:58 AM <simian_za> No, I believe you lock the output i.e. it is mined but you cannot include it as an input in a transaction until the time has expired
4:59 AM <simian_za> think about it in terms of a coinbase transaction, that cannot sit in a mempool it is mined
4:59 AM <Hansie> Ok so that is more useful
5:03 AM <Blackwolfsa> simian_za: There is currently  no lock on the output?
5:03 AM <Blackwolfsa> The lock is only on the kernel and not stops it from being mined
5:04 AM <Blackwolfsa> Only a coinbase output (and I mean specifically a coinbase) is blocked from being spent
5:05 AM <Blackwolfsa> pub struct TxKernel {
	/// Options for a kernel's structure or use
	pub features: KernelFeatures,
	/// Fee originally included in the transaction this proof is for.
	pub fee: u64,
	/// This kernel is not valid earlier than lock_height blocks
	/// The max lock_height of all *inputs* to this transaction
	pub lock_height: u64,
	/// Remainder of the sum of all transaction commitments. If the transaction
	/// is well formed, amounts components should sum to zero and the excess
	/// is hence a valid public key.
	pub excess: Commitment,
	/// The signature proving the excess is a valid public key, which signs
	/// the transaction fee.
	pub excess_sig: secp::Signature,
}
5:05 AM <mikethetike> You can have a list of lock heights (one per output) in the kernel
5:06 AM <simian_za> hmm ok, then I guess put a lock_height in the outputs
5:06 AM <mikethetike> either way it's in the transaction that needs to be verified by the signature
5:06 AM <mikethetike> if you want to verify the signature, you need all the data that was signed
5:07 AM <mikethetike> so if the signature has to stick around, the data does too
5:07 AM <mikethetike> or at least that's my understanding
5:08 AM <Blackwolfsa> Grin does not have lock_heights in the outputs, but we could add it.
```
