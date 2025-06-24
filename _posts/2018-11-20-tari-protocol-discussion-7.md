---
layout: post
title: Tari Protocol Discussion 7
date: 2018-11-20 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-7.png
lead: Proposals from past Tari protocol discussions
class: subpage
---

On Thursday, a brief Tari protocol architecture discussion was held to analyze the first set of Tari protocol proposals.

Right now there are 4 rough architecture ideas on GitHub for the Tari community to review and submit pull requests on.

[Some Architecture Objectives to Keep in Mind](https://github.com/tari-project/RFC/blob/master/proposals/181029-overview.md)

[High Level Design Proposals](https://github.com/tari-project/RFC/blob/master/proposals/181102-high-level-design.md)

[Tari Network Terminology](https://github.com/tari-project/RFC/blob/master/Glossary.md)

[Base Layer Architecture Proposals](https://github.com/tari-project/RFC/blob/master/proposals/181107-base-layer-architecture.md)

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
4:09 AM <@cjs77> I invite everyone to take a look at the first set of proposals on https://github.com/tari-project/RFC
4:10 AM <@cjs77> The content there a primarily a distillation of the conversation on this channel to date
4:11 AM <@cjs77> It’s still very rough; there are lots of typos I’m sure; so I’d love any / all in the community to get involved and submit PRs for improvements and / or discuss issues and concerns about the proposals here
4:12 AM <@cjs77> The focus so far is on i) The base layer and ii) building a common vocabulary. The second layer proposals are still incubating :)
4:13 AM <Hansie> Looking good
4:14 AM → el00ruobuob joined (~el00ruobu@212.121.161.50)
4:14 AM <@cjs77> Also, if anyone has some crazy good ideas to solve any of the (many) problems a digital assets network presents, you’re free to open a PR with a _new_ proposal; and we can hash out the ideas on the channel
4:15 AM <@cjs77> The broad idea is that the proposals eventually become RFCs which will basically form the spec for the Tari protocol.
4:17 AM <tk___> 👌
4:23 AM <Hansie> Q: In ‘181107-base-layer-architecture.md’, with ‘MessageBus’, how resilient is the MessageBroker?
4:28 AM <@cjs77> It is essentially this patter: http://zguide.zeromq.org/page:all#toc39
4:29 AM <@cjs77> PH claims a single thread can handle 1Gb/s of throughput
4:29 AM <@cjs77> Not sure if that answers your question
4:31 AM <Hansie> I was wondering if the MessageBroker could be distributed in itself, to be able to run via multiple nodes.
4:50 AM <@cjs77> The idea of the MessageBroker is to collect messages from various sources and send them to things that are interested in those messages *within a single node’s ecosystem*. You’d have one (or more, depending) broker per node. The proposal doesn’t actually cover P2P communication. fluffy suggested zMTP as the protocol for that, which is totally compatible with the proposed architecture
4:53 AM <@cjs77> But essentially what happens is, a node sends a message to a peer via the connection they have, which will hit the receiving node’s `MessagePublisher` that’s responsible for listening for messages from peers, and pass the message onto _its_ `MessageBroker`. Does that make sense?
4:53 AM <tk___> “TODO: Difference between pruned nodes and archival nodes, particularly WRT to syncing” is Tari considering having 3 types of nodes (full, pruned and archival) or am I reading this incorrectly?
4:58 AM <@cjs77> Since MimbleWimble offers cut-through, there’s an opportunity to dramatically shrink the blockchain state; I’m calling that a pruned node, maybe there’s a better name; but some nodes might want to track the full transaction history. They’re both full nodes; and their seeding strategies might be different
4:58 AM <@cjs77> *full base layer nodes
5:00 AM <Hansie> @cjs77: Yes thanks, this makes sense — *within a single node’s ecosystem*
```
