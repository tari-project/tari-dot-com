---
layout: post
title: Tari Protocol Discussion 4
date: 2018-11-06 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-4.png
lead: Tools for Monero mining pools, wire protocol choices, threading models, and more.
class: subpage
---

The Tari community examined merge-mining pool implementations, wire protocol choices, in-process communication options, threading models, and code dependency audits during today’s Tari protocol architecture discussion.

This is the TL;DR on what was covered (full transcript included below):

How will Monero mining pools get the tools they need in order to support Tari merge-mining?

- PRs are submitted or someone has to fork the OSS mining pool software
- Closed source pools would need to do it themselves or talk to someone in the Tari community

Which wire protocols should be considered?

- In-process, ZeroMQ looks interesting
- Still looking at gRPC / http / hand-rolled also as some alternatives

What are possible in-process communication options & threading models?

- ZeroMQ is the preferred choice
- actix, Rust native (mpsc), tokio, mio, hand-rolled message brokers are possible alternatives
- More testing is needed to check speed of inprocess comms for ZeroMQ

How should code dependencies be handled?

- Audit every dependency
- Evaluate whether the risks < benefits, and go for battle-hardened, proven technologies where available
- It’s hubris to reinvent libraries that have millions of CPU hours behind them, but also it’s folly to chuck in a lib with 50 dependencies just to save 2 lines of boilerplate code

Join us for our next discussion on Freenode in #tari-dev.
Discussion times proposed by the Tari community:

**Mondays: 8pm CAT (1pm EST)**
**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of today’s discussion

