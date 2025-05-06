---
layout: post
title: Tari Protocol Discussion 27
date: 2019-03-04 21:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-27.png
lead: Recourse against validator nodes operating in bad faith
class: subpage
---

On Monday, the Tari community gathered to assess tools needed to prevent bad actors from participating as validator nodes on the Tari network. Below is the TL;DR on Monday's conversation (full transcript included below):

One way to discourage bad actors on the Tari network is to simply make it more expensive to try and game the system than to just do what is required to manage a particular digital asset. 

Something like a strong BFT consensus could work here, where one only gets paid fees if there is evidence of participation and they voted with the BFT consensus group.

A few game theory concepts to consider implementing on the Tari network:

* VNs can only get paid their fees for 'with BFT votes' and not 'against BFT votes'.
* No recourse for attempted bad acting other than loss of income.
* VNs guilty of bad acting can/should be banned from a committee.
* VNs guilty of bad acting will not be known for such outside of the committee where it occured.

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (11am EST)**

**Thursdays: 11am CAT (4am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Monday’s discussion

```
10:33 AM <Hansie> Hi there, anyone?
10:35 AM <Hansie> Maybe it is wrong to assume that a VN registration Tx will include the registration fee as well as the collateral to manage an asset?
10:47 AM <Blackwolfsa> Yes I think we should split them
10:47 AM <Blackwolfsa> Asset collateral should be split so as to easy manage multiple ones
10:49 AM <Hansie> Do you propose a specific 'ring fenced' collateral for a specific digital asset?
10:51 AM <Blackwolfsa> I think so yes
10:52 AM <Hansie> Time-locked registration UTXO, mined in the base layer?
10:53 AM <Blackwolfsa> Both should be in the base layer.
10:53 AM <Blackwolfsa> Mined
10:54 AM <Blackwolfsa> This should make it sybil resistant and then registration is important for the vn id
10:55 AM <Hansie> Makes sense
10:56 AM <Hansie> So is the collateral UTXO into some sort of multisig, and the registration UTXO a payment to self?
10:57 AM <Blackwolfsa> Definitely an aggregated signed, multi signature is up for debate
10:57 AM <Blackwolfsa> If we can do snorr + shamir then it can be aggregated
10:59 AM <Hansie> Cool
11:00 AM <Hansie> Any recourse for attempted bad acting on the part of a VN?
11:01 AM <Blackwolfsa> I am a fan of designing a system to not need it. Any idea how we could?
11:02 AM <Xeagu> Meeting now?
11:02 AM <Hansie> <Xeagu> : Just packing up now on my part
11:06 AM <Hansie> Blackwolfsa: Maybe make it more expensive to try and game the system than to just do what is required to manage the asset. Something like a strong BFT consensus, only get paid fees if there are evidence of participation and voted with the BFT consensus group. ??
11:10 AM <Blackwolfsa> Yes I think something along those lines
11:10 AM <Hansie> How does this sound?
11:10 AM <Hansie> `Assumptions - Game theory`
11:10 AM <Hansie> - VNs can only get paid their fees for 'with BFT votes' and not 'against BFT votes'.
11:10 AM <Hansie> - No recourse for attempted bad acting other than loss of income.
11:10 AM <Hansie> - VNs guilty of bad acting can/should be banned from a committee.
11:10 AM <Hansie> - VNs guilty of bad acting will not be known for such outside of the committee where it occured.
11:11 AM <Blackwolfsa> We could easily add a memory only known bad actors
11:11 AM <Blackwolfsa> And propagate those forward
11:11 AM <Hansie> Maybe that could be gamed easily?
11:12 AM <Hansie> Got to go, bye for now.
11:12 AM <Blackwolfsa> Well you could easily vote for you  want with you in the committee
11:12 AM <Blackwolfsa> Do how do we control that?
11:13 AM <neonknight> VNs will be discourage from bad acting as they will be motivated to make fees. Running a VN costs money and resources.
11:14 AM <neonknight> Voting who you want part of a committee might not be great as the bad player can then promote his BAD friends to be part of his committee.
11:18 AM <Blackwolfsa> We need some way of voting off non performance
11:18 AM <Blackwolfsa> If we can get a nice way of controlling this then we can allow that
11:19 AM <oneiric_> does any kind of vetting or trust-then-verify system make sense in this context?
11:19 AM <simian_za> It's not really possible to vet a VN
11:20 AM <simian_za> You can only really judge them based on their performance in your committee
11:20 AM <neonknight> Also most VNs will be completely anonymous
11:21 AM <oneiric_> ok, so really only trust-then-verify, where bad performance is punished
11:21 AM <Blackwolfsa> We can't really punish as well, only punish by not paying fees out
11:22 AM <Blackwolfsa> What we need is to motivate VNs to vote bad performance out
11:22 AM <simian_za> exactly, there might be a possibility of a blacklist but when you start down that road you kind of create a way for bad actors to attack other actors
11:23 AM <neonknight> I think most punishment mechanisms can be gamed and could be used incorrectly
11:24 AM <Blackwolfsa> We need to be able to solve this: there is a commitee that has a mayorrity bad performance in it. They don't care that they don't handle all requests
11:24 AM <Blackwolfsa> They get their fees
11:24 AM <Blackwolfsa> We need to be able to remove them
11:25 AM <simian_za> So I guess in the same way that the Asset Issuer will control the process to convene the first committee they should have a mechanism to remove non performant members
11:26 AM <Blackwolfsa> We need the fees to be a factor of how much work you did vs how much work the commitee did
11:26 AM <simian_za> Is there any reason that giving the Asset Issuer absolute rights to kick members of the committee is a problem?
11:27 AM <oneiric_> why not majority, or super-majority, voting? with maybe some external check to ensure will of the masses doesn't unjustly punish individuals?
11:27 AM <simian_za> that is still an issue if you get a majority of low performers (only actually handle say 50% of the instructions coming in) and they are happy with that
11:28 AM <Blackwolfsa> I see no problem allowing the asser issuer to kick people
11:28 AM <Blackwolfsa> Well if you have someone handling less then you you should get less fess
11:28 AM <Blackwolfsa> That way it motivates you to get better VNs as buddies
11:29 AM <oneiric_> ^ if the issuer having kick privileges is the agreement going in, then yeah that makes sense
11:30 AM <simian_za> In the end its the Issuer who has the most incentive to make sure the asset is being serviced properly
11:30 AM <Blackwolfsa> Yes
11:31 AM <stanimal> The AI has ultimate control over the VNs used - in a network selected committee, could you not specify a bigger committee size should you require more capacity?
11:31 AM <Blackwolfsa> If we can make the fee formula so that the amount you get is max if every vn including you handle 100% of fees
11:31 AM <Blackwolfsa> Then it's incentives to have only good vns
11:32 AM <simian_za> stanimal: that is true you could though you would need to be willing to pay more fees
11:33 AM <stanimal> The issuer wallet could maintain the reputation stats of the VNs used, and make better decisions after the next checkpoint
11:34 AM <stanimal> i.e. choose not to include the offending VN next time
11:34 AM <stanimal> eventually finding trustworthy, reliable VNs
11:34 AM <oneiric_> any way for VN to regain lost reputation?
11:35 AM <oneiric_> let's say they were manipulated into bad action?
11:35 AM <simian_za> well they could register a new VN
11:36 AM <simian_za> they would need to front a new registration fee but the tainted VN registration fee will be released in the future
11:37 AM <neonknight> Stanimal: I think the issuer might know the distribution of payouts to each committee member at the end of each checkpoint, this should correlates with their service delivery but not necessarily bad acting. The issuer could drop worst performer for an alternate VN.
11:38 AM <simian_za> oneiric_: keeping track of a VNs "reputation", good or bad, between different committees is quite challenging. We have not been able to think of a good way to do it in a decentralized manner that cannot be gamed
11:39 AM <simian_za> even in the most rudimentary terms such as a one-strike your burned blacklist
11:40 AM <oneiric_> how do coins like steemit do it?
11:40 AM <stanimal> It would be centralized in the local asset issuer wallet - or would that not make sense?
11:41 AM <neonknight> It could be centralised, but I don't think the asset issuer will always be online.
11:41 AM <stanimal> Good point
11:42 AM <Blackwolfsa> It would be great if the asset issuer doesn't have to be
11:43 AM <Blackwolfsa> I think we could design it so that he doesn't have to be
11:44 AM → mikethetike joined  ⇐ el00ruobuob quit  
11:47 AM <simian_za> oneiric_: Not sure how steemit was set up but most the non-PoW coins use some sort of proof of stake mixed with including their own trusted nodes in the mix
11:47 AM <simian_za> both factors work because of the centralization
11:48 AM <stanimal> So the current deterrents we have are: loss of fees and the cost of mounting an attack on a committee (network selected would make it hard & expensive to become part of any particular committee) - for any high value assets, the safety net is to use permissioned nodes - is that right?
11:48 AM <oneiric_> damn, knew there was something about steemit that bugged me
11:49 AM <simian_za> I am not 100% versed in the actual story but there was a lot of shade being thrown at steem over the last year
11:50 AM <simian_za> stanimal: sounds about right
11:50 AM <stanimal> loss of fees = VN running costs + somehow not including them in the next committee - which I guess we don't completely have
11:52 AM <simian_za> well they also loose the potential fees they could be earning with their registration fee + collateral by not performing
11:52 AM <simian_za> so thats a lost opportunity cost
11:58 AM <Blackwolfsa> Yip only lost opportunity
11:58 AM <stanimal> Could committee members come to a consensus that a VN is being a douchebag (technical term for bad actor) - and not forward messages to them (losing the bad VN fees)- additionally, the asset issuer would also be able to see that committee state and potentially act on that
11:59 AM <Blackwolfsa> Could be as well
11:59 AM <Blackwolfsa> There could be some devious ways to "vote" a VN out
11:59 AM <neonknight> I think it could happen
12:01 PM <stanimal> But then you'd have a bad committee right?
12:01 PM <Blackwolfsa> No you are doing your job
12:01 PM <Blackwolfsa> Signing valid instructions
12:02 PM <Blackwolfsa> We need to motivate good behaviour
12:02 PM <neonknight> Agreed, the same thing will happen if 1 out of 5 VNs have bad latency and the other 4 always reach consensus without the slow VN.
12:04 PM <stanimal> Ye agreed, back to punishment models being gamed
12:04 PM <stanimal> or being unjust
12:07 PM <Blackwolfsa> If the economics is chosen in such a way it should self regulate
12:09 PM <stanimal> Definitely first prize - thanks all g2g
```
