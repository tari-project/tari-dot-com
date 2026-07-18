import DownloadModal from './DownloadModal/DownloadModal';
import type { Exchange } from '@/sites/exchange/types/exchange';

export default function Modals({ exchange }: { exchange?: Exchange }) {
    return (
        <>
            <DownloadModal exchange={exchange} />
        </>
    );
}
