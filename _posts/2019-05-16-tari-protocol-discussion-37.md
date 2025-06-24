---
layout: post
title: Tari Protocol Discussion 37
date: 2019-05-20 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-37.png
lead: Validator Node registration
class: subpage
---

On Monday, the Tari community discussed the Validator Node registration. Below is the TL;DR on Monday's conversation (full transcript included below):

- Require some timelocked funds to be sybil resistant
- It needs to be renewable
- Validator nodes require random IDs

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
18:09 <Hansie>  Hi there
18:10 <Hansie>  We have not discussed VN registration in a long time
18:11 <Hansie>  That would be `RFC-0322: Validator Node Registration`
18:11 <Hansie>  Anyone care to discuss?
18:12 <simian_za>  Sho, it has been a while. I suppose it will be worth revisiting now that we have spent more time on the base layer stuff
18:12 <Hansie>  Yip
18:13 <simian_za>  So the goal of the registration was to tie a VNs identity to a base layer transaction with a cost that mitigates Sybil attacks right?
18:14 <Hansie>  Yes, that sounds about right.
18:14 <neonknight64>  and to obtain a node ID for the communication layer
18:14 <simian_za>  We didn't want the registration fee to be paid to anyone in particular, we just wanted to tie it up so it cannot be spent for a certain period
18:16 <Hansie>  So let us continue with `Assumptions - VN Registration: `, then `Assumptions - Game theory` and lastly `Use cases:`. Is that a plan?
18:16 <neonknight64>  we also need a mechanism to allow the registration to be renewed.
18:16 <stanimal>  How long would that be locked up for?
18:17 <Hansie>  We previously had suggestions of fixed term (e.g. 6 months)
18:18 <simian_za>  And this registration can be used for the VN to participate in multiple assets?
18:20 <Hansie>  Yes, I think so. The amount and time-lock period could be confirmed with modelling  -  'Network Analysis'
18:21 <stanimal>  I would say so, that would allow them on the network and allow them to be discoverable
18:22 <simian_za>  Cool, well if it allows for reuse then 6 months seems reasonable
18:22 <stanimal>  ^ Join the network as a VN, they would still be able to join the network (as a wallet?) to pay the registration fee presumably
18:23 <simian_za>  What do you mean by wallet? We can't expect end-users with asset wallets to have to register in this way?
18:24 <simian_za>  Hansie: I feel it might be more useful to start with the `Use cases` so why know what functionality we need this process to serve
18:25 <neonknight64>  Stanimal, I believe the wallet will be a separate entity with its own node id,  but the wallet can pay the registration fees on behalf of the VN allowing the VN to join with the registered node id
18:25 <stanimal>  Well it's a bit of a chicken and egg situation, in order to obtain your NodeID to be a VN on the network, you'll need some way to pay the registration and claim your NodeID
18:26 <simian_za>  but the payment happens on the base layer where NodeIDs can be chosen by the wallets?
18:26 <stanimal>  Yup, guess this could be part of the VN software
18:27 <neonknight64>  Wallets do not propagate messages and can derive a node id from the its identification public key
18:28 <neonknight64>  no base layer registration needed
18:28 <simian_za>  Ok, so the purpose of VNs registering in this way is to secure a NodeID for use on the second layer that is not chosen or derived by their wallet but by the base layer network making it much more secure
18:29 <simian_za>  they need this kind of NodeID if they want to participate in DAN committees
18:29 <stanimal>  Join as a wallet, pay the registration, obtain the NodeId and rejoin with the new NodeId - correct, the base layer is a random oracle
18:31 <simian_za>  So that's really the main use case here, is to make sure that the NodeID that they are using when accepting and sending messages as part of an Asset committee comes from a NodeID that was fairly chosen by the random oracle
18:31 <Hansie>  Makes sense
18:32 <Blackwolfsa>  It's only the VNs that need that random ID right?
18:32 <simian_za>  it needs to cost something so that its expensive to try "mine" a NodeID for malicious purposes
18:33 <Hansie>  I would say properly registered and identifiable, not really 'fairly chosen by the random oracle'
18:33 <stanimal>  Exactly, prevent adaptive join/leave attacks and help randomize network topology - which benefits the network as a whole (base layer included)
18:33 <simian_za>  well it is though, maybe not fairly but it was produced by the random oracle. Thus the NodeID they receive will be "random"
18:34 <simian_za>  so nix the word "fairly"
18:34 <Hansie>  Ok, understood
18:34 <Hansie>  Blackwolfsa: What else could need the random ID?
18:35 <simian_za>  I can't think of another entity right now that would need the random NodeID
18:35 <neonknight64>  Blackwolf.. Wallets, Token Wallets, Base Nodes and Validator Nodes need random ids
18:35 <neonknight64>  but only VNs need to register for them
18:35 <Blackwolfsa>  Why would they need random ID?
18:35 <Blackwolfsa>  They could chose their own ids they just need to be unique?
18:36 <stanimal>  However, all except VNs are currently trusted to create a random ID
18:36 <simian_za>  the registration process is the only way to ensure the NodeID is properly random. It would be ideal for them all to properly random though but can't really be enforeced
18:37 <stanimal>  Ye without some kind of enforceable distributed RNG
18:37 <simian_za>  Blackwolfsa: an attacker can chose NodeIDs in a malicious way to do things like eclipse a victim but ja can't really be enforced. The VNs are actually our best defense against this
18:37 <neonknight64>  I think every entity should have an identification key pair and a node id derived from this key pair or obtained from registering
18:38 <Hansie>  So the registration UTXO will be time-locked and mined in the base layer... and that process will be used to identify/create the VN ID?
18:38 <simian_za>  Hansie: Yes
18:38 <Hansie>  So what happens when the lock expires?
18:38 <stanimal>  neonknight64 That would mean a cost for anyone joining the network?
18:39 <Blackwolfsa>  I think we need to allow them to extend the registration
18:40 <Blackwolfsa>  But if that expires they should be seen as unregistered
18:40 <stanimal>  oh nm, reread your comment - keypair OR registration ;)
18:40 <simian_za>  I guess they can spend that UTXO, how will they be able to maintain their registration to keep their NodeID?
18:40 <simian_za>  Maybe we should define what metadata the UTXO has? It is not just a plain mimblewimble UTXO
18:41 <Hansie>  Yes. Maybe the registration UTXO can be spent only if it is a re-commitment to an increased term; any other spend will not be allowed. If it lapses the VN is out of action.
18:43 <neonknight64>  Can that be done using some for of consensus rule or script?
18:43 <Hansie>  neonknight64: Can the VN ID be determined before the Tx is mined?
18:43 <neonknight64>  form*
18:44 <neonknight64>  hansie, do you mean NodeID? No the NodeID cannot be determined before the time
18:44 <neonknight64>  it must be mined
18:44 <simian_za>  Hansie: that is a good point...the NodeID will need to be derived from some data involved in mining the transaction
18:44 <simian_za>  so how can it be included in the metadata?
18:45 <Hansie>  Great, so the VN nodeID cannot be part of the meta data :-)
18:46 <simian_za>  hmm that's tricky. We can't reference the first tx if we try extend the timelock because of tx pruning...
18:46 <neonknight64>  I original NodeID could maybe be in the metadata when the registration is renewed as the new block will produce a different NodeID
18:46 <simian_za>  How will someone be able to verify the NodeID if the original tx gets pruned?
18:48 <neonknight64>  Not sure, but an invalid renewal should not appear in the base layer if the NodeID transfer is incorrect.
18:48 <Hansie>  So we can have (a) time-lock (b) type=VN registration (c) counter for consecutive registrations (d) previous nodeID (e) ...
18:48 <Blackwolfsa>  Yes but we need to be able to verify that
18:50 <Hansie>  A registration UTXO can only be spent/renewed by the owner as the only person that can open that commitment
18:51 <Hansie>  Miners can validate the counter and link to the previous UTXO
18:51 <simian_za>  Ok so another aspect of the UTXO will also be that a 3rd party needs to be able to verify the amount that is locked up
18:52 <simian_za>  Hanise, but the previous UTXO will be pruned eventually
18:52 <Hansie>  That one is potentially tricky
18:53 <Hansie>  Yes, so the current UTXO identifies the previous UTXO and times the registration has been carried forward
18:55 <simian_za>  Hmmm, going to have to ponder this some more
18:57 <Hansie>  Agreed
18:57 <simian_za>  Obviously, we could just ensure that these kind of TXs are not pruned but that is not ideal at all
19:01 <Blackwolfsa>  But I think we should try out at best to avoid that
19:05 <stanimal>  This may be dumb, but couldn't you hash the kernel for the nodeID - since there will be a base layer fee the miners choose the blinding factor making the kernel random each time (i.e not chosen by the VN)
19:09 <Blackwolfsa>  But then it changes every time if I understand you correctly
19:10 <simian_za>  Could reference the first kernel some how, that doesn't get pruned
19:11 <Blackwolfsa>  That could work..
```
