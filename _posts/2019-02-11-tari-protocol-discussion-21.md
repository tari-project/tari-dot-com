---
layout: post
title: Tari Protocol Discussion 21
date: 2019-02-11 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-21.png
lead: Understanding the mechanics of namespace registration and asset creation
class: subpage
---

On Monday, the Tari community discussed how namespaces might be registered by digital asset issuers on the Tari network and how the asset creation process might work. Below is the TL;DR on Monday's conversation (full transcript included below):

Name registration:

- DA issuer namespaces are publicly registered on the Tari base layer
- They are transferable
- There's a cost associated with registering
- The cost should have an inverse relationship with namespace length

Asset creation:

- Are Tari tokens burned or moved at asset creation?
- Will Tari use MimbleWimble to transfer Tari native tokens?

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
11:03 AM <@cjs77> Tonight, I thought we could have a discussion around namespace registration..
11:03 AM <Xeagu> Great idea
11:04 AM <@cjs77> The idea is that asset issuers should be able to reserve a name to prevent spoofing, similar to www domain names
11:06 AM <ixside> How might these asset issuers go about registering their names?
11:06 AM <@fluffypony> also is namespace like a prefix?
11:07 AM <@cjs77> Yes, more like a prefix
11:07 AM <@fluffypony> so then I register the fluffy name space and I issue a pony asset then it's fluffy.pony ?
11:07 AM <Xeagu> I think that provides more utility
11:08 AM <@cjs77> RFC 310 has a proposal for asset ids, but that's the broad idea
11:09 AM <Blackwolfsa> Perhaps we should give users the idea to sell this aswell
11:09 AM <@cjs77> Pony.4733.0.ac56d_3737a4b35 is more likely :)
11:09 AM <Xeagu> MusicFestival.2019
11:11 AM <@cjs77> Here's some more thoughts:
11:11 AM <@cjs77> * These names are registered on the base layer
11:11 AM <@cjs77> * They are transferable
11:11 AM <@cjs77> * there's a cost associated with registering
11:12 AM <Xeagu> Since the Tari token supply is tied to Monero PoW, what if Tari had a second PoS layer which could resolve issues like namespace squatting?
11:13 AM <neonknight> Is registration on the base layer private or public?
11:13 AM <Blackwolfsa> It should be public.
11:14 AM <Blackwolfsa> The idea I think is having a 2 layer pos for assets. And the asset names allows you to assign a name to them to identify your assets more easily
11:14 AM <@cjs77> I would think public. If you think about it, all you need for this is a tx that links a string and public key to a utxo
11:14 AM <Xeagu> The creation supply of tokens is public information.
11:16 AM <@cjs77> Xeagu: That's not far from what we're proposing (2 layers). RFC-300 has more detail iirc
11:17 AM <Xeagu> I'm interested in the governance mechanism for resolving asset creation disputes.
11:19 AM <Xeagu> I think it's a trade off between domain squatting risk and increased attack surface for asset censorship.
11:22 AM <simian_za> In the end it will need to be first come first serve but the idea is to make the registration cost a function of the name length. So shorter names are more expensive
11:23 AM <Xeagu> Might even consider making that name length cost scale exponentially and not linearly
11:23 AM <@cjs77> I think that's right.
11:24 AM <Xeagu> Additionally, at asset creation, are Tari tokens burned or moved?
11:25 AM <@cjs77> For args sake, assume 26 chars allowed. There are 26 one char possibilities, 26^2 2 char possibilities.. Ie the number of combinations scale exp, so the cost should too.
11:26 AM <Hansie> Yip, that makes sense
11:26 AM <Xeagu> 1-3 character name space could be orders of magnitude more expensive to register than 20+ character
11:26 AM <@cjs77> Correct
11:27 AM <@cjs77> We could make 2 or 3 chars the minimum, though.
11:27 AM <Xeagu> If tokens are burned upon creation, that high cost for shorter domain name assets functions as a subsidy in the form of deflation for the rest of the Tari ecosystem.
11:29 AM <@cjs77> It's an interesting exercise to try make this work with standard MW UTXOs
11:30 AM <simian_za> I do agree that burning the fee is something to think about as it makes the incentives much easier to manage.
11:30 AM <Xeagu> Assets on Tari use MW during transfer but will Tari itself use MW?
11:31 AM <Blackwolfsa> Assets won't, but Tari will
11:31 AM <Hansie> Xeagu: I do not understand 'as a subsidy in the form of deflation'
11:31 AM <simian_za> So burning Tari with a MW transaction should be possible?
11:31 AM <Xeagu> Hansie: burning tokens from a fixed supply increases the value of the rest of the tokens
11:32 AM <Blackwolfsa> Its easier to lock up the funds on creation in the output. That way you can transfer it.
11:33 AM <Xeagu> simian_za: I don't know if burning tokens in MW is even possible. It's up for discussion if burning Tari tokens upon creation will be considered.
11:33 AM <mikethetike> Xeagu: it may, but that isn't the intention
11:33 AM <@cjs77> Yeah, it's possible but the problem with burning Tari is that you have utxo bloat.
11:33 AM <Xeagu> The alternative is the cost for creating a Tari goes to another entity.
11:33 AM <mikethetike> burning as in creating an output that no one knows the blinding factor to
11:33 AM <Xeagu> *creating a Tari asset
11:34 AM <Xeagu> mikethetike: yes. Making it unspendable
11:34 AM <Hansie> Xeagu: Thanks, understood
11:35 AM <Hansie> cjs77: How big a problem is the perceived UTXO bloat?
11:35 AM <mikethetike> cjs77: it does create bloat, but the data will have to live somewhere
11:35 AM <Blackwolfsa> It's not going to be that much
11:35 AM <Blackwolfsa> But is against the design philosophy of mw.
11:35 AM <mikethetike> either way a node will need to keep that data somewhere
11:36 AM <Xeagu> I think this is where my earlier question comes in
11:36 AM <Xeagu> Will Tari itself use MW to transfer Tari native tokens? I understand the assets on Tari will use MW
11:37 AM <Xeagu> But if Tari and Monero will be able to be atomic swapped, why do you need privacy for Tari native tokens themselves?
11:37 AM <Hansie> I think MW for Tari native tokens
11:38 AM <@cjs77>  putting assets on a PoW chain is unscaleable (imagine trying to tokenise all WoWarcrafts inventory for example)
11:38 AM <Blackwolfsa> Tari tokens will use mw natively.
11:38 AM <@cjs77> So all assets live on a non PoW 2nd layer
11:38 AM <Blackwolfsa> The assets of Tari will use their own 'thing' related to how a dag operates
11:39 AM <mikethetike> the current proposals are for mw on the base layer, assets layer is not yet fully explored
11:39 AM <Xeagu> I'm of the impression that Tari assets will use MW because only asset participants will need to maintain a record of transactions and MW compresses all that data onto the main Tari chain.
11:40 AM <Hansie> Privacy and confidential transactions is at the heart of MW, so choosing MW gives you that.
11:40 AM <Xeagu> Good enough privacy and scaling is what MW offers
11:41 AM <Hansie> MW for the base layer, something else for the 2nd layer (DAG)
11:41 AM <Xeagu> Hansie: I would propose the inverse
11:41 AM <mikethetike> Xeagu: I also like the idea of MW on both layers
11:42 AM <Blackwolfsa> The problem is neither a dag or mw can deliver the speed and scaling we need for the second layer
11:42 AM <Hansie> Interesting idea, the inverse, never thought of it that way
11:42 AM <Blackwolfsa> As a raw pow chain
11:42 AM <neonknight> So the WoWarcraft namespace could be registered on base layer without tokens and then the tokens for that asset could be created on the 2nd layer Digital Asset Network..
11:42 AM <mikethetike> but there are some tricky details to it, so I've been focusing on the base layer for now
11:43 AM <Xeagu> mikethetike: Also possible but I don't know how MW plays with burning Tari tokens (if that is decided as the path to go)
11:43 AM <@cjs77> But assets have state, so I don't think cut-through would win you much. 2) Not everyone in the world needs to know about your asset 3) some assets need very high levels of liveness, so PoW isn't a good fit.
11:43 AM <Hansie> MW can only really deal with fungible tokens
11:43 AM <Xeagu> What if Tari native tokens were effectively public? Does it even matter since you can atomic swap into Monero?
11:44 AM <simian_za> The privacy MW affords is also key to its scalability
11:45 AM <Xeagu> Monero (private) <-> Tari (public) <-> Digital Asset  (MW private)
11:45 AM <Hansie> The atomic swap into Monero is not more or less special than to say into Bitcoin, I think
11:45 AM <mikethetike> I like the fact that you can choose to make things public if you want. The fees in MW are public, don't see why we couldn't allow some other outputs to also show the value
11:46 AM <mikethetike> but I personally like privacy by default
11:46 AM <Hansie> So the fees are only public until they are moved to a private blinded MW output...
11:47 AM <Xeagu> The tradeoff for MW is only relevant participants need to be informed of the state change
11:47 AM <Xeagu> You don't need to update the entire network that one asset changed hands. Only those involved in that asset network
11:48 AM <Xeagu> Fluffy talked about this in his interview in January
11:48 AM <Blackwolfsa> Current proposal is to keep that entirely off chain. Meaning only the vn and the users involved know of it
11:52 AM <Hansie> I think Tari base layer coins/tokens should be totally independent from Monero tokens, and that it should be used to enable all digital asset network instructions and transactions that hit the MW base layer.
11:52 AM <mikethetike> at some point in the future, Tari may be mined on its own, seperate from Monero
11:52 AM <Xeagu> mikethetike: whoah. This is not my understanding of Tari
11:53 AM <mikethetike> it may not, but any merge mined coin can live on its own
11:54 AM <simian_za> The proposal is for it to be merge mined with atomic swaps but they will be two separate chains with different use cases that drive them
11:56 AM <Xeagu> Gotta go. Talk more later
11:57 AM <Hansie> Nice talking Xeagu
```
