import { cryptocurrencyReducer, CryptocurrencyState, initialState } from './cryptocurrency.reducers';
import * as cryptocurrencyActions from './cryptocurrency.actions';
import { TestBed } from '@angular/core/testing';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import { of as observableOf } from 'rxjs';

describe(`cryptocurrencyReducer`, () => {

    let testCryptocurrencyData;
    let getCryptocurrencySpy;

    beforeEach(() => {
        testCryptocurrencyData = [
            {
                id: 1,
                name: 'Bitcoin',
                symbol: 'BTC',
                slug: 'bitcoin',
                circulating_supply: 17673112,
                total_supply: 17673112,
                max_supply: 21000000,
                date_added: '2013-04-28T00:00:00.000Z',
                num_market_pairs: 7371,
                tags: [
                    'mineable'
                ],
                platform: null,
                cmc_rank: 1,
                last_updated: '2019-04-29T23:03:28.000Z',
                quote: {
                    USD: {
                        price: 5225.53480362,
                        volume_24h: 13528972982.533,
                        percent_change_1h: -0.136699,
                        percent_change_24h: -0.944654,
                        percent_change_7d: -3.38991,
                        market_cap: 92351461844.27428,
                        last_updated: '2019-04-29T23:03:28.000Z'
                    }
                }
            },
            {
                id: 1027,
                name: 'Ethereum',
                symbol: 'ETH',
                slug: 'ethereum',
                circulating_supply: 105865586.9991,
                total_supply: 105865586.9991,
                max_supply: null,
                date_added: '2015-08-07T00:00:00.000Z',
                num_market_pairs: 5264,
                tags: [
                    'mineable'
                ],
                platform: null,
                cmc_rank: 2,
                last_updated: '2019-04-29T23:03:19.000Z',
                quote: {
                    USD: {
                        price: 154.88521867,
                        volume_24h: 5980753625.10041,
                        percent_change_1h: 0.04168,
                        percent_change_24h: -1.54132,
                        percent_change_7d: -9.9901,
                        market_cap: 16397014591.983513,
                        last_updated: '2019-04-29T23:03:19.000Z'
                    }
                }
            },
            {
                id: 52,
                name: 'XRP',
                symbol: 'XRP',
                slug: 'ripple',
                circulating_supply: 42004966728,
                total_supply: 99991643723,
                max_supply: 100000000000,
                date_added: '2013-08-04T00:00:00.000Z',
                num_market_pairs: 386,
                tags: [],
                platform: null,
                cmc_rank: 3,
                last_updated: '2019-04-29T23:03:02.000Z',
                quote: {
                    USD: {
                        price: 0.293054353345,
                        volume_24h: 881872472.814614,
                        percent_change_1h: -0.0365091,
                        percent_change_24h: -1.29956,
                        percent_change_7d: -9.56901,
                        market_cap: 12309738361.752281,
                        last_updated: '2019-04-29T23:03:02.000Z'
                    }
                }
            }];

        // Create a fake TwainService object with a `getQuote()` spy
        const cryptoService = jasmine.createSpyObj('CryptocurrencyService', ['getAll']);
        // Make the spy return a synchronous Observable with the test data
        getCryptocurrencySpy = cryptoService.getAll.and.returnValue(observableOf(testCryptocurrencyData));

        TestBed.configureTestingModule({
            providers: [
                { provide: CryptocurrencyService, useValue: cryptoService }
            ]
        });

        //fixture = TestBed.createComponent(TwainComponent);
        //component = fixture.componentInstance;
        //quoteEl = fixture.nativeElement.querySelector('.twain');
    });

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

