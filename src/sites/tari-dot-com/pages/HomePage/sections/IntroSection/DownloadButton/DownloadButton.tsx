'use client';

import { useReward } from 'react-rewards';
import AppleIcon from './icons/AppleIcon';
import LinuxIcon from './icons/LinuxIcon';
import WindowsIcon from './icons/WindowsIcon';
import { Button, ConfettiTarget, Icons, Text, Wrapper } from './styles';

export default function DownloadButton() {
    const { reward } = useReward('intro-download-button', 'emoji', {
        emoji: ['🚀', '❤️', '✨'],
        angle: 90,
        decay: 0.91,
        spread: 100,
        startVelocity: 20,
        elementCount: 20,
        elementSize: 24,
        lifetime: 100,
    });

    return (
        <Wrapper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 2.4 }}
        >
            <Button onClick={reward}>
                <Text>Download Tari Universe</Text>
                <Icons>
                    <WindowsIcon />
                    <AppleIcon />
                    <LinuxIcon />
                </Icons>
            </Button>
            <ConfettiTarget id="intro-download-button" />
        </Wrapper>
    );
}
