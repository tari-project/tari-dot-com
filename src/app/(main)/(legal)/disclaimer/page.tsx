import Disclaimer from '@/sites/tari-dot-com/pages/LegalPages/Disclaimer';

export const generateMetadata = async () => {
    const metadata = {
        title: 'Tari / Disclaimer',
    };

    return metadata;
};

export default function Page() {
    return <Disclaimer />;
}
