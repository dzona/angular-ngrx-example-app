import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api/api';

@Injectable()
export class CryptocurrencyService {

    constructor(public api: Api) { }

    public get(id: number): Observable<any> {
        return this.api.get(`cryptocurrency/info/`, { id: id }, { observe: 'response' });
    }

    public getAll(currency: string = 'USD', page: number = 1, sort: string = 'market_cap', sort_dir: string = 'desc', limit: number = 10): Observable<any> {

        let start = (page - 1) * limit + 1;

        return this.api.get('cryptocurrency/listings/latest', {
            start: start,
            limit: limit,
            convert: currency,
            sort: sort,
            sort_dir: sort_dir
        });
    }



}