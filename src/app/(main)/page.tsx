import HomePage from '@/sites/tari-dot-com/pages/HomePage/HomePage';
import { Metadata } from 'next';

// Defaults pulled from ./layout.tsx
export const metadata: Metadata = {
    alternates: {
        canonical: '/',
    },
    openGraph: {
        url: '/',
    },
};

export default function Page() {
    return <HomePage />;
}
