'use client';

import { CardHolder, CardTitle, CardLink, CardsContainer } from './styles';
import Arrow from '../images/arrow.svg';

interface CardProps {
    title: string;
    link: string;
}
function Cards() {
    function Card({ title, link }: CardProps) {
        return (
            <CardHolder onClick={() => window.open(link, '_blank')}>
                <CardTitle>
                    <h3>{title}</h3>
                    <img src={Arrow.src} alt="arrow" height="24px" width="24px" />
                </CardTitle>
                <CardLink>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </a>
                </CardLink>
            </CardHolder>
        );
    }
    return (
        <CardsContainer>
            <Card title="Documentation" link="https://rfc.tari.com" />
            <Card title="GitHub Repository" link="https://github.com/tari-project/tari" />
            <Card title="Discord Community" link="https://discord.gg/tari" />
            <Card title="Downloads" link="https://tari.com/downloads/" />
            <Card title="grpcurl Documentation" link="https://github.com/fullstorydev/grpcurl" />
        </CardsContainer>
    );
}

export default Cards;
