'use client';

import Magnet from '@/components/Magnet';
import AppleIcon from './icons/AppleIcon';
import LinuxIcon from './icons/LinuxIcon';
import WindowsIcon from './icons/WindowsIcon';
import { Icons, Text, Wrapper } from './styles';

export default function DownloadButton() {
    return (
        <Magnet padding={200} magnetStrength={10}>
            <Wrapper>
                <Text>Download Tari Universe</Text>
                <Icons>
                    <WindowsIcon />
                    <AppleIcon />
                    <LinuxIcon />
                </Icons>
            </Wrapper>
        </Magnet>
    );
}
