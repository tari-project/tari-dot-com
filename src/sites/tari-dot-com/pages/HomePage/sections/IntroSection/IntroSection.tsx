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
                                text={`Put your computer to work earning Tari (XTR), a revolutionary new cryptocurrency. Tari is fast, safe, and so easy to use, that your Grandma can do it.`}
                                staggerDelay={0.009}
                            />
                        </Text>
                    </TitleWrapper>

                    <DownloadButton />
                </ContentWrapper>

                <Spacer />

                <VideoWrapper>
                    <iframe
                        src="https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/78d0a2cac96deb5892780f5e78262786/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-o6ocjyfui1ltpm5h.cloudflarestream.com%2F78d0a2cac96deb5892780f5e78262786%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={false}
                    ></iframe>
                </VideoWrapper>
            </Holder>
        </Wrapper>
    );
}
