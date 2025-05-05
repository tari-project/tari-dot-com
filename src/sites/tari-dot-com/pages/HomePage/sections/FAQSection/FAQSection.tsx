'use client';

import { useState } from 'react';
import FAQEntry from './components/FAQEntry/FAQEntry';
import { Holder, Wrapper, Title, List, SeeAllButton, ShowMoreList } from './styles';
import { AnimatePresence } from 'motion/react';

const faqData = [
    {
        question: `What is Tari Universe?`,
        answer: `Tari Universe is the beautifully simple app for mining Tari on Mac or PC. Tari Universe turns your computer into a money machine. It works by harnessing your computers computational power to solve blocks on the Tari network. In doing so, you're helping to secure the Tari network while earning Tari token (XTM) rewards.`,
    },
    {
        question: `What's the catch?`,
        answer: `No catch—just run the app and start earning. Tari's mission is to the next-generation financial system accessible to everyone.`,
    },
    {
        question: `Is this safe?`,
        answer: `Yes. Tari is developed by a talented group of technologists, and designers with a unique vision for the future of money. Tari Universe (and all software associated with the Tari protocol) is open source (meaning anyone can inspect and use the source code). It doesn't access your files and puts you in control of how much computational power you want it to use.`,
    },
    {
        question: `Who is behind Tari?`,
        answer: `Tari contributors are very blessed to have the support of high-profile investors, including Blockchain Capital, Pantera, Trinity, Redpoint, Slow Ventures, and many more.`,
    },
    {
        question: `What is the network “warm-up” period, and what does that mean for miners?`,
        answer: `<p>The birth of a proof-of-work network is special. In the early days, the network needs time to stabilize and find its rhythm. We call this the “warm-up phase.”</p>
        <p>Contributors and early supporters of the Tari network (like exchanges and infrastructure partners) expect the warm-up phase to last ~15 days (until ~May 20, 2025). After that, the network will transition to a more stable state.</p>
        <p>During the warm-up phase, some quirks are normal. You might see block time fluctuations, temporary disconnections, syncing delays, or even short-lived forks that require your node to reconnect to the main chain.</p>
        <p>The warm-up phase is a great time to mine because rewards are highest per block. We hope the early days of the Tari network are rewarding for you. </p>`,
    },
    {
        question: `Will this slow down my computer?`,
        answer: `Tari Universe is designed to use only the resources you allow. You can easily set limits on how much processing power is dedicated to mining, and you can pause or stop mining with a single click anytime. Tari Universe always puts you in full control.`,
    },
    {
        question: `Do I need to understand cryptocurrency to use this?`,
        answer: `Not at all! Tari Universe is specifically designed for people who aren't crypto experts. If you can install an app, you can use Tari Universe.`,
    },
    {
        question: `What makes Tari different from other crypto projects?`,
        answer: `
            Tari is a new layer 1 blockchain protocol with a profound approach to building a massive on-chain user base. 
            <br />
            <br />
            Building a thriving, loyal, on-chain user base is one of the most challenging things to do in our industry. Other blockchain protocols struggle with this because airdropped tokens predominantly end up in the hands of farmers and bots. Their on-chain user bases evaporate rapidly as the farmers and bots sell their tokens and move on to the next protocol. Their only alternative is to route users through high friction and low conversion rate onramps. As a result, most blockchain protocols have few loyal users. 
            <br />
            <br />
            The challenge for other blockchain protocols continues beyond building an ardent user base. When protocol teams attempt to recruit developers to build on their protocol, they face a catch-22: the best developers want to create applications on platforms with many users, but users demand great applications that keep their attention. The result is a wasteland of protocols with few users, limited apps, and minimal chance of success.
            <br />
            <br />
            Tari is the ultimate solution to this multifactorial problem. Tari is proof of work and uses an ASIC-resistant hashing algorithm. Anyone can download and run the Tari miner to mine Tari on their laptop or desktop. There is no complicated, multi-step onboarding process required. It is easier to become a native Tari user than it is to become a native user for any other blockchain protocol.
            <br />
            <br />
            For developers, Tari introduces a revolutionary approach to app distribution. The Tari miner will have a built-in application launcher. Everyone who mines Tari will have instant access to every Tari application through an interface that looks and feels like an app store. With Tari's unique dual-layer system, developers get the distribution benefit and security of a Rust-based proof of work L1 with the scalability, fast finality, and low fees of a high-performance, native L2. The result is magical: a high-performance, low-fee blockchain protocol that will rapidly scale its on-chain user base to millions and enable developers to reach all of them.
    `,
    },
    {
        question: `How soon can I start earning?`,
        answer: `You can be up and running in minutes! Download the app, install it, and run it, and you'll be mining Tari in no time.`,
    },
    {
        question: `What is the Testnet?`,
        answer: `Testnet is Tari's pre-launch environment where users can mine Tari coins in a risk-free setting before the mainnet goes live. It helps stress test the network and ensure everything runs smoothly before the full launch.`,
    },
    {
        question: `Why should I mine on Testnet?`,
        answer: `Before new blockchains launch, extensive testing is required. Miners on the Tari testnet can earn Tari token rewards, cash prizes, ultra-fast GPUs, swag, and more! The testnet provides a safe environment for testing while offering real rewards for participation.`,
    },
    {
        question: `How do I win rewards?`,
        answer: `Download Tari Universe, install it, and run it. Once it's up and running, register for the Tari airdrop game to begin earning rewards. You'll earn Tari gems which will get you access to future Tari tokens. You can also earn raffle tickets to be entered to win incredible prizes. The more you mine, the more gems and tickets you'll earn!`,
    },
    {
        question: `What is Mainnet, and when does it launch?`,
        answer: `The Tari mainnet is the real deal. It's the network that one day will process countless transactions and enable millions of people to participate. Tari contributors have set the launch date for May 6, 2025. This is your chance to get involved early, earn rewards, and be part of the Tari movement from the very beginning!`,
    },
    {
        question: `How do I get started?`,
        answer: `<ol>
        <li>Download the Tari Universe app</li>
        <li>Start mining on Testnet to earn rewards and raffle tickets</li>
        <li>Join the community for updates on events, giveaways, and mainnet launch details</li>
        </ol>
        <br />
        <p>Sometimes you're the early bird. The person who discovers something new before it becomes the next big thing. This is one of those times. Get started with Tari Universe now, and let's build the future of crypto together!</p>`,
    },
];

