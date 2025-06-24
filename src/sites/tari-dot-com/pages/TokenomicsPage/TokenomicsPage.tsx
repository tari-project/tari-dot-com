import { Holder, Image, Wrapper } from './styles';

import Image1 from './images/1.jpg';
import Image2 from './images/2.png';
import Image3 from './images/3.png';
import Image4 from './images/4.png';
import Image5 from './images/5.png';
import Image6 from './images/6.png';
import Image7 from './images/7.png';

export default function TokenomicsPage() {
    return (
        <Wrapper>
            <Holder>
                <h1>Tari Tokenomics</h1>
                <h2>Everything you ever wanted to know about Tari tokenomics</h2>

                <br />

                <Image src={Image1.src} alt="" />

                <p>
                    <strong>&quot;Wen Token?&quot;</strong>
                </p>
                <p>
                    It is a rallying cry as poignant as it is timeless. Of course, the inquisitors can expect a blunt
                    and enthusiastic &quot;soon!&quot; in response. But this isn&apos;t an article about
                    &quot;Wen;&quot; it is an article about How. The time has come to reveal the details of Tari
                    tokenomics.&nbsp;
                </p>
                <p>
                    <strong>The Big Picture:</strong>
                </p>
                <p>
                    Let&apos;s get down to brass tacks. The Tari network has two layers: layer 1 (aka the Minotari
                    network) and layer 2 (aka the Ootle network). Layer 1 is secured by proof of work. Miners are
                    rewarded with Minotari tokens (XTM). Layer 2 is a Byzantine fault-tolerant network fueled by the
                    Tari token (XTR).
                </p>
                <p>
                    There will be a total supply of 21 billion XTM emitted gradually using an exponential decay function
                    over approximately 27.8 years. Once annual emissions decline to 1% of total supply, a perpetual 1%
                    tail emission will continue indefinitely, ensuring ongoing miner compensation and network security.
                    Of this total supply, 6.3 billion XTM (30%) will be pre-mined, subject to significant lockups and
                    vesting schedules. These pre-mined tokens will support protocol infrastructure, community
                    incentives, grants, and long-term alignment with contributors. After the pre-mine distribution, all
                    newly emitted tokens (100%) will go exclusively to miners who secure the Tari network.
                </p>
                <p>
                    There is a deep relationship between XTM tokens and XTR tokens. The only way to create XTR is to
                    burn XTM 1:1. A transaction fee-oriented burn mechanism on the Ootle network will help ensure
                    overall token supply equilibrium. There is much to cover, so let&apos;s start with the Tari Layer 1
                    proof of work model and XTM.&nbsp;
                </p>
                <p>
                    <strong>Proof of Work Distribution&nbsp;</strong>
                </p>
                <p>
                    <span>
                        Once considered the gold standard for securing blockchains, proof of work originated with
                        Satoshi Nakamoto’s implementation for Bitcoin. Recently, it’s fallen out of favor for proof of
                        stake consensus mechanisms. We strongly believe that in the coming months, there will be a
                        renewed appreciation for Nakamoto consensus: A blockchain consensus mechanism combining proof of
                        work and the longest chain rule to achieve network agreement on the blockchain state. Anyone and
                        everyone will be able to mine Minotari on Day 1 - creating a world where everyone has a voice
                        and an opportunity to participate in the network and shape its future. This accessibility brings
                        a fair distribution that’s been absent in recent projects. You don’t need to be an early
                        investor or an airdrop farmer to get XTM; simply contributing raw hash power to the network is
                        enough.
                    </span>
                    <br />
                    <br />
                    <span>
                        Tari miners receive XTM for every block they mine, with block rewards declining on a
                        block-by-block basis. In the first 12 years post-mainnet launch, the Tari emission curve
                        dictates the mining reward. After 12 years, the protocol rewards miners via a tail emission to
                        ensure they receive compensation forever for securing the network. The tail emission increases
                        the XTM emitted by{' '}
                    </span>
                    <strong>1%</strong>
                    <span> a year. Tari miners receive </span>
                    <strong>100%</strong>
                    <span> of block rewards and Layer 1 transaction fees.</span>
                </p>

                <Image src={Image2.src} alt="" />

                <p>
                    Unlike Bitcoin, which operates on a 4-year halving schedule, the Tari block rewards decrease
                    steadily over time block-by-block through an exponential decay function, halving approximately every
                    three years.
                </p>
                <p>
                    <span>
                        Network rewards are split 50/50, with half of the Tari block reward going towards merge mining
                        performed with the RandomX hashing algorithm and{' '}
                    </span>
                    <strong>50%</strong>
                    {` `}
                    <span>
                        of the block rewards going to Tari standalone miners using the SHA3x hashing algorithm. RandomX
                        is a proof of work (PoW) algorithm designed to be ASIC-resistant by optimizing for
                        general-purpose CPUs, ensuring fairer, more accessible, and more decentralized mining. The
                        merge-mining aspect of Tari will enable existing RandomX miners to increase their revenue and
                        keep them successfully mining both the RandomX chain and Tari for the foreseeable future. The
                        Tari protocol bakes this 50/50 distribution into the consensus rules.
                    </span>
                </p>
                <p>
                    <strong>Burn Baby Burn: The Turbine Model</strong>
                </p>
                <p>
                    <span>
                        All dapp (tapp!) activity will occur on the Tari Layer 2 (aka the Ootle), including DeFi, NFTs,
                        SocialFi, GameFi, stablecoins, streaming payments, and more. Tari contributors have designed an
                        elegant relationship between the Layer 1 tokens (XTM) and the Layer 2 tokens (XTR) to offset
                        supply inflation and maintain a soft peg between them. Tari contributors achieve the interplay
                        between the two tokens through a token model called the
                    </span>{' '}
                    <a href="https://rfc.tari.com/RFC-0320_TurbineModel.html" rel="">
                        Turbine Model
                    </a>
                    <span>.</span>
                </p>
                <p>
                    In the Tari Turbine Model, the only way to create XTR tokens is to burn XTM tokens on the Layer 1
                    and redeem the XTR 1:1 on the Ootle network. As a result, there is a one-way relationship between
                    the two tokens. On the Ootle, a portion of the transaction fee is paid to validators, and a portion
                    of the transaction fee is burned. This token-burning mechanism creates a powerful economic model
                    where Tari miners can confidently secure the network forever, and at scale, the overall Tari token
                    economy achieves circulating supply equilibrium.&nbsp;
                </p>

                <Image src={Image3.src} alt="" />

                <p>
                    The Turbine Model enables Tari to maintain a soft 1:1 peg between Minotari (XTM) and Tari (XTR)
                    without using complicated peg-out mechanisms like drive chains or federated pegs.&nbsp;
                </p>

                <Image src={Image4.src} alt="" />

                <p>
                    Other things being equal, greater activity on the Ootle depletes the supply of Tari tokens faster.
                    Mining rewards on the Minotari network in the form of XTM replenishes the supply of XTR.
                </p>
                <p>
                    The Throttle actively controls the burn rate for XTR associated with every transaction on the Ootle.
                    The Throttle is an algorithm run via consensus by validator nodes that periodically adjusts the burn
                    rate to maintain the stability of the Tari ecosystem. The Throttle has three priorities in
                    decreasing order of importance: to i) maintain the XTM:XTR peg, ii) maintain a stable supply of XTR
                    + XTM, and iii) maintain a total token supply of 21 billion tokens.
                </p>
                <p>
                    Tari’s fast finality, sub-penny transaction fees, infinite scalability, programmable confidentiality
                    features, and superior user experience make it the best platform to become the default value layer
                    of the internet.
                </p>
                <p>Slowly and then all at once 🐢</p>
                <p>
                    <strong>Token Distribution</strong>
                </p>
                <p>
                    <span>With </span>
                    <strong>70%</strong>
                    <span> of the initial emission of XTM tokens going to miners, what’s the deal with the </span>
                    <strong>30%</strong>
                    <span> of pre-mined XTM tokens?</span>
                </p>
                <p>
                    <span>The other </span>
                    <strong>30% </strong>
                    <span>pre-mine is broken into four categories:</span>
                </p>
                <ul>
                    <li>Community</li>
                    <li>Protocol Infrastructure and Grants</li>
                    <li>Contributors</li>
                    <li>Participants</li>
                </ul>
                <p>Let’s talk about each in detail.</p>

                <Image src={Image5.src} alt="" />

                <p>
                    We were going to add a tiny slice for &quot;that one guy who always asks about token distribution in
                    the chat,&quot; but fluffypony shot down that idea.
                </p>
                <p>
                    <strong>Community</strong>
                </p>
                <p>
                    A wise anon once said, “No token, no community.” There&apos;s no industry in the world like crypto,
                    and we wouldn&apos;t be here without continuous support from the Tari community. Our community is
                    our constellation, guiding us and the sole reason we exist!
                </p>
                <p>
                    <strong>5%</strong>
                    <span>
                        {' '}
                        of the XTM supply has been set aside for incentive programs to encourage and reward people for
                        their engagement within the Tari community. When combined with the miner portion,{' '}
                    </span>
                    <strong>75%</strong>
                    <span> of the total initial supply is for the Tari community. On a go-forward basis, </span>
                    <strong>100%</strong>
                    <span>
                        {' '}
                        of XTM tail emissions will be paid exclusively to the Tari community of miners working hard to
                        secure the network.
                    </span>
                </p>
                <p>
                    <strong>Protocol Infrastructure and Grants</strong>
                </p>
                <p>
                    <span>
                        Tari is a one-of-a-kind protocol design and network that presents unique challenges. We have set
                        aside{' '}
                    </span>
                    <strong>9%</strong>
                    <span>
                        {' '}
                        of the initial XTM supply to meet these challenges and support the development of tooling
                        necessary for operating the Tari network. After all, we’re not just building a network together;
                        we’re crafting a world where every Tari matters.&nbsp;
                    </span>
                </p>
                <p>
                    <strong>Contributors</strong>
                </p>
                <p>
                    <span>
                        For over six years, contributors have developed meaningful innovations and made substantial
                        efforts to build the Tari protocol from the ground up.{' '}
                    </span>
                    <strong>4%</strong>
                    <span>
                        {' '}
                        of the initial XTM supply is being set aside to reward people for their contributions to the
                        development of the Tari network.
                    </span>
                </p>
                <p>
                    <strong>Participants</strong>
                </p>
                <p>Who are the participants?&nbsp;</p>
                <p>
                    <span>
                        Before Tari was a protocol, it was a vision. Participants are the early supporters such as
                        Blockchain Capital, Collab+Currency, gmoney, loomdart, DCF GOD, DV Chain, Kamal Ravikant, Bryan
                        Pellegrino, Ayon, Messi, Pantera, Hack VC, Paris Hilton, eGirl Capital, CMT Digital, Kilowatt,
                        Redpoint, Trinity, and many others who stepped up to help make Tari a reality.{' '}
                    </span>
                    <strong>12%</strong>
                    <span>
                        {' '}
                        of the supply has been reserved for those who have supported the development of Tari from the
                        very beginning. The Tari community is forever grateful for your continuous and unwavering
                        support.
                    </span>
                </p>
                <p>At this point, you’re probably wondering when all these tokens unlock. Let me key you in.</p>
                <p>
                    <strong>Unlock Schedule</strong>
                </p>

                <Image src={Image6.src} alt="" />

                <p>
                    <em>
                        <span>*</span>
                        <strong>40%</strong>
                        <span>
                            {' '}
                            of the Protocol Infrastructure and Grants allocation will be reserved and available upfront
                            for protocol liquidity.
                        </span>
                    </em>
                </p>
                <p>
                    <strong>Community Tokens</strong>
                </p>
                <p>These tokens will unlock every month for 12 months beginning six months after the mainnet launch.</p>
                <p>
                    <strong>Protocol Infrastructure and Grants Tokens</strong>
                </p>
                <p>
                    At the mainnet launch, 756,000,000 tokens will be available for liquidity providers. The balance
                    will be unlocked every month for four years, starting six months after the launch.
                </p>
                <p>
                    <strong>Contributor Tokens</strong>
                </p>
                <p>
                    These tokens will unlock every month for five years, beginning 12 months after the mainnet launch.
                </p>
                <p>
                    <strong>Participant Tokens</strong>
                </p>
                <p>These tokens will unlock every month for two years, beginning 12 months after the mainnet launch.</p>

                <Image src={Image7.src} alt="" />

                <p>
                    Please note that just because these tokens are unlocked does not necessarily mean they will be
                    circulating. For example, tokens allocated for Protocol Infrastructure and Grants will be unlocked
                    but held back from circulating supply until they can be deployed to improve the usefulness of the
                    Tari network.
                </p>
                <p>
                    <strong>What&apos;s next?</strong>
                </p>
                <p>
                    <span>
                        Tari mainnet is here! 🎉 You can now mine Tari with Tari Universe—the easiest, most beautiful
                        mining app ever created. Simply download it for Mac, PC, or Linux, install it, and start mining
                        immediately.
                    </span>
                    <br />
                    <span>
                        You can also earn precious gems and maximize your rewards through the
                        {' '}
                        <a href="https://airdrop.tari.com/" rel="">
                            Tari Airdrop
                        </a>
                        {' '}
                        game by inviting friends to mine. Questions or just want to chat? Join our
                        {' '}
                        <a href="https://t.me/tariproject" rel="">
                            Telegram community
                        </a>
                        —we’d love to talk Tari, mining tips, or even your favorite movies.
                    </span>
                </p>
                <p>
                    <strong>Thank you</strong>
                </p>
                <p>
                    We want to thank loomdart, A.B., Avichal Garg, Lozenge, Spencer Bogart, RandomTask, Fran Strajnar,
                    Mike Darlington, Yat Museum, Micah Spruill, Tyler Frost, Sultan of Yat, Jedi Blocmates, Ivan
                    Brightly, Preston Byrne, Russ Franklin, Max Power, Moses and the Mozaik team, Stephen McKeon, Wes
                    McKinney, and many others for reviewing and providing feedback to drafts of this document. You are
                    Tari. We are Tari 🐢
                </p>
                <p>
                    <strong>
                        NOTICE TO RESIDENTS OF THE UNITED STATES: TARI HAS NOT BEEN REGISTERED UNDER THE SECURITIES ACT
                        OF 1933, AS AMENDED, AND MAY NOT BE OFFERED OR SOLD IN THE U.S. OR TO U.S. PERSONS (AS SUCH TERM
                        IS DEFINED IN RULE 902 AS PROMULGATED BY THE U.S. SECURITIES AND EXCHANGE COMMISSION) UNLESS IT
                        IS REGISTERED UNDER SUCH ACT, OR AN EXEMPTION FROM THE REGISTRATION REQUIREMENTS OF SUCH ACT IS
                        AVAILABLE.
                    </strong>
                </p>
            </Holder>
        </Wrapper>
    );
}
