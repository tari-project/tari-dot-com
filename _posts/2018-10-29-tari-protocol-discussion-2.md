---
layout: post
title: Tari Protocol Discussion 2
date: 2018-10-29 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-2.png
lead: Desirable Tari protocol features and the must-have requirements for digital assets and their tokens.
class: subpage
---

The Tari protocol is all about native digital assets. So the architecture must support the particular requirements of a digital assets platform.

Today the Tari community came together to think about different ways the Tari protocol could be built.

These digital assets will define and contain asset tokens. For example, in a ticketing context, a single event asset will contain many ticket tokens. The ticket tokens will have a state, such as its current owner and whether it has been redeemed or not.
The Tari network must manage and execute asset instructions, including asset creation, token transfers and state changes.

The critical must have requirements for digital assets and their token are:

- Security
- Speed (perhaps in the order of 1,000 TPS)
- Scalable (think millions of in-game items + metadata)

The following features would be highly desirable and add to the Tari protocol’s value proposition:

- Opt-in privacy (depending on the needs of the asset issuer)
- Configurable decentralisation (depending on the needs of the asset issuer)

For example, a given issuer might want only their node(s) be allowed to execute asset instructions (a permissioned system), whereas others will prefer completely decentralised management of their assets (permissionless).

These broad requirements are in some ways mutually exclusive. Consider the distributed system trilemma of wanting a network to be:

- Fast
- Cheap
- Secure

but only being able to pick at most two.

This suggests the partitioning of the Tari network into two layers:

|                                      | Base Layer       | Second Layer             |
| ------------------------------------ | ---------------- | ------------------------ |
| Speed                                | Slow             | Fast                     |
| Scalability                          | Moderate         | Very high                |
| Security                             | High             | Mod (High with fallback) |
| Decentralization                     | High             | Low - Med                |
| Processes Tari token tx              | Yes              | No                       |
| Processes digital asset instructions | Only checkpoints | Yes                      |

Questions to think about:

