'use client';
import {
    TextInner,
    InfoWrapper,
    SectionHolder,
    UniverseImage,
    UniverseImageHolder,
    TextWrapper,
    GithubLink,
} from './styles';
import { Divider, Container } from '../../styles';
import blueComputer from './images/blue-computer.png';
import githubMark from './images/github-mark-white.svg';
import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';
import Typography from '@/ui-shared/components/Typography/Typography';
import OsSelector from './components/OsSelector';
import { Os } from '@/ui-shared/types/downloadTypes';
import DownloadOptions from './components/DownloadOptions';
import { useDownloadStore } from '@/services/stores/useDownloadStore';
import Image from 'next/image';

export default function BaseNodeSection() {
    const downloadOptions = useDownloadStore((state) => state.downloadOptions);
    const sourceLink = 'https://github.com/tari-project/tari/releases';
    const theme = 'dark';

    const osTexts = {
        [Os.Mac]: { compatible: `For MacOS 10.15.0 (Catalina) and higher` },
        [Os.Windows]: { compatible: `For Windows 10 and higher` },
        [Os.Linux]: { compatible: `For Ubuntu 18.04 and higher` },
    };

    const currentText = osTexts[downloadOptions.os] || osTexts[Os.Mac];

    return (
        <SectionHolder>
            <Container>
                <Typography $variant="sectionTitle" $theme={theme}>
                    <TitleAnimation text={`Tari Base Node`} />
                </Typography>
                <InfoWrapper>
                    <TextWrapper>
                        <OsSelector />
                        <Divider />
                        <TextInner>
                            <Typography $theme={theme} $variant="p">
                                {`Download the binary, click through to install. Then you'll be automatically connected to the Tari blockchain.`}
                            </Typography>
                            <Typography $theme={theme} $variant="p">
                                {currentText.compatible}
                            </Typography>
                        </TextInner>
                        <DownloadOptions />
                        <Divider />
                        <TextInner>
                            <Typography $theme={theme} $variant="p">{`Not seeing the version you need?`}</Typography>
                            <GithubLink href={sourceLink} target="_blank" rel="noopener noreferrer">
                                <Image src={githubMark.src} alt="Github" width="38" height="37" />
                                Download the latest releases from Github
                            </GithubLink>
                        </TextInner>
                    </TextWrapper>
                    <UniverseImageHolder>
                        <UniverseImage src={blueComputer.src} alt="Universe Ecosystem" />
                    </UniverseImageHolder>
                </InfoWrapper>
                <Divider />
            </Container>
        </SectionHolder>
    );
}
