import { CryptocurrencyActionTypes, CryptocurrencyActions } from './cryptocurrency.actions';
import { createSelector } from '@ngrx/store';

export interface CryptocurrencyState {
    selectedCurrency: string,
    cryptocurrencies: any,
    cryptocurrencyTotal: number,
    error: string
}

export const initialState: CryptocurrencyState = {
    selectedCurrency: 'USD',
    cryptocurrencyTotal: 0, 
    cryptocurrencies: {},
    error: ''
};

export const getCryptocurrencyPage = () =>
  createSelector(
      (state: CryptocurrencyState, props: any) => state.cryptocurrencies[props.key]
  );

export function cryptocurrencyReducer(state = initialState, action: CryptocurrencyActions) {
    switch (action.type) {
        case CryptocurrencyActionTypes.SelectedCurrencyChanged:
            return {
                ...state,
                selectedCurrency: action.payload
            }
        case CryptocurrencyActionTypes.CryptocurrencyListLoaded:
            state.cryptocurrencyTotal = action.payload.totalRecords; 
            state.cryptocurrencies[action.payload.key] = action.payload.data;
            return state;
        case CryptocurrencyActionTypes.CryptocurrencyListLoadFailed:
            return {
                ...state,
                error: action.payload
            };
        case CryptocurrencyActionTypes.CryptocurrencyListClear:
            return initialState;
        default:
            return state;
    }
}