---
layout: post
title: Tari Protocol Discussion 18
date: 2019-01-28 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-18.png
lead: Cut-throughs for blockchain consensus, and tax implications for privacy coins
class: subpage
---

On Monday’s architecture discussion, one subset of the Tari community looked into tx cut-through as part of the consensus of a blockchain, while a parallel discussion focused on the tax implications of privacy coins. Below is the TL;DR on Monday's conversation (full transcript included below):

Including tx cut-through as part of the blockchain consensus:

- Should cut-throughs be required for a block to be valid?
- Cut-throughs can increase privacy and reduce block sizes
- What's the gain of a cut-through vs immediately pruning when you get the block?

Tax implications for privacy coins:

- If private currencies gain significant every-day adoption, how might a government collect tax?
- Governments could incentivize for submission of expense proofs and reverse-engineer taxable income

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
11:10 AM <@cjs77> https://www.forbes.com/sites/ktorpey/2019/01/27/would-a-ban-on-bitcoin-be-as-pointless-as-the-war-on-drugs/
11:13 AM <@cjs77> > We are thinking of making the cut-through part of the consensus of the blockchain, can anyone think about why that would be a bad idea?
11:13 AM <@cjs77> Any other thoughts on this?
11:15 AM <sarang> In what way?
11:17 AM <@cjs77> Any way, really, but mostly security, privacy or reliability.  In case it's not clear, blackwolfsa was proposing that cut-through of blocks is not optional, but a compulsory step when mining new blocks
11:17 AM <ixside> https://www.irccloud.com/pastebin/60Cu43XL/
11:22 AM <Hansie> cjs77: I assume cut-through of Txs, not blocks?
11:24 AM <Hansie> ixside: So in essence if a large portion of all currencies were private cryptos, how would governments collect tax?
11:25 AM <ixside> Yes, that's what I'm getting at
11:26 AM <moneromooo> They might have to investigate *after* they have evidence of a crime. Like they're supposed to.
11:29 AM <ixside> @moneromooo what could an investigation uncover if all the txs are private?
11:31 AM <Hansie> Simple idea: Governments can incentivise disclosure of monies paid with proofs, not monies earned. Business and individuals have to declare their earnings. Then any business found cheating on their books can be heavily fined.
11:32 AM <@cjs77> hansie: yes cut-through of txs, inside the candidate block
11:35 AM <Hansie> cjs77: Understood, so where does the consensus part comes in? It could just be a validation rule on how to construct the block.
11:38 AM <@cjs77> That's essentially the definition of a consensus rule. If they don't follow it, nodes won't agree on valid blocks
11:38 AM <mikethetike> so if I receive a block that has not been cut-through I should discard it?
11:39 AM <Blackwolfsa> Yes
11:40 AM <Hansie> Yes, according to the proposal any Txs that could have been cut-through and were not should invalidate the block.
11:40 AM <ixside> @Hansie ok, so Alice provides a proof that she paid 'x' in taxes last year, and therefore the government assumes that she made 'y' in total earnings. How would a government find out that Alice in fact earned more than 'y' last year if all her txs were private?
11:41 AM <mikethetike> Seems like a strange thing to take a hard stance on, considering that it is valid to mine empty blocks
11:41 AM <mikethetike> and include and exclude transactions otherwise
11:42 AM <Blackwolfsa> It reduces blocks sizes and increases privacy
11:42 AM <Hansie> ixside: Alice could get away with it, but if Bob disclosed payments made to Alice that does not tally up she will be in trouble.
11:42 AM <Blackwolfsa> An empty block would be fine. And doing cut through still nets the miner his fee for that transaction.
11:43 AM <Hansie> Why must it be valid to mine empty blocks?
11:43 AM <Blackwolfsa> The outputs and inputs just isn't shown
11:43 AM <mikethetike> it may be that the miner never received any transactions
11:46 AM <simian_za> in most nascent blockchains you will find empty blocks due to lack of traffic
11:48 AM <Hansie> So mining an empty block should not be as tempting when compared to blocks with transactions?
11:48 AM <simian_za> yes because you don't get any fees
11:48 AM <@cjs77> It shouldn't be, since you forego all the TX fees
11:49 AM <mikethetike> I suppose there's no incentive to do cut-through apart from being in the interest of the chain
11:49 AM <ixside> @hansie Ahh, understood. So as long as businesses all provide valid proofs of their expenses, they can be cross-referenced to figure out what businesses and individuals earned, since an expense for someone must be income for someone else, is that correct?  And then the address of the txs must be tracked too?
11:50 AM <mikethetike> but I don't see a case for rejecting blocks that do it
11:50 AM <mikethetike> how much extra data is there in cut through vs pruning?
11:51 AM <Blackwolfsa> It's a way of enforcing it.
11:52 AM <Blackwolfsa> I only want to know is there any reason why we should enforce it. It is more beneficial from a privacy standpoint
11:52 AM <Blackwolfsa> You only save a few bytes with cut through
11:54 AM <simian_za> surely more than just a few bytes?
11:55 AM <mikethetike> as a user, you can never guarantee that your transaction would be cut through because it might arrive between blocks, so any "extra" privacy would be coincidental
11:56 AM <Hansie> ixside: I merely had the thought to change the incentives around because this is a different problem for Governments... Registered businesses would need to have audit-able statements of some sorts. And whistle blowers can help to keep everyone honest. Something like that. Not really thought trough.
11:57 AM <ixside> @hansie interesting idea, thanks for clarifying!
11:57 AM <Blackwolfsa> I think it's going from memory it's about 133 bytes per transaction
11:58 AM <Blackwolfsa> But that is true, but in the same breath you can purposely spent your output again immediately if you want to
11:58 AM <simian_za> isn't the rangeproof also removed with the output?
11:59 AM <neonknight> How big is a normal transaction, 1.1kb?
12:00 PM <stanimal> I thought kernels are kept and the rangeproof is part of the kernel
12:00 PM <Blackwolfsa> Kernels are kept, but range proof is in the output
12:01 PM <stanimal> Ah ok
12:05 PM <Blackwolfsa> Range proofs is probably the biggest part of the TX but we can cut though that
12:05 PM <mikethetike> What gets dropped in a cut-through that would stick around in a pruning?
12:06 PM <mikethetike> where I'm going with this: what's the gain over cut through vs immediately pruning when you get the block?
12:07 PM <simian_za> nothing? I thought they were essentially the same process conducted at different scales (intra block vs intra block)
12:07 PM — moneromooo back
12:07 PM <moneromooo> So the objection seems rooted in the belief that an investigation can also only look at blockchain txs.
12:08 PM <Blackwolfsa> It's the same, only part left over is the excess
12:08 PM <moneromooo> However, investigations in every other context also looks at other things. For instance, if Alice kills Bob but nobody sees here do it, an investigation has a good chance of nicking her, and not because the investigation will just ask everyone "did you see her".
12:09 PM <moneromooo> The difference is "privacy by default", but "investigation *based on prior suspicion" will uncover clues. Not always, and the costs are higher, but this is definitely not a non starter.
12:10 PM <mikethetike> @moneromooo @ixside wouldn't an investigation into taxes require a court order or some kind before they are allowed to view your bank statements?
12:10 PM <moneromooo> For private financial txs, same: privacy by default, but: warrants for view key, you check with other people who have business or other ties. For tax in partiuclar, check lifestyle cost. etc. All of which is already done anyway.
12:11 PM <moneromooo> Hopefully it would.
12:11 PM <mikethetike> i.e. they would use other evidence first
12:12 PM <mikethetike> ^ this is my guess, not sure how true it is
12:13 PM <moneromooo> And random checks, on which you're assumed guilty until proven innocent I think.
12:17 PM <Blackwolfsa> Cut through for me is part of privacy by default and you have to opt out
12:22 PM <mikethetike> unless you are doing the cut through before you send it to the network, someone else can see it and record it, so it doesn't really add privacy
12:34 PM <mikethetike> I'm not against forcing cut-through blocks, but I think it is purely for space saving
12:36 PM <Blackwolfsa> It does add privacy since you had to catch it in the mempool. You can cut through yourself as well but it just makes it require a bit more effort to see/track
```
