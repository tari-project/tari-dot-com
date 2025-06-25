---
layout: post
title: Tari Protocol Discussion 3
date: 2018-11-02 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-3.png
lead: Use cases for private digital assets on public networks and MimbleWimble implementation ideas.
class: subpage
---

The two main ideas discussed during today's Tari protocol architecture discussion were possible use cases for private digital assets on public networks and possible MimbleWimble implementations.

This is the TL;DR on what we covered (full transcript included below):

The ideas that were covered in this discussion were:

- A continuation of the philosophical / high-level discussion around the 2nd layer and how that might work
- Soliciting some opinions on some MimbleWimble implementation specifics

The 2nd layer discussion revolved around the following core questions:

- Configurable privacy in digital Assets
- What are some use cases for private DAs in a public network?

While the MimbleWimble implementation discussion tackled the following ideas:

- Choice of ECC curve
- In-memory DB and persistence strategy / DB choice
- Wire protocol choice

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**
**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
10:04 AM <•cjs77> Good morning all
10:07 AM <•cjs77> I suggest “forking” the discussion today along two paths. On one, we continue the philosophical / high-level discussion around the 2nd layer. In particular, Monday’s chat posed a few good questions, that we should thrash out:
10:07 AM <•cjs77> * Configurable privacy in digital Assets. What are some use cases for private DAs in a public network?
10:07 AM <•cjs77> * Which configuration of network overlay & consensus algorithm will be the simplest, and still work?
10:07 AM <•cjs77> * Start to think about how the 2nd layer and base layer interact.
10:07 AM <•cjs77> * Long-lived vs short-lived digital assets? How does this influence the incentive / funding model?
10:07 AM <•cjs77> or reference, here’s a summary of the conversation so far: https://github.com/tari-project/RFC/blob/4f929788409113ee4f1ac057000a4ff33388fedb/proposals/181029-overview.md
10:08 AM C — •cjs77 takes a breath
10:11 AM C<•cjs77> Then on the other “branch”, I’d love to solicit some opinions on some MimbleWimble implementation specifics:
10:11 AM <•cjs77> * Choice of ECC curve
10:11 AM <•cjs77> * in-memory DB and persistence strategy / DB choice
10:11 AM <•cjs77> * wire protocol choice
10:11 AM <•cjs77> * in-process communication options & threading models
10:11 AM <•cjs77> * use of dependencies
10:11 AM <•cjs77> * Anything else we’ve forgotten
10:29 AM <simian_za> So the choice of ECC curve is quite important and obviously we want to choose one that is secure in a mathematical sense but we also need it to be secure in terms of its implementation. What are the options being considered?
10:31 AM <Hansie> Good background information here http://safecurves.cr.yp.to/
10:32 AM <simian_za> So there seem to be a number of options with green ticks across the board. Which have mature implementations available?
10:34 AM <Hansie> When is it mature? There must be some metrics out there.
10:35 AM <simian_za> Suppose it might be more useful to start with asking which of those curves have Rust implementations available at all
10:37 AM <neonknight> Not many.. curve25519 has one: https://github.com/dalek-cryptography/curve25519-dalek
10:37 AM <•cjs77> Obv secp256k1 is a strong contender, since it’s used in Bitcoin+clones and pwuille’s library is rock solid
10:38 AM <•cjs77> Monero uses curve25519 which has several well-documented advantages over secp256k1 (see the link Hansie posted)
10:38 AM <Hansie> I suppose not all the green-tick-curves-across-the-board are compatible with Schnorr signatures?
10:38 AM <•cjs77> 🤷
10:40 AM <Blackwolfsa> But do we want to use a curve that might have security vulnerabilities when we can choice one that doesnt
10:40 AM <neonknight> Curve41417 also has a few rust implementations
10:41 AM <•cjs77> imho, IsisLoveCruft’s ed25519’s library is the best Rust implementation (https://github.com/isislovecruft/ed25519-dalek?files=1). Question is: Is it battle-tested enough?
10:42 AM <•cjs77> neonknight: Is that curve used in any big projects? It’s a new one to me
10:42 AM <mikethetike> so it’s a protocol — not an implementation — decision, but if we’re merge mining with Monero, won’t we have to choose a curve25519 rust lib
10:42 AM <mikethetike> anyway
10:43 AM <Hansie> I think that is independent though
10:44 AM <mikethetike> Blackwolfsa: On behalf of the bad guys who are too shy, I’m going to say yes
10:44 AM <•cjs77> That doesn’t *force* us to choose it for TariMW (though it is a string argument in favour of it)
10:45 AM <•cjs77> @fluffypony wdyt?
10:47 AM `thread::spawn(move || { db.choice? });`
10:47 AM <simian_za> sqlite?
10:47 AM <•cjs77>I’m going to some out and say it, LMDB seems the clear winner. _[citations abound]_
10:48 AM <mikethetike> The dalek library and mimblewimble aren’t in the same fantasy universes. Is that going to be a problem?
10:48 AM <•cjs77> but open to alternatives
10:48 AM <•cjs77> mikethetike: crossover movie incoming!
10:49 AM <neonknight> Curve41417 seem to be a new generation curve from Daniel J. Bernstein, with higher security than curve25519, but I cant find who actually uses it.
10:49 AM <mikethetike> :D
10:49 AM <•cjs77> Solved problem: https://www.wattpad.com/story/3291555-harry-potter-and-the-secrets-untold-harry-potter
10:52 AM <neonknight> LMDB seems like the winner. It is difficult to compare them, as you cant trust any of the online benchmarks testing key store libraries.
10:53 AM <simian_za> That also solves any future cross-over problems. We can just write our own fanfic as required
10:56 AM <tk___> neonknight: there is pure-Rust implementation of Curve41417 https://github.com/seb-m/curve41417.rs
10:56 AM <tk___> we could be the first to use it :”This code is experimental, don’t use it for anything real.” Are blockchains even real?
11:02 AM <Hansie> To answer one of @cjs77 questions: Use case for “Configurable privacy in digital Assets”. Could be in a game, where you not not want the opposition to know what resources you have.
11:02 AM <xethron> I don’t know much about LMDB, but I always run into issues with SQLite not supporting some critical feature in SQL
11:03 AM <simian_za> Hansie: Also, if an asset is very valuable you might well not want people to know you have it as it could make you a target
11:04 AM <Hansie> People can come to your house
11:05 AM <simian_za> sure, though there are many vectors for remote attack
11:05 AM <Hansie> I think “Configurable privacy in digital Assets” is a good idea
11:06 AM <minamoo> “use cases of privacy in DAs”: could apply for ICOs and STOs (if ever they take off)
11:08 AM <•cjs77> That would be the default setting for all digital assets, I would think. ala MW, ownership would be governed by a public-private keypair, which is unique for each transaction. So it would be hard to link a pubkey to any given individual. Making an asset “public” would then be opt-in, where a known identity would sign a message with the token’s private key
```
