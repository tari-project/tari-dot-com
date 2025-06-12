import { create } from './create';

type UIStoreState = {
    theme: 'light' | 'dark';
    showDownloadModal: boolean;
};

const initialState: UIStoreState = {
    theme: 'light',
    showDownloadModal: true,
};

type UIStoreStore = UIStoreState & {
    setTheme: (theme: 'light' | 'dark') => void;
    setShowDownloadModal: (show: boolean) => void;
};

export const useUIStore = create<UIStoreStore>()(() => ({
    ...initialState,
    setTheme: (theme: 'light' | 'dark') => {
        useUIStore.setState({ theme });
    },
    setShowDownloadModal: (show: boolean) => {
        useUIStore.setState({ showDownloadModal: show });
    },
}));
