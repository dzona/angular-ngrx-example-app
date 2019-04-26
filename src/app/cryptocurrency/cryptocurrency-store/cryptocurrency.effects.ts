import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import * as cryptocurrencyActions from './cryptocurrency.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response';
import { of as observableOf } from 'rxjs';

@Injectable()
export class CryptocurrencyEffects {

    constructor(
        private actions$: Actions,
        private service: CryptocurrencyService
    ) { }

    @Effect()
    loadCryptocurrencies = this.actions$.pipe(
        ofType(cryptocurrencyActions.CryptocurrencyActionTypes.CryptocurrencyListLoad),
        mergeMap((action: cryptocurrencyActions.CryptocurrencyListLoaded) => this.service.getAll(action.payload).pipe(
            map(
                response => {
                    let apiResponse = new ApiResponse(response);
                    let cacheKey = JSON.stringify(action.payload);

                    return apiResponse.isSuccess ?
                        new cryptocurrencyActions.CryptocurrencyListLoaded({ key: cacheKey, data: apiResponse.data }) :
                        new cryptocurrencyActions.CryptocurrencyListLoadFailed(`code: ${apiResponse.status.error_code}; message: ${apiResponse.status.error_message}`);
                }
            ),
            catchError(err => observableOf(new cryptocurrencyActions.CryptocurrencyListLoadFailed(err)))
        ))
    )
}