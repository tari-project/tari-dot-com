---
layout: post
title: Tari Protocol Discussion 34
date: 2019-05-02 20:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-34.png
lead: Persistence storage strategy for the Tari network
class: subpage
---

On Thursday, the Tari community discussed the storage strategy surrounding UTXO's. Below is the TL;DR on Thursday's conversation (full transcript included below):

- Use LMDB
- UTXO's stored in a MMR
- Pruning should be carefully looked at

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
10:32 <@CjS77>  IRC dev chat in 30 - we'll be chatting about persistence strategy for Tari
11:01 <Hansie>  Hi, what shall we chat about?
11:02 <Hansie>   persistence strategy?
11:03 <@CjS77>  We've landed on LMDB as a key-value store for persisting blockchain state, but there are a few architectural decisions we could make.
11:04 <Hansie>  Are we talking base layer only?
11:04 <@CjS77>  For example UTXO set -- This is represented as a straight set of UTXOs, but there's also an MMR that tracks the UTXO set (since we commit to the UTXO set in every block header)
11:05 <@CjS77>  Yes, base layer only for now
11:05 <neonknight64>  Will the UTXO set be ordered?
11:05 <Blackwolfsa>  it needs to be for the mmr to work
11:05 <Hansie>  Do you mean per block?
11:06 <Blackwolfsa>  Both per block and per total state
11:06 <@CjS77>  Well, I'm tihnking the UTXO data itself is stored as a key-value lookup with the UTXO hash being the key
11:06 <@CjS77>  but Blackwolfsa might have some other thoughts
11:06 <Hansie>  Does this include the range proofs MMR as well?
11:09 <simian_za>  The MMR is a vector right? The position in the vector is where the node is in the MMR and the data at that location is the hash of that node?
11:16 <neonknight64>  Yes, if I remember correctly, the MMR (tree) is stored as a 1-dimensional vector
11:20 <simian_za>  How does LMDB do when storing a linear indexed vector?
11:25 <@CjS77>  afaik LMDB is key-value only, so you'd use the index as the key. If you pop an item from the middle of the vector so that subsequent indices change, this would be very inefficient.
11:29 <Hansie>  So if I understand the problem we are trying to solve correctly, if we have enough meta data (e.g. structure info) for the value in the key-value pair we could just start with the 1st valid index up to the last valid index (or any other sorting order) and store it. When reading it back the MMR could be reconstructed efficiently?
11:30 <moneromooo>  Popping an item in the middle is not actually inefficient.
11:31 <@CjS77>  Surely if all the keys have to change, that would suck?
11:34 <simian_za>  If you are implementing an indexed vector on top of a hashmap it does feel like it will be difficult to remove an item in the middle as you need to shuffle the keys above that index down to not leave a gap in the indices
11:34 <moneromooo>  If they *all* do, yes.
11:38 <simian_za>  but if the indices don't need to be shuffled its totally fine and in MMRs they dont change?
11:50 <Blackwolfsa>  I was thinking about storing the indexes aka mmr and the actual data separately in lmdb
11:51 <Blackwolfsa>  Because even if you prune the mmr, the index and or hashes never change
```
