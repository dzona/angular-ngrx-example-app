import { cryptocurrencyReducer, initialState, CryptocurrencyState } from './cryptocurrency.reducers';
import * as cryptocurrencyActions from './cryptocurrency.actions';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import { of as observableOf, ReplaySubject } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResponse } from 'src/app/models/api-response';
import { Api } from 'src/app/providers/api/api';
import { CryptocurrencyEffects } from './cryptocurrency.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

const currencyMock: string = 'USD';

const cryptocurrencylistMock: any[] = [
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
            [currencyMock]: {
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
            [currencyMock]: {
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
            [currencyMock]: {
                price: 0.293054353345,
                volume_24h: 881872472.814614,
                percent_change_1h: -0.0365091,
                percent_change_24h: -1.29956,
                percent_change_7d: -9.56901,
                market_cap: 12309738361.752281,
                last_updated: '2019-04-29T23:03:02.000Z'
            }
        }
    }
];

const responseGetMock = {
    "status": {
        "timestamp": "2019-04-24T09:34:51.155Z",
        "error_code": 0,
        "error_message": null,
        "elapsed": 7,
        "credit_count": 1
    },
    "data": {
        "1": {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "circulating_supply": 17662475,
            "total_supply": 17662475,
            "max_supply": 21000000,
            "date_added": "2013-04-28T00:00:00.000Z",
            "num_market_pairs": 7317,
            "tags": [
                "mineable"
            ],
            "platform": null,
            "cmc_rank": 1,
            "last_updated": "2019-04-24T09:33:29.000Z",
            "quote": {
                "CNY": {
                    "price": 37031.893456975595,
                    "volume_24h": 107641091873.77219,
                    "percent_change_1h": 0.2123,
                    "percent_change_24h": -0.9958,
                    "percent_change_7d": 5.2704,
                    "market_cap": 654074892386.495,
                    "last_updated": "2019-04-24T09:34:00.000Z"
                }
            }
        }
    }
};

const responseGetAllMock = {
    "status": {
        "timestamp": "2019-04-24T09:34:51.155Z",
        "error_code": 0,
        "error_message": null,
        "elapsed": 7,
        "credit_count": 1
    },
    "data": cryptocurrencylistMock
};

describe(`CryptocurrencyService`, () => {

    let injector: TestBed;
    let service: CryptocurrencyService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CryptocurrencyService]
        });
        injector = getTestBed();
        service = injector.get(CryptocurrencyService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('CryptocurrencyService get()', () => {

        it('should return an valid Observable<ApiResponse>', () => {

            service.get(1, 'CNY').subscribe((response: ApiResponse) => {
                expect(response.status.error_code).toBeFalsy();
                expect(response.data["1"]).toBeTruthy();
                expect(response.data["1"]["quote"]["CNY"]).toBeTruthy();
            });

            const req = httpMock.expectOne(`${Api.url}/cryptocurrency/quotes/latest?id=1&convert=CNY`);
            expect(req.request.method).toBe("GET");
            expect(req.request.url).toBe(`${Api.url}/cryptocurrency/quotes/latest`);

            req.flush(responseGetMock);
        });
    });

    describe('CryptocurrencyService getAll()', () => {

        it('should return an valid Observable<ApiResponse>', () => {

            service.getAll(currencyMock).subscribe((response: ApiResponse) => {
                expect(response.status.error_code).toBeFalsy();
                expect(response.data.length).toBe(3);
                expect(response.data).toEqual(cryptocurrencylistMock);
            });

            const req = httpMock.expectOne(`${Api.url}/cryptocurrency/listings/latest?start=1&limit=100&convert=${currencyMock}`);
            expect(req.request.method).toBe("GET");
            req.flush(responseGetAllMock);
        });
    });
});

describe('CryptocurrencyStore', () => {
    let mockStore: MockStore<CryptocurrencyState>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideMockStore({ initialState })
        ],
      });
      mockStore = TestBed.get(Store);
    });
    it('should initialize store', () => {
      mockStore.setState(initialState);
      mockStore.pipe(take(1)).subscribe(state => {
        expect(state.error).toBe('');
      });
    });
  });
  
