'use client';

import {
    Wrapper,
    EyebrowWrapper,
    EyebrowText,
    Text,
    ContentWrapper,
    MainImage,
    Holder,
    TitleWrapper,
    Title,
} from './styles';
import mainImage from './images/main-image.png';
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

                <MainImage
                    src={mainImage.src}
                    alt=""
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                />
            </Holder>
        </Wrapper>
    );
}
