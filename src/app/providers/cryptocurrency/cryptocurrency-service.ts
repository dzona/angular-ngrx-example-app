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

    public getAll(currency: string): Observable<any> {

        let params = {
            start: 1,
            limit: 100,
            convert: currency
        };

        return this.api.get('cryptocurrency/listings/latest', params);
    }
}