- Configurable privacy in digital Assets? What are some use cases for private DAs in a public network?
- Which configuration of network overlay & consensus algorithm will be the simplest, and still work?
- How will the 2nd layer and base layer interact?
- Long-lived vs short-lived digital assets? How does this influence the incentive/funding model?

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**
**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
[20:00:31] <@cjs77> Let's kick off this 2nd Tari architecture discussion! Welcome to everyone from the far western and eastern hemispheres, who weren't up in the middle of the night for the first one :)
[20:02:11] <@cjs77> ICYMI the logs from Thursday's chat are here: https://paste.fedoraproject.org/paste/MyJRvustYF1Qt6dlpEIARg/raw
[20:05:53] <@cjs77> I'd love to get some thoughts / ideas on what the 2nd layer (digital assets layer) might look like. The goals here are *scalability* and *speed*. We're willing to trade off decentralisation to achieve this.
[20:06:38] <sarang> What about transparency?
[20:08:16] <@cjs77> I've thought about this a bit and have refined by thinking around the comments I made above. Of the options for a 2nd layer, the design choice basically boil down to a choice for maintaining an overlay network, coupled with a consensus mechanism.
[20:08:39] <@cjs77> Overlay network options:
[20:08:39] <@cjs77> * Each node maintains a list of nodes, but no other information about it (e.g. Bitcoin); Node capabilities are
[20:08:39] <@cjs77> obtained by querying peers.
[20:08:39] <@cjs77> * Each node tracks it's "neighbourhood" of the network, and perhaps some metadata (e.g. DHT's like Kademlia)
[20:08:39] <@cjs77> * Each node tries to maintain a full list of peers, along with information about which DAs each node is authorised to
[20:08:39] <@cjs77> process instructions for. Queries about a specific DA can be routed directly to the node(s) that are tracking it.
[20:08:40] <@cjs77> Consensus options:
[20:08:41] <@cjs77> * A full second-layer blockchain. This is probably overkill and unlikely to achieve the speed and cost targets we would
[20:08:41] <@cjs77> like, particularly if it's a proof-of-work blockchain.
[20:08:41] <@cjs77> * State Channel network. Ideas like Plasma etc., are interesting, but are incredibly complex. Complexity increases the
[20:08:42] <@cjs77> system's attack surface, and is more prone to failure and bugs. One feels that there are simpler and more elegant solutions
[20:08:43] <@cjs77> to this problem.
[20:08:43] <@cjs77> * "Permissioned" DAs. In this model, DA issuers must nominate (trusted) nodes to run their DAs for them. Specifying
[20:08:44] <@cjs77> multiple nodes serves more as insurance against DoS attacks than protecting against Byzantine agents. Bonded
[20:08:44] <@cjs77> contracts between issuer and nodes on the base layer can provide additional incentives to maintain uptime and honesty
[20:08:45] <@cjs77> (though the incentive structure must be carefully thought out to prevent co-ordinated attacks by rogue asset issuers
[20:08:45] <@cjs77> colluding with malicious nodes)
[20:08:46] <@cjs77> * Directed Acyclic Graphs. DAG implementations, like Spectre, PARSEC, HoneyBadgerBFT etc. are an interesting
[20:08:46] <@cjs77> possibility. DAGs have the potential to provide reasonable speed and scalability whilst still offering true BFT
[20:08:47] <@cjs77> tolerance and thus promising a truly permissionless second layer.
[20:08:47] <@cjs77> sarang: transparency?
[20:09:12] <sarang> Of data on the chain and other layers
[20:10:17] <@cjs77> If we use MimbleWimble, then all transactions are confidential
[20:10:19] <mikethetike> DA = digital asset for anyone who is wondering
[20:10:59] <@cjs77> (MW on base layer). On 2nd layer, there's room for debate.
[20:11:40] <@cjs77> I can see a use case for "open" assets (ala Ethereum contracts) that are publicly readable
[20:12:31] <@cjs77> Though I don't see why we couldn't also have private assets. You've probably heard fluffypony talk about "Privacy sliders" in Tari.
[20:13:06] <mikethetike> as in the contracts are open or the ownership of the assets and their state is open?
[20:13:32] <moneromooo> "privacy slider" makes me think of the sliding hole covers in prison cells. Not a great image to associate with.
[20:13:59] <@cjs77> as in, their state is readable
[20:14:34] <@cjs77> moneromoo: lol. TIL
[20:22:00] <neonknight> Maybe a good first step is to decide if the 2nd layer should have only a few very reliable / trustworthy nodes or many semi reliable / trustworthy nodes?
[20:23:33] <mikethetike> I think we have to assume that they are all not trustworthy
[20:24:07] <kngako> By how much would the "privacy slider" increase the complexity of the possible consensus options?
[20:24:50] <@cjs77> One approach is to build out the network in stages. Start with the "permissioned" system wherein nodes are defacto trusted, and once that's working expand to include untrusted nodes
[20:30:51] <mikethetike> I think that we should start out assuming they are all untrustworthy and then only allow them to be incentivised if they act in a trustworthy manner
[20:31:22] <Hansie> With bonded contacts; it could be possible to determine the cost of an asset at creation and bond that amount - issuer with the nodes selected to service it?
[20:31:27] <mikethetike> or maybe penalized if they don't?
[20:32:13] <Hansie> Nodes also stake something . Then we have balance between issuer and nodes
[20:34:35] <Hansie> Then as the DA contract is serviced through its lifetime costs are allocated to 2nd layer nodes that were involved?
[20:36:49] <@cjs77> Good question, kngako. I haven't given the "full privacy" section of the privacy slider a ton of thought; we'd need to talk through some use cases in more detail
[20:39:00] <jnsmk> Catching up was a bit late :D
[20:39:53] <@cjs77> For tickets / in-game items etc, item owners would typically just look like public keys, and so would be basically anonymous unless the someone decided to prove ownership by singing something with the associated private key
[20:40:11] <@cjs77> *signing
[20:40:51] <havik> Or if there was a rule requiring identity
[20:41:41] <havik> or something identifying at least
[20:42:02] <Hansie> Identity could be proven but still kept private if required I think
[20:42:14] <mikethetike> > singing something with the associated private key
[20:42:29] <mikethetike> <snicker>
[20:42:29] <@cjs77> in C#-minor
[20:42:47] <Hansie> Too much singing
[20:44:04] <kngako> Cool, I'm with mikethetike on the assuming untrustworthiness. For a permissioned system, would the nomination of the set of trusted nodes have a mechanism to avoid "paying/kickbacks for nominations" scenarios? The node(s) who offer the most kickbacks will most likely get the most (recurring) nominations, or that should be considered as the system moves into a more trustless setup?
[20:44:30] <jnsmk> Who would be the trusted nodes ? maintained by Tari legal entity ?
[20:45:11] <@cjs77> nope
[20:45:13] <havik> No
[20:45:26] <@cjs77> Tari wouldn't be involved at all.
[20:45:53] <@cjs77> An asset issuer would say, when creating an asset, "I authorise nodes X,Y,Z to process instructions for this asset"
[20:46:05] <Hansie> I do not know about assuming un-trustworthiness at the outset
[20:46:06] <jnsmk> I see that's already makes more sense
[20:46:50] <kngako> Hmm... Cool.
[20:46:52] <jnsmk> I think assuming complete untrustworthiness might slow down / be overkill
[20:47:02] <Hansie> Yip. I like the idea of bonding/trusting/authorizing.
[20:47:23] <mikethetike> I think as with block rewards, it must be more profitable to provide valid data than to cheat the system.
[20:47:32] <@cjs77> We could have nodes register on the base layer and post a bond.
[20:47:59] <Hansie> Each party to perform according to that bond
[20:48:08] <@cjs77> What's cool about this is that the base layer acts as a registrar of 2nd layer nodes, but it's not a central authority :)
[20:49:33] <jnsmk> what are usecases where total untrustworthiness would be required ? I agree that for ticket selling for a concert it's not required
[20:50:41] <Hansie> Do you mean "untrustworthiness would be assumed" or "untrustworthiness would be required"?
[20:51:09] <jnsmk> I mean, where choosing "trusted" node to bootstrap would not be possible
[20:51:11] <mikethetike> I think there are going to be cases where the issuer just doesn't know any of the nodes, hence will go with any set of nodes
[20:52:22] <Hansie> Low value assets can go with less trust, but not something like a rock concert
[20:53:33] <havik> Unless its something like Slipknot where the band members wear masks :P
[20:54:57] <jnsmk> Let's say I'm an independant game designer making a card game and I want to issue them using Tari. I just have to choose a random set of peers, would that give me enough confidence about issuing my cards ?
[20:55:03] <mikethetike> Choosing a specific set of nodes would probably be an advanced use case
[20:55:49] <@cjs77> jnsmk: sure, if an asset issuer is authorising nodes, he's not going to randomly assign them. In permissioned mode, he's typically running the nodes himself / or knows who is.
[20:56:16] <jnsmk> Yea that's what I thought, you basically setup your own set of nodes
[20:56:20] <@cjs77> Things get more interesting in permissionless mode for sure.
[20:57:15] <mikethetike> personally I would start with permissionless (if it were me creating the game)
[20:58:10] <Hansie> I cannot really think about a use case where trust will not be important. Lets take your card game example jnsmk. The nodes would liketo know they will get paid for their service through the lifetime of the game. The issuer would like to know the game asset will be serviced. That is a trusted setup, even if the nodes are not known.
[20:58:12] <mikethetike> until there was big money involved
[21:00:18] <jnsmk> @mikethetike why would you choose the permissionless ?
[21:00:46] <@cjs77> @jnsmk: Great scenario. So what if you stated as a condition of managing your card assets that only nodes that have > N Tari in a bonded contract are eligible?
[21:01:08] <@cjs77> That way, if anyone wants to cheat, they put an amount of Tari that you specify at risk
[21:02:28] <@cjs77> Now, to compensate nodes for tying up Tari, and risking having their bonds slashed (though if they're honest, that risk is ~zero), they earn tiny fees for each instruction related to your card assets that they process?
[21:04:11] <@cjs77> Since, there are multiple nodes managing your cards now, we need a consensus algo to keep all the state in sync (this is hard) and to catch out cheaters (also non-trivial); and is why the permissionless scenario is trickier than the trusted one
[21:05:09] <@cjs77> ..but something we should have Tari handle, obviously :)
[21:05:59] <mikethetike> so say I have this idea for *cryptokitties 2 - caturday night fever* - hypothetical of course - I don't know if it's going to work, and I don't really want to mess around with choosing issuers, because I don't know who's who, so I just put it out there for whoever wants to earn fees
[21:06:03] <Hansie> Part of the bond from the card game issuer to the authorized nodes could be a bonus payout at the end if the asset was serviced well, say ~10% of the total servicing cost
[21:06:43] <Krakaw> @mikethetike: of course that's going to work!
[21:07:35] <mikethetike> * choosing nodes, not *issuers*
[21:08:49] <Hansie> @mikethetike In the bonded scenario you would have to put up some Tari to issue the kitties, but you would not need to know who will service them
[21:10:01] <Krakaw> What's the relative stake for the nodes if they're going to bond?
[21:11:42] <@cjs77> The hour is up; but everyone is free to continue the discussion (please do).
[21:11:42] <@cjs77> What I'd like to do is take the discussion from these first 2 sessions and work them up into something vaguely coherent and drop them as an RFCon Github. Then more focussed critiques and suggestions can happen via the PR system. How does that sound?
[21:11:54] <jnsmk> Ok so the overall idea is : incentivizing unknown node to be honest by putting their stake at risk and being rewarded if they does a good job
[21:12:00] <Hansie> @krakaw Must be in equilibrium/pro-ratio with (a) the cost of servicing the asset during its life-time and (b) the perceived value of the asset.
[21:13:04] <Hansie> @jnsmk It would seem so yes, as an economic model that can be self sustained
[21:13:30] <mikethetike> Bond/stakes is just one idea though right? there are other ways of reaching consensus/keep nodes honest
[21:13:50] Hansie Hansie must do some chores now
[21:14:05] <kngako> +1 on the RFC repo getting an update
[21:14:36] <jnsmk> My last question would be : what about asset that would last a lifetime ? in the ratio you're talking about @Hansie
[21:14:49] <jnsmk> Ah well I guess I'll keep this one for a PR then :D
[21:15:02] <@cjs77> mike: Looking forward to hearing alternatives
[22:02:47] <@fluffypony> moneromooo: a slider is a GUI element
[22:03:18] <@fluffypony> most of the Google entries for "slider" are UI related
[22:03:32] <moneromooo> Yes, I got that.
[22:04:08] <@fluffypony> I'm open to a better term, I've not heard of privacy sliders in prisons
[22:04:53] <moneromooo> I don't know if it's the actual name. It's just the thing that came to my mind reading it :)
```
