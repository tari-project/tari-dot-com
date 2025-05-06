---
layout: post
title: Tari Protocol Discussion 13
date: 2018-12-12 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-13.png
lead: Validator node fees and achieving consensus with merkle-root checkpoints
class: subpage
---

Thursday’s Tari protocol architecture discussion covered Tari’s second layer network and how it will handle digital assets. [From previous discussions](https://www.tari.com/blog/), the community believes Tari’s second layer should be fast and cheap. The slow, secure, and decentralized base layer can be referenced when necessary to settle disputes.

Thursday’s discussion examined:

* How second layer validator nodes might earn fees for their work
* How the base and second layers might achieve consensus with each other using merkle-root checkpoints
* The benefits of non-Turing complete digital asset contracts (smaller attack surface, ease of use, no halting problem)

The full discussion set the stage for a Monday discussion on how various block times and block sizes might support the second layer ‘digital assets network’. 

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
4:04 AM <@cjs77> I think it’s time to share some ideas around how Digital Assets in Tari might be handled
4:04 AM <@cjs77> We’ve covered the bases on the Base Layer (and please comment on the PRs in Github), so let’s start felshing out some thoughts on the 2nd layer
4:10 AM <@cjs77> The main idea is that we have a 2nd layer that is fast and cheap to handle Digital Assets (DA)
4:11 AM <@cjs77> The second layer network (let’s call it the Digital Asset Network, or DAN) is made up of Validator Nodes — nodes that manage all the state and execute instructions related to DAs that they manage
4:26 AM <@cjs77> A key ideas is that Scalability is achieved by sacrificing decentralisation. Not *all* VNs manage *every* asset. Assets are managed by small sets of validator node committees. These committees reach consensus on DA state amongst themselves. But we potentially have a “slow” and “expensive” base layer to fall back on in case of dispute,
4:27 AM <@cjs77> A key ideas is that Scalability is achieved by sacrificing decentralisation. Not *all* VNs manage *every* asset. Assets are managed by small sets of validator node committees. These committees reach consensus on DA state amongst themselves. But we potentially have a “slow” and “expensive”, but very secure and decentralised base layer to fall back on in case of dispute
4:28 AM <@cjs77> VNs earn fees for their efforts.
4:29 AM <@cjs77> or, they should. And finally, we have the idea that Digital asset contracts are not Turing complete, but are instantiated using Digital Asset templates that are defined in the DAN protocol code.
4:32 AM <@fluffypony> how do they earn fees?
4:32 AM <neonknight> I think non-turing complete digital asset contracts are a great idea as the cost of executing and storing that contract is basically “fixed”
4:32 AM <@fluffypony> or rather, how are fees paid, on the base layer
4:33 AM <@fluffypony> question mark
4:35 AM <simian_za> periodically the validated state of an asset will be commited to the base-layer as a merkle-root checkpoint that summarizes what happened between the last checkpoint and this checkpoint. At that stage the committee of validator nodes will come to a consensus on what fees are owed and between them and the asset issuer the fee payment transactions will be signed
4:35 AM <simian_za> is how I feel it will happen
4:36 AM <@cjs77> ya, if we agree that VNs should earn fees, we can debate the various ways of how that could happen, but simian_za’s idea largely reflects my thinking
4:38 AM <@cjs77> neonknight: The other benfits of non-Turing complete are:
4:38 AM <@cjs77> * smaller attack surface
4:38 AM <@cjs77> * no halting problem nonsense
4:38 AM <@cjs77> * ease of use! You don’t have to be a developer to issue assets. You select from a drop down, click some fields on a form, and off you go
4:39 AM <@cjs77> Unpopular opinion: Ethereum has become a defacto template-based contract system already
4:39 AM <@fluffypony> I don’t think that’s an unpopular opinion
4:39 AM <@fluffypony> that’s all it’s really good for, see: ERC-20 and ERC-721
4:39 AM <@cjs77> Where’s that tweet that explains that “unpopular opinions” never are :)
4:40 AM <@cjs77> Maybe “inconvenient Truth” is a better label
4:40 AM <neonknight> Non-turing complete contracts also allow you to store contracts efficiently. You only need to store the type of contract and the variable parameters of that contract.
4:42 AM <@cjs77> +1. Good point
4:52 AM <Hansie> An interesting viewpoint from https://chain.com/docs/1.2/protocol/papers/whitepaper. “The Chain Virtual Machine (CVM) instruction set is Turing complete. To prevent unbounded use of computational resources, the protocol allows networks to set a run limit that a program is not allowed to exceed.”
```
