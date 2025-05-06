---
layout: post
title: Tari Protocol Discussion 22
date: 2019-02-14 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-22.png
lead: Proposals for DA issuer namespace registration
class: subpage
---

On Monday, the Tari community held a brief discussion continuing on the topic of namespace registration. Specifically, there are two competing proposals that were assessed for feasibility. Below is the TL;DR on Monday's conversation (full transcript included below):

Proposal 1:

* Asset issuers claim text identifiers that are registered on the base layer
* Easily readable
* Suffers from domain squatting attacks

Proposal 2:

* RAINs are random text labels  that are mapped to IRL entities using an out of band lookup mechanism, such as Open Alias
* Open Alias doesn't support reverse lookups

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
4:19 AM <@cjs77> Hey everyone, sorry for the late start
4:24 AM <@cjs77> I think there's still some discussion to be had around the RAIN idea. There are currently 2 proposals as I see it: One where Asset Issuers claim text identifiers that are registered on the base layer. This is easily readable, but suffer from domain squatting "attacks". The proposal to mitigate this is to charge more for shorter IDs. Sammy007 makes the point that not all identifiers (regardless of length) are equal (e.g. EPIC
4:24 AM <@cjs77> >> FNPA). He suggests, aiui, that RAINS are random text labels  that are mapped to IRL entities using an out of band lookup mechanism, such as open alias.
4:34 AM <simian_za> Ahh, just looked at Open Alias and this makes a lot of sense
4:35 AM <Blackwolfsa> I agree
4:37 AM <Hansie> Neat
4:44 AM <neonknight> The Open Alias Mechanism makes sense!
4:44 AM <@cjs77> Yeah, I like it too.
4:57 AM <@cjs77> Does openalias support reverse lookups? Can I get "domate.getmonero.org" from the recipient_address 44AFFq5kSiGBoZ4...QBEP3A?
4:58 AM <moneromooo> No.
4:59 AM <@cjs77> Hmm.. that's a potential spanner in the works.
5:01 AM <moneromooo> If your network DHTs, that sounds like something you could maintain this way though.
5:02 AM <@cjs77> right
5:08 AM <moneromooo> Of course, since a DNS record owner can change the TXT record at any time, it's going to be hard to keep the two up to date in the face of a malicious DNS record owner.
5:09 AM <moneromooo> ie, if I start using disney's address on my own domain name.
5:21 AM <simian_za> We were thinking that the TXT record would include a signature by the asset issuer signing a message including the domain it can live on so that the DNS records can be validated against the domain the live on
5:24 AM <simian_za> signed using the private key belonging to the public key published as part of the RAIN registration transaction on the base layer
6:19 AM <@fluffypony> yeah you could sign it
8:09 AM → rottensox joined (~rottensox@unaffiliated/rottensox)
9:19 AM <sammy007> cjs77 yep just some random or with some useful data but not TLD-like
9:31 AM <sammy007> moneromooo assuming you wanna buy a PONY asset, you wouldn't trust RAIN anyway, you will go and validate it on internet, go to website and check if this asset is valid, just like with any erc20 where we can see tons of DAOs and only one is authentic, the openalias could help you to add that asset into your own registry in a wallet (just like with erc20 and MEW) bc you will know that issuer is running a website on mylittlepony.biz domain
9:33 AM <sammy007> or check for shitcointalk ANN thread, etc. Otherwise I can claim AMZN on chain and phish people with my fake shares for example
9:35 AM — moneromooo is just the peanut gallery here
9:37 AM ↔ rottensox nipped out  
9:39 AM <@fluffypony> yeah you'd hit like Disney.com and it would pull the record from there
9:39 AM <@fluffypony> if you go in that route then namespaces almost doesn't matter
```
