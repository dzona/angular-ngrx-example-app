import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import * as cryptocurrencyActions from './cryptocurrency.actions';
import { map, catchError, withLatestFrom, filter, switchMap, share } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response';
import { of as observableOf } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Injectable()
export class CryptocurrencyEffects {

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private service: CryptocurrencyService
    ) { }

    @Effect()
    loadCryptocurrencies = this.actions$.pipe(
        ofType(cryptocurrencyActions.CryptocurrencyActionTypes.CryptocurrencyListLoad),
        withLatestFrom(this.store.pipe(select('cryptocurrency'))),
        filter(([action, store]) => {
            let cacheKey = JSON.stringify(action.payload);
            return !(cacheKey in store.cryptocurrencies);
        }),
        switchMap(([action, store]) => {
            return this.service.getAll(action.payload).pipe(
                map(
                    response => {
                        let apiResponse = new ApiResponse(response);
                        let cacheKey = JSON.stringify(action.payload);

                        return apiResponse.isSuccess ?
                            new cryptocurrencyActions.CryptocurrencyListLoaded({ key: cacheKey, data: apiResponse.data, totalRecords: apiResponse.getTotalCount()}) :
                            new cryptocurrencyActions.CryptocurrencyListLoadFailed(`code: ${apiResponse.status.error_code}; message: ${apiResponse.status.error_message}`);
                    }
                ),
                catchError(err => observableOf(new cryptocurrencyActions.CryptocurrencyListLoadFailed(err)))
            )
        }
        ), share()
    )
}