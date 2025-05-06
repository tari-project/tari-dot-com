---
layout: post
title: Tari Protocol Discussion 11
date: 2018-11-30 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-11.png
lead: Achieving reliable consensus with second layer validator nodes.
class: subpage
---

Yesterday’s Tari protocol discussion revolved around one specific technical question.

After reading through one of Tari’s [rough GitHub documents](https://github.com/tari-project/RFC/tree/master/proposals), Tari community member ‘@neonknight’ had a question about validator nodes and reaching consensus.

Specifically, ‘@neonknight’ wanted to know how many second layer validator nodes are needed per asset or instruction to reach a “reliable” consensus? The transcript below captures the opinions and thoughts presented by the Tari community.

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of yesterday’s discussion

```
4:06 AM <mikethetike> let’s go!
4:07 AM <neonknight> Hi everyone..
4:28 AM <neonknight> How many validator nodes (on second layer) do you think is needed per asset or instruction to reach a “reliable” consensus?
4:42 AM <neonknight> I realise that the amount of validator nodes that might be required changes when the validator nodes were selected in a “Permissioned” or “Permissionless” sense. More Validator nodes will be required to reach a “reliable” consensus when you don’t know the validator nodes that will be used.
4:52 AM <@cjs77> Are there any comments on the proposed code structure for the protocol? https://github.com/tari-project/tari/pull/2
4:58 AM <Hansie> @neonknight I think in both cases it could be up to the asset issuer to decide how many validator nodes should participate. The amount of nodes required for consensus could simply be according to whatever consensus mechanism/protocol was chosen, for example success/consensus could mean f < (n-1)/2, f<n/2 or f < n/3 with f being the nodes not in agreement or not responding.
5:00 AM <neonknight> That makes sense..
5:02 AM <Hansie> https://www.irccloud.com/pastebin/YKkyzS7u/
5:02 AM <Hansie> From: https://tlu.tarilabs.com/consensus-mechanisms/BFT-consensus-mechanisms-applications/Introduction.html “For systems with n nodes, of which f are Byzantine, it has been shown that no algorithm exists that solves the consensus problem for f > n/3.”
```
