import { cryptocurrencyReducer, CryptocurrencyState, initialState } from './cryptocurrency.reducers';
import * as cryptocurrencyActions from './cryptocurrency.actions';

describe(`cryptocurrencyReducer`, () => {

    describe(`loadListAction`, () => {

        it(`should set loading flag to 'true'`, () => {
            const expectedResult = {
                selectedCurrency: 'USD',
                cryptocurrencyTotal: 0,
                cryptocurrencies: {},
                error: '',
                isListLoading: true
            };

            const action = new cryptocurrencyActions.CryptocurrencyListLoad('USD');
            const result = cryptocurrencyReducer(initialState, action);
            expect(result).toEqual(expectedResult);
        });

    });
});