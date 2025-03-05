import { create } from 'zustand';

interface Store {
    isLoading: boolean;
    setIsLoading: (isLoaded: boolean) => void;
    showMobileMenu: boolean;
    setShowMobileMenu: (showMobileMenu: boolean) => void;
}

export const useMainStore = create<Store>()((set) => ({
    isLoading: true,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    showMobileMenu: false,
    setShowMobileMenu: (showMobileMenu: boolean) => set({ showMobileMenu }),
}));
