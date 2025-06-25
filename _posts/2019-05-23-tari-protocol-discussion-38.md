---
layout: post
title: Tari Protocol Discussion 38
date: 2019-05-23 11:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-38.png
lead: Initial draft of RFC-0322
class: subpage
---

On Thursday, the Tari community discussed the initial draft of RFC-0322. Below is the TL;DR on Thursday's conversation (full transcript included below):

- General draft looks good
- Draft will be merged in with minor tweaks done via additional PR's

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
11:09 <@CjS77>  I've gathered Monday's thoughts together into an RFC draft: https://github.com/tari-project/tari/pull/315

Initial draft of RFC-0322 by CjS77 · Pull Request #315 · tari-project/tari
A rough initial draft of the Validator registration process. Description Motivation and Context How Has This Been Tested? Types of changes Bug fix (non-breaking change which fixes an issu...
11:11 <simian_za>  Looking good, failing some tests though. Impressive for an RFC doc
11:12 <neonknight64>  I like that the VN registration can be renewed without it resulting in a NodeID change
11:13 <Blackwolfsa>  Yeah I think it's an important required feature
11:13 <Hansie>  I like the `A counter indicating that this is the n-th consecutive renewal.` part
11:14 <Hansie>  Would be really valuable for the Tari eco system, AIs as well as users.
11:14 <simian_za>  So we are going to create a chain of kernels that keep track of how many times a given VN registration has been renewed?
11:15 <@CjS77>  I'd like to invite folks to think of attacks that could exploit the registration process as currently described
11:15 <Hansie>  Yip, that is really cool
11:16 <Hansie>  Would  `VN_Deposit` be market driven?
11:18 <@CjS77>  You may notice, a pro of this approach: Changes in the registration deposit are elegantly handled
11:19 <@CjS77>  I don't think there's that much of a supply-demand dynamic to make the deposit market driven.
11:20 <@CjS77>  One of its key goals is Sybil resistance -- so the value (in Tari) may need to be adjusted from time to time (during a network upgrade) to account for any fluctuation in Tari's price
11:20 <Blackwolfsa>  We should just "update" the values somehow to keep it expensive enough to be sybil resistant
11:21 <Hansie>  W.r.t approach, yes, it would stay valid for the current term and if the value changed it could be adapted with the next registration.
11:24 <neonknight64>  Keeping track of the number of registration renewals of a VN is a nice mechanism that Asset Issuers can use to find more "reliable" VNs
11:25 <Blackwolfsa>  But it could also be seen along the lines of the rich get riches...
11:45 <neonknight64>  or longer running VNs preferred over new VNs.
13:54 <@CjS77>  Are we're happy to merge the draft in as is? There may be minor tweaks in future, but unless you can post comments now, I'd rather not have this sitting as a PR for too long
```
