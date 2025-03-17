'use client';

import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import FAQEntry from './components/FAQEntry/FAQEntry';
import { Holder, Wrapper, Title, List } from './styles';

const faqData = [
    {
        question: `What is Tari Universe?`,
        answer: `Tari Universe is a user-friendly application that lets you earn cryptocurrency (called Tari) by contributing your computer's spare processing power to help run the Tari network. Unlike Bitcoin mining, which requires expensive specialized equipment, Tari can be mined with your regular computer.`,
    },
    {
        question: `Is it safe?`,
        answer: `Yes. Tari is developed by an established team of technology experts who have been building in this space for years. The application is open-source (meaning anyone can inspect the code), doesn't access your personal files, and puts you in control of how much of your computer's resources are used.`,
    },
    {
        question: `Do I need to understand cryptocurrency to use this?`,
        answer: `Not at all! Tari Universe is specifically designed for people who aren't crypto experts. The app handles all the technical aspects automatically. If you can install an app, you can use Tari Universe.`,
    },
    {
        question: `Why should I mine on Testnet?`,
        answer: `Mining on Testnet isn’t just about testing—you can win real rewards for participating! Active Testnet miners can earn: gems which can be swapped to $XTM after mainnet launch, cash prizes, premium GPUs, exclusive Tari swag, and much more.`,
    },
    {
        question: `What is Mainnet, and when does it launch?`,
        answer: `Leading up to April 2025, Tari is hosting Mining Parties, Community Giveaways, and Special Events to celebrate the journey to mainnet. This is your chance to get involved early, earn rewards, and be part of the Tari movement from the start!`,
    },
];

export default function FAQSection() {
    return (
        <Wrapper>
            <Holder>
                <Title>
                    <TitleAnimation text={`Frequently asked questions`} />
                </Title>

                <List>
                    {faqData.map(({ question, answer }, index) => (
                        <FAQEntry key={index} question={question} answer={answer} />
                    ))}
                </List>
            </Holder>
        </Wrapper>
    );
}
