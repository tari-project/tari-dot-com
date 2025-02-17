'use client';

import {
    Wrapper,
    TextWrapper,
    Title,
    Text,
    StageWrapper,
    OuterGlow,
    TariIcon,
    StepsWrapper,
    Step,
    StepIcon,
    TextInner,
    StepTitle,
    StepText,
} from './styles';

export default function UniverseSection() {
    return (
        <Wrapper>
            <TextWrapper>
                <Title>Get rewarded for helping secure the network </Title>
                <Text>
                    Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you don’t have
                    to give up your personal information.
                </Text>
            </TextWrapper>

            <StageWrapper>
                <OuterGlow>
                    <TariIcon />
                </OuterGlow>
            </StageWrapper>

            <StepsWrapper>
                <Step>
                    <StepIcon />
                    <TextInner>
                        <StepTitle>Download & install</StepTitle>
                        <StepText>
                            Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                        </StepText>
                    </TextInner>
                </Step>
                <Step>
                    <StepIcon />
                    <TextInner>
                        <StepTitle>Run</StepTitle>
                        <StepText>
                            Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                        </StepText>
                    </TextInner>
                </Step>
                <Step>
                    <StepIcon />
                    <TextInner>
                        <StepTitle>Earn</StepTitle>
                        <StepText>
                            Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                        </StepText>
                    </TextInner>
                </Step>
            </StepsWrapper>
        </Wrapper>
    );
}
