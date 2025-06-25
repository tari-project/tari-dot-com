---
layout: post
title: Tari Protocol Discussion 40
date: 2019-06-03 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-40.png
lead: Multi party UTXO's
class: subpage
---

On Monday, the Tari community discussed Multi party UTXO's. Below is the TL;DR on Monday's conversation (full transcript included below):

- Bulletproofs are a key part of MW transactions
- Signatures of transactions are only used in the construction of the current transaction

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion

```
30-05-19
11:00 <neonknight64>  Maybe we can continue with the Consensus Mechanism discussion of Monday..
11:03 <neonknight64>  I like the idea of the single leader based consensus where some mechanism is used to select a new sequence of leaders for each submitted instruction. This will reduce the number of messages dramatically compared to Leaderless bft.
11:23 <Blackwolfsa>  mm could help reduce traffic quite a bit, which will help with latency which is going to be a big problem for us
11:33 <Blackwolfsa>  leaderless communication seems to be O(n^2) while leader based look likes O(4n)
11:34 <simian_za>  In the second case the coefficient (O(xn)) x might even be bigger than 4 but that scales better than 0(n^2)
11:37 <Blackwolfsa>  yes
11:37 <neonknight64>  My only fear is that a single leader would result in a single point of failure. Luckily the single leader cant fake the signatures of the committee member, so as long as leader switching is easy and fast when an issue occurs it should be ok.
11:38 <simian_za>  LinBFT seems to have a very loose leadership concept that makes moving on to the next leader very cheap
11:49 <Blackwolfsa>  I think a difficult question to ask is in leader based bft, what do we do about nodes that sign last on the last due to latency, that signature is probably better to have later on but for speed reason I think we should not add that in immediately by waiting for it.
11:56 <simian_za>  I think it will resolve itself during the proposal process, little hard to visualize here
11:58 <stanimal>  Can I get another +1 on this: https://github.com/tari-project/tari/pull/329 ?

Control service, refactor dispatcher, partial refactor IMS by sdbondi · Pull Request #329 · tari-project/tari
Description Apologies for the huge PR, there&#39;s a lot of code to be written and smaller PRs will be easier once more components are in place. Added a control service which listens for and handl...
11:59 <simian_za>  man, quite a beast
12:11 <stanimal>  I know right?!
03-06-19
18:13 <simian_za>  Heya
18:16 <Hansie>  Any ideas about a Mimblewimble multiparty UTXO/Bitcoin like multisig? Important? How to? Use case?
18:18 <simian_za>  So just to confirm but MuSig is not directly compatiable with an MW transaction right?
18:19 <Blackwolfsa>  As far as I have yes
18:20 <simian_za>  Ok, so lets start with the easier case of n-of-n. The threshold multisig tends to produce more technicalities
18:21 <Hansie>  Agreed, there is the non-linear property of MuSig that is not compatible with a MW transaction signature.
18:21 <Hansie>  n-of-n, right
18:22 <Hansie>  Bitcoin uses Pay to Script Hash (P2SH) functionality as a means to send funds to a P2SH payment address
18:23 <Hansie>  A redeem script sets the conditions that must be fulfilled for the UTXOs linked to the P2SH payment address to be spent
18:23 <Hansie>  And the miners can verify all of that
18:25 <simian_za>  So we could use a consensus rule and just have each member tag on their public key to the output as a list. The list will need to be in the clear for miners to vaidate it though so that makes the output large AND leaks a lot of info publically
18:27 <Blackwolfsa>  That's all for bitcoin type utxos I don't that will work for mw style utxos
18:27 <simian_za>  With a concensus rule and custom data in the outputs Message it could but really not ideal for MW
18:28 <Hansie>  Agreed
18:29 <Hansie>  A MW UTXO does not need a signature to be spent, though
18:30 <simian_za>  It needs the knowledge of the blinding factors to be demonstrated with a signature though
18:32 <Hansie>  As far as I have it the signature for a spend Tx is not linked to the UTXO to be spent in any way, right? One must just be able to open the commitment to create a valid Tx.
18:35 <Blackwolfsa>  In a way yes....
18:36 <Hansie>  ...?
18:37 <simian_za>  the sender in a TX needs to sign their output with the blinding factor on the output
18:38 <Hansie>  Cool, so no knowledge or proof of a previous signature is needed
18:40 <Blackwolfsa>  Yes
18:40 <Hansie>  simian_za, I am sure you have some ideas about that MW n-of-n, and m-of-n
18:41 <simian_za>  So in MW the knowledge of the blinding factors and the signing is closely linked so I am guessing we can leverage the ability to add pederson style commitments together for the parties to "combine" their own private blinding factors into an aggregated blinding factor
18:42 <simian_za>  Schnorr signature can also be aggregated for the signing part
18:42 <Hansie>  And keep it secret?
18:42 <Hansie>  The blinding factors I mean
18:43 <Hansie>  Oh I see, it is private
18:45 <simian_za>  The parties can supply the public key of their blinding factors and then when they add them they should end up with a usable public blinding term
18:46 <Hansie>  Yip, makes sense
18:46 <Blackwolfsa>  Okay but how about m of n
18:47 <Hansie>  Blackwolfsa, I remember you speaking about the Bulletproof as well. What about that? And how to construct for n-of-n?
18:49 <Hansie>  ^range proof^
18:49 <Blackwolfsa>  As far as I have you can construct a bulletproof for that if you share some of the inner details
18:49 <Blackwolfsa>  But you add extra rounds of communication to the TX construction
18:52 <Hansie>  But that is important, right?
18:55 <Blackwolfsa>  Define important?
18:55 <Blackwolfsa>  A rangeproof is a crucial part of a the mw system
18:56 <Hansie>  Ok, so we need that, even with some comms overhead
18:57 <Blackwolfsa>  Yeah
18:58 <Hansie>  So that just leaves the m-of-n. Maybe some people can share some parts of the a missing person's blinding factor
18:59 <sarang>  I only caught the last bit of this... was the question about aggregating Bulletproofs?
18:59 <simian_za>  sounds like a job for Shamir Secret Sharing
19:00 <Blackwolfsa>  No not really, the idea is that you construct a bulletproof where your commitment is vG + (k1+k2) H
19:00 <Blackwolfsa>  But not single party has k1 and k2
19:01 <Hansie>  simian_za: Yes, that's it! And with Pedersen Verifiable Secret Sharing shenanigans can be ruled out, dealer and receiving parties alike.
19:01 <sarang>  Ah, so a different "level" of MPC, in effect, from the existing method
19:02 <Hansie>  sarang: Yip, that is it
19:03 <Hansie>  Range proofs cannot be constructed without knowledge of the commitment, so we need to keep the secrets and be able to construct it
19:04 <Blackwolfsa>  Yes you have to share the variables t1, t2 and TX as far as I know
19:05 <sarang>  I don't have the paper in front of me, but are those terms homomorphic in gamma (the mask)?
19:07 <Blackwolfsa>  in a sense, but not really
19:08 <sarang>  By that I mean that I'm wondering if those terms could be jointly computed without player trust
19:08 <Blackwolfsa>  like MPC someone takes the lead to publish the final bulletproof but every party still has to compute part of it
19:08 <sarang>  Similarly to how they're done for the full MPC
19:08 <sarang>  Blackwolfsa: sure
19:08 <sarang>  the question is whether or not that can be done within a single commitment
19:08 <sarang>  without trust
19:08 <Blackwolfsa>  how do you mean single commitment?
19:09 <sarang>  If I'm reading this correctly, you and I jointly form a commitment, each with our own share of the masks
19:09 <sarang>  Is that correct?
19:09 <sarang>  And we wish to generate a bulletproof proving range
19:09 <Blackwolfsa>  yes
19:09 <Blackwolfsa>  the idea being, you pick say k1 and I pick k2 as our masks
19:10 <sarang>  We know how to do this for untrusted parties doing separate commitments (the bulletproofs MPC) using the homomorphicity of range proof elements
19:10 <sarang>  I'm wondering if a similar approach could be taken within a single commitment's range proof MPC
19:10 <sarang>  (I don't have the paper in front of me atm)
19:12 <Blackwolfsa>  but I generate I bulletproof for vH + k2G and you for vH + K1G, by sharing some of the variables(if I remember correctly t1, t2, tx), we both calculate the same bulletproof for vH + (k1+k2)G with neither knowing the others mask
19:12 <Blackwolfsa>  but I think you can, I see no reason not to.
19:12 <Blackwolfsa>  You are never actually revealing your mask to the other party
19:14 <sarang>  A big question will be whether or not you need/want to formally show this is still zero knowledge
19:14 <sarang>  the original MPC is not, AFAICT, unless you do round-robin sharing of all partial proofs
19:15 <Blackwolfsa>  as far as I know this is, a 3rd party validating the bulletproof does not know it was constructed in this way, it only sees a comitment vH + kH
19:15 <sarang>  Right, but between the players
19:16 <sarang>  The MPC gets tricky with this, and it's sort of glossed over in the paper and the dalek implementation
19:18 <Blackwolfsa>  I have not exactly played around with this or did it first hand but as far as I know its only important that one party knows the complete commitment. But all demonstractions of this I have seen shows every party knows the value.
19:18 <Blackwolfsa>  I am understanding the statement correctly?
19:20 <sarang>  By "complete commitment" do you mean the mask value as well, or just the resulting group element?
19:24 <Blackwolfsa>  just the resulting group element
19:25 <sarang>  Well, if one party knows the full mask then it's straightforward :D
19:25 <Blackwolfsa>  but I am not exactly 100% sure
19:27 <Blackwolfsa>  say you have 2 parties, one needs to know v + k1 + k2G , the other k2. But no party should know all 3.
19:29 <sarang>  OK, then I might be misunderstanding the desired construction here
19:32 <Blackwolfsa>  the idea is that you have utxo, that no single party can spend
19:33 <sarang>  Right. This is complicated when commitments directly represent spend control (as opposed to Monero, where they are auxiliary)
19:36 <Blackwolfsa>  yip, thats true..

```
