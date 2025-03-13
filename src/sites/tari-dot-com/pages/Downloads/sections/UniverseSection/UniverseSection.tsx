import {
    TextInner,
    InfoWrapper,
    Text,
    SectionHolder,
    UniverseImage,
    UniverseImageHolder,
    ButtonsWrapper,
    TextWrapper,
    RatingsWrapper,
} from './styles';
import universe from './images/universe.png';
import { Divider } from '../../styles';
import Image from 'next/image';
import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import Typography from '@/ui-shared/components/Typography/Typography';
import QRPopup from './components/QRPopup';
import Star from './images/star.svg';
import DownloadForOs from '@/ui-shared/components/DownloadButton/DownloadForOs';

export default function UniverseSection() {
    return (
        <SectionHolder>
            <Typography $variant="sectionTitle">
                <TitleAnimation text={`Tari Universe`} />
            </Typography>
            <InfoWrapper>
                <UniverseImageHolder>
                    <UniverseImage src={universe.src} alt="Universe Ecosystem" />
                </UniverseImageHolder>
                <TextWrapper>
                    <TextInner>
                        <Typography $variant="subTitle">Mine on desktop</Typography>
                        <Text>
                            Tari is a decentralized, open-source protocol that empowers creators and communities to
                            securely manage digital assets with privacy and flexbility.
                        </Text>
                        <DownloadForOs />
                    </TextInner>
                    <Divider />
                    <TextInner>
                        <Typography $variant="subTitle">Track & transact on mobile</Typography>
                        <Text>
                            Use the companion app to keep track of your rig, get notified when you win, and stay updated
                            with new activities and rewards.
                        </Text>
                        <ButtonsWrapper>
                            <QRPopup os="Android" />
                            <QRPopup os="iOS" />
                        </ButtonsWrapper>
                        <RatingsWrapper>
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <Image key={index} src={Star} alt="Star" width={24} height={24} />
                                ))}
                        </RatingsWrapper>
                    </TextInner>
                </TextWrapper>
            </InfoWrapper>
        </SectionHolder>
    );
}
