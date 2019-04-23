import { Cryptocurrency } from '../../models/cryptocurrency';
import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import { ApiResponse } from '../../models/api-response';

@Component({
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CryptocurrencyListComponent implements AfterViewInit {

  public pageTitle: string = 'Top cryprocurrencies list';

  public cryptocurrencies: Cryptocurrency[] = [];

  public displayedColumns: string[] = ['cmc_rank', 'name', 'symbol', 'price', 'percent_change_24h', 'date_added', 'actions'];
  public resultsLength = 0;
  public pageSize = 10;
  public isLoadingResults = true;
  public currency;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cryptoService: CryptocurrencyService) { }

  ngOnInit() {
    this.currency = this.cryptoService.getSelectedCurrency();
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.cryptoService.getAll(this.currency, this.paginator.pageIndex + 1, this.sort.active, this.sort.direction, this.pageSize);
        }),
        map(response => {
          let apiResponse = new ApiResponse(response);
          this.isLoadingResults = false;
          this.resultsLength = apiResponse.getTotalCount();

          return apiResponse.isSuccess ? apiResponse.data.map(data => new Cryptocurrency(data)) : [];
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.resultsLength = 100;

          return observableOf(this.getPageOfDummyData(this.paginator.pageIndex).map(data => new Cryptocurrency(data)));
        })
      )
      .subscribe((cryptocurrencies: Cryptocurrency[]) => {
        return this.cryptocurrencies = cryptocurrencies
      });
  }

  private getPageOfDummyData(page: number) {
    return this.dummyResponse.data.slice(page * this.pageSize, this.pageSize);
  }

  private dummyResponse: ApiResponse = new ApiResponse({
    "status": {
      "timestamp": "2019-04-21T19:58:28.867Z",
      "error_code": 0,
      "error_message": null,
      "elapsed": 7,
      "credit_count": 1
    },
    "data": [
      {
        "id": 1,
        "name": "Bitcoin",
        "symbol": "BTC",
        "slug": "bitcoin",
        "circulating_supply": 17658137,
        "total_supply": 17658137,
        "max_supply": 21000000,
        "date_added": "2013-04-28T00:00:00.000Z",
        "num_market_pairs": 7255,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 1,
        "last_updated": "2019-04-21T19:57:25.000Z",
        "quote": {
          "EUR": {
            "price": 4692.441356216329,
            "volume_24h": 12088355829.404028,
            "percent_change_1h": 0.222,
            "percent_change_24h": -1.165,
            "percent_change_7d": 2.8123,
            "market_cap": 82859772332.53374,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1027,
        "name": "Ethereum",
        "symbol": "ETH",
        "slug": "ethereum",
        "circulating_supply": 105754703.3116,
        "total_supply": 105754703.3116,
        "max_supply": null,
        "date_added": "2015-08-07T00:00:00.000Z",
        "num_market_pairs": 5223,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 2,
        "last_updated": "2019-04-21T19:57:22.000Z",
        "quote": {
          "EUR": {
            "price": 149.8920706271537,
            "volume_24h": 5403485516.320724,
            "percent_change_1h": 0.1018,
            "percent_change_24h": -2.9468,
            "percent_change_7d": 1.6988,
            "market_cap": 15851791457.93603,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 52,
        "name": "XRP",
        "symbol": "XRP",
        "slug": "ripple",
        "circulating_supply": 41970748057,
        "total_supply": 99991649568,
        "max_supply": 100000000000,
        "date_added": "2013-08-04T00:00:00.000Z",
        "num_market_pairs": 381,
        "tags": [],
        "platform": null,
        "cmc_rank": 3,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 0.28435622216559414,
            "volume_24h": 939350598.6204094,
            "percent_change_1h": 0.0342,
            "percent_change_24h": -2.9697,
            "percent_change_7d": -2.2374,
            "market_cap": 11934643358.95247,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1831,
        "name": "Bitcoin Cash",
        "symbol": "BCH",
        "slug": "bitcoin-cash",
        "circulating_supply": 17741000,
        "total_supply": 17741000,
        "max_supply": 21000000,
        "date_added": "2017-07-23T00:00:00.000Z",
        "num_market_pairs": 291,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 4,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 254.1658990992272,
            "volume_24h": 1128240209.3713229,
            "percent_change_1h": 0.6794,
            "percent_change_24h": -5.4628,
            "percent_change_7d": 0.554,
            "market_cap": 4509157215.91939,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1765,
        "name": "EOS",
        "symbol": "EOS",
        "slug": "eos",
        "circulating_supply": 906245117.6,
        "total_supply": 1006245119.9339,
        "max_supply": null,
        "date_added": "2017-07-01T00:00:00.000Z",
        "num_market_pairs": 303,
        "tags": [],
        "platform": null,
        "cmc_rank": 5,
        "last_updated": "2019-04-21T19:57:06.000Z",
        "quote": {
          "EUR": {
            "price": 4.5919581837961845,
            "volume_24h": 2012096187.4057798,
            "percent_change_1h": 0.1507,
            "percent_change_24h": -5.4363,
            "percent_change_7d": -4.2618,
            "market_cap": 4161439684.2886558,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2,
        "name": "Litecoin",
        "symbol": "LTC",
        "slug": "litecoin",
        "circulating_supply": 61441183.5909222,
        "total_supply": 61441183.5909222,
        "max_supply": 84000000,
        "date_added": "2013-04-28T00:00:00.000Z",
        "num_market_pairs": 554,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 6,
        "last_updated": "2019-04-21T19:57:02.000Z",
        "quote": {
          "EUR": {
            "price": 67.50438663826691,
            "volume_24h": 2580755140.4837346,
            "percent_change_1h": 0.3469,
            "percent_change_24h": -6.3147,
            "percent_change_7d": -5.2195,
            "market_cap": 4147549412.6343527,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1839,
        "name": "Binance Coin",
        "symbol": "BNB",
        "slug": "binance-coin",
        "circulating_supply": 141175490.242,
        "total_supply": 189175490.242,
        "max_supply": null,
        "date_added": "2017-07-25T00:00:00.000Z",
        "num_market_pairs": 147,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
        },
        "cmc_rank": 7,
        "last_updated": "2019-04-21T19:57:05.000Z",
        "quote": {
          "EUR": {
            "price": 21.22830632554869,
            "volume_24h": 269922516.822297,
            "percent_change_1h": 0.1376,
            "percent_change_24h": -3.176,
            "percent_change_7d": 21.8676,
            "market_cap": 2996916552.516686,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 825,
        "name": "Tether",
        "symbol": "USDT",
        "slug": "tether",
        "circulating_supply": 2583816410.99801,
        "total_supply": 2750057493.36343,
        "max_supply": null,
        "date_added": "2015-02-25T00:00:00.000Z",
        "num_market_pairs": 2157,
        "tags": [],
        "platform": {
          "id": 83,
          "name": "Omni",
          "symbol": "OMNI",
          "slug": "omni",
          "token_address": "31"
        },
        "cmc_rank": 8,
        "last_updated": "2019-04-21T19:57:13.000Z",
        "quote": {
          "EUR": {
            "price": 0.8959413322857579,
            "volume_24h": 11223700594.221874,
            "percent_change_1h": -0.0321,
            "percent_change_24h": 0.1704,
            "percent_change_7d": 0.1213,
            "market_cap": 2314947917.651363,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 512,
        "name": "Stellar",
        "symbol": "XLM",
        "slug": "stellar",
        "circulating_supply": 19363613243.97,
        "total_supply": 104902369331.456,
        "max_supply": null,
        "date_added": "2014-08-05T00:00:00.000Z",
        "num_market_pairs": 243,
        "tags": [],
        "platform": null,
        "cmc_rank": 9,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 0.09897067995582524,
            "volume_24h": 219205400.8253253,
            "percent_change_1h": 0.6092,
            "percent_change_24h": -3.3346,
            "percent_change_7d": -4.7584,
            "market_cap": 1916429969.157334,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2010,
        "name": "Cardano",
        "symbol": "ADA",
        "slug": "cardano",
        "circulating_supply": 25927070538,
        "total_supply": 31112483745,
        "max_supply": 45000000000,
        "date_added": "2017-10-01T00:00:00.000Z",
        "num_market_pairs": 73,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 10,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 0.06529555916014507,
            "volume_24h": 83041012.61080573,
            "percent_change_1h": 0.6054,
            "percent_change_24h": -3.7322,
            "percent_change_7d": -12.0079,
            "market_cap": 1692922568.163233,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      }
    ]
  });
}
