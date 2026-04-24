import { create } from 'zustand';

type UIStoreState = {
    theme: 'light' | 'dark';
    isVeera: boolean;
    showDownloadModal: boolean;
    isLinux: boolean;
};

const initialState: UIStoreState = {
    theme: 'light',
    isVeera: false,
    showDownloadModal: false,
    isLinux: false,
};

type UIStoreStore = UIStoreState & {
    setTheme: (theme: 'light' | 'dark') => void;
    setVeera: (isVeera: boolean) => void;
    setShowDownloadModal: (show: boolean) => void;
    setIsLinux: (isLinux: boolean) => void;
};

export const useUIStore = create<UIStoreStore>()((set) => ({
    ...initialState,
    setTheme: (theme: 'light' | 'dark') => set({ theme }),
    setVeera: (isVeera: boolean) => set({ isVeera }),
    setShowDownloadModal: (show: boolean) => set({ showDownloadModal: show }),
    setIsLinux: (isLinux: boolean) => set({ isLinux }),
}));
