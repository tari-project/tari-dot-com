import { create } from './create';

type UIStoreState = {
    theme: 'light' | 'dark';
};

const initialState: UIStoreState = {
    theme: 'dark',
};

type UIStoreStore = UIStoreState & {
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIStoreStore>()(() => ({
    ...initialState,
    setTheme: (theme: 'light' | 'dark') => {
        console.log('THEME_NAME', theme);
        useUIStore.setState({ theme });
        console.log(useUIStore.getState());
    },
}));

