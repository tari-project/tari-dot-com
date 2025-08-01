import { create } from './create';

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

export const useUIStore = create<UIStoreStore>()(() => ({
    ...initialState,
    setTheme: (theme: 'light' | 'dark') => {
        useUIStore.setState({ theme });
    },
    setVeera: (isVeera: boolean) => {
        useUIStore.setState({ isVeera });
    },
    setShowDownloadModal: (show: boolean) => {
        useUIStore.setState({ showDownloadModal: show });
    },
    setIsLinux: (isLinux: boolean) => {
        useUIStore.setState({ isLinux });
    },
}));