interface Props {
    lightMode?: boolean;
    maxWidth?: number;
    maxEntries?: number;
    disableAnimation?: boolean;
}

export default function FAQSection({ lightMode, maxWidth, maxEntries, disableAnimation }: Props) {
    const [showAll, setShowAll] = useState(false);

    const handleSeeAllClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowAll(!showAll);
    };

    const visibleEntries = maxEntries !== undefined ? faqData.slice(0, maxEntries) : faqData;
    const hiddenEntries = maxEntries !== undefined ? faqData.slice(maxEntries) : [];

    return (
        <Wrapper $lightMode={lightMode}>
            <Holder $maxWidth={maxWidth}>
                <Title>Frequently asked questions</Title>

                <List>
                    {visibleEntries.map(({ question, answer }, index) => {
                        return (
                            <FAQEntry
                                key={index}
                                question={question}
                                answer={answer}
                                lightMode={lightMode}
                                disableAnimation={disableAnimation}
                            />
                        );
                    })}
                    <AnimatePresence>
                        {showAll && (
                            <ShowMoreList
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.15, 0, 0, 0.97] }}
                            >
                                {hiddenEntries.map(({ question, answer }, index) => {
                                    return (
                                        <FAQEntry
                                            key={index}
                                            question={question}
                                            answer={answer}
                                            lightMode={lightMode}
                                            disableAnimation={disableAnimation}
                                        />
                                    );
                                })}
                            </ShowMoreList>
                        )}
                    </AnimatePresence>
                </List>

                {maxEntries && (
                    <SeeAllButton href={`/faq`} onClick={handleSeeAllClick}>
                        {showAll ? 'See less' : 'See all'}
                    </SeeAllButton>
                )}
            </Holder>
        </Wrapper>
    );
}
