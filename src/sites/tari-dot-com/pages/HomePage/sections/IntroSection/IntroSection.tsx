'use client';

import DownloadButton from './DownloadButton/DownloadButton';
import {
    Wrapper,
    EyebrowWrapper,
    EyebrowText,
    EyebrowPill,
    Title,
    Text,
    ContentWrapper,
    MainImage,
    Holder,
    TitleWrapper,
} from './styles';
import mainImage from './images/main-image.png';

export default function IntroSection() {
    return (
        <Wrapper>
            <Holder>
                <MainImage src={mainImage.src} alt="" />

                <ContentWrapper>
                    <EyebrowWrapper>
                        <EyebrowText>Making mining accessible for </EyebrowText>
                        <EyebrowPill>everyone</EyebrowPill>
                    </EyebrowWrapper>

                    <TitleWrapper>
                        <Title>Put your device to work earning steady income</Title>
                        <Text>
                            Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you
                            don’t have to give up your personal information.
                        </Text>
                    </TitleWrapper>

                    <DownloadButton />
                </ContentWrapper>
            </Holder>
        </Wrapper>
    );
}
