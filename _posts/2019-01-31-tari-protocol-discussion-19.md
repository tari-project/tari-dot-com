---
layout: post
title: Tari Protocol Discussion 19
date: 2019-01-31 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-19.png
lead: Naming conventions for VN committees, and node syncing proposals
class: subpage
---

Thursday’s architecture discussion examined the possible names for the different ways that Validator Node committees on the Tari network can be constructed, as well as a brief discussion on archival vs pruned nodes. Below is the TL;DR on Thursday's conversation (full transcript included below):

Names for VN Committees:

- Must be intuitive and reflect the systems governing the Tari network
- What is the optimal way to refer to a committee assigned by an asset issuer vs one that is algorithmically determined?

Node syncing:

- Should Tari build off the system Grin uses for node syncing and handling re-orgs?

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
9:38 AM <@cjs77> Did we reach consensus on the names for the  types of VN committees? My IRC-fu isn't quite strong enough to be able to search the backlog
9:40 AM <@cjs77> IIRC we had "permissioned" => "assigned" and "permissionless" => "elected" to indicate a committee that is assigned by the asset issuer vs one that get algorithmically determined
11:52 PM <Hansie> There are still confusion with the intuitive meaning of the names
11:52 PM <Hansie> One suggestion is: Permissioned => Assigned and Permissionless => Elected
11:53 PM <Hansie> Another suggestion is: Permissioned => Nominated and Permissionless => Assigned
11:54 PM <Hansie> This is in direct contrast, so we have to choose the most intuitive names or suggest something better
12:13 AM <Blackwolfsa> I dont believe we have chosen one yet
12:13 AM <Blackwolfsa> But I am with Hansie on this, we need to think carefully about the names, and choose the most intuitive ones
12:19 AM <Blackwolfsa> From my point of view the words mean the following:
12:19 AM <Blackwolfsa> Nominated- Someone/thing appointed you to the committee
12:19 AM <Blackwolfsa> Assigned - Someone/thing said you should attend this committee
12:19 AM <Blackwolfsa>  Elected - There was a vote and you where voted to this committee
12:21 AM <Blackwolfsa> An alternative scheme might be:
12:21 AM <Blackwolfsa> Permissioned => Designated or Appointed
12:21 AM <Blackwolfsa> Permissionless => Allocated
1:19 AM <simian_za> Allocated and Assigned are extremely similar in meaning so I think either work, shall we flip a coin or have a poll?
1:19 AM <simian_za> I agree that elected might imply a vote and in the current RFCs and discussion we have not really put forward the idea of a vote so perhaps Elected should be taken out of the running
1:21 AM <simian_za> Appointed feels better than Designated in my mind
4:02 AM <simian_za> so ev en in my response I have become confused and proposed 3 words for permissioned
4:03 AM <simian_za> to be unambiguous any of those words would make sense for permissioned and then `algorithmically selected` for permissionless?
4:04 AM <Blackwolfsa> that might work
4:05 AM <Blackwolfsa> we need more input in this as I think this can save quite a bit of confusion in the long run
4:07 AM <Blackwolfsa> -----
4:10 AM <Blackwolfsa> another topic for discussion is syncing: I really like how grin handles it. You constantly check the pow from your peers. If they a block with more than you have, you instantiate a sync with them. You are then supplied with the changes in the utxo from the blocks you missed. As well as the beginning utxo set.
4:11 AM <Blackwolfsa> To facilitate this each node delays its pruning. So even thou an output has been spent you dont immediately forget about it.  This allows you to supply this info to another node.
4:11 AM <Blackwolfsa> This will also handle re-orgs quite efficiently.
4:12 AM <Blackwolfsa> If you go beyond that pruning height, you will have to initiate a full sync from an archive node that as the complete history
4:18 AM <simian_za> so each block lists its accumulated PoW in addition to its difficulty?
4:20 AM <Blackwolfsa> yes
4:20 AM <Hansie> Accumulated PoW must also be verifiable
4:21 AM <simian_za> So if you wanted to verify it you would need to pull down all the block headers back to the genesis block and then do the sum yourself?
4:22 AM <neonknight> Probably only need to calculate for each reorg branch until you reach the common block
4:29 AM <Blackwolfsa> idealy this should never be longer than a block or two
4:44 AM <@cjs77> I'm happy with `algorithmically selected`, but the Rust compiler doesn't like it :troll:
4:44 AM <@cjs77> `ALGORITHMIC` a decent-enough shorthand?
4:46 AM <Blackwolfsa> we could just go with algo?
4:47 AM <@cjs77> > Accumulated PoW must also be verifiable
4:47 AM <@cjs77> Indeed. This is one of the things you need to validate the blockchain state.
4:49 AM <Hansie> Naming: I have these - CONSIGNED (meaning entrust, hand over for care) and ASSIGNED (meaning select and give a responsibility) and DESIGNATED (meaning specify as selection) and EMPOWERED (meaning authorize, enable) and ENTRUSTED (meaning give custody, authority to)
4:53 AM <Hansie> So maybe ENTRUSTED for the stronger one and DESIGNATED for the lesser?
4:53 AM <stanimal> What about 'dedicated' for permissioned (dedicated to the task, dedicated nodes)? I like how `algorithmically selected` is unambiguous though bit of a mouth full - 'algorithmic nodes' doesn't sound right  - 'algsel nodes' ? :P
4:55 AM <@cjs77> ASSIGNED or DESIGNATED are good. PRE_ASSIGNED might be even better
5:05 AM <Hansie> cjs77: You lost me... Is this suggestion for the stronger or lesser term?
7:32 AM <neonknight> My vote is for: creator_assigned and algorithmically_selected
7:37 AM <@cjs77> I'm saying I don't have a preference for either of ASSIGNED or DESIGNATED; but my vote goes to PRE_ASSIGNED
7:40 AM <@cjs77> CREATOR_ASSIGNED is actually nice and explicit. I change my vote to that :)
7:40 AM <@cjs77> ALGORITHMICALLY_SELECTED just feels too long. ALGO / ALGORITHMIC seems clear enough to me
7:40 AM <moneromooo> defaulted ?
7:43 AM <Blackwolfsa> Algo selected should be default.
7:44 AM <simian_za> I vote CREATOR_ASSIGNED and ALGORITHMIC
7:46 AM <Blackwolfsa> My vote would be creater_assigned and algo_selected
7:50 AM <neonknight> Changing vote from algorithmically_selected to algorithmic, we are converging
8:02 AM <moneromooo> preselected and defaulted. Since we need two :)
8:07 AM <@cjs77> moneromoo: there may be a world where the asset issuer could pick from more than one algorithm to set his/her committee
8:17 AM <@cjs77> if the committee is selected algorithmically, there'll be another field to indicate the choice of algorithm (e.g. totally random vs, required minimum collateral vs some other identifier)
8:24 AM <moneromooo> creator_assigned/network_assigned (if I'm muddying things, say so and I'll go away)
8:28 AM <@cjs77> ^ actually I like that a lot. less typing ftw :)
8:39 AM <simian_za> +1 network_assigned
1:42 PM <@cjs77> Let's get https://github.com/tari-project/tari/pull/78 merged in. The idea is to cover the main talking points of the DAN and reserve some RFC numbers. I think that goal is accomplished  -- thanks to everyone who picked up some obvious gaps in the original submission. As soon as it's merged, I can create issues for each RFC and anyone who wants to pick up the topic can get some input here and then write up the doc.
```
