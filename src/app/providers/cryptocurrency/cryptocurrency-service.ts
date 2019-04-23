import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api/api';

@Injectable({
    providedIn: 'root'
})
export class CryptocurrencyService {

    constructor(public api: Api) { }

    public getSelectedCurrency(): string {
        return localStorage.getItem('selected-currency');
    }

    public setSelectedCurrency(currency: string): void {
        localStorage.setItem('selected-currency', currency);
    }

    public get(id: number, currency: string = 'USD'): Observable<any> {
        return this.api.get(`cryptocurrency/quotes/latest`, { id: id, convert: currency });
    }

    public getAll(currency: string = 'USD', page: number = 1, sort: string = 'cmc_rank', sort_dir: string = 'desc', limit: number = 10): Observable<any> {

        let start = (page - 1) * limit + 1;
        let params = {
            start: start,
            limit: limit,
            convert: currency,
            sort_dir: sort_dir
        };

        if (sort && sort != 'cmc_rank') {
            params['sort'] = sort;
        }

        return this.api.get('cryptocurrency/listings/latest', params);
    }
}