```
7:05 PM <@cjs77> Hey all
7:07 PM <el00ruobuob_[m]> hi
7:08 PM <Krakaw> evening
7:08 PM <@fluffypony> cjs77: there aren’t tons of different pool implementations that would need PRs to support merge mining
7:08 PM <@fluffypony> just the two, as moneromooo pointed out
7:08 PM <@fluffypony> and then the ones running their own stuff must play catch-up
7:09 PM <@cjs77> Cool, so those pool have open-sourced their code?
7:10 PM <@cjs77> Any links?
7:10 PM <tk___> hey
7:12 PM <moneromooo> https://github.com/zone117x/node-cryptonote-pool is the original one, not sure what fork is the most current one though.
7:12 PM <@fluffypony> sammy007 will know
7:12 PM <mikethetike> anything specific on the agenda tonight?
7:13 PM <simian_za> Evening
7:14 PM <@cjs77> There are a couple of active topics:
7:14 PM <@cjs77> * Monero mining pools — and what we’d need to provide to help them support Tari merge mining
7:14 PM <@cjs77> Rollover from From last week:
7:14 PM <nioc> Snipa wrote the other pool software and hangs out in #monero-pools
7:15 PM <@cjs77> * wire protocol choice
7:15 PM <@cjs77> * in-process communication options & threading models
7:15 PM <@cjs77> * use of dependencies in code
7:15 PM <nioc> I guess it’s somewhere on github
7:15 PM <@cjs77> Thanks nioc
7:18 PM <@cjs77> ITO wore protocol, I’ve been doing some reading and there are a coupla alternatives:
7:18 PM <@cjs77> * NIH — I believe Grin went this route
7:18 PM <@cjs77> * gRPC — great cross platform support
7:18 PM <@cjs77> * zMQ — hands down winner imho
7:20 PM <simian_za> Zmq is also good for your second point? Interprocess comms and threading?
7:21 PM <json_> gRPC well supported in rust? What was the reason grin went with http?
7:22 PM <neonknight> gRPC and zMQ have rust bindings..
7:23 PM <@cjs77> neonknight: I really think it can be. Rust has some alternatives, like mio, tokio (which is built on mio), Actix (which is built on tokio).
7:23 PM <@cjs77> So the problem is: it’s really one stack (Rust is possibly not mature enough to have a suite of options); mio and tokio aren’t that easy to use; but Actix has a HUGE number of dependencies. Whereas ZMQ is simple, does the job; does it incredibly well; and let’s you build on top of it without much fuss
7:24 PM <mikethetike> The docs for actix-web are not bad, but for actix itself, they are very bare
7:25 PM <mikethetike> 8 out of 11 pages of the user guide just say “[WIP]”
7:25 PM <simian_za> Tokio is also very dependancy heavy
7:26 PM <@fluffypony> I’m a big fan of 0MQ
7:26 PM <@fluffypony> and vtnerd has done great work integrating it in Monero
7:26 PM <@fluffypony> he can give input in to that experience
7:27 PM <@cjs77> So to step back a sec; I like the idea of using message passing (even internally) because it allows for a very decoupled architecture; the question is that if this is the approach to take, is zmQ / 0mq performant enough on its `inproc` sockets to use a sinlge library for both “internal” and external messaging?
7:28 PM <@fluffypony> so like microservices?
7:28 PM <@cjs77> yup
7:28 PM <@cjs77> maybe not per the strict definition (like the modules would still run on the same box for performance)
7:30 PM <@cjs77> but, if you _wanted_ to run the e.g. block validator module on a different machine to the mempool (I don’t know why you would, but hey), you could change `inproc` to `tcp` and off you go (more or less)
7:32 PM <mikethetike> What did monero use before 0mq
7:33 PM — @cjs77 gathers around the fireplace to listen to fluffypony regale us with tales of yore
7:34 PM <Hansie> Hi there
7:35 PM <Hansie> zMQ: Inter plaform — yes, inter process — yes, inner process — maybe
7:36 PM <@fluffypony> mikethetike: JSON over HTTP
7:36 PM <@fluffypony> it still supports that
7:36 PM <@fluffypony> and the CLI wallet still talks to the daemon over that
7:36 PM <Hansie> A couple of simple spike tests will tell if zMQ can handle all three. If so, good
7:36 PM <@fluffypony> but it’s not really IPC, it’s more RPC
7:36 PM <@cjs77> Yeah, it’s the “maybe” I’m looking to see if anyone has some definitive experience on
7:38 PM <@fluffypony> https://grokbase.com/t/zeromq/zeromq-dev/102s8rzsvs/inter-thread-zmq-inproc-performance
7:39 PM <@fluffypony> that looks positive
7:39 PM <@fluffypony> http://zeromq.org/results:perf-howto
7:39 PM <@fluffypony> To run an inter-thread latency test, use inproc_lat instead of the above. It is a single executable and doesn’t require specifying an endpoint:
7:40 PM <@fluffypony> To run an inter-thread throughput test, use inproc_thr instead of the above. It is a single executable and doesn’t require specifying an endpoint:
7:41 PM <@cjs77> That looks great, actually.
7:41 PM <mikethetike> I suppose we’ll still need to expose parts of the API via http for android wallets etc
7:41 PM <mikethetike> or can 0mq do that natively
7:42 PM <@fluffypony> mikethetike: Android can talk via 0MQ over TCP
7:42 PM <@cjs77> I did some tests on the mac using `tcp` loopback last week and got 10,000,000 messages/sec throughput, so even that is pretty quick
7:42 PM <@fluffypony> there are bindings for Java
7:42 PM <mikethetike> noice
7:42 PM <Hansie> My experience is with ACE TAO Corba (The ACE Orb) — real-time Corba. The native OS messaging infrastructure (semaphore, WaitForSingleObject, etc.) was more efficient for inner process communication. Seems to be a heavier implementation than zMQ though.
7:43 PM <@cjs77> If we have LMDB as a key-value store and 0mq as a the message broker, I think we have a little pocket rocket on ur hands
7:45 PM <@fluffypony> yuuuuup
7:45 PM <@fluffypony> hyc would be so proud
7:45 PM <@fluffypony> *wipes tear*
7:45 PM <@cjs77> btw Googling “corba rust implementation” doesn’t come up with anything
7:46 PM <Hansie> LMDB + zMQ 0MG sounds good, but the proof is in the pudding. I am a fan of a couple of small spike projects to proof.
7:46 PM <@fluffypony> lol corba
7:49 PM <@cjs77> Yeah, we can pull up some tests. fluffy’s link had some benchmark code references
7:50 PM <@cjs77> Ok, great progress on this front. It also implicitly addresses the dependency issue.
7:50 PM <@cjs77> .. implicitly to some degree
7:51 PM <@fluffypony> cjs77: so in Monero we’ve had to submodule some deps for building static bins
7:51 PM <@fluffypony> how does Rust handle deps?
7:51 PM <@cjs77> Cargo is a packagae manager ala npm for node
7:51 PM <mikethetike> but you can also cargo a submodule if needed
7:52 PM <@cjs77> compiling in rust is (99% of the time) as simple as `cargo build`
7:52 PM <@fluffypony> ok but then is there static and dynamic binding like with C?
7:52 PM <@cjs77> nah, everything is a crate
7:52 PM <@fluffypony> are crates binary packages or source code?
7:52 PM <@cjs77> but a crate can be a gtihub link to specific commit for example
7:52 PM <mikethetike> crates are source
7:52 PM <@cjs77> source code
7:52 PM <@fluffypony> ah ok so it always builds every dep
7:53 PM <mikethetike> but you can also build a dynamic linkable binary I believe
7:53 PM <@fluffypony> let’s hope we never have boost for rust :-P
7:53 PM <@fluffypony> dynamic libraries and DLLs were always a dumb idea, imho
7:53 PM <mikethetike> I think compiling from source is what we’ll be doing most of the time though
7:53 PM <@fluffypony> DLL hell is a real thing for developers
7:54 PM <@cjs77> afaik even something ike 0mq, which are rust wrappers around the C library, will build the C code as part of the build, but I may be worng
7:54 PM <@fluffypony> kk
7:55 PM <mikethetike> I do think we need to be careful about which dependencies we use
7:56 PM <@cjs77> fluffypony: I def looks like Rust expects `libssl` and `libc` to be on your system at runtime, so there are still a few dynamic linked libs. This is by default, and I suspect you could force linking those in too if you wished
7:56 PM <mikethetike> otherwise we’ll be reviewing code in those repos forever
7:57 PM <@cjs77> mikethetike: agreed. Wich is why the ability to freeze crate versions or even commit versions is a nice feature
7:57 PM <@fluffypony> yeah like submodules are at a commit hash
7:57 PM <@fluffypony> so same but different
7:57 PM <@fluffypony> cjs77: I guess libssl is pretty standard by now
7:58 PM <Hansie> I like the ability to link to certain commit versions.
7:58 PM <neonknight> I think we should limit the number of dependencies to the bare minimum. It will be crazy to reinvent the wheel every time.
7:59 PM <@cjs77> fluffypony: yeah, on any standard system (and we supply instructions for things like building a docker image on alpine linux, for example)
8:00 PM <@cjs77> neonknight: it sounds like part b is contradicting part a?
8:00 PM <@fluffypony> lol
8:00 PM <@cjs77> it’s a thing! :)
8:01 PM <neonknight> Hehhe It is late in South Africa, some dependencies are better than none.
8:01 PM <@cjs77> kk. gotcha
8:04 PM <Hansie> neonknight: Yes, we should invent tokens not wheels
8:05 PM <@cjs77> Yeah, walk the line. Audit every dependency. Really evaluate whether the risks << the benefits, and go for battle-hardened, proven technologies where available. It’s hubris to think we could improve on libraries that have millions of CPU hours behind them, but also it’s folly to chuck in a lib with 50 dependencies just to save 2 lines of boilerplate code here and there.
8:05 PM <mikethetike> agreed
8:05 PM <endogenic> there’s the argument one ends up maintaining any dependency anyway
8:05 PM <mikethetike> Also no auto-updating of dependencies
8:06 PM <Hansie> If sense is with us sanity will prevail
```
