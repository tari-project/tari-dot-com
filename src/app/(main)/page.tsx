import HomePage from '@/sites/tari-dot-com/pages/HomePage/HomePage';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

// Defaults pulled from ./layout.tsx
export const metadata: Metadata = {
    ...canonicalUrl('/'),
};

export default function Page() {
    return <HomePage />;
}
