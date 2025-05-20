import React from 'react';
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
    return (
        <Wrapper>
            <ContentWrapper>
                <TextContent>
                    <TitleGroup>
                        <Title>Season one</Title>
                        <Text>Earn up to 12% in bonus XTM</Text>
                    </TitleGroup>
                    <TimerGroup>
                        <TimeLeft>36D 21H 22M</TimeLeft>
                        <Label>Time left</Label>
                    </TimerGroup>
                </TextContent>
                <Image src={laptopImage.src} alt="" />
            </ContentWrapper>
        </Wrapper>
    );
}
