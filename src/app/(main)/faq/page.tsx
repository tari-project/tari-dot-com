import FaqPage from '@/sites/tari-dot-com/pages/FaqPage/FaqPage';

export const runtime = 'edge';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Faq',
    };

    return metadata;
};

export default function Page() {
    return <FaqPage />;
}
