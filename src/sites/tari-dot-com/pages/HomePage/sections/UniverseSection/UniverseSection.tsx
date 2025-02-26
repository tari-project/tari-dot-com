'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useMotionValue, useTransform } from 'motion/react';

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
    StepInside,
    FolderFront,
} from './styles';

import tariIcon from './images/tari-icon.png';
import runIcon from './images/run-icon.png';
import earnIcon from './images/earn-icon.png';
import tariIconLarge from './images/tari-icon-large.png';
import folderImage from './images/folder.png';
import folderFrontImage from './images/folder-front.png';
import TitleAnimation from '@/components/TitleAnimation/TitleAnimation';

export default function UniverseSection() {
    const [activeStep, setActiveStep] = useState(1);
    //const [progressInSection, setProgressInSection] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const progressMotion = useMotionValue(0);

    const tariIconX = useTransform(progressMotion, [33, 50, 55, 60, 66], ['-50%', '-175%', '-170%', '-50%', '-50%']);
    const tariIconY = useTransform(progressMotion, [33, 50, 60, 66], ['-50%', '-50%', '-170%', '-50%']);
    const tariIconRotation = useTransform(progressMotion, [33, 50, 55, 66], [0, 0, 0, 77]);
    const tariIconOpacity = useTransform(progressMotion, [0, 33, 66, 80], [0, 1, 1, 0]);
    const tariIconScale = useTransform(progressMotion, [0, 33, 50, 66], [0.3, 1, 1, 0.6]);

    const folderX = useTransform(progressMotion, [33, 50], ['50%', '-50%']);
    const folderOpacity = useTransform(progressMotion, [33, 50], [0, 1]);

    const glowOpacity = useTransform(progressMotion, [10, 33, 50], [0, 1, 0]);
    const glowScale = useTransform(progressMotion, [10, 33, 50], [0, 1, 1.5]);

    const videoScale = useTransform(progressMotion, [70, 90], [0.4, 1]);
    const videoOpacity = useTransform(progressMotion, [0, 70, 90], [0, 0, 1]);

    const folderFrontOpacity = useTransform(progressMotion, [0, 50, 51], [0, 0, 1]);

    const handleScroll = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScrollDistance = rect.height - viewportHeight;

        const scrolledAmount = -rect.top;
        const overallProgress = Math.max(0, Math.min(1, scrolledAmount / totalScrollDistance));

        const currentStep = Math.floor(overallProgress * 3);
        // const currentProgress = ((overallProgress * 3) % 1) * 100;
        //const sectionProgress = overallProgress >= 0.99 ? 100 : currentStep === 2 ? Math.min(100, currentProgress) : currentProgress;

        setActiveStep(Math.min(Math.max(currentStep + 1, 1), 3));
        //setProgressInSection(sectionProgress);

        progressMotion.set(overallProgress * 100);
    }, [progressMotion]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    /*
    const getStepProgress = (step: number): number => {
        if (activeStep > step) return 100;
        if (activeStep < step) return 0;
        return progressInSection;
    };
    */

    return (
        <Wrapper ref={sectionRef}>
            <StickyHolder>
                <TextWrapper>
                    <Title>
                        <TitleAnimation text={`Get rewarded for helping secure the network`} align="center" />
                    </Title>
                    <Text>
                        <TitleAnimation
                            text={`Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you don’t have to give up your personal information.`}
                            initialDelay={1300}
                            staggerDelay={0.03}
                            align="center"
                        />
                    </Text>
                </TextWrapper>

                <StageWrapper>
                    <FolderFront
                        src={folderFrontImage.src}
                        alt=""
                        style={{
                            opacity: folderFrontOpacity,
                        }}
                    />

                    <FolderImage
                        src={folderImage.src}
                        alt=""
                        style={{
                            x: folderX,
                            y: '-50%',
                            opacity: folderOpacity,
                        }}
                    />

                    <TariIcon
                        src={tariIconLarge.src}
                        alt=""
                        style={{
                            x: tariIconX,
                            y: tariIconY,
                            rotate: tariIconRotation,
                            opacity: tariIconOpacity,
                            scale: tariIconScale,
                        }}
                    />

                    <GlowSquare
                        style={{
                            x: '-50%',
                            y: '-50%',
                            opacity: glowOpacity,
                            scale: glowScale,
                        }}
                    />

                    {activeStep === 3 && (
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
