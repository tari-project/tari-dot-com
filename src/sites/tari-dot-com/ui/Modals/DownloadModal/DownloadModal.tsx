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
import { useExchangeData } from '@/services/api/useExchangeData';

export default function DownloadModal() {
    const { showDownloadModal, setShowDownloadModal } = useUIStore();
    const { data: exchange } = useExchangeData();

    const windowsLink = exchange?.download_link_win || 'https://airdrop.tari.com/api/miner/download/windows?universeReferral=tari-dot-com';
    const macLink = exchange?.download_link_mac || 'https://airdrop.tari.com/api/miner/download/macos?universeReferral=tari-dot-com';
    const linuxLink = exchange?.download_link_linux || 'https://airdrop.tari.com/api/miner/download/linux?universeReferral=tari-dot-com';

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
                        href={windowsLink}
                        onClick={() => handleClick('windows')}
                    >
                        WINDOWS <WindowsIcon fill="#fff" />
                    </DownloadButton>
                    <DownloadButton
                        href={macLink}
                        onClick={() => handleClick('macos')}
                    >
                        MAC <MacIcon fill="#fff" />
                    </DownloadButton>
                    <DownloadButton
                        href={linuxLink}
                        onClick={() => handleClick('linux')}
                    >
                        Linux <LinuxIcon fill="#fff" />
                    </DownloadButton>
                </DownloadButtons>
            </ContentGroup>
        </BaseModal>
    );
}
