import { Os, Network, MacArch, WindowsArch, LinuxArch } from '@/ui-shared/types/downloadTypes';

export const networkOptions = Object.values(Network).map((network) => ({
    value: network,
    label: network === Network.Mainnet ? 'Stagenet' : network.charAt(0).toUpperCase() + network.slice(1),
}));

export const architectureOptions = (selectedOs: Os) => {
    switch (selectedOs) {
        case Os.Mac:
            return Object.values(MacArch).map((arch) => ({
                value: arch,
                label: arch,
            }));
        case Os.Windows:
            return Object.values(WindowsArch).map((arch) => ({
                value: arch,
                label: arch,
            }));
        case Os.Linux:
            return Object.values(LinuxArch).map((arch) => ({
                value: arch,
                label: arch,
            }));
        default:
            return [];
    }
};
