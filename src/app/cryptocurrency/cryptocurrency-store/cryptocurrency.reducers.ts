import { CryptocurrencyActionTypes, CryptocurrencyActions } from './cryptocurrency.actions';
import *  as deepmerge from 'deepmerge';

export interface CryptocurrencyState {
    selectedCurrency: string,
    cryptocurrencies: any,
    cryptocurrencyTotal: number,
    error: string
}

export const initialState: CryptocurrencyState = {
    selectedCurrency: 'USD',
    cryptocurrencyTotal: 100, //normally would be 0
    cryptocurrencies: {},
    error: ''
};

export function cryptocurrencyReducer(state = initialState, action: CryptocurrencyActions) {
    switch (action.type) {
        case CryptocurrencyActionTypes.SelectedCurrencyChanged:
            console.log('existing state:' + JSON.stringify(state));
            console.log('payload:' + action.payload);
            return {
                ...state,
                selectedCurrency: action.payload
            }
        case CryptocurrencyActionTypes.CryptocurrencyListLoaded:
            console.log('existing state:' + JSON.stringify(state));
            console.log('payload:' + action.payload);
            state.cryptocurrencies[action.payload.key] = action.payload.data;
            return state;
            //return deepmerge(state, { cryptocurrencies: action.payload });
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