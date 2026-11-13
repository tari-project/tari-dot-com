import { usePathname } from 'next/navigation';

export const useHeaderVariant = () => {
    const pathname = usePathname();
    const isOotlePage = pathname === '/ootle';
    return isOotlePage ? 'ootle' : 'main';
};
