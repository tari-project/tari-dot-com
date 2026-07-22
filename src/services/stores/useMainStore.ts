import { create } from 'zustand';

interface Store {
    isLoading: boolean;
    setIsLoading: (isLoaded: boolean) => void;
    showMobileMenu: boolean;
    setShowMobileMenu: (showMobileMenu: boolean) => void;
    showSuperMenu: boolean;
    setShowSuperMenu: (showSuperMenu: boolean) => void;
    showCommunityMenu: boolean;
    setShowCommunityMenu: (showCommunityMenu: boolean) => void;
    showBuildMenu: boolean;
    setShowBuildMenu: (showBuildMenu: boolean) => void;
}

export const useMainStore = create<Store>()((set) => ({
    isLoading: true,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    showMobileMenu: false,
    setShowMobileMenu: (showMobileMenu: boolean) => set({ showMobileMenu }),
    showSuperMenu: false,
    setShowSuperMenu: (showSuperMenu: boolean) => set({ showSuperMenu }),
    showCommunityMenu: false,
    setShowCommunityMenu: (showCommunityMenu: boolean) => set({ showCommunityMenu }),
    showBuildMenu: false,
    setShowBuildMenu: (showBuildMenu: boolean) => set({ showBuildMenu }),
}));
