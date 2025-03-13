import { Os } from '@/ui-shared/types/downloadTypes';
import { useDownloadStore } from '@/services/stores/useDownloadStore';

const useDetectOs = () => {
    const setDetectedOs = useDownloadStore((state) => state.setDetectedOs);
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';

    if (/Mac/i.test(userAgent)) {
        setDetectedOs(Os.Mac);
        return Os.Mac;
    } else if (/Windows/i.test(userAgent)) {
        setDetectedOs(Os.Windows);
        return Os.Windows;
    } else if (/Linux/i.test(userAgent)) {
        setDetectedOs(Os.Linux);
        return Os.Linux;
    } else {
        setDetectedOs(Os.Mac);
        return Os.Mac;
    }
};

export default useDetectOs;
