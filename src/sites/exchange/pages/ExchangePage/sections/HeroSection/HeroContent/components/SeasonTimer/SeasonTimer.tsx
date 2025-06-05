'use client';

import React, { useEffect, useState } from 'react';
import {
    ContentWrapper,
    TextContent,
    TitleGroup,
    Title,
    Text,
    TimerGroup,
    TimeLeft,
    Label,
    Wrapper,
    Image,
} from './styles';
import laptopImage from '../../images/laptop.png';

export default function SeasonTimer() {
    const [timeLeft, setTimeLeft] = useState(30 * 24 * 60 * 60); // 30 days in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    return (
        <Wrapper>
            <ContentWrapper>
                <TextContent>
                    <TitleGroup>
                        <Title>Season one</Title>
                        <Text>Earn up to 12% in bonus XTM</Text>
                    </TitleGroup>
                    <TimerGroup>
                        <TimeLeft>
                            {pad(days)}D {pad(hours)}H {pad(minutes)}M {pad(seconds)}S
                        </TimeLeft>
                        <Label>Time left</Label>
                    </TimerGroup>
                </TextContent>
                <Image src={laptopImage.src} alt="" />
            </ContentWrapper>
        </Wrapper>
    );
}
