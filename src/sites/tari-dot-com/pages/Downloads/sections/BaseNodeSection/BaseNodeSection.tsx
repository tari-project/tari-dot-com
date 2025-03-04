import {
    TextInner,
    Title,
    InfoWrapper,
    Text,
    SectionHolder,
    UniverseImage,
    UniverseImageHolder,
    TextWrapper,
} from './styles';
import { Divider } from '../../styles';
import blueComputer from './images/blue-computer.png';
import DownloadOptions from './components/DownloadOptions';
import OsSelector from './components/OsSelector';
import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';

export default function UniverseSection() {
    return (
        <SectionHolder>
            <Title>
                <TitleAnimation text={`Tari Base Node`} />
            </Title>
            <InfoWrapper>
                <TextWrapper>
                    <OsSelector />
                    <Divider />
                    <TextInner>
                        <Text>
                            Download the binary, click through to install. Then you&apos;ll be automatically connected
                            to the Tari blockchain.
                        </Text>
                        <Text>For MacOS 10.15.0 (Catalina) and higher</Text>
                    </TextInner>
                    <DownloadOptions />
                </TextWrapper>
                <UniverseImageHolder>
                    <UniverseImage src={blueComputer.src} alt="Universe Ecosystem" />
                </UniverseImageHolder>
            </InfoWrapper>
        </SectionHolder>
    );
}
