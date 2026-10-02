import IntegrationPage from '@/sites/tari-dot-com/pages/IntegrationPage/IntegrationPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Integration Guide',
    description: 'Learn how to integrate Tari with your exchange, and begin trading now!',
    alternates: {
        canonical: '/integration-guide',
    },
    openGraph: {
        url: '/integration-guide',
    },
};

export default function Page() {
    return <IntegrationPage />;
}
