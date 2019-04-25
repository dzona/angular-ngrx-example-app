import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../api/api';

@Injectable({
    providedIn: 'root'
})
export class CryptocurrencyService {

    constructor(public api: Api) { }

    public get(id: number, currency: string = 'USD'): Observable<any> {
        return this.api.get(`cryptocurrency/quotes/latest`, { id: id, convert: currency });
    }

    public getAll(params: any): Observable<any> {

        let queryParams = {
            start: params.pageIndex * params.pageSize + 1,
            limit: params.pageSize,
            convert: params.currency,
            sort_dir: params.sortDir
        };

        if (params.sortAttr && params.sortAttr != 'cmc_rank') {
            queryParams['sort'] = params.sortAttr;
        }

        return this.api.get('cryptocurrency/listings/latest', queryParams);
    }
}
