import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import * as cryptocurrencyActions from './cryptocurrency.actions';
import { map, catchError, withLatestFrom, filter, switchMap, share } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response';
import { of as observableOf } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CryptocurrencyState } from './cryptocurrency.reducers';

@Injectable()
export class CryptocurrencyEffects {

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private service: CryptocurrencyService
    ) { }

    @Effect()
    loadCryptocurrencies$ = this.actions$.pipe(
        ofType(cryptocurrencyActions.CryptocurrencyActionTypes.CryptocurrencyListLoad),
        withLatestFrom(this.store.pipe(select('cryptocurrency'))),
        filter((res) => {
            let action: cryptocurrencyActions.CryptocurrencyListLoad = res[0];
            let store: CryptocurrencyState = res[1];
            let isPageCached: boolean = store && 'cryptocurrencies' in store && action.payload in store.cryptocurrencies;

            if (isPageCached) {
                this.store.dispatch(new cryptocurrencyActions.CryptocurrencyListLoaded());
            }
            return !isPageCached;
        }),
        switchMap((res) => {
            let action: cryptocurrencyActions.CryptocurrencyListLoad = res[0];
            let store: CryptocurrencyState = res[1];
            return this.service.getAll(action.payload).pipe(
                map(
                    response => {
                        let apiResponse = new ApiResponse(response);

                        return apiResponse.isSuccess ?
                            new cryptocurrencyActions.CryptocurrencyListLoadSuccess({ key: action.payload, data: apiResponse.getData(), totalRecords: apiResponse.getTotalCount() }) :
                            new cryptocurrencyActions.CryptocurrencyListLoadFailed(`code: ${apiResponse.status.error_code}; message: ${apiResponse.status.error_message}`);
                    }
                ),
                catchError(err => observableOf(new cryptocurrencyActions.CryptocurrencyListLoadFailed(err)))
            );
        }
        ), share()
    )
}