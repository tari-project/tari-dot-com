import { Exchange } from '@/sites/exchange/types/exchange';
import logoHeader from '@/sites/exchange/pages/ExchangePage/images/TariBank/logoHeader.svg';
import logoSquare from '@/sites/exchange/pages/ExchangePage/images/TariBank/logoSquare.svg';

export async function fetchExchangeData(exchangeId: string): Promise<Exchange> {
    if (process.env.NODE_ENV === 'development') {
        return {
            name: 'Mock Exchange',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            id: 'mock-id',
            campaign_cta: 'Join now!',
            campaign_title: 'Mock Campaign',
            campaign_tagline: 'The best mock exchange.',
            reward_percentage: 10,
            campaign_description: 'This is a mock campaign for development.',
            wallet_label: 'Mock Wallet',
            hero_img: '/mock-hero.png',
            exchange_id: exchangeId,
            primary_colour: '#FFD700',
            secondary_colour: '#161616',
            logo_img_url: logoHeader.src,
            logo_img_small_url: logoSquare.src,
            hero_img_url: '/mock-hero-img.png',
            is_hidden: false,
        };
    }

    const response = await fetch(`https://rwa.y.at/miner/exchanges/${exchangeId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch miner stats');
    }
    return response.json();
}
