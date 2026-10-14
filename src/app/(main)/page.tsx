import OotlePage from '@/sites/tari-dot-com/pages/OotlePage/OotlePage';
import { Metadata } from 'next';
import { canonicalUrl } from '@/utils/metadata';

// Defaults pulled from ./layout.tsx
export const metadata: Metadata = {
    ...canonicalUrl('/'),
};

export default function Page() {
    return <OotlePage />;
}
