'use client';

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
} from './styles';

import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import TextPill from './components/TextPill/TextPill';
import DownloadButton from './components/DownloadButton/DownloadButton';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import BlockExplorerMini from '@/sites/tari-dot-com/ui/BlockExplorerMini/BlockExplorerMini';

export default function IntroSection() {
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
                                text={`Put your computer to work earning Tari (XTM), a revolutionary new cryptocurrency. Tari is fast, safe, and so easy to use, that your Grandma can do it.`}
                                staggerDelay={0.009}
                            />
                        </Text>
                    </TitleWrapper>

                    <DownloadButton />
                </ContentWrapper>

                <Spacer />

                <VideoWrapper>
                    <VideoPlayer
                        src="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/d47e48d7d48b9a0a6835af9546075d88/manifest/video.m3u8"
                        autoPlay={true}
                        muted={true}
                        loop={true}
                    />
                </VideoWrapper>
            </Holder>

            <BlockExplorerMini />
        </Wrapper>
    );
}
