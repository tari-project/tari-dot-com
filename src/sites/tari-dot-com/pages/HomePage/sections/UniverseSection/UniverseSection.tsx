'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    Wrapper,
    TextWrapper,
    Title,
    Text,
    StageWrapper,
    StepsWrapper,
    Step,
    StepIcon,
    TextInner,
    StepTitle,
    StepText,
    StageNumber,
    StickyHolder,
} from './styles';

import tariIcon from './images/tari-icon.png';
import runIcon from './images/run-icon.png';
import earnIcon from './images/earn-icon.png';

export default function UniverseSection() {
    const [activeStep, setActiveStep] = useState(1);

    const handleScroll = useCallback(() => {
        const container = document.documentElement;
        const scrollPosition = container.scrollTop;
        const windowHeight = window.innerHeight;

        const sectionHeight = windowHeight;
        const currentSection = Math.floor((scrollPosition + windowHeight / 2) / sectionHeight);

        setActiveStep(Math.min(Math.max(currentSection, 1), 3));
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <Wrapper>
            <StickyHolder>
                <TextWrapper>
                    <Title>Get rewarded for helping secure the network </Title>
                    <Text>
                        Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you don’t
                        have to give up your personal information.
                    </Text>
                </TextWrapper>

                <StageWrapper>
                    <StageNumber $active={activeStep === 1}>1</StageNumber>
                    <StageNumber $active={activeStep === 2}>2</StageNumber>
                    <StageNumber $active={activeStep === 3}>3</StageNumber>
                </StageWrapper>

                <StepsWrapper>
                    <Step $active={activeStep >= 1}>
                        <StepIcon src={tariIcon.src} alt="" />
                        <TextInner>
                            <StepTitle>Download & install</StepTitle>
                            <StepText>
                                Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                            </StepText>
                        </TextInner>
                    </Step>
                    <Step $active={activeStep >= 2}>
                        <StepIcon src={runIcon.src} alt="" />
                        <TextInner>
                            <StepTitle>Run</StepTitle>
                            <StepText>
                                Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                            </StepText>
                        </TextInner>
                    </Step>
                    <Step $active={activeStep >= 3}>
                        <StepIcon src={earnIcon.src} alt="" />
                        <TextInner>
                            <StepTitle>Earn</StepTitle>
                            <StepText>
                                Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                            </StepText>
                        </TextInner>
                    </Step>
                </StepsWrapper>
            </StickyHolder>
        </Wrapper>
    );
}
