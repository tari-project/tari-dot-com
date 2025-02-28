import {
    TextInner,
    Title,
    SubTitle,
    InfoWrapper,
    Text,
    SectionHolder,
    UniverseImage,
    UniverseImageHolder,
    ButtonsWrapper,
    TextWrapper,
} from './styles';
import universe from './images/universe.png';
import { Divider } from '../../styles';
import TitleAnimation from '@/components/TitleAnimation/TitleAnimation';
import DownloadOptions from './components/DownloadOptions';
import playStoreButton from './images/PlayStoreButton.svg';
import appStoreButton from './images/AppStoreButton.svg';
import Image from 'next/image';

export default function UniverseSection() {
    return (
        <SectionHolder>
            <Title>
                <TitleAnimation text={`Tari Universe`} align="center" />
            </Title>
            <InfoWrapper>
                <UniverseImageHolder>
                    <UniverseImage src={universe.src} alt="Universe Ecosystem" />
                </UniverseImageHolder>
                <TextWrapper>
                    <TextInner>
                        <SubTitle>Mine on desktop</SubTitle>
                        <Text>
                            Tari is a decentralized, open-source protocol that empowers creators and communities to
                            securely manage digital assets with privacy and flexbility.
                        </Text>
                        <DownloadOptions />
                    </TextInner>
                    <Divider />
                    <TextInner>
                        <SubTitle>Track & transact on mobile</SubTitle>
                        <Text>
                            Use the companion app to keep track of your rig, get notified when you win, and stay updated
                            with new activities and rewards.
                        </Text>
                        <ButtonsWrapper>
                            <Image src={playStoreButton.src} alt="Play Store Button" width={169} height={50} />
                            <Image src={appStoreButton.src} alt="App Store Button" width={169} height={50} />
                        </ButtonsWrapper>
                    </TextInner>
                </TextWrapper>
            </InfoWrapper>
        </SectionHolder>
    );
}
