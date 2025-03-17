'use client';

import { useState, useEffect, useRef } from 'react';

import {
    Wrapper,
    EyebrowWrapper,
    EyebrowText,
    Text,
    ContentWrapper,
    Holder,
    TitleWrapper,
    Title,
    VideoWrapper,
    Spacer,
    StyledVideo,
} from './styles';

import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import TextPill from './components/TextPill/TextPill';
import DownloadButton from './components/DownloadButton/DownloadButton';
import { useHlsScript } from '@/ui-shared/hooks/useHlsScript';

export default function IntroSection() {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsLoaded = useHlsScript();

    useEffect(() => {
        if (!hlsLoaded || !videoRef.current) return;

        const video = videoRef.current;
        const videoSrc =
            'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/78d0a2cac96deb5892780f5e78262786/manifest/video.m3u8';

        const handleLoad = () => setVideoLoaded(true);
        video.addEventListener('loadeddata', handleLoad);

        if (window.Hls.isSupported()) {
            const hls = new window.Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch((err) => console.log('Auto-play prevented:', err));
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.play().catch((err) => console.log('Auto-play prevented:', err));
        }

        return () => {
            video.removeEventListener('loadeddata', handleLoad);
        };
    }, [hlsLoaded]);

    return (
        <Wrapper>
            <Holder>
                <ContentWrapper>
                    <EyebrowWrapper>
                        <EyebrowText>
                            <TitleAnimation text={`Making mining accessible for`} />
                        </EyebrowText>

                        <TextPill />
                    </EyebrowWrapper>

                    <TitleWrapper>
                        <Title>
                            <TitleAnimation text={`Turn Your Computer Into a Money Machine`} />
                        </Title>

                        <Text>
                            <TitleAnimation
                                text={`Put your computer to work earning Tari (XTR), a revolutionary new cryptocurrency. Tari is fast, safe, and so easy to use, that your Grandma can do it.`}
                                staggerDelay={0.009}
                            />
                        </Text>
                    </TitleWrapper>

                    <DownloadButton />
                </ContentWrapper>

                <Spacer />

                <VideoWrapper>
                    <StyledVideo ref={videoRef} muted autoPlay playsInline loop $isLoaded={videoLoaded} />
                </VideoWrapper>
            </Holder>
        </Wrapper>
    );
}
