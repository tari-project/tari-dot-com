'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, useMotionValue, useTransform } from 'motion/react';

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
    StickyHolder,
    TariIcon,
    GlowSquare,
    FolderImage,
    VideoPlayer,
    StepProgress,
    StepInside,
} from './styles';

import tariIcon from './images/tari-icon.png';
import runIcon from './images/run-icon.png';
import earnIcon from './images/earn-icon.png';
import tariIconLarge from './images/tari-icon-large.png';
import folderImage from './images/folder.png';

export default function UniverseSection() {
    const [activeStep, setActiveStep] = useState(1);
    const [progressInSection, setProgressInSection] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const progressMotion = useMotionValue(0);

    const folderScale = useTransform(progressMotion, [0, 100], [0, 1]);
    const folderOpacity = useTransform(progressMotion, [0, 100], [0, 1]);
    const glowScale = useTransform(progressMotion, [0, 100], [0.3, 1]);

    //const showFolder = useTransform(progressMotion, [0, 50], [0, 1]);
    //const tariX = useTransform(progressMotion, [30, 50], ['0%', '-150%']);

    const handleScroll = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScrollDistance = rect.height - viewportHeight;

        const scrolledAmount = -rect.top;
        const overallProgress = Math.max(0, Math.min(1, scrolledAmount / totalScrollDistance));

        const currentStep = Math.floor(overallProgress * 3);
        const currentProgress = ((overallProgress * 3) % 1) * 100;

        // Ensure final section stays at 100% when reaching the end
        const finalProgress =
            overallProgress >= 0.99 ? 100 : currentStep === 2 ? Math.min(100, currentProgress) : currentProgress;

        setActiveStep(Math.min(Math.max(currentStep + 1, 1), 3));
        setProgressInSection(finalProgress);
        progressMotion.set(finalProgress);
    }, [progressMotion]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const getStepProgress = (step: number): number => {
        if (activeStep > step) return 100;
        if (activeStep < step) return 0;
        return progressInSection;
    };

    return (
        <Wrapper ref={sectionRef}>
            <StickyHolder>
                <TextWrapper>
                    <Title>Get rewarded for helping secure the network </Title>
                    <Text>
                        Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you don’t
                        have to give up your personal information.
                    </Text>
                </TextWrapper>

                <StageWrapper>
                    <AnimatePresence>
                        {activeStep === 1 && (
                            <FolderImage
                                src={folderImage.src}
                                alt=""
                                style={{
                                    scale: folderScale,
                                    opacity: folderOpacity,
                                    x: '-50%',
                                    y: '-50%',
                                }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {activeStep === 2 && (
                            <TariIcon
                                src={tariIconLarge.src}
                                alt=""
                                style={{
                                    scale: folderScale,
                                    opacity: folderOpacity,
                                    x: '-50%',
                                    y: '-50%',
                                }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {activeStep === 2 && (
                            <GlowSquare
                                style={{
                                    scale: glowScale,
                                    x: '-50%',
                                    y: '-50%',
                                }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {activeStep === 3 && (
                            <VideoPlayer
                                key="video-player-step3"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                style={{
                                    x: '-50%',
                                    y: '-50%',
                                }}
                            >
                                <iframe
                                    src="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/25949d56fb76cf8ddc29f61ca47af7e6/iframe?preload=true&loop=true&poster=https%3A%2F%2Fcustomer-o6ocjyfui1ltpm5h.cloudflarestream.com%2F25949d56fb76cf8ddc29f61ca47af7e6%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&autoplay=true&muted=true"
                                    loading="eager"
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                                    allowFullScreen
                                ></iframe>
                            </VideoPlayer>
                        )}
                    </AnimatePresence>
                </StageWrapper>

                <StepsWrapper>
                    <Step $active={activeStep >= 1}>
                        <StepInside>
                            <StepIcon src={tariIcon.src} alt="" />
                            <TextInner>
                                <StepTitle>Download & install</StepTitle>
                                <StepText>
                                    Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                                </StepText>
                            </TextInner>
                        </StepInside>
                        <StepProgress $progress={getStepProgress(1)} />
                    </Step>
                    <Step $active={activeStep >= 2}>
                        <StepInside>
                            <StepIcon src={runIcon.src} alt="" />
                            <TextInner>
                                <StepTitle>Run</StepTitle>
                                <StepText>
                                    Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                                </StepText>
                            </TextInner>
                        </StepInside>
                        <StepProgress $progress={getStepProgress(2)} />
                    </Step>
                    <Step $active={activeStep >= 3}>
                        <StepInside>
                            <StepIcon src={earnIcon.src} alt="" />
                            <TextInner>
                                <StepTitle>Earn</StepTitle>
                                <StepText>
                                    Tari Universe is available on PC, Mac and Linux. It will also run on most machines.
                                </StepText>
                            </TextInner>
                        </StepInside>
                        <StepProgress $progress={getStepProgress(3)} />
                    </Step>
                </StepsWrapper>
            </StickyHolder>
        </Wrapper>
    );
}
