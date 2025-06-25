---
layout: post
title: Tari Protocol Discussion 28
date: 2019-03-07 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-28.png
lead: The digital asset lifespan
class: subpage
---

On Thursday, the Tari community discussed the lifespan of digital assets on the Tari network. Specifically, what might happen to assets (like tickets) after the completion of an event? Below is the TL;DR on Thursday's conversation (full transcript included below):

How will the economics work for old tickets?

- Tickets from a show that has already passed might have been redeemed, but the ticket stubs might still be useful
- But that asset will now have very little movement and thus pay minimal fees
- How will the Tari network incentivize VNs after redemption to keep the asset state of the stubs for other services that might value that data?

Retiring a digital asset

- If an asset issuer wants to retire an asset, they can
- Retiring an asset involves a final checkpoint and a freeze period where interested parties can copy and store the state of the asset and check it against the final checkpoint
- After this period, the asset ceases to exist on the DAN
- Merkle proofs of specific states will still be possible against the base layer

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
4:22 AM <Blackwolfsa> Hi everyone, some thing I have been thinking about is how the economics will work for "older" tickets
4:23 AM <Blackwolfsa> We might have tickets from a show that has already passed, and the tickets might have been redeemed. But that ticket stubs might still be useful.
4:24 AM <Blackwolfsa> But that asset will now have very little movement and thus pay very little fee's
4:29 AM <neonknight> I don't think the asset issuer will want to pay fees at this point.
4:31 AM <Hansie> A fee earning profile could be  0.1 2 9 20 20 2 0.3 0. 0.4 0.3  0.3 0. 0.4 0.3  0.3 0. 0.4 0.3  30 30 0.5 0.1 0.01 0.01 ...
4:33 AM <Hansie> 0.1 - 2 - 9 - 20 - 20 - 2 - 0.3 - 0.4 - 0.3 - 0.3 - 0.4 - 0.3 - 0.4 -  0.3 - 0.4 -  0.3 - 30 - 30 - 0.5 - 0.1 - 0.01 - 0.01 ...
4:34 AM <Blackwolfsa> we could perhaps pay a fee for checkpoints, that gives almost a free fee for no work done except keep the state
4:34 AM <Hansie> Please make a picture
4:34 AM <Hansie> of my numbers
4:34 AM <neonknight> As an alternative, a local ticket instance could be stored in the owners wallet if some form of certificate of authenticity could somehow be generated, then the ticket stub doesn't have to live on the DAN after the event.
4:35 AM <simian_za> Hansie: So I tried to draw a picture of the potential fees profile of a ticket
4:36 AM <stanimal> # Pastebin tQfQwqmm
          +--+                    +-----+
          |  |                    |     |
       +--+  +-+               +--+     |
       |       |               |        |
       |       |               |        |
       |       |               |        |
       |       |               |        |
       |       |               |        |
       |       |               |        |
       |       |               |        |
       |       |               |        |
       |       +---------------+        +---+
       |                                    |
       |                                    +---+
+------+  Sale       Transfers                  +---+
                                           Ticket stubs+
4:36 AM <Hansie> Great!
4:36 AM <simian_za> ja like that
4:36 AM <simian_za> So that second peak is the redemptions instruction?
4:37 AM <Hansie> So if I am a VN, I would like to be around for sale and redemption but for anything else
4:38 AM <Hansie> ^not for anything else
4:38 AM <simian_za> That's true, and how will we incentivize the VNs sticking around after redemption to keep the asset state of the stubs for other services that might value that data
4:39 AM <Hansie> I understand our current thinking is to let VNs join / leave as they please?
4:39 AM <stanimal> simian_za: Yup the second spike should be ticket redemptions
4:43 AM <simian_za> So we could say that the fee-per-instruction fee should become higher during the transfers period to make it more lucrative for VNs to process those instructions
4:50 AM <neonknight> With a DAN payment network, it could be possible for ticket stub owner to pay VNs efficiently
4:51 AM <simian_za> thats true, the stub owners can provide the fees so then who is validating the state of these stubs?
4:55 AM <Hansie> Lets say a big concert drew 250,000 spectators, but only 10,000 will use their stubs in future. So we could possibly let users pay for the privilege of their stubs being kept around, to enroll it in a loyalty program of some sorts. Then those fees could be used to pay the VNs that manage the stubs. ??
5:10 AM <simian_za> So an idea could be that the Asset Issuer signs the stub using their RAID private key and the user keeps the stub. Then when it comes to the user attesting that they own the stub the can present the signed stub and the entity that wants to confirm the attestation can go check the original Asset issuers RAID public key to confirm the stub is legit
5:39 AM <Hansie> Great ideas all round @simian_za @neonknight @Blackwolfsa @stanimal ! I do feel we need to discuss this some more at a later time, there are different avenues to explore here.
6:47 AM <@cjs77> Here's some thoughts on this discussion: If an asset issuer has no more interest in an asset, he can retire it. Retiring an asset involves a final checkpoint and a freeze period where interested parties can copy and store the state of the asset and check it against the final checkpoint. After this period, the asset ceases to exist on the DAN. Merkle proofs of specific states will still be possible against the base layer
6:47 AM <@cjs77> though. This would allow an interested party to resurrect the asset (possibly under a different asset issuer), following usual asset creation rules.
6:47 AM <@cjs77> On long-lived assets not earning enough fees: I believe the mechanism of allowing VNs to decide to quit at a checkpoint helps solve this problem. If a VN (or multiple VNs) wishes to resign from a committee because their yield has dropped, they can do so. If the asset issuer wants the asset to continue to exist, he'll be forced to increase his per-transaction fee at the checkpoint to entice VNs to stay / replacements to enter.
8:48 AM <simian_za> Ahh of course you can still produce merkel proofs against checkpoints on the base layer. This is perfect for the ticket stubs application because the Asset Issuer will generally retire that asset after the event. So at that point the users wallets can download a copy of the asset's state, prune the parts of the merkle tree of the asset state that doesn't belong to them and store the stub in their wallet.
8:49 AM <simian_za> Then for future attestations they can produce a merkle proof against the base layer checkpoints
```
