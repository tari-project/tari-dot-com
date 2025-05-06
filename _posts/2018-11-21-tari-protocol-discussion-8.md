---
layout: post
title: Tari Protocol Discussion 8
date: 2018-11-21 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-8.png
lead: A review of the Tari protocol GitHub repository
class: subpage
---

Yesterday, a brief Tari protocol architecture discussion was held to source ideas and discussion around Tari’s GitHub repository content.

Right now there are 4 rough architecture ideas on GitHub for the Tari community to review and submit pull requests on.

[Some Architecture Objectives to Keep in Mind](https://github.com/tari-project/RFC/blob/master/proposals/181029-overview.md)

[High Level Design Proposals](https://github.com/tari-project/RFC/blob/master/proposals/181102-high-level-design.md)

[Tari Network Terminology](https://github.com/tari-project/RFC/blob/master/Glossary.md)

[Base Layer Architecture Proposals](https://github.com/tari-project/RFC/blob/master/proposals/181107-base-layer-architecture.md)

The above documents are still only rough ideas that will be migrated to RFCs based on ideas, improvements, and proposals from the Tari community.

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
12:49 PM <@cjs77> Let’s get some discussion going around the content in the github repos. Keep in mind, the `proposals` are not meant to be fully-fledged RFC’s; they’re rough and ready docs meant to stimulate discussion around the ideas proposed. They’ll be polished by the time they migrate to RFCs; in the meantime, submit PRs where you think the ideas are bad; even if it’s to fix typos/grammar or chat about it here first
1:00 PM <atomicwood> looking good on the proposal, havent had a chance to research into some things deeper yet… but, might discussing how the package gets packed and addressed? i like idea of the modules you outlined cj…
1:04 PM <@cjs77> > the package gets packed and addressed
1:04 PM <@cjs77> Do you mind elaborating a bit?
1:04 PM <gagarin55> hi all, its my first time, just listen ;)
1:04 PM <mikethetike> welcome
1:04 PM <@cjs77> welcome, gagrin55
1:09 PM <gagarin55> cjs77, i see you took some rust libs from ETCDEV ;) happy that it is useful for someone
1:09 PM <mikethetike> these proposals? https://github.com/tari-project/RFC/tree/master/proposals
1:11 PM → cardboardoranges joined (~cardboard@65.112.8.201)
1:11 PM <atomickid> well best i can say at this time is that might thinking about how say a mobile user might contact/interact with a larger node system? the modules might be easier to get built, thinking with this in mind? the lite tari protocal heh
1:17 PM <atomickid> ill have something more detailed, sorry if im going to far ahead, i will reaearch the proposal soon^tm
1:33 PM <Hansie> Hi
1:35 PM <atomickid> hey hansie, got a DA stamp laying around?? :D
1:36 PM <Hansie> Lost it :-)
1:41 PM <@cjs77> gagarin55: which libs? The secp256k1 lib?
1:44 PM <@cjs77> atomickid: yeah, that’s a great point and something we genuinely aim for. If the project is well laid out and very modular, it should make it easier for contributors to i) get up to speed and ii) build tools that they want, incl mobile clients etc
1:48 PM <Hansie> I think the content in the github repos is a great start, so I have a question…
1:48 PM <gagarin55> cjs77: yes
1:49 PM <@cjs77> oh yeah! they were super useful
1:49 PM <Hansie> Should the asset issuer’s investment be protected from 2nd layer validator nodes not contributing but not due to bad acting, or only from bad actors,?
```
