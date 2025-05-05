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
                            {`Tari Universe is the beautifully simple app for mining Tari on Mac or PC. Tari Universe
                            turns your computer into a money machine. It works by harnessing your computers
                            computational power to solve blocks on the Tari network. In doing so, you're helping to
                            secure the Tari network while earning Tari token (XTM) rewards.`}
                        </Text>
                        <DownloadForOs />
                    </TextInner>
                    <Divider />
                    <TextInner>
                        <Typography $variant="subTitle">Ultimate Crypto Wallet for Tari</Typography>
                        <Text>
                            <p>
                                Tari Universe Wallet is a beautifully designed and easy-to-use self-custody
                                cryptocurrency wallet for Tari tokens (XTM). Safely manage your portfolio, track your
                                real-time mining earnings, and send and receive XTM tokens with ease.
                            </p>

                            <p>
                                Simply install, sync with the companion Tari Universe desktop mining application, and
                                start earning XTM tokens.
                            </p>
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
