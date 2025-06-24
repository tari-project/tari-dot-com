---
layout: post
title: Tari Protocol Discussion 36
date: 2019-05-16 11:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-36.png
lead: Validator Node committee selection
class: subpage
---

On Thursday, the Tari community discussed the Validator Node committee selection strategy. Below is the TL;DR on Thursday's conversation (full transcript included below):

- Asset issuer has full control
- Selects VN's he wants for his/her asset

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
11:00 <@CjS77>  It's dev chat time - Today's topic: Validator Node committee selection
11:01 <@CjS77>  See https://rfc.tari.com/RFC-0311_AssetTemplates.html for some context on VN committee selection options RFC-0311: Digital Asset templates - The Tari Network: RFC library The Tari network RFC library and documentation
11:04 <@CjS77>  With `CREATOR_ASSIGNED` committees, the process should look something like:
11:04 <@CjS77>  1. Asset Issuer (AI) submits an asset creation instruction with a list of VNs he/she wants in his/her committee
11:04 <@CjS77>  2. There's a timeout within which nominated VNs need to accept their nomination
11:07 <Hansie2>  So we assume VN discovery is done and that the asset issuer has a list of viable VNs...
11:07 <simian_za>  For CREATOR_ASSIGNED that assumption will be correct I believe
11:08 <@CjS77>  3. After the timeout (let's call it nomination period), if insufficient VNs from the `trusted_node_set` haven't accepted the nomination, then the instruction should be rejected.
11:08 <Blackwolfsa>  I dont think we have to assume, I think the AI needs to wait for VN's he doesnt poll VN's they poll him
11:09 <@CjS77>  "Rejection" means either an explicit rejection message from the AI, or it hits a timeout
11:12 <Hansie>  Ok, makes sense, then the asset issuer has to try again
11:12 <neonknight64>  Will creator_assigned and network_assigned be managed by the Token Wallet?
11:12 <Blackwolfsa>  I think so
11:12 <@CjS77>  Yes, we could also consider a case where the AI puts out N pubkeys, and selects a committee m < N from that
11:16 <Hansie>  Another method could be (a) this is the asset I want to create/created, (b) VNs please tell me if you are interested, (c) thank you I selected these VNs.
11:24 <@CjS77>  Agree - Asset creation instruction issuance -> Nomination phase -> Asset initialisation / creation phase
11:25 <@CjS77>  With timeouts in each phase
11:26 <neonknight64>  I think the AI could privately ask VNs to be part if a committee or broadcast a public request to all the VNs and then select the committee from the subset of VNs that accepted the request. The nomination phase can be private or public.
11:26 <@CjS77>  For `CREATOR_ASSIGNED` that makes sense
11:55 <Hansie>  Maybe we also need a fee locked up in the base layer that coincide with the initial asset creation instruction
11:56 <Hansie>  That could be value in the clear linked as metadata, in such a way it could be validated by prospective VNs
11:57 <simian_za>  Ok, so the AI will put an Asset Creation transaction on the base layer with a time lock as long as the nomination period and as you say put the value he is locking up in the clear so that it can be verified by prospective VN's
11:59 <simian_za>  then to start the nomination process for CREATOR_ASSIGNED the AI will send a nomination message directly to their selected prospective VNs or for NETWORK_ASSIGNED assets the call for nomination will be broadcast on the network publically
12:01 <neonknight64>  Once the VNs have received the call to be part of the committee that could manage the newly created asset, they could nominated themselves to the Token wallet of the AI.
12:02 <simian_za>  yes that makes sense
12:02 <Blackwolfsa>  The AI will then select and inform the VN's whom it selected based on some token wallet criteria
12:03 <neonknight64>  The TokenWallet could also prioritise the VNs that accepted according to things like reliability etc.
12:04 <stanimal>  VN's could then post their collateral
12:04 <simian_za>  on the base layer right?
12:04 <stanimal>  Yup
12:06 <Hansie>  Great, so when all of this are done, the asset issuer and committee ca perform the 1st checkpoint Tx on the base layer and the committee can start to manage the asset.
12:06 <simian_za>  ship it
```
