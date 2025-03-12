import { create } from 'zustand';
import { Network, DownloadOptionsType, Os, MacArch } from '@/ui-shared/types/downloadTypes';

interface Store {
    detectedOs: Os;
    setDetectedOs: (detectedOs: Os) => void;
    selectedOs: Os;
    setSelectedOs: (selectedOs: Os) => void;
    downloadOptions: DownloadOptionsType<Os>;
    setDownloadOptions: (downloadOptions: DownloadOptionsType<Os>) => void;
}

export const useDownloadStore = create<Store>()((set) => ({
    detectedOs: Os.Mac,
    setDetectedOs: (detectedOs: Os) => set({ detectedOs }),
    selectedOs: Os.Mac,
    setSelectedOs: (selectedOs: Os) => set({ selectedOs }),
    downloadOptions: {
        os: Os.Mac,
        architecture: Object.values(MacArch)[0],
        network: Network.Mainnet,
    },
    setDownloadOptions: (downloadOptions: DownloadOptionsType<Os>) => set({ downloadOptions }),
}));
