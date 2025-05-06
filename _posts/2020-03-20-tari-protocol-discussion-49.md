---
layout: post
title: Tari Use Cases
date: 2020-03-20 18:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-49.png
lead: Tari use cases
class: subpage
topics:
- What unique functionality does Tari grant digital asset issuers?
- How will the protocol scale as there are more digital assets issued on Tari?
---

On Friday the Tari community discussed potential use cases of the Tari blockchain. Below are a few questions from today’s discussion along with a complete transcript further below.

* What unique functionality does Tari grant digital asset issuers?
* Why will Monero miners merge mine with Tari?
* How will the protocol scale as there are more digital assets issued on Tari?
* What is the transaction throughput of Tari?

Please feel free to keep the conversation going by joining the Tari [Telegram](https://t.me/tariproject) or #Tari on Freenode.


### Transcript of Friday discussion
```
10:30
👉Tari Use Case Discussion👈
Things to ponder the next 30 minutes until 1600 UTC
* There seems to be an endless list of blockchains with digital asset functionality. What is the proper mental model to evaluate these protocols?
* What are Tari’s potential strengths and how does this translate to potential use cases?
* What are Tari’s potential weaknesses and how does this affect potential use cases?
10:48
Henrik
am i right assuming that tari is like ravencoin but private?
10:53
Naveen Jain
I dont really follow ravencoin. The way I think about Tari is that its a DA focused protocol that is default private, and is attemping to make tradeoffs that support DA issuers in many ways they want to be supported
10:53
not sure if that is the stance for ravencoin or other projects, but thats the headspace I personally am in with regards to thinking about Tari
10:54
Nyzoshi Sun
When main net ?
10:55
Naveen Jain
when chicken or egg? testnet has to come first. And as always the answer for anything is "soon"
10:55
the good news is you can follow along with progress on the project repos
10:55
CryptoNT
You dont think tari claiming to "inherit moneros security" is a bit disingenuous?
10:56
Naveen Jain
is it disingenuous? It only inherits XMR security if XMR miners and pools decide it should
10:56
otherwise it has no security
10:56
and it flops around like a fish
10:56
CryptoNT
Then it's a false assumption lol
10:56
BTC Lovera
Good point
10:56
Naveen Jain
I dont think its a false assumption. The hope is that XMR miners and pools will want something like Tari around
10:57
CryptoNT
Its like namecoin saying it inherits bitcoins security
10:57
Naveen Jain
if thats not true, well then its certainly not going to be secure
10:57
CryptoNT
It's simply wrong lol
10:57
Naveen Jain
:)
10:57
perhaps it could be framed better, thats good feedback
10:57
the intent is simply this: if XMR folks like this thing, cool. If not, then its not going to get very far
10:58
CryptoNT
Unless merge mining is enforced in monero protocol then it will never be as secure
10:58
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
security meaning what exactly? i think you do get network security automagically from merge mining but maybe im missing something
10:59
Naveen Jain
sure, but from an alignment standpoint, merge mining doesnt cost miners much, and they get paid for it in Tari
10:59
CryptoNT
How ever you frame it its wrong I'm afraid
10:59
Even economically
10:59
There is no peg
10:59
Naveen Jain
no there is no peg. Its up to XMR folks to decide to do it or not.
11:00
Oscar Pacey
I'm only familiar with the basics of Tari (MW for DA), and love that idea. I have helped quite a few companies build schemes for issued assets onto blockchains and they are always a fairly shoddy set of tradeoffs.

Issuers usual requirements:
- High tx througput
- Privacy for all
- (...except between them and all particpants!)
- Would rather not have to pay tx fee in chains native asset

MW enables a tiny footprint (scale) & pretty good privacy,. Can it remain a public chain and support high throughput though? Most corporate token features are quite basic (expiry date etc)
11:00
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
a peg to what? exchange rate to xmr or fiat
11:00
CryptoNT
Then it's basically like namecoin crossed with raven. It's not technically even a sidechain
11:01
Naveen Jain
well, I think there are some other interesting elements here too
11:02
ultimately what is the goal. The goal is to make a default private financial system a mainstream thing
11:02
and to hopefully make XMR the flagship economic unit of that financial system
11:02
CryptoNT
I've heard that somewhere before from someone who once was part of bitcoin lol
11:03
Naveen Jain
at the end of the day, this group of folks thats working on this project is attemping to achieve a particular goal. There is no guarantee of success with that goal
11:03
if the goal has merit to you, great. If not, thats understandable too
11:03
CryptoNT
Just pointing out it mirrors alot of what has come before like even ethereum
11:04
Jason van den Berg
The asset issuing will be on the second layer, so MW itself doesn't require such high throughput
11:04
Oscar Pacey
Is Tari planed to have some kind of scriptless script based LN network on top?
11:04
lsquared
It's a shoddy set of trade offs if everything is constrained to one chain. The base chain should be highly secure, whereas you can build a layer 2 on top that is fast and scalable
11:04
Yevhenii Kurtov
how much Rust and cryptography it will be required to know to program against Tari?
11:05
sw
Not rust per say
11:05
Naveen Jain
sure, no one said that this project is "revolutionary." What I think is important here is like in all cases, trust has to be earned. Hopefully this becomes a project worthy of trust
11:05
I am well aware that many projects are not worthy of trust.
11:05
lsquared
Conceptually similar to that, we're writing a paper on this and it is currently undergoing external review. Once it is a better state we will share it.
11:05
Philip
The whole back backend code base is written in Rust so will need to know it to contribute but the cryptography is fairly well abstracted
11:05
sw
As long as your program cab speak the protocol it should be compatible
11:05
Oscar Pacey
Great.
11:06
Jason van den Berg
We're hoping to have wrapper libraries for a lot of languages. Currently we have Swift and Kotlin, if either of those are what you're interested in
11:06
Riccardo Spagni
no
11:07
you can't attack Tari's security without attacking Monero first
11:07
that's an inheritence
11:07
TariIRCBouncer
[irc] <jwinterm> if most miners simply choose to ignore tari, then that isn't necessarily true, is it?
11:07
[irc] <jwinterm> if it has 1% of monero hashrate, you can attack tari without attacking monero, no?
11:08
Riccardo Spagni
why would miners ignore free money?
11:08
TariIRCBouncer
[irc] <jwinterm> there's lots of merge mined sha256 or scrypt coins with miniscule fractions of their parent coin
11:08
sw
And Tari has more than one pow
11:08
Riccardo Spagni
yes but that's hardly comparable
11:08
this isn't Scamcoin #7
11:09
CryptoNT
This makes zero sense fluffy. You'll have to explain why
11:09
Oscar Pacey
as i understand Merge Mining, it becomes secure once miners start depending on the extra income. Until their expenditure requires the income from the merged chain it they are not comitted to the chain.
11:10
Riccardo Spagni
most miners dgiaf and will do whatever the pool does
11:10
Naveen Jain
The insights that I think are interesting here are as follows:
1. DA issuers actually need privacy in order to run successful businesses. Having competitors surveil transactions involving your assets is a non starter. This creates an opportunity to align interest between DA issuers and default privacy as an overall mission critical feature.
2. There are many kind of DAs that people are deeply passionate about. In an ideal world, if those DAs are issued on Tari, then people are inherently using privacy preserving software
3. There are a number of interesting business problems that issuing DAs on Tari can solve for DA issuers. Opportunities for new revenue, and opportunities to create better digital products for consumers that provide a real sense of ownership
11:10
Oscar Pacey
dgiaf?
11:10
Cayle
Rust is pretty cool, you should check it out; but that aside, there are already C bindings for a lot of the base layer functionality — with a particular emphasis on wallets. So if you like python, node.js, Java etc., you can code in those languages and make use of the Tari APIs. You’ll need to write some wrappers, obviously, and those would be welcome additions to the code base. So far we’ve used these bindings to build the Android and iOS wallet apps.
11:11
In terms of cryptography, there are some good primers onn tlu.tarilabs.com
11:11
Riccardo Spagni
Bitcoin and Monero work, not because miners are ideological, but because they're capitalists - merge-mining *when it's a project that actually provides value* takes advantage of the same characteristics
11:11
don't go into a furnace
11:11
lsquared
When it comes to digital asset issuers, we want them to be first class citizens. They are afraid of losing control when they issue their IP onto permissionless networks. But they don't have to feel this way, features such as versioning of assets, expiry dates, etc allow them to still have control of their "public assets"
11:11
Riccardo Spagni
doughnuts greatly indicate a flex
11:12
Oscar Pacey
makes sense. Good way to design.
11:12
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
how long will this discussion go on for? i have a question about use cases but need to hop on a call soon
11:12
Riccardo Spagni
the discussion may end, but the Telegram goes on forever
11:12
Naveen Jain
this discussion is like the never ending story minus the flying dog
11:12
Tal
Let’s hear it
11:13
Riccardo Spagni
and minus the dying horse
11:13
Naveen Jain
hahaha
11:13
Tal
But that’s the best part. Don’t leave him out
11:13
Ryan O'Connor
😂
11:13
Riccardo Spagni
RIP Atreyu
11:13
Artax I mean
11:13
Jason van den Berg
spoiler alert, he comes back
11:14
Mike M
I always make that mistake as well
11:14
Ryan O'Connor
why not throw your question to the group and we'll keep the reply on this thread.
11:14
Yevhenii Kurtov
I would love to! Tried 3 times already - manual memory management is what sets me off. I really do love to stay on a higher level of abstractions and think more about meat-space problems.
Thus having an external interface would be of a great help… or it can be a chance to get into Rust for real :)
11:14
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
is tari more like colored coins on monero or is it more like counterparty with some simple functionality built in around named/unnamed assets
for some reason i associate tari with like ticketing and more corporate use cases vs the ""nft"" market over in eth-land where it's about digital art, artist remuneration and provenance
11:15
Riccardo Spagni
more like Counterparty
11:15
Naveen Jain
corporate use cases. Well, its more about use cases where there appear to be large pools of existing users
11:15
Riccardo Spagni
we've considered doing coloured coins on Monero, but that adds metadata to a transaction that makes it hard to create indistinguishable transactions that all look the same
11:15
so bad for Monero's privacy
11:16
also storing every asset tx on the blockchain is just dumb
11:16
that sort of idiotic thinking belongs with Craig Wright and the BSV morons
11:16
Naveen Jain
Ticketing is a use case with lots of users. So is digital collectibles, and gaming assets
11:17
but if someone wants to use Tari to issue digital art like folks are doing on ETH, thats cool too
11:18
lsquared
Some interesting requirements of ticketing:
* high throughput
* Privacy of purchaser
* tradable
* original asset issuers want a percentage of trade value
11:18
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
one of the hot topics right now in that space is forced artist royalties for re-sales of [whatever]. not something i'm a fan of, but is that level of control possible for an asset on tari
11:18
yea, the % of trade value is exactly it
11:19
Naveen Jain
yes thats an interesting idea for sure. Allowing digital asset issuers to set rulesets around assets including economic oriented rules
11:19
thats the kind of thing that from the conversations Tari Labs folks have been having, DA issuers seem excited about
11:20
Tal
Tell us more about your dream external interface
11:21
CryptoNT
As much as I'm a fan of merge mining. In reality the incentives never align in this way. Just look at namecoin as I say
11:21
Naveen Jain
that rhymed
11:21
lsquared
What would you suggest as an alternative?
11:21
Naveen Jain
😜
11:21
Riccardo Spagni
NMC is - again - a terrible comparison due to its incredibly limited ecosystem value compared to Tari
11:22
it also hasn't really progressed much in 8 years
11:22
CryptoNT
If we had a perfect alternative we wouldn't use proof of work
11:22
TariIRCBouncer
[irc] <jwinterm> which merge mined coin would you point to as "having value"? only le doge?
11:22
Riccardo Spagni
ENS has made more strides than NMC, sadly
11:22
Yevhenii Kurtov
@talmahaj I can tell about use case that I’m thinking about but hardly about an interface yet. From my experience with Monero it would be definitely great to have endpoints for batch operations to avoid IO penalty when rotating wallet keys for example
11:22
Riccardo Spagni
yes - Doge is a great example
11:22
https://bitinfocharts.com/comparison/hashrate-ltc-doge.html
11:23
CryptoNT
Noone cares about "utilities" they care about number go up lol. In the case of monero they care it has good privacy as money
11:23
Tal
Why not a fan? I guess it depends on the use case for sure. Seems to make sense if someone buys your $100 ticket and then turns around and resells it for $2000 you should benefit from that demand as an artist
11:23
CryptoNT
Namecoin hashrate isn't even all mergemined
11:23
Riccardo Spagni
precisely my point
11:23
CryptoNT
Some of it was used against bcash sv
11:23
Riccardo Spagni
because number stopped going up, due to a lack of progress, which made it disinteresting
11:24
CryptoNT
Namecoin still has utility and people still work on it with number go down. Miners are no different to traders
11:24
They dont care wtf any coin does
11:24
Naveen Jain
people care about what ever they care about. I care about how the hell do we get mainstream people to care about privacy. History shows us that they will choose convenience over privacy every time. Tari DAs are intended to get more mainstream people engaged with default private economic infrastructure with a path to getting them into the XMR ecosystem.
11:25
Riccardo Spagni
well now you're arguing *for* merge-mining lol
11:25
pick a lane
11:25
Tal
What’s the use case?

@loopster will talk to you all about those endpoints if he’s still around...
11:26
CryptoNT
It's the same thing mergemining ideally should be enforced on monero for it to actually be considered secure as monero
11:26
TariIRCBouncer
[irc] <jwinterm> Not sure if this is really a strength or weakness, but tari is essentially a corporate blockchain, right? So is the corporation hoping to make money by selling consulting services, dev tax on block reward, something else?
11:26
[irc] <jwinterm> also, do you think that perception of being a corporate blockchain will make it difficult to attract enthusiast developers and users?
11:26
Cayle
That sounded very much like a super power-user use case than a Mike-on-the-street use case
11:27
Riccardo Spagni
ehhhh I don't know if I agree - Dogecoin isn't enforced on Litecoin, but the majority of the hashrate merge-mines it
11:27
CryptoNT
Memes are a powerful thing I guess lol
11:27
Riccardo Spagni
I wouldn't say it is per se - but you're right in that there's a company that provides support for it, and we haven't figured out how to monetise it yet, lots of options on the table
11:28
the idea is not for that company to necessarily exist forever, tho
11:28
Mike M
0_o
11:28
Naveen Jain
A corporate blockchain. Well. All the software is open source, so if at anytime anyone doesnt like whats happening, they can fork off. If the project is successful in getting popular DAs issued on Tari, and is successful in expanding awareness and usage of XMR, then many folks will probably want to contribute to it
11:29
Yevhenii Kurtov
I definetely won’t mind to make my income on consulting around Tari 😍😄 🎩
11:29
TariIRCBouncer
[irc] <jwinterm> rootstock is doing pretty decent actually, 48% of btc hashrate
11:30
[irc] <jwinterm> sparkslice, fair enough, but presumably the corporation controls the github repos, probably branding intellectual property, etc.
11:30
Naveen Jain
Over time hopefully there will be lots of opportunities for folks to contribute and earn a living around a Tari ecosystem. That would be an incredible outcome
11:31
Cayle
+1
11:31
C.Lee Taylor
+1
11:31
Dan Teree
No shame in that outcome !
11:31
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
yea it depends on use case, it's all very silly to me to sell receipts containing links to images on a server somewhere but if the metaphor is supposed to be bridging digital and physical "asset" ownership: once i own a painting i can do whatever i want with it, enforcing a middleman on every transaction is lame and what if i want to gift an asset will i be charged the royalty there? if not then a 3rd party arrangement can be made to "gift" but sell elsewhere (both parties will be economically incentivized to do so)
11:32
Riccardo Spagni
I've made the same argument, but Stubhub takes a bunch for secondary sales and people don't complain about that, so it varies from use-case to use-case
11:33
Naveen Jain
Fair points. As Ric said, its not necessarily the intent for legal entity to exist forever. It is definitely difficult to get a project like this off the launchpad. Ultimately trust is earned over time. The Tari Labs groups goal is to earn trust, and contribute in meaningful ways to the Tari and XMR ecosystems
11:33
Cayle
I mean the mission is that i) asset issuers find it really easy (much easier than writing Simplicity contracts for example) to issue assets on Tari, b) developers contribute and add to the types of assets that Tari supports, and iii) users find working and using the assets natural and adds value to their lives.
11:35
Naveen Jain
oh and I forgot to mention: and to have fun while doing it :)
11:35
Cayle
I realise that I’m a slow typer and that this comment seems out of place in the conversation flow right now 😱 Mentally push it up a page or two :)
11:36
TariIRCBouncer
[irc] <jwinterm> well, you guys certainly seem to have assembled a large team to launch something with no clear path to monetization and with the potential end goal of dissolution of corporate entity
11:36
Naveen Jain
Cayle is transitioning to a dvorak so he is pecking away
11:36
TariIRCBouncer
[irc] <jwinterm> bold strategy cotton, let's see how it works out
11:37
Naveen Jain
yes its a large team building a path to nowhere :)
11:37
TariIRCBouncer
[irc] <fluffypony> send Cayle back to typing school
11:37
Tal
Calling it a flow seems overly generous. You’re fine.
11:37
Naveen Jain
thats exactly whats happening!
11:37
:P
11:37
Cayle
> Cayle is transitioning…
Important to read the whole sentence
11:37
Naveen Jain
LOL
11:38
Tal

11:38
Clearly he didn’t have Mavis to teach him American-style keyboarding like us 90s kids did
11:39
TariIRCBouncer
[irc] <fluffypony> oh man I remember Mavis Teaches Typing
11:40
[irc] <fluffypony> I used to do that straight after playing Where in the World is Carmen Sandiego
11:40
[irc] <jwinterm> I too am only where I am today because of Sir Beacon
11:40
Naveen Jain
jwinterm: if the outcome of this project is that a LOT more people are using a default private financial system, and there is more awareness of XMR then its a success
11:40
Tal
And right before dying of dysentery in Oregon Trail
11:40
TariIRCBouncer
[irc] <jwinterm> Madam Beacon?
11:40
[irc] <fluffypony> LOL
11:41
Cayle
Sir Francis Beacon?
11:42
Make no mistake, it’s a super-ambitious project.
11:42
Tal
Beacon is a higher being unfettered by social constructs like gender
11:43
TariIRCBouncer
[irc] <jwinterm> ;p
11:43
Tal
😂
11:43
Oscar Pacey
Whats your view on likely throughput of TXs on mainnet?
11:43
TariIRCBouncer
[irc] <havik> <-sparkslice. one cool idea that has been floating around is this idea of how digital asset issuers monetize affinity. Right now they monetize affinity through selling widgets
11:43
Oscar Pacey
CTs are pretty phat
11:43
TariIRCBouncer
[irc] <havik> 239472394729473924729743 tx/s
11:43
Tal
Can you give an example
11:43
TariIRCBouncer
[irc] <jwinterm> what is the expected blockchain growth dynamics or projections for the wildly successful case where tari baselayer becomes vehicle for company that overtakes ticketmaster?
11:44
[irc] <jwinterm> does it end up being terabytes per month or something?
11:44
Cayle
The mainnet layer will handle 10s of tx/s. Scaling happens on the digital asset layer
11:44
TariIRCBouncer
[irc] <havik> But imagine if they could earn a rake from existing DAs issued. And because the system is permission less, others can accept those DAs within their own ecosystems. In other words the DA becomes more valuable because its overall utility increases
11:44
Oscar Pacey
Okay, thanks.
11:46
TariIRCBouncer
[irc] <havik> no the base layer is for check pointing DA transactions that occur on a second layer. The base layer won't require petabytes of storage
11:46
[irc] <havik> in a world where there are billions of transactions
11:47
sw
That will be gb of storage
11:47
lsquared
Unless everyone decides to increase the block size :p
11:47
TariIRCBouncer
[irc] <jwinterm> ic
11:47
sw
Second layer will be per accept and that could be peta per asset
11:48
Cayle
FFWD to the Tari blocksize wars of 2024
11:49
lsquared
Tari Unlimited!!
11:50
Also the base layer has a concept of cut-through (kind of like pruning) where the blockchain is able to be compressed
11:50
We have have done some modeling on on Tari's blockchain size given had the same number of UTXOs as BTC (as of last month)
11:50
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
wondering about the gaming assets use-case, how variable can the privacy controls be? one of the fun things from back in the days of tf2 trading was you could see anyone's inventory if they hadn't made it private. would something like a public inventory per asset class tied to your in-game account even be possible on layer 2, don't see how if it is MW
11:52
lsquared
Pruning reduces chain state by a factor of 5 which is nice. (Using BTC assumptions on the number of inputs/tx + utxos/tx
11:53
Yevhenii Kurtov
I’m working in betting and now we can see that virtual competitions are expected to increase their market share in coming years. Business would like to be able to operate even when athletes are not on the field.
Hence I’m thinking if there would be an opportunity for a Fantasy League manager app where users will be able to control their assets.
11:53
TariIRCBouncer
[irc] <havik> @lessless that sounds like a really cool use case
11:54
Yevhenii Kurtov
Like build your team, compete against other teams, trade players, coaches etc. And betting can be piggybacked on top of that
11:54
TariIRCBouncer
[irc] <havik> @pussinboots DA issuers are using templates to define the nature of their DAs issued on a second layer that lives on top of the Tari base layer. MW only applies to the base layer
11:54
Cayle
Definitely
11:54
Yevhenii Kurtov
havik, it will be hard to enter the market hehe, the business model should be really stellar to make it possible to profit
11:55
TariIRCBouncer
[irc] <havik> yes agreed, the business model stuff is challenging. There are many ideas floating around about how to create new avenues for revenue around DAs issued on something like Tari. And how to cut out intermediaries that sit between users and issuers
12:00
Tal
Fantasy apps print money too, so that totally makes sense. Great idea
12:00
TariIRCBouncer
[irc] <havik> a general question: what themes are folks thinking about with regards to a new post C19 world? Ex: does commercial real estate perform as well going forward once everyone optimizes how they work from home?
12:01
[irc] <havik> Obviously anything that is connected to improving how people communicate in isolation is catching fire
12:01
[irc] <havik> what other themes are people seeing?
12:01
Yevhenii Kurtov
old-skool business models are ripe for disrutption. the industry is just waiting for someone to properly leverage network effect and knock down centralized models where punters are playing against bookie instead of playing against each other
12:01
G C
and cutting out the middle man
12:01
TariIRCBouncer
[irc] <havik> yes that speaks to cutting out intermediaries. Tari will be really good for that
12:01
Oscar Pacey
re: Scalability (as discused above). MW is pretty good at staying lean - one of its strengths. The chain can shrink in size over time. Its more akin to a UTXO Set or State than a ledger as the old records can eventually (often) be cut out entirely. Despite that, its the bandwidth which is the ultimate contraint, like in all chains. PAssing millions of hefty CTs around which take time to broadcast and process will contrain it.
12:02
Tal
Yeah, video chat is def having its moment. All the headlines are “buy zoom stock gogogogo”
12:02
TariIRCBouncer
[irc] <havik> yes but individual DA transactions are not intended to hit the underlying MW chain
12:02
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
havik: got it, thnx. maybe it should be called layer 2.5 so i dont conflate the two 😅
12:03
TariIRCBouncer
[irc] <havik> haha yes exactly
12:03
Oscar Pacey
Thats wha I was gathering. So each asset has its own isolated 'zone' as some kind o high layer protocol, which gets settled to the chain, is that right?
12:04
TariIRCBouncer
[irc] <havik> something like that. There is this idea of validator node committees that are responsible managing the state and enforcing rulesets around individual DAs. Someone who is thinking about that more can provide more details
12:04
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
i am closely following the hype around virtual worlds/meetups. the advantages are obvious but participation is low and open-source solutions cannot handle anything at scale atm
12:04
TariIRCBouncer
[irc] <havik> but that's an idea that's floating around
12:04
Robin Rath
Blue apron was hot for like 2 seconds. Tele-health. Tele-education and tele-entertainment with efficacy is huge for kids. Parents will struggle with kids at home during the work day.
12:05
Oscar Pacey
okay, thanks. No need to eplxain to me in detail now.
12:05
TariIRCBouncer
[irc] <havik> right because the experience is still sub par. There is no ready player one world yet
12:05
[irc] <jwinterm> robinrath, fucking tell me about it
12:05
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
the metaverse is already here we just can't see it yet
12:05
Tal
Makers and open source hardware folks are having their moment too.

The supply chain disaster that’s already leading to PPE (personal protective equipment) shortages on the front lines at hospitals is contrasted by the willing and able army of makers armed with 3D printers ready to spit out 10,000 valves at the ready. Who don’t care about the legal repercussions. We’ll be hearing a lot about Good Samaritan laws as the supply chain tries to litigate.
12:06
lsquared
I wonder how well blue Apron is doing right now during the Covid-19 Era
12:06
Robin Rath
Disney will probably enter the EDU market, lol
12:07
Tal
Yeah I’ve seen a ton of virtual conferences pop up too. Anyone doing it well that you’ve seen?
12:07
TariIRCBouncer
[irc] <havik> we are all living in the matrix obviously
12:07
[irc] <havik> :)
12:08
[irc] <havik> the most successful thing of late is marshmallow "performing" in fortnite
12:08
[irc] <havik> I mean pushing the play button. I mean performing
12:08
Robin Rath
I also see a shift in value in general, if this happened to us when we were 10-15 years old it would def have an impact on what we spend our money on long term. Our grandparents saying "I remember the depression..." certainly carries way more meaning now.
12:08
TariIRCBouncer
[irc] <havik> :P
12:08
[irc] <jwinterm> what is the "other" PoW?
12:08
[irc] <jwinterm> doesn't seem to be mentioned in RFC-0001
12:09
Tal
Oh for sure, they’d be dumb not to
12:09
TariIRCBouncer
[irc] <havik> @opacey check this out for more ideas re: how the second layer bit might work: https://rfc.tari.com/RFC-0300_DAN.html
12:10
[irc] <havik> I dont think there is any other PoW contemplated at this time other then merge mining with XMR
12:10
Oscar Pacey
Thanks!
12:11
وЮ ○三 🐙＼(ₑ₂̑Ꮘↂͩ ₂̑ₑ)
virtual market (Vket), comiket may even be forced to be a part of it this year
12:11
TariIRCBouncer
[irc] <jwinterm> <tar1b0t> [telegram] <Blackwolfsa> And we have more than one pow
12:11
[irc] <jwinterm> so that was just misinfo?
12:11
[irc] <jwinterm> I thought it was fluffypony that said that
12:12
[irc] <fluffypony> mainnet isn't out
12:12
[irc] <fluffypony> so nothing's been decided
12:12
[irc] <fluffypony> FWIW I'm against another PoW
12:12
[irc] <fluffypony> but I was also against the Monero community not committing to a SHA3 implementation date
12:12
[irc] <fluffypony> can't always have what we want :-P
12:13
[irc] <jwinterm> got it, sha3 is the other PoW
12:13
[irc] <havik> yes fluffy you can. In the meta verse, anything is possible.
12:13
[irc] <havik> :P
12:13
Tal
Yeah, if this happened back then I’d now have a luxury eco-friendly artisanal underground doomsday bunker and vegetable garden instead of ~82 pairs of shoes I don’t wear
12:14
TariIRCBouncer
[irc] <fluffypony> jwinterm: I wish
12:14
Oscar Pacey
Okay I get it. Anyone can run a DA Validator, choose their Validator Peers ( a bit like Ripple/stellar), and between them run the asset (constructed in the form of a preset template), run txs through channels (I guess) and then settle at some point.
12:14
Tal
Someone would have a startup to buy and sell spots in doomsday bunkers. They can build it on Tari so bunker builders get a cut on resale obvi.
12:15
TariIRCBouncer
[irc] <havik> yap and then transactions are settled on base layer
12:15
[irc] <havik> err check pointed
12:15
Oscar Pacey
okay thats v helpful. Thanks
12:15
chekpointed?
12:15
Are the DANs an actaul blockchain?
12:15
checkpointing (attesting?) block hashes onto mainnet?
12:15
TariIRCBouncer
[irc] <havik> if you have feedback on any of the RFCs please feel free to let folks know
12:16
[irc] <havik> this is all ideation phase stuff
12:16
Philip
yes, second layer states will periodically be commited to on the base layer for immutability
12:16
Oscar Pacey
aaah i see
12:17
so swapping assets might be a bit convulted would it? Essentially cross chain atomic swaps?
12:17
Ethereum (monolitic architecture) at least has the advantgae that you can trade asset for asset, atomically, in a single TX.
12:18
Philip
correct, it will have to be an atomic swap between the two asset committees who wil each have to validate it
12:19
sw
Yip but this way rhw base layer does not have to care at all..
12:19
Oscar Pacey
Okay, I guess that would be my feedback then... atomic swaps, though amazing, are a bit of a PITA becuase of the implied call option, and the coordination required. Not a serious criticism, but just something that would be nice to improve on if the opportunity arose
12:29
TariIRCBouncer
[irc] <zkao> @opacey, u mean u quit the swap midway because the price changed unfavorably, for example?
12:29
Oscar Pacey
precisely
12:31
...can be mitigated a bit using short timeout horizons.
12:34
TariIRCBouncer
[irc] <zkao> what did u mean by implied call option, @opacey?
12:35
Oscar Pacey
yes like you said above. That one party fails to sign off their side of the swap, becuase at some point after the initation of the process they decide the price isnt good anymore.
12:52
TariIRCBouncer
[irc] <zkao> @opacey, pretty convinced an atomic swap protocol can be devised using discreet log contracts, an oracle and no timelocks. but a large range of pairs of potential txs (with different exchange rates) have to be signed by the counterparties, with the third signature coming from the oracle. preagree on all potential prices, let the oracle tell the price. then eithe counterparty can publish the tx
12:59
Oscar Pacey
Wow, nice. I'd have to think that through to form an opinion on it but I like the fancy!
13:02
midipoet
This might be a stupid question, but does a miner have to continue to validate Monero transactions in all circumstances in order to mine Tari?
13:02
Riccardo Spagni
yes
13:02
they can't cheat and only mine Tari with no benefit to Monero
13:02
Oscar Pacey
Even me?
13:02
midipoet
Cool. Thanks
13:03
TariIRCBouncer
[irc] <havik> there are no dumb questions :)
13:04
Riccardo Spagni
well except for that one dumb question that was asked, but that was like 2 months ago
13:05
but we don't talk about that anymore
13:09
Naveen Jain
😂
13:09
The one I asked. Yes let’s not talk about that
13:49
midipoet
Has the Tari emission schedule been finalised?
13:51
TariIRCBouncer
[irc] <havik> no not yet
15:04
Ad-Lib
There’s two kinds of monero miners - the ones mining it to get monero and the ones mining it to get bitcoin or dollars. I can’t represent the mining farms doing it as a business, but it’s quite obvious they’re going to mine whatever is profitable, so Tari should be welcome for them. I’m quite for some time supporting monero miners in @xmrmine channel and I can confirm that Tari is well awaited by monero mining community as well.
15:06
There isn’t consequence about it in Tari community
15:14
Ad-Lib
Philip 17.02.2020 06:23:24
So even if Tari PoW was only using the merge mined RandomX algorithm a miner is not forced to attempt to construct valid Monero blocks. The Tari Base nodes do not validate the Monero block at all. So hypothetically a Tari-only miner could ignore Monero if they wanted to but we are banking on them putting in the effort to construct a valid Monero block for the chance that they earn some Monero for their mining effort. The second PoW algorithm shouldn't impact that behaviour. An assumption you are making is that all Monero miners will want to merge mine because they will get Tari for their efforts but it is a non-trivial effort to integrate merge mining into their pool software so it is quite likely that only a portion of the Monero mining community will also mine Tari and we want to mitigate the risk that in that subset there will be a single large player that could have the opportunity to attack Tari
15:24
David Burkett
I asked in the dev channel, but I think I just missed everyone. How does Tari commit to the lock heights of UTXOs?
15:24
https://github.com/tari-project/tari/blob/51ac76abc054152b0e01710e28dfa418692718d2/base_layer/core/src/transactions/transaction.rs#L90
15:24
It seems like that field would be malleable
15:29
midipoet
Are you saying that it is not necessary to construct a valid Monero block to obtain Tari?
15:32
TariIRCBouncer
[irc] <jwinterm> midipoet, that is true of any merge-mined coin afaik
15:32
Ad-Lib
Well - coming from monero community, I’m saying it should be necessary to construct a valid Monero block to obtain Tari.
15:32
TariIRCBouncer
[irc] <jwinterm> but it makes no sense, because why wouldn't you try to get free monero as well
15:32
[irc] <jwinterm> the only cost is running a monerod instance basially
15:33
Riccardo Spagni
Yes but you can’t have it as a block validation as that would require all Tari nodes to also be Monero nodes
15:33
David Burkett
But a Tari block with an invalid Monero block would quickly be reorged away
15:34
Ad-Lib
Tari May become more interesting for miners over time
15:34
Riccardo Spagni
So yes as jwinterm points out - also bear in mind that you have to do the work for the fake Monero block, so that would be pretty pointless
15:34
That too
15:34
Miners wouldn’t build on it as they *are* running Monero nodes
15:36
John Tromp
they won't monero-build on it, but they still tari-build on it
15:36
David Burkett
You would have to have enough hash power to continue mining faster than Monero in perpetuity to sustain it, when there's no financial gain to that, and a huge loss actually (they could've had xmrs for no real additional cost) . The game theory just does not support such a scenario.
15:38
Either that, or I completely misunderstand how merged mining works (it's possible, I'm dumb)
15:46
Ad-Lib
Maybe I’m too optimistic in Tari, but with “fresh” emission vs tail emission mining interest will soon be on Tari side.
15:47
Which means Tari will literally steal RX provided security from Monero if Tari only block validation is allowed
15:51
So there’s very good vs very bad scenario for Monero
16:42
Ad-Lib
Just did a quick research. If we believe the average cpu gives ~ 40hs/watt on RandomX - around 25MW of power secures Monero. For comparison I took Grin which seems to be the most successful PoW project from new ones. Grin takes around 11MW right now which is almost the half of what Monero has while Grin is only worth ~ 2% of Monero’s market cap.
16:55
John Tromp
it's not about mcap but about daily emission in $
16:57
grin's is nearly 20% lower than Monero's
17:08
TariIRCBouncer
[irc] <w0rlds> anyone know if/where the Tari meeting from earlier today will be posted?
17:10
Ad-Lib
All I wanted to show is that new project can attract reasonable amount of mining power. I think it must be defined at the very beginning - will there be the United miners community or not to avoid future hash fights.
17:35
Jeff W
How is Tari different than Beam creating Confidential Assets on top of Beam blockchain?
17:38
John Tromp
beam is not merge-mined with monero:)
17:38
beam is not (yet) written in rust
17:39
beam has mining tax
17:39
beam has no tail emission
17:45
Ad-Lib
About use cases - I’d love to use it for my car wash stations and car parts shop to allow clients to collect loyalty points and use them in various ways. Like if he spends 15€ in shop he can wash his car for free once. Or he can wash the car with credit points and later I can write an invoice to him.
17:47
It doesn’t need decentralization at all tho, but if it’s relatively easy and inexpensive to set up - it’d be cool.
17:51
I’d definitely evaluate some kind of rpi and arduino support for IO.
18:55
Naveen Jain
A key difference is approach. Tari Labs is also working on reference design applications that will ultimately make use of the Tari protocol. For example Big Neon (www.bigneon.com). The idea here is that from the TL perspective its very difficult to design a distributed, decentralized state machine without knowing how it will be used in the real world. Hence why some members of the TL team are working on these reference design applications concurrent to the community developing the underlying protocol.
18:55
now all of this is subjective so pls make up your own mind on whether this holds any water, but its another difference worth considering.
```
