---
layout: post
title: Tari Protocol Discussion 16
date: 2019-01-21 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-16.png
lead: Enabling P2P merged mining pools
class: subpage
---

On Monday’s architecture discussion, the Tari community discussed the possibility of enabling P2P mining pools for merged mining. It's a topic that has been mentioned in the past on [Monero's official subreddit](https://www.reddit.com/r/Monero/comments/4emz61/wondering_how_to_make_a_p2p_mining_pool/) and could potentially be applied to merged mining for the Tari protocol.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
11:06 AM <@cjs77> Hey everybody
11:07 AM <Hansie> Hi
11:08 AM <simian_za> Ello
11:08 AM <Hansie> Interesting question posted by fluffypony today: "Can we do p2pool with merged mining?"
11:09 AM <Hansie> This is intriguing, found this post for Monero: https://www.reddit.com/r/Monero/comments/4emz61/wondering_how_to_make_a_p2p_mining_pool/
11:10 AM ⇐ el00ruobuob_[m] quit (~el00ruobu@212.121.161.50) Ping timeout: 272 seconds
11:11 AM <@cjs77> Yeah it's a cool concept. For context, P2P mining can potentially break the dominance & excessive influence of large mining pools. I think BlueMatt is driving this from Bitcoin.
11:12 AM <@cjs77> Is there a reason it wouldn't work with merge mining?
11:13 AM <Hansie> Can not think why not, but the post mentioned some people had some ideas.
11:13 AM <Hansie> It seems that maybe there were not enough interest at the time
11:15 AM <simian_za> I can't see why it wouldn't work, the mechanics of merge mining and the distribution of work to the workers is pretty much the same
11:15 AM <neonknight> It is interesting, the only small issue is that every mining worker has to run a full node
11:15 AM <@cjs77> I think it's one of those things that aren't core to the system working, so it's a matter of who's incentivised to build it?
11:17 AM <Hansie> I think it may be to the network's advantage if mining is more decentralized, apart from  being attractive for 'small-time-miners'
11:18 AM <@cjs77> I want to remind the Rust devs (both current and future) that the waffle.io board for Tari has loads of "Good first issues". Feel free to chat here to get yourself assigned to something you'd like to work on
11:18 AM <@cjs77> https://waffle.io/tari-project/tari
11:18 AM <simian_za> We will likely still need to leave it until after we have helped the main monero pools integrate with Tari to ramp up our hash rate as quickly as possible
11:20 AM <Hansie> Yip, also fix it for Tari then it is fixed for Monero, or the other way round as well
11:22 AM <Hansie> @cjs77, how can people with no write access add issues to waffle.io?
11:24 AM <simian_za> If they can make issues on Github it should appear in waffle so I suspect they will be able to make them in waffle too
11:24 AM <@cjs77> they don't -- they add them in github and then we can triage them
11:24 AM <@cjs77> we = folks with write access
11:25 AM <Hansie> So can anyone add issues to GitHub?
11:26 AM <@cjs77> yeah, they should be able to
11:32 AM <Hansie> Wondered if some key DAN instructions/transactions should make use of embedded consensus in the base layer before being action-ed on
11:33 AM <Hansie> Thus post the intention to do something, when it is mined and available in the base layer, act on it
11:37 AM <simian_za> So beyond registration and checkpointing of digital assets?
11:38 AM <simian_za> registration of VNs that is
11:39 AM <Hansie> Yes, like important once-off or course altering transactions
11:40 AM <neonknight> Is there value in registering an asset on the base layer? Probably not if it is private
11:42 AM <Hansie> Later then, got to go
11:44 AM <Blackwolfsa> I think so, you could probably go around it, but you would add code complexity..
11:44 AM <mikethetike> does p2pool use a different protocol to standard mining pools?
11:45 AM <simian_za> there is a protocol to build the block to be mined
11:45 AM <simian_za> i believe
11:45 AM <simian_za> and then also to keep track of the shares due
11:46 AM <mikethetike> regarding transactions on the base layer, I think we should try jot down some initial data structure layouts as a reference for what can and can't be done
11:46 AM <mikethetike> I've seen some code in the repo, but I'd like to see how some of the 2nd layer stuff gets squished in
12:01 PM → el00ruobuob_[m] and learninandlurkin joined  
1:54 PM <@cjs77> That's not a bad idea
1:56 PM ⇐ lurkinandlearnin quit (~lurkinand@2a02:c7d:b7d8:4100:3de7:325e:878f:215f) Ping timeout: 252 seconds
2:31 PM <@cjs77> Looking at some crypto backend implementations; what does the crypto community generally use to express keys - little, or big endian? i.e. would k=5 as a 32 byte hex string be `0x101000....000` or `0x000....000101`?
2:32 PM <@cjs77> lol, I mean `0x05...00` vs `0x00..05`?
2:33 PM <@cjs77> I've been assuming big-endian, but dalek uses little-endian (which makes sense if most CPUs are AMDs these days)
2:40 PM → lurkinandlearnin joined  ⇐ learninandlurkin quit  
2:48 PM <moneromooo> Monero's are little endian. OpenSSL is big endian by default IIRC.
2:55 PM <@cjs77> Cool, so we should stick to little endian to reduce confusion then.
2:56 PM <@cjs77> I think the asset template RFC uses big-endian examples, so I should switch that around
2:56 PM <@cjs77> for example
```
