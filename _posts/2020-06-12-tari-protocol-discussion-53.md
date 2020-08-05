---
layout: post
title: Aurora Improvement Community Discussion
date: 2020-07-30 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-53.png
lead: Aurora Improvement Community Discussion
class: subpage
topics:
- What features would make Aurora even better?
---

On Thursday the Tari community discussed potential improvements or new features for the Tari Aurora wallet, which serves as a reference-design for Tari. Some highlights below.


*   Ability to log in without using biometrics on devices with biometrics enabled was suggested and well received.
*   Potential ways to approach one-sided transactions were discussed 
*   Chat functionality that would allow people to send messages back and forth in app was well received by the community.

Please feel free to keep the conversation going by joining the discussion thread on [Telegram](https://t.me/tarilab) or #Tari on Freenode.



Below is a full transcript of the conversation.


### **Transcript of Thursday discussion**

This is a snapshot taken of the Telegram conversation (bridged to #Tari on Freenode)  on Thursday, July 30th, 2020.

```
Ю ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ), [Jul 30, 2020, 11:01:25 AM]:
aurora discussion? 
pls builds on fdroid soonish, thnx

Riccardo Spagni, [Jul 30, 2020, 11:02:13 AM]:
fdroid that

Cayle, [Jul 30, 2020, 11:02:15 AM]:
Yes, The AURORA discussion starts now

Tal, [Jul 30, 2020, 11:02:44 AM]:
Woohooooo

lsquared, [Jul 30, 2020, 11:02:49 AM]:
Litty

Tal, [Jul 30, 2020, 11:03:17 AM]:
The release that was mentioned in the last email is out on Android, btw, but is still in iOS review purgatory

In case anyone was confused

Victor B, [Jul 30, 2020, 11:03:27 AM]:
Is there any plan to implement login without biometrics?

Kutsal, [Jul 30, 2020, 11:03:48 AM]:
If you have biometrics disabled on your device it's possible already.

We think phone security is wallet security, so the way you secure your phone is the way you secure your wallet.

Victor B, [Jul 30, 2020, 11:04:44 AM]:
Can you access that feature at all if biometrics is enabled or is it hidden?

Tal, [Jul 30, 2020, 11:04:47 AM]:
The one aurora feature that's being worked on I am SUPER excited about is gifs in transaction notes

Riccardo Spagni, [Jul 30, 2020, 11:05:09 AM]:
Victor so you mean you unlock your phone with biometrics, but then Tari Aurora has a separate PIN?


I could see that being useful

... useful

Victor B, [Jul 30, 2020, 11:05:31 AM]:
Correct

Riccardo Spagni, [Jul 30, 2020, 11:05:39 AM]:
that's a great idea

Tal, [Jul 30, 2020, 11:06:00 AM]:
Is that in case your biometrics get compromised?

John Davies, [Jul 30, 2020, 11:06:25 AM]:
non-interactive (one-sided) txs please 😘

Victor B, [Jul 30, 2020, 11:06:39 AM]:
Or if you want additional security for a wallet app that’s holding funds

Tal, [Jul 30, 2020, 11:06:42 AM]:
hahaha +100000000000000000

Victor B, [Jul 30, 2020, 11:06:58 AM]:
I don’t enable the biometrics on many of my financial apps

lsquared, [Jul 30, 2020, 11:07:32 AM]:
Yes this would be nice

John Davies, [Jul 30, 2020, 11:08:25 AM]:
openalias could improve the UX of sending to peopel

Kutsal, [Jul 30, 2020, 11:09:57 AM]:

I'm not fully on top of how it could be possible, would the protocol allow it? @loopster
Kutsal, [Jul 30, 2020, 11:09:57 AM]:


Jason, [Jul 30, 2020, 11:11:05 AM]:
Same, always worried my wife points my phone at my face when I'm not concentrating

sw, [Jul 30, 2020, 11:11:15 AM]:
Not that easy in MW...

Victor B, [Jul 30, 2020, 11:11:24 AM]:
🤣

TariIRCBouncer, [Jul 30, 2020, 11:11:24 AM]:
[irc] <stringhandler> "would the protocol allow it?" We are working on it

[irc] <stringhandler> as in it's on the roadmap

John Davies, [Jul 30, 2020, 11:12:03 AM]:
im blocked from posting links but there is a LIP for it on litecoin

John Davies, [Jul 30, 2020, 11:13:19 AM]:
i believe gottscoin has another method for it as well

sw, [Jul 30, 2020, 11:13:42 AM]:
I know there are problems with the original proposal posted by grin.

But it is something I think we would all like if we can have it secure

John Davies, [Jul 30, 2020, 11:14:03 AM]:
and there's the less desirably half-built invoice txs that could be used by senders to pay recipients pre-defined values (not so bad for merchants, but not exactly what most users would want)

John Davies, [Jul 30, 2020, 11:14:43 AM]:

theres a rogue key attack that has been solved but not updated on proposal yet because grin wont implement the method and litecoin wont need it for a few months
John Davies, [Jul 30, 2020, 11:14:43 AM]:


Tal, [Jul 30, 2020, 11:15:13 AM]:
https://github.com/DavidBurkett/lips/blob/master/lip-0004.mediawiki

thx for pointing me to this @johndavies24

Is this the one you were referring to? Or is there something more recent now?

Kutsal, [Jul 30, 2020, 11:16:17 AM (Jul 30, 2020, 11:17:04 AM)]:

I think we have support for this with QR codes - one could embed the recipient and the amount, and the QR code will take you to the pre-completed add amount screen (with recipient selected).



Kutsal, [Jul 30, 2020, 11:16:17 AM (Jul 30, 2020, 11:17:04 AM)]:


John Davies, [Jul 30, 2020, 11:16:30 AM]:
that is the one, david said he'd help me update it if I ported the LIP to a grin RFC but the belief is grin core wont implement it so thats why he hasnt done it

*update it with the rogue key attack fix

John Davies, [Jul 30, 2020, 11:17:41 AM]:
problem with this is you either need a large number of pre-built half-transactions OR you have to support replayable kernels and there are a slew of issues with replay attacks

Tal, [Jul 30, 2020, 11:17:59 AM]:
that's not the same as an invoice tx though, i think

or are you saying that the tx itself would include a qr code

Blue, [Jul 30, 2020, 11:19:05 AM]:
I figured. Like I said yesterday, if Tari Labs isn't selling Tari directly to companies, someone else will.
They will buy directly off exchanges becoming the entire Tari ecosystem.

John Davies, [Jul 30, 2020, 11:19:13 AM]:
it shouldnt be a problem to fit a half-tx in a qr code

sw, [Jul 30, 2020, 11:19:23 AM]:
You can do that, but then your qr code is only use once

Kutsal, [Jul 30, 2020, 11:20:20 AM]:

hm i see, so you need to bind the tx to a specific invoice? so it's that for invoice only and not a generic payment?

Kutsal, [Jul 30, 2020, 11:20:20 AM]:


John Davies, [Jul 30, 2020, 11:21:17 AM]:
or you allow repayable kernels and it could be used many times
or you have a connected device create new ones on demand, but that's interactive

sw, [Jul 30, 2020, 11:21:25 AM]:
Yeah, but nothing stops you from doing that. You can do that and include all your "receiving" info in a qr. This is then your custom created invoice, and can be a one sided tx

John Davies, [Jul 30, 2020, 11:22:38 AM]:
duplicate outputs could be an issue with a reusable system as well, right? The recipient would have to define the output and blinding factor

sw, [Jul 30, 2020, 11:22:40 AM]:
what do you mean by a repayable kernel

sw, [Jul 30, 2020, 11:23:05 AM]:
yes it is, hence why its a custom created invoice

John Davies, [Jul 30, 2020, 11:23:29 AM]:
recreating an output by using the same tx kernel that was previously used (but the output would have had to be spent to replay the kernel)

sw, [Jul 30, 2020, 11:25:04 AM]:
so your still creating a duplicate hash

John Davies, [Jul 30, 2020, 11:25:18 AM]:
i'll stop derailing, we can move on, but one-sided txs in this format seemingly either need duplicate outputs, replayable kernels or many of the half-built txs ready to serve and use once

Kutsal, [Jul 30, 2020, 11:26:06 AM]:
alright thanks John, I can't say I understand it fully, but it sounds like the app would need platform support to implement that.

all I can say is with the app as it is we can have more custom fields encoded in a QR

So some of the features we've been working on include tabbed navigation in home screen, updated transaction list design (more info visible for each transaction in the list) and Giphy integration for transaction messages.

And before all this 0.3.0 releases contain automated and encrypted cloud backups. iOS is being reviewed literally now and Android is out already.

Once you turn on backups your wallet gets backed up automatically with every change in your wallet. These changes happen with visible and some invisible transaction events. And through the backup settings screen you can pick a passphrase for your backup that will be used to encrypt your backup.

Yet, the design and development process can sometimes feel like an echo chamber if the discussion is always internal, so for some time now we've been thinking about asking the users their ideas for cool new features.

So please let us know what functionality you think could make the app more useful, and the pains you might be having if you're already using it, and we'll be happy to discuss how to get there: )

Victor B, [Jul 30, 2020, 11:38:06 AM]:
Any plans to do a seed phrase wallet back up for those of us that don’t trust no damn cloud

Kutsal, [Jul 30, 2020, 11:41:41 AM]:

Yep, actually the product and design teams have already prepared the design for it, and we have implemented the non-functional screens, but AFAICT it's not trivial to do it with MimbleWimble and we need to put more work into the platform side of it. But yes, it's in our todo list: )


Jason, [Jul 30, 2020, 11:41:43 AM]:
Yes, there's just a few protocol changes required first as it's not something easily done with mimble wimble

TariIRCBouncer, [Jul 30, 2020, 11:42:02 AM]:

[irc] <stringhandler> I like the idea of sending a message with the transaction, is there anyone else who'd like to see a bit of chat functionality, or is it just me?

TariIRCBouncer, [Jul 30, 2020, 11:42:02 AM]:


Kutsal, [Jul 30, 2020, 11:45:40 AM]:
I find this really exciting.

TariIRCBouncer, [Jul 30, 2020, 11:47:24 AM]:
[irc] <stringhandler> No need to try compete with Telegram or Whatsapp, but I like the idea that if I send you money you can reply with a thumbs up or "Thanks"

IdontKnow, [Jul 30, 2020, 11:47:59 AM]:
some sent msgs in txs that later where cancelled. 
how long for a tx to be non-cancellable?

🆗I guess it would be untill block found?

Jason, [Jul 30, 2020, 11:51:31 AM]:
Until the receiver has signed their part and replied to the sender

Once that has been done the tx is considered "complete" and it's broadcast to the mempool where there's no stopping it

Kutsal, [Jul 30, 2020, 11:53:05 AM]:

which means you cannot cancel a tx if you're the recipient.


Cayle, [Jul 30, 2020, 11:53:16 AM]:
Yes, while there’s no real roadmap, it’s on the radar

Victor B, [Jul 30, 2020, 11:57:01 AM]:
Will Aurora ever be a multicoin wallet or will it stay Tari only?

Riccardo Spagni, [Jul 30, 2020, 11:57:24 AM]:
no

IdontKnow, [Jul 30, 2020, 11:57:27 AM]:
Thanks. it is still unclear to me, which means I don't understand the protocol. I'll look into it.

Riccardo Spagni, [Jul 30, 2020, 11:57:30 AM]:
Tari only

Victor B, [Jul 30, 2020, 11:57:47 AM]:
Not even monero 😏

?

Riccardo Spagni, [Jul 30, 2020, 11:57:59 AM]:

maybe in future it'll allow Tari assets, maybe it'll allow atomic swaps with Monero (and thus *might* have to run a Monero wallet), but it's primarily meant to be a tech demonstrator


Jason, [Jul 30, 2020, 12:01:19 PM]:
Looks like 0.3.0 for iOS was just approved 👍

Kutsal, [Jul 30, 2020, 12:02:28 PM]:
phew 😄🎉

So this backup & restore feature was a large one and it took us some time to get to this initial version, really looking forward to feedback 👀

Cayle, [Jul 30, 2020, 12:08:16 PM]:
I’m also interested to know how many people would find a chat feature useful, you can approximate it now by sending tiny amounts of Tari with your message, but that’s very much overkill just to say “Hi what’s up?"

And what about better address book functionality? E.g. connecting the emoji ids with your actual devices contact list; So if you search your contact list, the “Send Tari” button is there alongside “Send text” or “Make call"

Who would like advanced coin selection when sending?

Output consolidation?

Coin splits?

Does anyone point their wallet to their own base node? Or do you just use the default seed nodes?

Victor B, [Jul 30, 2020, 12:13:54 PM]:
I just use the defaults

Cayle, [Jul 30, 2020, 12:13:59 PM]:
Send your answers to 🌠🎭😱🐞🎧🐀🌝💊🌍🌝🎷🐓🌊🎩🚲🎸💊🚢🌷🌈🍚🚨🎵📝🔥🏁💻🐰🍬🔧🐐🎀🏉

🙂

jk. I mean you could, but here is good.

John Davies, [Jul 30, 2020, 12:14:44 PM]:
definitely this and the ones above it, also coin swap would be cool

Kutsal, [Jul 30, 2020, 12:14:59 PM]:
@loopster I'm guessing it would introduce secure P2P chat over Tor?

John Davies, [Jul 30, 2020, 12:15:08 PM]:
maybe a full mobile node that is maximally pruned

(i.e. unable to seed new nodes but fully validating)

Cayle, [Jul 30, 2020, 12:15:38 PM]:
That’s already a feature BTW John. It’s just hidden away

John Davies, [Jul 30, 2020, 12:15:48 PM]:

which one, swaps or full node?

Cayle, [Jul 30, 2020, 12:15:53 PM]:
full node

John Davies, [Jul 30, 2020, 12:16:09 PM]:
cool, you guys just introduced prune and you already got it on mobile!?

Cayle, [Jul 30, 2020, 12:17:04 PM]:
@kutsalkaan Tari already has this P2P messaging protocol  to send transaction messages. Text messages would just be another flavour,. The same privacy and security properties would apply.

John Davies, [Jul 30, 2020, 12:17:48 PM]:
this is actually not a great idea, but maybe some people would want it for some reason, but bad for privacy

Larry Cooke, [Jul 30, 2020, 12:18:19 PM]:
I haven't been able to get Aurora 0.3.0 to open on Android 11 beta 2.5 (RPB2.200611.012). Loads splash screen then authenticates with PIN or bio-metrics, then immediately closes

John Davies, [Jul 30, 2020, 12:18:28 PM]:
so when i said the ones above your point to your own node message, i didnt mean that one, lol

Cayle, [Jul 30, 2020, 12:18:36 PM]:
@johndavies24 Maybe I’ve misundertood you. You can currently configure Aurora to use any full node, is what I meant.

Kutsal, [Jul 30, 2020, 12:20:08 PM]:
thanks for the info Larry, was it a clean install or an update? I'm going through crash reports.

Cayle, [Jul 30, 2020, 12:20:35 PM]:
Full mobile nodes are not likely any time soon. The battery consumption is pretty heavy already. I’m not sure users would tolerate a pocket warmer

John Davies, [Jul 30, 2020, 12:22:24 PM]:
but raspberry pi, or tablets, or always plugged-in mobile devices would appreciate it.  Also, some might prefer that it if there was an option to only have it sync once a day or whenever the app is opened and they accept they'll have to wait

Cayle, [Jul 30, 2020, 12:22:50 PM]:
I don’t know if everyone knows this. but the Aurora wallet backend is actually the same Rust code that you get in the CLI

Larry Cooke, [Jul 30, 2020, 12:23:01 PM]:
Both the Android beta and Aurora were updates. Previous version of Aurora worked on 10 with no issues, then upgraded to Android 11 and previous Aurora would not load. Waited to upgrade 0.3 to re-check

Cayle, [Jul 30, 2020, 12:23:46 PM]:
The code is there though if anyone wants to try and pick it up to put a full node on mobile, the wallet_ffi crate is a great blueprint

Kutsal, [Jul 30, 2020, 12:26:21 PM]:
I think instant messaging would add great value!

Kutsal, [Jul 30, 2020, 12:29:02 PM]:
We probably have found the crash report Larry, are you on a Pixel 3a? We will do some testing on Android 11 and hopefully fix it with a hotfix release.

Larry Cooke, [Jul 30, 2020, 12:29:59 PM]:
Yes, 3a. Thanks!

Kutsal, [Jul 30, 2020, 12:31:33 PM]:
np!

Flipchan, [Jul 30, 2020, 12:34:16 PM]:
Tari defined as the legal entity

Riccardo Spagni, [Jul 30, 2020, 12:34:37 PM]:
Tari isn't a legal entity

it's a protocol

Blue, [Jul 30, 2020, 12:43:15 PM]:
Can you make it so a 1 time small fee allows unlimited message transfer between users. 
If you must spend tari and possibly wait 2 minutes for the block to confirm every time you want to send a single message, the only thing people would use it for is to send PGP keys. Hardly worth the development cost.

Kutsal, [Jul 30, 2020, 12:45:42 PM]:
It's meant to be free with the app I think.

So what other features do you all think should be built?

Or ideas regarding the features that got mentioned: P2P chat?

Connecting Aurora to your address book to easily send (testnet) Tari to your contacts?

Selecting coins when sending? Viewing your UTXOs?

Blue, [Jul 30, 2020, 12:55:02 PM]:
I wasn't talking about Aurora P2P, rather Tari P2P.

Chat in Aurora sounds like a great idea. It wouldn't be necessary, but I'm sure people would use it if it was available.

```