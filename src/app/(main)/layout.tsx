import Layout from '@/ui-shared/layouts/Layout/Layout';
import { Metadata } from 'next';
import { defaultOgContent } from '@/utils/metadata';

// When in Layout, Metadata propagates defaults for routes underneath. For all other cases, it should be in the
// pages.tsx.
export const metadata: Metadata = {
    title: {
        template: 'Tari / %s',
        absolute: 'Tari',
    },
    description:
        'Tari is the dual-layer protocol powered by you. Proof of work and an ingenious app platform to put all of its power in your hands.',
    icons: [{ url: 'https://tari.com/favicon.png?v=1', type: 'image/png' }],
    openGraph: defaultOgContent(),
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
