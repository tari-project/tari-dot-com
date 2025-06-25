---
layout: post
title: Tari Protocol Discussion 23
date: 2019-02-18 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-23.png
lead: Understanding RAIN_IDs and their role in namespace registration
class: subpage
---

On Thursday, the Tari community discussed one particular aspect of asset issuer namespace registration. Specifically, Thursday's conversation was all about RAIN_IDs, and the ways digital asset issuers might register assets on the DAN. Below is the TL;DR on Thursday's conversation (full transcript included below):

- What is the optimal RAIN_ID length?
- Do digital asset issuers require multiple RAIN_IDs?
- Is a prior block hash required in the RAIN_ID string?

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
11:04 AM <Hansie> Was wondering about the size of the RAIN_ID string
11:06 AM <Hansie> Example  `RAIN_ID = Hash(prior block hash || ??? || PubKey)` ​
11:07 AM <Hansie> And about the entropy  `??? ` ​
11:07 AM <simian_za> Feels like there is plenty of entropy for this task in there already?
11:08 AM <@cjs77> Agree. I don't think the prior block hash is required. Hash of PubKey might be sufficient, or `H(Pubkey||domain name)`
11:08 AM <Blackwolfsa> Previous block hash is suppose to be almost 100% random
11:09 AM <@cjs77> But why is it necessary?
11:09 AM <Hansie> Duplicates will not be allowed, and it is possible for an asset creator to register more than one RAIN in a single block
11:09 AM <simian_za> but that PubKey is ostensibly fairly random?
11:09 AM <Blackwolfsa> I am also currently pondering that. We don't require random there
11:09 AM <Blackwolfsa> It's a few chars doesn't mean anything, only needs to be unique
11:11 AM <Blackwolfsa> But that being said, we don't really want someone to register say ea or disney
11:11 AM <neonknight> You just don't want a public that generates a RAIN clash
11:11 AM <neonknight> key*
11:11 AM <Hansie> So a simple counter would do?
11:12 AM <simian_za> There will need to be some sort of validation by the mining node so if somehow an identical RAIN already exists that transaction will just never be added to a block for mining
11:13 AM <Blackwolfsa> We would have to do a check anyway
11:13 AM <Blackwolfsa> I am leaning towards hash of pubkey stored with the pubkey.
11:14 AM <Blackwolfsa> That should stop anyone from registering say ea or Disney.
11:14 AM <Hansie> The only clash here would potentially be from the same asset issuer registering multiple RAINs at the same time
11:14 AM <simian_za> so then only one of those transactions should make it into a block
11:15 AM <simian_za> if they didn't generate new pubkey's for each RAIN
11:15 AM <Hansie> We can prevent duplicates quite easily then with a simple counter
11:15 AM <@cjs77> hansie -- what would the multiple rains looks like? i.e. what diofferentiates them?
11:16 AM <simian_za> a counter in their wallet? Why not then just have the wallet generate new pubkeys
11:17 AM <Hansie> cjs77 -- They will just be numbers as I understand. The real value comes in when thay are linked to a FQDN with an OpenAlias TXT record
11:18 AM <@cjs77> Yes, but I'm asking you to explain why an issuer would want more than one RAIN? What is the differentiating feature that would make them want more than one?
11:18 AM <neonknight> If the RAIN ID has a high enough dimensionality(similar to a public key) then the probability of the hash of the public key creating a clash is extremely low. Including the block hash in the creation of the RAIN ID means you don't have to keep a counter.
11:19 AM <@cjs77> e.g. is it like "Disney.tickets" and "Disney.StarWars"?
11:19 AM <Hansie> Oh I see. There could be a need to register multiple assets in the DAN, thus requiring multiple RAINs.
11:19 AM <Hansie> For multiple domains
11:20 AM <Blackwolfsa> No but you could just reuse the rain?
11:20 AM <@cjs77> Right, but that's your answer. Multiple domains will differentiate the RAINS, even with the same pubkey, if you allow `Hash(PubKey || Domain)`
11:20 AM <Blackwolfsa> Both of those still fall under Disney. Asset name
11:22 AM <Hansie> cjs77 - understood, so the domain name could be used as the differentiating entropy
11:22 AM <Blackwolfsa> Point of though, don't dns names carry aliases as well?.
11:23 AM <@cjs77> Yes, or whatever else we decide is a differentiating feature
11:23 AM <Hansie> blackwolfsa - If RAINs were to be traded, maybe best not to reuse them?
11:23 AM <Blackwolfsa> So under Disney. Com you would have say Disney. Starwars
11:23 AM <Blackwolfsa> If rains are just random strings, and the reall meta data is the dns. Why trade them?
11:24 AM <Blackwolfsa> Create a new rain and sell the dns?
11:24 AM <Hansie> The way I understood it is we want to tie a RAIN to a FQDN - singular
11:25 AM <Hansie> blackwolfsa - Also possible yes
11:26 AM <Blackwolfsa> Rain the string will be tyed into the dns txt. So even if you sell iylt, the owner just changes the rain string under the dns. And the rain you just bought is now worthless
11:26 AM <Blackwolfsa> Sorry for the spelling and Grammer, on my phone
11:26 AM <Hansie> -:)
11:28 AM <Hansie> This is my thinking for the OpenAlias TXT entry:
11:28 AM <Hansie> https://www.irccloud.com/pastebin/bYDklHlq/
11:30 AM <Hansie> So this entry can be used only for a single asset, but multiple entries are allowed
11:32 AM <Blackwolfsa> I don't think we should limit it to single assets.
11:33 AM <Blackwolfsa> I think it should be used as a pubkey provong you can create assets under the dns name
11:33 AM <Blackwolfsa> And all dns aliases linked to that dns
11:36 AM <Hansie> So in my thinking the FQDN and `RAIN_ID` combination will define an asset, and those pairs will allow lookup and verification of assets that belong to a domain
11:38 AM <stanimal> I think RAINs should be on the org level - they are cheap to create (txn fees) now that we are using global DNS and aren't concerned about squatting on namespaces in the base layer - if you wanted multiple RAINs  you could have a RAIN TXT record on subdomains for your org
11:41 AM <Blackwolfsa> Yes, the only reason for rains is to stop spamming. The dns kinda does that already for us.
11:41 AM <Blackwolfsa> We could even potentially through away the rain and just store the pubkey.
11:41 AM <Blackwolfsa> The rain wil just help with a kinda official cache
11:42 AM <simian_za> but it could just be a pubkey rather than the hash
11:42 AM <simian_za> properly generated pubkeys should be plenty random
11:43 AM <simian_za> and the reverse lookup the DAN maintains will just be domain > pubkey
11:44 AM <Hansie> simian_za: So you are suggesting  `RAIN_ID = PubKey` ?
11:45 AM <simian_za> Could be? What does the hash do for us?
11:46 AM <Hansie> It lets one use the same PubKey
11:46 AM <Hansie> With the added entropy
11:47 AM <simian_za> fair enough, though generating new pub-keys is pretty easy
11:48 AM <stanimal> The only disadvantage is that asset ids will be very long and I'd think there wouldn't be the need to register too many RAINs since one RAIN should suffice in most cases for an org - a shorter string (len=32, charset=48) would provide enough space for RAINs, though I could be wrong
11:49 AM <simian_za> yes that is a good point, if the RAIN is pubkey length then every asset issued under it will be longer than required. So I guess that gets back to Hansie's original question: How long should the RAIN be?
11:50 AM <Hansie> Some OpenAlias TXT records:
11:50 AM <Hansie> https://www.irccloud.com/pastebin/YkOz4B1J/
11:51 AM <Hansie> The XMR string length is 95 and the BTC one is 34
11:51 AM <stanimal> something like a bitcoin address i.e `base58(hash(PK))` 34 characters? May even be shorter
11:51 AM <simian_za> plenty of space on that side
11:53 AM <Hansie> The TXT record also has a `tx_description` field which could be used as human readable handle
11:55 AM <stanimal> I was thinking the same thing - one of the main use-cases for this is a lookup - though it would have to be indexed in the DAN lookup table, so perhaps limit it to 1-3 words to prevent abuse / save on storage
11:56 AM <stanimal> mitigate abuse*
11:57 AM <Hansie> So disney.com asset lookup could resolve `Goofy`, `Ariel`, etc.
11:57 AM <stanimal> as well as disney, yup
11:59 AM <Hansie> Thank you guys, much food for thought here!
12:07 PM <stanimal> Definitely - Thanks all - have a great evening/day
```
