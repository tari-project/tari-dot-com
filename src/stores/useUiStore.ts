import { create } from './create';

type UIStoreState = {
    theme: 'light' | 'dark';
    showDownloadModal: boolean;
    isLinux: boolean;
};

const initialState: UIStoreState = {
    theme: 'light',
    showDownloadModal: false,
    isLinux: false,
};

type UIStoreStore = UIStoreState & {
    setTheme: (theme: 'light' | 'dark') => void;
    setShowDownloadModal: (show: boolean) => void;
    setIsLinux: (isLinux: boolean) => void;
};

export const useUIStore = create<UIStoreStore>()(() => ({
    ...initialState,
    setTheme: (theme: 'light' | 'dark') => {
        useUIStore.setState({ theme });
    },
    setShowDownloadModal: (show: boolean) => {
        useUIStore.setState({ showDownloadModal: show });
    },
    setIsLinux: (isLinux: boolean) => {
        useUIStore.setState({ isLinux });
    },
}));
