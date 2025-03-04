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
                <MainImage
                    src={mainImage.src}
                    alt=""
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                />

                <ContentWrapper>
                    <EyebrowWrapper>
                        <EyebrowText>
                            <TitleAnimation text={`Making mining accessible for`} />
                        </EyebrowText>

                        <TextPill />
                    </EyebrowWrapper>

                    <TitleWrapper>
                        <Title>
                            <TitleAnimation text={`Put your device to work earning steady income`} />
                        </Title>

                        <Text>
                            <TitleAnimation
                                text={`Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you don’t have to give up your personal information.`}
                                staggerDelay={0.009}
                            />
                        </Text>
                    </TitleWrapper>

                    <DownloadButton />
                </ContentWrapper>
            </Holder>
        </Wrapper>
    );
}