describe(`CryptocurrencyReducer`, () => {

    describe(`[SelectCurrency] Action`, () => {

        it(`should set selected currency to '${currencyMock}'`, () => {
            const startState = {
                ...initialState,
                selectedCurrency: 'XXX'
            }; 

            const expectedResult = {
                ...initialState,
                selectedCurrency: currencyMock
            }; 

            const action = new cryptocurrencyActions.SelectedCurrencyChanged(currencyMock);
            const result = cryptocurrencyReducer(startState, action);
            expect(result).toEqual(expectedResult);
        });

    });

    describe(`[ListLoad] Action`, () => {

        it(`should set loading flag to 'true'`, () => {
            const expectedResult = {
                ...initialState,
                isListLoading: true
            }; 

            const action = new cryptocurrencyActions.CryptocurrencyListLoad(currencyMock);
            const result = cryptocurrencyReducer(initialState, action);
            expect(result).toEqual(expectedResult);
        });

    });

    describe(`[ListLoadFailed] Action`, () => {

        it(`should set error message`, () => {
            const expectedResult = {
                ...initialState,
                error: 'error message'
            }; 

            const action = new cryptocurrencyActions.CryptocurrencyListLoadFailed('error message');
            const result = cryptocurrencyReducer(initialState, action);
            expect(result).toEqual(expectedResult);
        });

    });

    describe(`[ListClear] Action`, () => {

        it(`should clear cryptocurrency cache`, () => {
            const currentState = {
                ...initialState,
                cryptocurrencyTotal: cryptocurrencylistMock.length,
                cryptocurrencies: {[currencyMock]: cryptocurrencylistMock}
            }; 

            const action = new cryptocurrencyActions.CryptocurrencyListClear();
            const result = cryptocurrencyReducer(currentState, action);
            expect(result).toEqual(initialState);
        });

    });

    describe(`[ListLoadSuccess] Action`, () => {

        it(`should set cryptocurrency results to store at key '${currencyMock}'`, () => {
            const expectedResult = {
                selectedCurrency: 'USD',
                cryptocurrencyTotal: 3,
                cryptocurrencies: { [currencyMock]: cryptocurrencylistMock },
                error: '',
                isListLoading: false
            };

            const action = new cryptocurrencyActions.CryptocurrencyListLoadSuccess({
                key: currencyMock,
                data: cryptocurrencylistMock,
                totalRecords: cryptocurrencylistMock.length
            });
            const result = cryptocurrencyReducer(initialState, action);
            expect(result).toEqual(expectedResult);
        });

    });
});

describe(`CryptocurrencyEffects`, () => {
    let actions;
    let effects: CryptocurrencyEffects;
    let mockService: jasmine.SpyObj<CryptocurrencyService>;

    beforeEach((async(() => {
        mockService = jasmine.createSpyObj('CryptocurrencyService', ['getAll']);
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                CryptocurrencyEffects,
                provideMockActions(() => actions),
                provideMockStore({ initialState }),
                { provide: CryptocurrencyService, useValue: mockService }
            ]
        });
        actions = new ReplaySubject(1);
        effects = TestBed.get(CryptocurrencyEffects);
        let serviceSpy = mockService.getAll.and.returnValue(observableOf(responseGetAllMock));
    })));

    it('should return new success action after load', (done) => {
        actions.next(new cryptocurrencyActions.CryptocurrencyListLoad(currencyMock));
        const sub = effects.loadCryptocurrencies$.subscribe(result => {
            expect(result).toEqual(new cryptocurrencyActions.CryptocurrencyListLoadSuccess({ key: currencyMock, data: cryptocurrencylistMock, totalRecords: cryptocurrencylistMock.length }));
            done();
            setTimeout(() => sub.unsubscribe());
        });
    });

});