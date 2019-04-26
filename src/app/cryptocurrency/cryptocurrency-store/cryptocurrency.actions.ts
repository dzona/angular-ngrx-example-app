import { Action } from '@ngrx/store';
import { Cryptocurrency } from 'src/app/models/cryptocurrency';

export enum CryptocurrencyActionTypes {
    SelectedCurrencyChanged = '[Cryptocurrency] Selected Currency Updated',
    CryptocurrencyListLoad = '[Cryptocurrency] List Load',
    CryptocurrencyListLoaded = '[Cryptocurrency] List Load Success',
    CryptocurrencyListLoadFailed = '[Cryptocurrency] List Load Failed',
    CryptocurrencyListClear = '[Cryptocurrency] List Clear'
}

export class SelectedCurrencyChanged implements Action {
    readonly type = CryptocurrencyActionTypes.SelectedCurrencyChanged;

    constructor(public payload: string) { }
}

export class CryptocurrencyListLoad implements Action {
    readonly type = CryptocurrencyActionTypes.CryptocurrencyListLoad;

    constructor(public payload: any) { }
}

export class CryptocurrencyListLoaded implements Action {
    readonly type = CryptocurrencyActionTypes.CryptocurrencyListLoaded;

    constructor(public payload: { key: string, data: Cryptocurrency[], totalRecords: number }) { }
}

export class CryptocurrencyListLoadFailed implements Action {
    readonly type = CryptocurrencyActionTypes.CryptocurrencyListLoadFailed;

    constructor(public payload: string) { }
}

export class CryptocurrencyListClear implements Action {
    readonly type = CryptocurrencyActionTypes.CryptocurrencyListClear;
}

export type CryptocurrencyActions = SelectedCurrencyChanged
    | CryptocurrencyListLoad
    | CryptocurrencyListLoaded
    | CryptocurrencyListLoadFailed
    | CryptocurrencyListClear;