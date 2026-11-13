import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';
import HomePage from '@/sites/tari-dot-com/pages/HomePage/HomePage';

// Defaults pulled from ./layout.tsx
export const metadata: Metadata = {
    ...canonicalUrl('/'),
};

export default function Page() {
    return <HomePage />;
}
