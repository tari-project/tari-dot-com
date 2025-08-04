import logoHeader from '@/sites/exchange/pages/ExchangePage/images/TariBank/logoHeader.svg';
import logoSquare from '@/sites/exchange/pages/ExchangePage/images/TariBank/logoSquare.svg';
import type { Exchange } from '@/sites/exchange/types/exchange';

export async function fetchExchangeData(exchangeId: string, password?: string): Promise<Exchange> {
    if (!exchangeId) {
        throw new Error('Exchange ID is required');
    }

    if (exchangeId === 'mock-id' || exchangeId === 'test') {
        return {
            name: 'Mock',
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
            primary_colour: '#8E7AFF',
            secondary_colour: '#161616',
            logo_img_url: logoHeader.src,
            logo_img_small_url: logoSquare.src,
            hero_img_url: '/mock-hero-img.png',
            is_hidden: false,
            // Download links
            download_link_linux: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            download_link_mac: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            download_link_win: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            // Reward missing fields
            reward_image:
                'https://github.com/tari-project/tari-universe/releases/download/v0.1.0/tari-universe-windows-x86_64-v0.1.0.zip',
            reward_expiry_date: '2025-06-30',
        };
    }

    let url = `https://rwa.y.at/miner/exchanges/${exchangeId}`;

    if (password) {
        url += `?password=${password}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Failed response body:', errorBody); // THIS IS THE CRUCIAL LOG
        throw new Error(
            `Failed to fetch miner stats: ${response.status} ${response.statusText}. Body: ${errorBody.substring(
                0,
                500,
            )}`,
        );
    }
    return response.json();
}
