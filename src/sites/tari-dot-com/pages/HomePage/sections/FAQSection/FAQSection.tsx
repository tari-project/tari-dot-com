'use client';

import FAQEntry from './components/FAQEntry/FAQEntry';
import { Holder, Wrapper, Title, List } from './styles';

const faqData = [
    {
        question: `What exactly is Tari Universe?`,
        answer: `Tari Universe is a user-friendly application that lets you earn cryptocurrency (called Tari) by contributing your computer's spare processing power to help run the Tari network. Unlike Bitcoin mining, which requires expensive specialized equipment, Tari can be mined with your regular computer.`,
    },
    {
        question: `When do I get paid?`,
        answer: `Testnet mining rewards you with tXTM and gems 💎. 💎can be converted to XTM post launch! Mainnet mining earns $XTM and is transferred to your Tari wallet the moment you win a block. The more miners, the tougher the competition.`,
    },
    {
        question: `Why should I mine on Testnet?`,
        answer: `Mining on Testnet isn’t just about testing—you can win real rewards for participating! Active Testnet miners can earn: cash prizes, premium GPUs, exclusive Tari swag, other existing giveaways.`,
    },
    {
        question: `What is Mainnet and when does it launch?`,
        answer: `Leading up to April 2025, Tari is hosting Mining Parties, Community Giveaways, and Special Events to celebrate the journey to mainnet. This is your chance to get involved early, earn rewards, and be part of the Tari movement from the start!`,
    },
    {
        question: `Is this legitimate and safe?`,
        answer: `Yes. Tari is developed by an established team of technology experts who have been building in this space for years. The application is open-source (meaning anyone can inspect the code), doesn't access your personal files, and puts you in control of how much of your computer's resources are used.`,
    },
];

export default function FAQSection() {
    return (
        <Wrapper>
            <Holder>
                <Title>Frequently asked questions</Title>

                <List>
                    {faqData.map(({ question, answer }, index) => (
                        <FAQEntry key={index} question={question} answer={answer} />
                    ))}
                </List>
            </Holder>
        </Wrapper>
    );
}
