export interface Exchange {
    name: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
    campaign_cta: string;
    campaign_title: string;
    campaign_tagline: string;
    campaign_description: string;
    wallet_label: string;
    hero_img: string;
    exchange_id: string;
    primary_colour: string;
    secondary_colour: string;
    logo_img_url: string;
    logo_img_small_url: string;
    hero_img_url: string;
    is_hidden?: boolean;
    download_link_mac?: string;
    download_link_win?: string;
    download_link_linux?: string;
    reward_image?: string;
    reward_expiry_date?: string;
    reward_percentage?: number;
}
