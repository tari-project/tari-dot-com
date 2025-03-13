import { useState } from 'react';
import { OsButton, OsLabel, OsWrapper as Wrapper, ButtonsWrapper } from './styles';
import { Os, MacArch, WindowsArch, LinuxArch } from '@/ui-shared/types/downloadTypes';
import { useDownloadStore } from '@/services/stores/useDownloadStore';
import MacIcon from '@/ui-shared/components/Icons/MacIcon';
import LinuxIcon from '@/ui-shared/components/Icons/LinuxIcon';
import WindowsIcon from '@/ui-shared/components/Icons/WindowsIcon';

const osOptions = [
    { os: Os.Mac, arch: MacArch, label: 'Mac', Icon: MacIcon },
    { os: Os.Windows, arch: WindowsArch, label: 'Windows', Icon: WindowsIcon },
    { os: Os.Linux, arch: LinuxArch, label: 'Linux', Icon: LinuxIcon },
];

export default function OsSelector() {
    const [hoveredOs, setHoveredOs] = useState<Os | null>(null);
    const downloadOptions = useDownloadStore((state) => state.downloadOptions);
    const setDownloadOptions = useDownloadStore((state) => state.setDownloadOptions);

    return (
        <Wrapper>
            <OsLabel>Download for</OsLabel>
            <ButtonsWrapper>
                {osOptions.map(({ os, arch, label, Icon }) => (
                    <OsButton
                        key={os}
                        onClick={() =>
                            setDownloadOptions({ ...downloadOptions, os, architecture: Object.values(arch)[0] })
                        }
                        selected={downloadOptions.os === os}
                        onMouseEnter={() => setHoveredOs(os)}
                        onMouseLeave={() => setHoveredOs(null)}
                    >
                        {label}
                        <Icon fill={downloadOptions.os === os || hoveredOs === os ? '#000' : '#FFF'} />
                    </OsButton>
                ))}
            </ButtonsWrapper>
        </Wrapper>
    );
}
