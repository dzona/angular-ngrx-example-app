import { BaseModel } from './base-model';

export interface ICryptocurrency {
    id: number;
    name: string;
    symbol: string;
    cmc_rank: number;
    slug: string;
    num_market_pairs: number;
    rank?: number;
    last_updated: string;
    date_added: string;
    market_cap?: number;
    price?: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    volume_24h?: number;
    percent_change_1h?: number;
    percent_change_24h?: number;
    percent_change_7d?: number;
    
}

export class Cryptocurrency extends BaseModel implements ICryptocurrency {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    date_added: string;
    num_market_pairs: number;
    tags: string[];
    platform: string;
    cmc_rank: number;
    last_updated: string;

}