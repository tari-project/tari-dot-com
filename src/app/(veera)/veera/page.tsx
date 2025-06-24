import ExchangePage from '@/sites/exchange/pages/ExchangePage/ExchangePage';
import logoHeader from '@/sites/exchange/pages/ExchangePage/images/vera/veraLogo.png';
import logoSquare from '@/sites/exchange/pages/ExchangePage/images/TariBank/logoSquare.svg';

export const runtime = 'edge';

export const generateMetadata = async () => {
    return {
        title: `Tari x Veera`,
        description:
            'Tari is the L1 protocol powered by you. Proof of work and an ingenious app platform to put all of its power in your hands.',
        icons: [{ url: 'https://tari.com/favicon.png?v=1', type: 'image/png' }],
        openGraph: {
            images: [
                {
                    url: 'https://tari.com/tari-og.png?v=2',
                    width: 1200,
                    height: 630,
                    alt: 'Tari',
                },
            ],
        },
    };
};


const VERA_DATA = {
    id: 'veera',
    name: 'Veera',
    campaign_cta: 'Join now!',
    campaign_title: '',
    campaign_tagline: '',
    reward_percentage: 10,
    campaign_description: '',
    wallet_label: '',
    hero_img: '',
    exchange_id: '',
    primary_colour: '#8E7AFF',
    secondary_colour: '#161616',
    logo_img_url: logoHeader.src,
    logo_img_small_url: logoSquare.src,
    hero_img_url: '',
};
export default function Page() {
    return <ExchangePage customData={VERA_DATA} />;
}
