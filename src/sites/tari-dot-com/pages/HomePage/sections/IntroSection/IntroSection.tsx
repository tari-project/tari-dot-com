'use client';

import ReactDOM from 'react-dom';
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
    Padding,
} from './styles';

import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import TextPill from './components/TextPill/TextPill';
import DownloadButton from './components/DownloadButton/DownloadButton';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import BlockExplorerMini from '@/sites/tari-dot-com/ui/BlockExplorerMini/BlockExplorerMini';

// Cloudflare Stream HLS manifests used on the home page (intro hero + block explorer).
// Preloaded here so they race with hydration instead of being blocked on it.
const CF_STREAM_HOST = 'https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com';
const HOME_VIDEO_MANIFESTS = [
    `${CF_STREAM_HOST}/d47e48d7d48b9a0a6835af9546075d88/manifest/video.m3u8`,
    `${CF_STREAM_HOST}/3ed05f3d4fbfd3eec7c4bb911915d1c2/manifest/video.m3u8`,
    `${CF_STREAM_HOST}/852dac0dc91d50d399a7349dcc7316a1/manifest/video.m3u8`,
];

export default function IntroSection() {
    for (const href of HOME_VIDEO_MANIFESTS) {
        ReactDOM.preload(href, {
            as: 'fetch',
            type: 'application/vnd.apple.mpegurl',
            crossOrigin: 'anonymous',
        });
    }

    return (
        <Wrapper>
            <Padding>
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
            </Padding>

            <BlockExplorerMini />
        </Wrapper>
    );
}
