'use client';

import AppleIcon from './icons/AppleIcon';
import LinuxIcon from './icons/LinuxIcon';
import WindowsIcon from './icons/WindowsIcon';
import { Button, Icons, Text, Wrapper } from './styles';

export default function DownloadButton() {
    return (
        <Wrapper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.5 }}
        >
            <Button href="/downloads">
                <Text>Download Tari Universe</Text>
                <Icons>
                    <WindowsIcon />
                    <AppleIcon />
                    <LinuxIcon />
                </Icons>
            </Button>
        </Wrapper>
    );
}
