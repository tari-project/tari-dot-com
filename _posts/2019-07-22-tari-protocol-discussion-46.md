---
layout: post
title: Verification Times of Multiparty Payment Channels
date: 2019-08-26 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-46.png
lead: Verification times of multiparty payment channels
class: subpage
topics:
- Validation times for checkpoint transactions
---

On Monday, the Tari community discussed potential verification times of multiparty payment channels.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday discussion
```
18:03 <Hansie> Hi there, time for our Monday dev chat.
18:04 <Hansie> We have explored bounding cases for checkpoint transactions w.r.t. block size. There are also validation time and data transmission size limitations.
18:12 <Hansie> I have refined the numbers a bit, and have a low and high throughput scenario:
18:13 <Hansie> Low
18:13 <Hansie> Transactions/CP               1 440 000
18:13 <Hansie> Transactions/s                    16.00
18:13 <Hansie> Gearing                            1.10
18:13 <Hansie> UTXOs per CP                    432 000
18:13 <Hansie> Kernel data to hash (MB)/CP      146.94
18:13 <Hansie> UTXO data to hash (MB)/CP        293.75
18:13 <Hansie> Data to hash (MB)/CP             440.69
18:13 <Hansie> Data to hash (MB)/min              0.31
18:13 <Hansie> Bulletproof verify (h)            0.054
18:13 <Hansie> Signature verify (h)              0.012
18:13 <Hansie> Hash verify (h)                 0.00013
18:13 <Hansie> Total validation time (h)         0.066
18:13 <Hansie> Validation time/block (s)         0.165
18:13 <Hansie> High
18:13 <Hansie> Transactions/CP             144 000 000
18:13 <Hansie> Gearing                          117.40
18:13 <Hansie> Transactions/s                 1 666.00
18:13 <Hansie> UTXOs per CP                 43 200 000
18:13 <Hansie> UTXO data to hash (MB)/CP     29 374.69
18:13 <Hansie> Kernel data to hash (MB)/CP   14 694.21
18:13 <Hansie> Data to hash (MB)/CP          44 068.91
18:15 <Hansie> Validation times estimated based on single core operation of an Intel Core i7-6820HQ clocked at 2 GHz.
18:16 <Hansie> For 14 400 000 users in the DAN
18:16 <Blackwolfsa> is an i7 not a bit too highpowered for this test?
18:18 <Hansie> Maybe, maybe not, just a peg in the sand.
18:18 <Hansie> Refunds for both scenarios looks as follows:
18:18 <Hansie> Transactions/CP             14 400 000.00
18:18 <Hansie> UTXOs per CP                14 400 000.00
18:18 <Hansie> Kernel data to hash (MB)/CP      1 469.42
18:18 <Hansie> UTXO data to hash (MB)/CP        9 791.56
18:18 <Hansie> Data to hash (MB)/CP            11 260.99
18:18 <Hansie> Bulletproof verify (h)               1.80
18:18 <Hansie> Data to hash (MB)/min                7.82
18:18 <Hansie> Signature verify (h)                 0.12
18:18 <Hansie> Hash verify (h)                    0.0029
18:18 <Hansie> Total validation time (h)           1.923
18:18 <Hansie> Validation time/block (s)           4.807
18:19 <Hansie> Blackwolfsa: This is just to get a feel for the size of the problem.
18:26 <Hansie> The premise of this scheme is for users to pay funds into a single committee controlled UTXO (checkpoint UTXO), and to get an equal amount of funds available in the payment channel. This peg-out to be atomic, with a commitment to the payment channel state. The committee will ever only have one checkpoint UTXO on the base layer, always spending the
18:26 <Hansie> previous checkpoint UTXO.
18:26 <Hansie> Base nodes are then required to validate the supporting data set for the checkpoint.
18:30 <Hansie> Checkpoints involve committing to the set of information that fully describes the state of all payment channel transactions and UTXOs at a certain point in time, and to immutably add that result to the Mimblewimble blockchain.
```
