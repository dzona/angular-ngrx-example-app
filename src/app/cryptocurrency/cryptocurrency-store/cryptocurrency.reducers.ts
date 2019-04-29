import { CryptocurrencyActionTypes, CryptocurrencyActions } from './cryptocurrency.actions';
import { createSelector } from '@ngrx/store';

export interface CryptocurrencyState {
    selectedCurrency: string,
    cryptocurrencies: any,
    cryptocurrencyTotal: number,
    error: string,
    isListLoading: boolean
}

export const initialState: CryptocurrencyState = {
    selectedCurrency: 'USD',
    cryptocurrencyTotal: 0,
    cryptocurrencies: {},
    error: '',
    isListLoading: false
};

export const getCryprocurrencyState = (state: CryptocurrencyState) => state;
export const getCryptocurrencyPage = createSelector(getCryprocurrencyState,
    (state) => state
);

export function cryptocurrencyReducer(state = initialState, action: CryptocurrencyActions) {
    switch (action.type) {
        case CryptocurrencyActionTypes.SelectedCurrencyChanged:
            return {
                ...state,
                selectedCurrency: action.payload
            }
        case CryptocurrencyActionTypes.CryptocurrencyListLoad:
            return {
                ...state,
                isListLoading: true
            };
        case CryptocurrencyActionTypes.CryptocurrencyListLoaded:
            return {
                ...state,
                isListLoading: false
            };
        case CryptocurrencyActionTypes.CryptocurrencyListLoadSuccess:
            state.cryptocurrencies[action.payload.key] = action.payload.data;

            return {
                ...state,
                isListLoading: false,
                cryptocurrencies: state.cryptocurrencies,
                cryptocurrencyTotal: action.payload.totalRecords
            };
        case CryptocurrencyActionTypes.CryptocurrencyListLoadFailed:
            return {
                ...state,
                isListLoading: false,
                error: action.payload
            };
        case CryptocurrencyActionTypes.CryptocurrencyListClear:
            return {
                ...state,
                cryptocurrencies: {},
                cryptocurrencyTotal: 0
            };;
        default:
            return state;
    }
}