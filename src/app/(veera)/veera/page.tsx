import ExchangePage from '@/sites/exchange/pages/ExchangePage/ExchangePage';
import logoHeader from '@/sites/exchange/pages/ExchangePage/images/vera/veraLogo.png';
import logoSquare from '@/sites/exchange/pages/ExchangePage/images/TariBank/logoSquare.svg';

export const runtime = 'edge';

export const generateMetadata = async () => {
    return {
        title: `Tari x Vera`,
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
    id: 'vera',
    name: 'Mock',
    campaign_cta: 'Join now!',
    campaign_title: 'Mock Campaign',
    campaign_tagline: 'The best mock exchange.',
    reward_percentage: 10,
    campaign_description: 'This is a mock campaign for development.',
    wallet_label: 'Mock Wallet',
    hero_img: '/mock-hero.png',
    exchange_id: 'vera',
    primary_colour: '#8E7AFF',
    secondary_colour: '#161616',
    logo_img_url: logoHeader.src,
    logo_img_small_url: logoSquare.src,
    hero_img_url: '/mock-hero-img.png',
};
export default function Page() {
    return <ExchangePage customData={VERA_DATA} />;
}
