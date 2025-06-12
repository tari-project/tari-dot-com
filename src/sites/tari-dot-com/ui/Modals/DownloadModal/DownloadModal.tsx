import { useUIStore } from '@/stores/useUiStore';
import BaseModal from '../BaseModal/BaseModal';
import {
    ContentGroup,
    Divider,
    DividerLine,
    DividerText,
    DownloadButton,
    DownloadButtons,
    TariLogoImage,
    //Text,
    TextGroup,
    Title,
} from './styles';
import WindowsIcon from '@/ui-shared/components/Icons/WindowsIcon';
import MacIcon from '@/ui-shared/components/Icons/MacIcon';
import LinuxIcon from '@/ui-shared/components/Icons/LinuxIcon';
import tariLogoImage from './images/tariLogo.png';
import { sendGTMEvent } from '@next/third-parties/google';

export default function DownloadModal() {
    const { showDownloadModal, setShowDownloadModal } = useUIStore();

    const handleClick = (platform?: string) => {
        sendGTMEvent({ event: 'download_button_clicked', platform: platform });
    };

    return (
        <BaseModal show={showDownloadModal} setShow={setShowDownloadModal}>
            <ContentGroup>
                <TariLogoImage src={tariLogoImage.src} alt="Tari Logo" />

                <TextGroup>
                    <Title>your download has started</Title>
                    {/* <Text>Now, stay up to date with the latest Tari news, contests, and drops.</Text> */}
                </TextGroup>

                <Divider>
                    <DividerLine />
                    <DividerText>Having trouble? Here are your download links.</DividerText>
                    <DividerLine />
                </Divider>

                <DownloadButtons>
                    <DownloadButton
                        href="https://airdrop.tari.com/api/miner/download/windows?universeReferral=tari-dot-com"
                        onClick={() => handleClick('windows')}
                    >
                        WINDOWS <WindowsIcon fill="#fff" />
                    </DownloadButton>
                    <DownloadButton
                        href="https://airdrop.tari.com/api/miner/download/macos?universeReferral=tari-dot-com"
                        onClick={() => handleClick('macos')}
                    >
                        MAC <MacIcon fill="#fff" />
                    </DownloadButton>
                    <DownloadButton
                        href="https://airdrop.tari.com/api/miner/download/linux?universeReferral=tari-dot-com"
                        onClick={() => handleClick('linux')}
                    >
                        Linux <LinuxIcon fill="#fff" />
                    </DownloadButton>
                </DownloadButtons>
            </ContentGroup>
        </BaseModal>
    );
}
