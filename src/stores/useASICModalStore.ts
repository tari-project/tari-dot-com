import { create } from 'zustand';

interface ASICModalState {
    isOpen: boolean;
    hasAutoOpened: boolean;
    isClient: boolean;
    openModal: () => void;
    closeModal: () => void;
    initAutoOpen: () => void;
}

const ASIC_PROMO_KEY = 'tari_asic_promo_shown';

export const useASICModalStore = create<ASICModalState>((set, get) => ({
    isOpen: false,
    hasAutoOpened: false,
    isClient: false,
    
    openModal: () => set({ isOpen: true }),
    
    closeModal: () => set({ isOpen: false }),
    
    initAutoOpen: () => {
        const { hasAutoOpened, isClient } = get();
        
        // Only run on client side after hydration
        if (typeof window === 'undefined') {
            return;
        }
        
        if (!isClient) {
            set({ isClient: true });
        }
        
        if (!hasAutoOpened && isClient) {
            const hasBeenShown = localStorage.getItem(ASIC_PROMO_KEY);
            
            if (!hasBeenShown) {
                setTimeout(() => {
                    set({ isOpen: true, hasAutoOpened: true });
                    localStorage.setItem(ASIC_PROMO_KEY, 'true');
                }, 3000);
            }
            
            set({ hasAutoOpened: true });
        }
    }
}));
