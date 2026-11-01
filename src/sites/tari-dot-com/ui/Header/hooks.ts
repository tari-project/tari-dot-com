import { usePathname } from 'next/navigation';

export const useHeaderVariant = () => {
    const pathname = usePathname();
    const isOotlePage = pathname === '/ootle' || pathname === '/';
    return isOotlePage ? 'ootle' : 'main';
};
