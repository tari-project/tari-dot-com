import React from 'react';
import { Wrapper } from './styles';
import SeasonTimerBackground from './SeasonTimerBackground';
import { Content, TitleGroup, Title, Text, TimerGroup, TimeLeft, Label } from './styles';

export default function SeasonTimer() {
    return (
        <Wrapper>
            <Content>
                <TitleGroup>
                    <Title>Season one</Title>
                    <Text>Earn up to 12% in bonus XTM</Text>
                </TitleGroup>
                <TimerGroup>
                    <TimeLeft>36D 21H 22M</TimeLeft>
                    <Label>Time left</Label>
                </TimerGroup>
            </Content>
            <SeasonTimerBackground />
        </Wrapper>
    );
}
