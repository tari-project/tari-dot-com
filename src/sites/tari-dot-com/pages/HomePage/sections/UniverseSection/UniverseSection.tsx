'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useMotionValue, useTransform, useSpring, motion } from 'motion/react';

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
    VideoPlayer,
    StepInside,
    ProgressDonut,
} from './styles';

import tariIcon from './images/tari-icon.png';
import runIcon from './images/run-icon.png';
import earnIcon from './images/earn-icon.png';
import tariIconLarge from './images/tari-icon-large.png';
import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';

export default function UniverseSection() {
    const [activeStep, setActiveStep] = useState(1);
    const [showVideo, setShowVideo] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const progressMotion = useMotionValue(0);

    const progressSpring = useSpring(progressMotion, {
        stiffness: 100,
        damping: 30,
        mass: 1,
    });

    const circleRadius = 135;
    const circleCircumference = 2 * Math.PI * circleRadius;

    const progressDashOffset = useTransform(progressSpring, [0, 40], [circleCircumference, 0]);
    const progressOpacity = useTransform(progressSpring, [0, 20, 40, 48], [0, 1, 1, 0]);

    const tariIconOpacity = useTransform(progressSpring, [0, 33, 60, 70], [0, 1, 1, 0]);
    const tariIconScale = useTransform(progressSpring, [0, 40, 48, 54, 58], [0.3, 1, 1, 0.8, 1]);

    const videoScale = useTransform(progressSpring, [60, 80], [0.4, 1]);
    const videoOpacity = useTransform(progressSpring, [0, 60, 80], [0, 0, 1]);

    const handleScroll = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const offsetStart = 500;
        const totalScrollDistance = rect.height - viewportHeight + offsetStart;
        const scrolledAmount = -rect.top + offsetStart;
        const overallProgress = Math.max(0, Math.min(1, scrolledAmount / totalScrollDistance));

        const currentStep = Math.floor(overallProgress * 3);

        setActiveStep(Math.min(Math.max(currentStep + 1, 1), 3));
        setShowVideo(overallProgress * 100 >= 50);

        progressMotion.set(overallProgress * 100);
    }, [progressMotion]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <Wrapper ref={sectionRef}>
            <StickyHolder>
                <TextWrapper>
                    <Title>
                        <TitleAnimation text={`Get rewarded for helping secure the network`} />
                    </Title>
                    <Text>
                        <TitleAnimation
                            text={`Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you don’t have to give up your personal information.`}
                            staggerDelay={0.01}
                        />
                    </Text>
                </TextWrapper>

                <StageWrapper>
                    <TariIcon
                        src={tariIconLarge.src}
                        alt=""
                        style={{
                            x: '-50%',
                            y: '-50%',
                            opacity: tariIconOpacity,
                            scale: tariIconScale,
                        }}
                    />

                    <ProgressDonut
                        viewBox="0 0 286 286"
                        style={{
                            x: '-50%',
                            y: '-50%',
                            opacity: progressOpacity,
                        }}
                    >
                        <circle
                            cx="143"
                            cy="143"
                            r={circleRadius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="4"
                        />

                        <motion.circle
                            cx="143"
                            cy="143"
                            r={circleRadius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.9)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={circleCircumference}
                            transform="rotate(-90 143 143)"
                            style={{
                                strokeDashoffset: progressDashOffset,
                            }}
                        />
                    </ProgressDonut>

                    {showVideo && (
                        <VideoPlayer
                            style={{
                                x: '-50%',
                                y: '-50%',
                                scale: videoScale,
                                opacity: videoOpacity,
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
                    </Step>
                </StepsWrapper>
            </StickyHolder>
        </Wrapper>
    );
}
