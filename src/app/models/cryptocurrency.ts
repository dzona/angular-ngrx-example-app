import { BaseModel } from './base-model';

export interface ICryptocurrency {
    id: number;
    name: string;
    symbol: string;
    cmc_rank: number;
    slug: string;
    num_market_pairs: number;
    quote: any[];
    last_updated: string;
    date_added: string;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
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
    quote: any[];
}
