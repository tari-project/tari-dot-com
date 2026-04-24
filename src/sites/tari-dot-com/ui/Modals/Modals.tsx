import { Suspense } from 'react';
import DownloadModal from './DownloadModal/DownloadModal';
import ASICPromoModal from './ASICPromoModal/ASICPromoModal';

export default function Modals() {
    return (
        <>
            <Suspense fallback={null}>
                <DownloadModal />
            </Suspense>
            <ASICPromoModal />
        </>
    );
}
