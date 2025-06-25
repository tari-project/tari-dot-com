---
layout: post
title: Tari Protocol Discussion 6
date: 2018-11-14 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-6.png
lead: Second layer validator nodes and their role in executing digital asset instructions.
class: subpage
---

Monday’s Tari protocol architecture discussions focused on validator nodes and their role in executing Tari digital asset instructions.

This is the TL;DR of Monday’s conversation (full transcript included below):

Validator nodes

- Can a single validator node perform digital asset instructions on its own or should there always be a number of them that work together?
- What transaction fee models might work best?
- Under what circumstances would it be more profitable to be a base layer miner node vs. a second layer asset validator node?

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
1:01 PM <@cjs77> We’ve been throwing some ideas around about how the Tari 2nd layer might work. So base layer = PoW, merge-mined with Monero, handles Tari coin transfers. 2nd Layer = Digital assets layer.
1:01 PM → unknownids joined (unknownids@gateway/vpn/privateinternetaccess/unknownids)
1:02 PM <cardboardoranges> nice
1:03 PM <@cjs77> cardboardoranges: you can quickly catch up by scanning the archive for the last week or so
1:03 PM <cardboardoranges> how do I do that
1:03 PM <cardboardoranges> is there a pstebin somewhere
1:03 PM <@cjs77> One sec.
1:05 PM <@cjs77> Tari-dev logs https://usercontent.irccloud-cdn.com/file/EKrtcDXi/%23tari-dev-121118.txt
1:06 PM <mikethetike> On medium as well
1:06 PM <mikethetike> https://medium.com/tari-labs/today-we-hosted-the-first-of-many-discussions-about-taris-proposed-architecture-875ee07f4c8
1:06 PM <cardboardoranges> oh you really gave me everything ha
1:07 PM <cardboardoranges> the medium one is clean
1:07 PM <mikethetike> I think there are 4 on medium
1:08 PM <@cjs77> We’ve been discussing this idea of “validator nodes” (for want of a better descriptor) that post some collateral in order to execute Tari instructions.
1:09 PM <@cjs77> Tari instructions are things that change the state in Tari Digital assets (DAs)
1:09 PM <cardboardoranges> and validator nodes stand separately from “regular” nodes?
1:10 PM <@cjs77> e.g. “Transfer ownership this ticket token for a Beyonce concert to this public key”
1:10 PM <@cjs77> “regular” nodes, like on the base layer?
1:10 PM <@cjs77> i.e. validating Tari coin transfers?
1:10 PM <@cjs77> Yes, they’re different
1:13 PM <@fluffypony> I think figuring out those incentives is going to be hard
1:14 PM <@fluffypony> I wonder if the asset issuer can’t set the amount they’re willing to pay
1:14 PM <@fluffypony> for each state update
1:20 PM <mikethetike> should the state update be performed by the validator node creating a state update transaction on the base layer? if so, how do we envisage the fee being signed over? Maybe that’s too detailed for this point in the conversation
1:21 PM <@fluffypony> mikethetike: then everything is in the base layer
1:21 PM <@fluffypony> defeats the point of having a secondary layer
1:21 PM <@fluffypony> 5 billion state updates a second
1:22 PM <@cjs77> fluffypony: That makes sense for a lot of state updates, but not all, surely. If Alice buys a token and then wants to transfer it to Charlie, the asset issuer doesn’t need to be involved at all. In this case either A or C should pay the millTari (or whatever) to process the transaction. In any event, wouldn’t the market determine what the fee should be? In a permissionless setup, a validator node should have the right to say
1:22 PM <@cjs77> “no thanks” if it thinks the fee is too low. Then either the fee *is* too low, or there will be other nodes that spring up to take those fees.
1:23 PM <@cjs77> I think you have a strong case for setting fees apriori in “permissioned” mode where the asset issuer nominates specific nodes for validation
1:24 PM <mikethetike> it might be useful to get a glossary or set of terms defined. I was thinking of state checkpoints, not state updates
1:24 PM <@cjs77> I’m working on it :)
1:24 PM <Hansie> \me Hi there
1:25 PM <@fluffypony> what’s a state checkpoint
1:25 PM <@cjs77> What you cross to get from East to West Berlin
1:26 PM <neonknight> Can a single validator node perform the instruction on its own or should there always be a number of them that work together?
1:27 PM <Hansie> I guess it could depend on the asset issuer, how the initial contract was set up
1:29 PM <@fluffypony> cjs77: LOL
1:31 PM <Hansie> I do not understand how it could be possible for Alice and Bob to transact in assets that potentially only live on the 2nd layer without a validator node being involved, to perform the state update. Sure the two parties could transfer base layer tokens without validator nodes, but I wonder about the rest.
1:34 PM <@cjs77> @neonknight: As Hansie said, what if the DA issuer could decide? Either nominate nodes X,Y,Z (permissioned mode), or use some algorithm like “any n nodes that have >= 1000 Tari as collateral” (permissionless mode). It would be assumed that the issuer trusts the nodes in the former case, but I presume a consensus mechanism is a must in the latter case
1:34 PM <simian_za> During a transfer like that does the asset issuer pay the fee or does Alice/Bob?
1:35 PM <Hansie> @cjs77: Yip, makes sense
1:40 PM <Hansie> @simian_za: The question in my mind is about economics and incentives. If I am a validator node and someone asks me to perform an asset type instruction I would want to be paid. If I am a base layer node and needs to construct transactions in a block and mine it I would want to be paid. I guess the asset issuer would pay all instructions that is of direct benefit, example a check point merkle root of the asset state on the
1:40 PM <Hansie> block chain, but would not really care about paying transfers costs between 3rd parties.
1:41 PM <simian_za> Suppose some instructions are paid for by the token owners (transfers) and so. E instructions are paid for by the asset issuer (e.g. Ticket redemption)
1:43 PM <simian_za> Hansie: agreed, if an asset issuer was responsible for transfer fees token owners could drain the issuers fee pool by transferring among themselves.
1:48 PM <Hansie> I wonder if it would be more profitable to be a base layer miner node or a 2nd layer asset validator node, and if the motivation and incentives for the two types of nodes could be like two different prime groups in ECC, not intersecting at all…
1:50 PM <simian_za> Miners will require different hardware setups (more compute) and be more expensive to run so the incentives will hopefully reflect that
1:51 PM <neonknight> I might be missing something, but I have an issue with the DA issuer being able to nominate nodes. Imagine a bad player (DA issuer) creates an asset and nominates his own bad validator nodes, wont he be able to perform some bad instructions without the base layer knowing the difference. This could potentially spam the base layer or even worst cause reputational damage to tari for allowing these instructions.
1:54 PM <Hansie> @simian_za: Mmmm… So Tari token mining could be some money on the side for the Monero miners, and the 2nd layer nodes could be in a different economic space
1:56 PM <Hansie> @neonknight: Bad DA issuer with bad nodes — example creating tickets for an event that does not exist, then scam people into buying tickets tickets that is worthless?
1:59 PM <simian_za> Or issue real assets and then fake transfers but accept real Tari as payment?
2:00 PM <Hansie> Bye for now
2:00 PM <@cjs77> neonknight: So what if there was a bounty of a validator nodes’ collateral to anyone who could provide a fraud proof that the node was malicious?
2:01 PM <Hansie> Ok, so I am back again. @cjs77, godidea
2:01 PM <Hansie> good idea
2:01 PM <tk___> maybe this would increase complexity but maybe the DA can choose any 2 of 5 nodes i.e 3 are randomly selected, and the DA can only select 2
2:03 PM <neonknight> This requires some thinking
2:03 PM <simian_za> Will need to be a cost to attempting to claim such a bounty or else there will be a lot accusations
2:04 PM <@cjs77> I know this is easier said than done, and now we need to get some number of (presumably) honest nodes to act in judgement of the accused nodes which is blech, but maybe there’s an elegant solution in there somewhere
2:04 PM <@cjs77> We just have a sign saying “Only honest nodes allowed”
2:04 PM <@cjs77> :-/
2:04 PM <@cjs77> Crypto is easy
2:05 PM <tk___> with a constitution that nodes have to sign it will work
2:05 PM <@cjs77> ya know?! I was thinking the same thing
2:05 PM <simian_za> A digitial pinky swear?
2:06 PM <@cjs77> BTW, I’m working on a proposal for github, which will provide some meat for these discussions, but I keep diving down rabbit holes, so it’s taking longer than I initially estimated.
```
