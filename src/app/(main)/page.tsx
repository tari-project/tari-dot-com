import { Suspense } from 'react';
import HomePage from '@/sites/tari-dot-com/pages/HomePage/HomePage';

export default function Page() {
    return (
        <Suspense>
            <HomePage />
        </Suspense>
    );
}
