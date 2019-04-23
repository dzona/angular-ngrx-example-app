import { Cryptocurrency } from '../models/cryptocurrency';
import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CryptocurrencyService } from 'src/providers/cryptocurrency/cryptocurrency-service';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CryptocurrencyListComponent implements AfterViewInit {

  public pageTitle: string = 'Top cryprocurrencies list';

  public cryptocurrencies: Cryptocurrency[] = [];

  public displayedColumns: string[] = ['id', 'name', 'symbol', 'price', 'percent_change_24h', 'date_added', 'actions'];
  public resultsLength = 0;
  public pageSize = 10;
  public isLoadingResults = true;
  public currency = 'EUR';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cryptoService: CryptocurrencyService) { }

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
    return this.dummyAllResponse.data.slice(page * this.pageSize, this.pageSize);
  }

  private dummyAllResponse: any = {
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
      },

      {
        "id": 1958,
        "name": "TRON",
        "symbol": "TRX",
        "slug": "tron",
        "circulating_supply": 66682072191.4,
        "total_supply": 99281283754.3,
        "max_supply": null,
        "date_added": "2017-09-13T00:00:00.000Z",
        "num_market_pairs": 212,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 11,
        "last_updated": "2019-04-21T19:57:05.000Z",
        "quote": {
          "EUR": {
            "price": 0.021930962641772234,
            "volume_24h": 328386880.1234111,
            "percent_change_1h": -0.1417,
            "percent_change_24h": -5.7184,
            "percent_change_7d": -7.6668,
            "market_cap": 1462402034.1055527,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 328,
        "name": "Monero",
        "symbol": "XMR",
        "slug": "monero",
        "circulating_supply": 16933546.5574166,
        "total_supply": 16933546.5574166,
        "max_supply": null,
        "date_added": "2014-05-21T00:00:00.000Z",
        "num_market_pairs": 125,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 12,
        "last_updated": "2019-04-21T19:57:02.000Z",
        "quote": {
          "EUR": {
            "price": 60.69491583105326,
            "volume_24h": 89579932.99189487,
            "percent_change_1h": 0.1113,
            "percent_change_24h": -1.7484,
            "percent_change_7d": 3.214,
            "market_cap": 1027780183.0236223,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 131,
        "name": "Dash",
        "symbol": "DASH",
        "slug": "dash",
        "circulating_supply": 8762695.09660575,
        "total_supply": 8762695.09660575,
        "max_supply": 18900000,
        "date_added": "2014-02-14T00:00:00.000Z",
        "num_market_pairs": 220,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 13,
        "last_updated": "2019-04-21T19:57:01.000Z",
        "quote": {
          "EUR": {
            "price": 106.55504740085907,
            "volume_24h": 232405352.3431742,
            "percent_change_1h": 0.2754,
            "percent_change_24h": -2.5575,
            "percent_change_7d": -2.0791,
            "market_cap": 933709391.378101,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 3602,
        "name": "Bitcoin SV",
        "symbol": "BSV",
        "slug": "bitcoin-sv",
        "circulating_supply": 17738848.4164168,
        "total_supply": 17738848.4164168,
        "max_supply": 21000000,
        "date_added": "2018-11-09T00:00:00.000Z",
        "num_market_pairs": 136,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 14,
        "last_updated": "2019-04-21T19:57:10.000Z",
        "quote": {
          "EUR": {
            "price": 50.22120931947738,
            "volume_24h": 111627032.57292096,
            "percent_change_1h": -0.2583,
            "percent_change_24h": -4.4012,
            "percent_change_7d": -20.0288,
            "market_cap": 890866419.407348,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2011,
        "name": "Tezos",
        "symbol": "XTZ",
        "slug": "tezos",
        "circulating_supply": 663484819.343637,
        "total_supply": 791436356.29912,
        "max_supply": null,
        "date_added": "2017-10-02T00:00:00.000Z",
        "num_market_pairs": 27,
        "tags": [],
        "platform": null,
        "cmc_rank": 15,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 1.1853141920171462,
            "volume_24h": 4118187.653127175,
            "percent_change_1h": 0.997,
            "percent_change_24h": -1.9718,
            "percent_change_7d": 20.5238,
            "market_cap": 786437972.5559453,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1720,
        "name": "IOTA",
        "symbol": "MIOTA",
        "slug": "iota",
        "circulating_supply": 2779530283,
        "total_supply": 2779530283,
        "max_supply": 2779530283,
        "date_added": "2017-06-13T00:00:00.000Z",
        "num_market_pairs": 38,
        "tags": [],
        "platform": null,
        "cmc_rank": 16,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 0.27237776173792233,
            "volume_24h": 13404907.906792589,
            "percent_change_1h": 0.3665,
            "percent_change_24h": -1.6797,
            "percent_change_7d": -2.826,
            "market_cap": 757082237.1663138,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1376,
        "name": "NEO",
        "symbol": "NEO",
        "slug": "neo",
        "circulating_supply": 65000000,
        "total_supply": 100000000,
        "max_supply": 100000000,
        "date_added": "2016-09-08T00:00:00.000Z",
        "num_market_pairs": 170,
        "tags": [],
        "platform": null,
        "cmc_rank": 17,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 9.284216844455745,
            "volume_24h": 216575992.83102018,
            "percent_change_1h": 0.4145,
            "percent_change_24h": -4.8348,
            "percent_change_7d": -6.5733,
            "market_cap": 603474094.8896234,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1321,
        "name": "Ethereum Classic",
        "symbol": "ETC",
        "slug": "ethereum-classic",
        "circulating_supply": 109892106,
        "total_supply": 109892106,
        "max_supply": 210000000,
        "date_added": "2016-07-24T00:00:00.000Z",
        "num_market_pairs": 194,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 18,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 5.169639874549966,
            "volume_24h": 371319469.94076365,
            "percent_change_1h": 0.2916,
            "percent_change_24h": -6.6833,
            "percent_change_7d": -8.3535,
            "market_cap": 568102613.0758716,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1518,
        "name": "Maker",
        "symbol": "MKR",
        "slug": "maker",
        "circulating_supply": 1000000,
        "total_supply": 1000000,
        "max_supply": null,
        "date_added": "2017-01-29T00:00:00.000Z",
        "num_market_pairs": 63,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
        },
        "cmc_rank": 19,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 536.7507315267704,
            "volume_24h": 1266403.5660155986,
            "percent_change_1h": 0.1152,
            "percent_change_24h": -2.5745,
            "percent_change_7d": -3.117,
            "market_cap": 536750731.5267704,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2566,
        "name": "Ontology",
        "symbol": "ONT",
        "slug": "ontology",
        "circulating_supply": 494854358,
        "total_supply": 1000000000,
        "max_supply": null,
        "date_added": "2018-03-08T00:00:00.000Z",
        "num_market_pairs": 67,
        "tags": [],
        "platform": null,
        "cmc_rank": 20,
        "last_updated": "2019-04-21T19:57:07.000Z",
        "quote": {
          "EUR": {
            "price": 1.0770633419278755,
            "volume_24h": 67211582.1055021,
            "percent_change_1h": 0.1631,
            "percent_change_24h": -8.1052,
            "percent_change_7d": -9.8762,
            "market_cap": 532989488.5950533,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 873,
        "name": "NEM",
        "symbol": "XEM",
        "slug": "nem",
        "circulating_supply": 8999999999,
        "total_supply": 8999999999,
        "max_supply": null,
        "date_added": "2015-04-01T00:00:00.000Z",
        "num_market_pairs": 92,
        "tags": [],
        "platform": null,
        "cmc_rank": 21,
        "last_updated": "2019-04-21T19:57:02.000Z",
        "quote": {
          "EUR": {
            "price": 0.05575279979159888,
            "volume_24h": 18913503.01321133,
            "percent_change_1h": 0.3006,
            "percent_change_24h": -2.2972,
            "percent_change_7d": -6.8291,
            "market_cap": 501775198.06863713,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1697,
        "name": "Basic Attention Token",
        "symbol": "BAT",
        "slug": "basic-attention-token",
        "circulating_supply": 1249941614.70849,
        "total_supply": 1500000000,
        "max_supply": null,
        "date_added": "2017-06-01T00:00:00.000Z",
        "num_market_pairs": 97,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef"
        },
        "cmc_rank": 22,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 0.3843153387505164,
            "volume_24h": 150294568.32473096,
            "percent_change_1h": -2.6285,
            "percent_change_24h": 1.7571,
            "percent_change_7d": 39.6617,
            "market_cap": 480371735.0750607,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1437,
        "name": "Zcash",
        "symbol": "ZEC",
        "slug": "zcash",
        "circulating_supply": 6367368.75,
        "total_supply": 6367368.75,
        "max_supply": null,
        "date_added": "2016-10-29T00:00:00.000Z",
        "num_market_pairs": 175,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 23,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 60.290198809622005,
            "volume_24h": 191657920.9402734,
            "percent_change_1h": -0.7053,
            "percent_change_24h": -2.4721,
            "percent_change_7d": -2.2234,
            "market_cap": 383889927.83167434,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 3635,
        "name": "Crypto.com Chain",
        "symbol": "CRO",
        "slug": "crypto-com-chain",
        "circulating_supply": 5134703196.34705,
        "total_supply": 100000000000,
        "max_supply": null,
        "date_added": "2018-12-14T00:00:00.000Z",
        "num_market_pairs": 12,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b"
        },
        "cmc_rank": 24,
        "last_updated": "2019-04-21T19:57:10.000Z",
        "quote": {
          "EUR": {
            "price": 0.0739215795519484,
            "volume_24h": 606192.8935507516,
            "percent_change_1h": 1.279,
            "percent_change_24h": -6.4528,
            "percent_change_7d": -0.9133,
            "market_cap": 379565370.8044122,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 3077,
        "name": "VeChain",
        "symbol": "VET",
        "slug": "vechain",
        "circulating_supply": 55454734800,
        "total_supply": 86712634466,
        "max_supply": null,
        "date_added": "2017-08-22T00:00:00.000Z",
        "num_market_pairs": 52,
        "tags": [],
        "platform": null,
        "cmc_rank": 25,
        "last_updated": "2019-04-21T19:57:09.000Z",
        "quote": {
          "EUR": {
            "price": 0.006005397034552106,
            "volume_24h": 11629182.660344986,
            "percent_change_1h": -0.6724,
            "percent_change_24h": -3.2122,
            "percent_change_7d": -2.1129,
            "market_cap": 333027699.9197934,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 74,
        "name": "Dogecoin",
        "symbol": "DOGE",
        "slug": "dogecoin",
        "circulating_supply": 119183347533.732,
        "total_supply": 119183347533.732,
        "max_supply": null,
        "date_added": "2013-12-15T00:00:00.000Z",
        "num_market_pairs": 330,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 26,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 0.002429557678682344,
            "volume_24h": 33369257.932652857,
            "percent_change_1h": -0.0603,
            "percent_change_24h": -5.2481,
            "percent_change_7d": -4.6486,
            "market_cap": 289562817.171645,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2083,
        "name": "Bitcoin Gold",
        "symbol": "BTG",
        "slug": "bitcoin-gold",
        "circulating_supply": 17513923.589,
        "total_supply": 17513923.589,
        "max_supply": 21000000,
        "date_added": "2017-10-23T00:00:00.000Z",
        "num_market_pairs": 76,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 27,
        "last_updated": "2019-04-21T19:57:05.000Z",
        "quote": {
          "EUR": {
            "price": 14.736788035952651,
            "volume_24h": 13329579.090115301,
            "percent_change_1h": 0.318,
            "percent_change_24h": -4.0792,
            "percent_change_7d": 1.9876,
            "market_cap": 258098979.60896415,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1808,
        "name": "OmiseGO",
        "symbol": "OMG",
        "slug": "omisego",
        "circulating_supply": 140245398.245133,
        "total_supply": 140245398.245133,
        "max_supply": null,
        "date_added": "2017-07-14T00:00:00.000Z",
        "num_market_pairs": 163,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07"
        },
        "cmc_rank": 28,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 1.6335084229186085,
            "volume_24h": 61891196.86159548,
            "percent_change_1h": -0.2398,
            "percent_change_24h": -5.9254,
            "percent_change_7d": -5.5597,
            "market_cap": 229092039.30899942,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1274,
        "name": "Waves",
        "symbol": "WAVES",
        "slug": "waves",
        "circulating_supply": 100000000,
        "total_supply": 100000000,
        "max_supply": null,
        "date_added": "2016-06-02T00:00:00.000Z",
        "num_market_pairs": 128,
        "tags": [],
        "platform": null,
        "cmc_rank": 29,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 2.2904129163831413,
            "volume_24h": 16799392.79933909,
            "percent_change_1h": 0.1142,
            "percent_change_24h": -3.2113,
            "percent_change_7d": -6.2847,
            "market_cap": 229041291.6383141,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 3408,
        "name": "USD Coin",
        "symbol": "USDC",
        "slug": "usd-coin",
        "circulating_supply": 251351956.203317,
        "total_supply": 252295598.26,
        "max_supply": null,
        "date_added": "2018-10-08T00:00:00.000Z",
        "num_market_pairs": 138,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        },
        "cmc_rank": 30,
        "last_updated": "2019-04-21T19:57:10.000Z",
        "quote": {
          "EUR": {
            "price": 0.8920479071199406,
            "volume_24h": 41519115.457739644,
            "percent_change_1h": 0.0474,
            "percent_change_24h": 0.1549,
            "percent_change_7d": -0.1937,
            "market_cap": 224217986.4816719,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1168,
        "name": "Decred",
        "symbol": "DCR",
        "slug": "decred",
        "circulating_supply": 9661756.78517597,
        "total_supply": 9661756.78517597,
        "max_supply": 21000000,
        "date_added": "2016-02-10T00:00:00.000Z",
        "num_market_pairs": 34,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 31,
        "last_updated": "2019-04-21T19:57:02.000Z",
        "quote": {
          "EUR": {
            "price": 22.311942709397535,
            "volume_24h": 1362226.7418952486,
            "percent_change_1h": 0.4286,
            "percent_change_24h": -0.9686,
            "percent_change_7d": -0.3632,
            "market_cap": 215572563.86297914,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1684,
        "name": "Qtum",
        "symbol": "QTUM",
        "slug": "qtum",
        "circulating_supply": 89414152,
        "total_supply": 101414152,
        "max_supply": null,
        "date_added": "2017-05-24T00:00:00.000Z",
        "num_market_pairs": 145,
        "tags": [],
        "platform": null,
        "cmc_rank": 32,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 2.3913830705711243,
            "volume_24h": 123718760.01282957,
            "percent_change_1h": 0.0566,
            "percent_change_24h": -6.801,
            "percent_change_7d": -8.3293,
            "market_cap": 213823489.36227325,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1214,
        "name": "Lisk",
        "symbol": "LSK",
        "slug": "lisk",
        "circulating_supply": 116327053.821928,
        "total_supply": 131442184,
        "max_supply": null,
        "date_added": "2016-04-06T00:00:00.000Z",
        "num_market_pairs": 58,
        "tags": [],
        "platform": null,
        "cmc_rank": 33,
        "last_updated": "2019-04-21T19:57:02.000Z",
        "quote": {
          "EUR": {
            "price": 1.7558354169080508,
            "volume_24h": 4051138.770440335,
            "percent_change_1h": 0.5323,
            "percent_change_24h": -3.6711,
            "percent_change_7d": -0.8896,
            "market_cap": 204251161.04511023,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1104,
        "name": "Augur",
        "symbol": "REP",
        "slug": "augur",
        "circulating_supply": 11000000,
        "total_supply": 11000000,
        "max_supply": null,
        "date_added": "2015-10-27T00:00:00.000Z",
        "num_market_pairs": 66,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0x1985365e9f78359a9b6ad760e32412f4a445e862"
        },
        "cmc_rank": 34,
        "last_updated": "2019-04-21T19:57:02.000Z",
        "quote": {
          "EUR": {
            "price": 18.147970564820543,
            "volume_24h": 10243986.906638108,
            "percent_change_1h": 0.5227,
            "percent_change_24h": -5.5451,
            "percent_change_7d": 3.6716,
            "market_cap": 199627676.213026,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1567,
        "name": "Nano",
        "symbol": "NANO",
        "slug": "nano",
        "circulating_supply": 133248289.1965,
        "total_supply": 133248289.1965,
        "max_supply": 133248290,
        "date_added": "2017-03-06T00:00:00.000Z",
        "num_market_pairs": 40,
        "tags": [],
        "platform": null,
        "cmc_rank": 35,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 1.4670439468168373,
            "volume_24h": 7508144.059565667,
            "percent_change_1h": -0.6095,
            "percent_change_24h": -3.1603,
            "percent_change_7d": 5.8044,
            "market_cap": 195481096.08942473,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2577,
        "name": "Ravencoin",
        "symbol": "RVN",
        "slug": "ravencoin",
        "circulating_supply": 3373750000,
        "total_supply": 3373750000,
        "max_supply": 21000000000,
        "date_added": "2018-03-10T00:00:00.000Z",
        "num_market_pairs": 29,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 36,
        "last_updated": "2019-04-21T19:57:06.000Z",
        "quote": {
          "EUR": {
            "price": 0.05574166669140179,
            "volume_24h": 17303309.911694523,
            "percent_change_1h": -0.4664,
            "percent_change_24h": -8.9021,
            "percent_change_7d": 1.2823,
            "market_cap": 188058448.00011683,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2563,
        "name": "TrueUSD",
        "symbol": "TUSD",
        "slug": "trueusd",
        "circulating_supply": 199732733.96,
        "total_supply": 199732733.96,
        "max_supply": null,
        "date_added": "2018-03-06T00:00:00.000Z",
        "num_market_pairs": 160,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0x0000000000085d4780B73119b644AE5ecd22b376"
        },
        "cmc_rank": 37,
        "last_updated": "2019-04-21T19:57:07.000Z",
        "quote": {
          "EUR": {
            "price": 0.8944725472832852,
            "volume_24h": 71773192.26539318,
            "percent_change_1h": -0.0302,
            "percent_change_24h": -0.3089,
            "percent_change_7d": -0.1678,
            "market_cap": 178655447.32105592,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2222,
        "name": "Bitcoin Diamond",
        "symbol": "BCD",
        "slug": "bitcoin-diamond",
        "circulating_supply": 186492897.953,
        "total_supply": 189492897.953,
        "max_supply": 210000000,
        "date_added": "2017-11-24T00:00:00.000Z",
        "num_market_pairs": 22,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 38,
        "last_updated": "2019-04-21T19:57:05.000Z",
        "quote": {
          "EUR": {
            "price": 0.9353784896589241,
            "volume_24h": 3838154.6699214317,
            "percent_change_1h": 0.0861,
            "percent_change_24h": -5.8701,
            "percent_change_7d": -2.2825,
            "market_cap": 174441445.21939301,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2682,
        "name": "Holo",
        "symbol": "HOT",
        "slug": "holo",
        "circulating_supply": 133214575156,
        "total_supply": 177619433541.141,
        "max_supply": null,
        "date_added": "2018-04-29T00:00:00.000Z",
        "num_market_pairs": 43,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0x6c6ee5e31d828de241282b9606c8e98ea48526e2"
        },
        "cmc_rank": 39,
        "last_updated": "2019-04-21T19:57:07.000Z",
        "quote": {
          "EUR": {
            "price": 0.0012211809581051598,
            "volume_24h": 10819104.172616273,
            "percent_change_1h": -0.0179,
            "percent_change_24h": -3.7561,
            "percent_change_7d": 12.5248,
            "market_cap": 162679102.52257589,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1896,
        "name": "0x",
        "symbol": "ZRX",
        "slug": "0x",
        "circulating_supply": 587710996.56836,
        "total_supply": 1000000000,
        "max_supply": null,
        "date_added": "2017-08-16T00:00:00.000Z",
        "num_market_pairs": 149,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0xe41d2489571d322189246dafa5ebde1f4699f498"
        },
        "cmc_rank": 40,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 0.27485719743234666,
            "volume_24h": 17091931.84758648,
            "percent_change_1h": 0.1035,
            "percent_change_24h": -4.0492,
            "percent_change_7d": -3.8522,
            "market_cap": 161536597.41695094,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2469,
        "name": "Zilliqa",
        "symbol": "ZIL",
        "slug": "zilliqa",
        "circulating_supply": 8754317427.71944,
        "total_supply": 12599999804.24,
        "max_supply": null,
        "date_added": "2018-01-25T00:00:00.000Z",
        "num_market_pairs": 97,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27"
        },
        "cmc_rank": 41,
        "last_updated": "2019-04-21T19:57:06.000Z",
        "quote": {
          "EUR": {
            "price": 0.018249859750115532,
            "volume_24h": 11239061.103319397,
            "percent_change_1h": 0.4812,
            "percent_change_24h": -5.5438,
            "percent_change_7d": -2.5868,
            "market_cap": 159765065.26387194,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1975,
        "name": "Chainlink",
        "symbol": "LINK",
        "slug": "chainlink",
        "circulating_supply": 350000000,
        "total_supply": 1000000000,
        "max_supply": null,
        "date_added": "2017-09-20T00:00:00.000Z",
        "num_market_pairs": 46,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0x514910771af9ca656af840dff83e8264ecf986ca"
        },
        "cmc_rank": 42,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 0.4355983450479538,
            "volume_24h": 4544032.875094837,
            "percent_change_1h": 0.3578,
            "percent_change_24h": -4.6535,
            "percent_change_7d": -7.0118,
            "market_cap": 152459420.76678383,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2099,
        "name": "ICON",
        "symbol": "ICX",
        "slug": "icon",
        "circulating_supply": 473406687.603972,
        "total_supply": 800460000,
        "max_supply": null,
        "date_added": "2017-10-27T00:00:00.000Z",
        "num_market_pairs": 50,
        "tags": [],
        "platform": null,
        "cmc_rank": 43,
        "last_updated": "2019-04-21T19:57:05.000Z",
        "quote": {
          "EUR": {
            "price": 0.31894636462192344,
            "volume_24h": 8101552.477343817,
            "percent_change_1h": 0.066,
            "percent_change_24h": -6.3333,
            "percent_change_7d": -5.3308,
            "market_cap": 150991341.99899346,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 372,
        "name": "Bytecoin",
        "symbol": "BCN",
        "slug": "bytecoin-bcn",
        "circulating_supply": 184066828814.059,
        "total_supply": 184066828814.059,
        "max_supply": 184470000000,
        "date_added": "2014-06-17T00:00:00.000Z",
        "num_market_pairs": 12,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 44,
        "last_updated": "2019-04-21T19:57:01.000Z",
        "quote": {
          "EUR": {
            "price": 0.0007906746902235951,
            "volume_24h": 207777.18599626716,
            "percent_change_1h": 0.7967,
            "percent_change_24h": -3.2952,
            "percent_change_7d": -3.3792,
            "market_cap": 145536982.8529956,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 463,
        "name": "BitShares",
        "symbol": "BTS",
        "slug": "bitshares",
        "circulating_supply": 2710460000,
        "total_supply": 2710460000,
        "max_supply": 3600570502,
        "date_added": "2014-07-21T00:00:00.000Z",
        "num_market_pairs": 86,
        "tags": [],
        "platform": null,
        "cmc_rank": 45,
        "last_updated": "2019-04-21T19:57:02.000Z",
        "quote": {
          "EUR": {
            "price": 0.05316917361562419,
            "volume_24h": 13564213.613962041,
            "percent_change_1h": 0.4648,
            "percent_change_24h": -3.7354,
            "percent_change_7d": -5.1539,
            "market_cap": 144112918.31820476,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2405,
        "name": "IOST",
        "symbol": "IOST",
        "slug": "iostoken",
        "circulating_supply": 12013965608.8475,
        "total_supply": 21000000000,
        "max_supply": null,
        "date_added": "2018-01-16T00:00:00.000Z",
        "num_market_pairs": 65,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab"
        },
        "cmc_rank": 46,
        "last_updated": "2019-04-21T19:57:06.000Z",
        "quote": {
          "EUR": {
            "price": 0.011969025306417474,
            "volume_24h": 30907334.303935304,
            "percent_change_1h": -0.4199,
            "percent_change_24h": -2.38,
            "percent_change_7d": -1.7831,
            "market_cap": 143795458.40272495,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 3718,
        "name": "BitTorrent",
        "symbol": "BTT",
        "slug": "bittorrent",
        "circulating_supply": 212116500000,
        "total_supply": 990000000000,
        "max_supply": null,
        "date_added": "2019-01-31T00:00:00.000Z",
        "num_market_pairs": 89,
        "tags": [],
        "platform": {
          "id": 1958,
          "name": "TRON",
          "symbol": "TRX",
          "slug": "tron",
          "token_address": "1002000"
        },
        "cmc_rank": 47,
        "last_updated": "2019-04-21T19:57:10.000Z",
        "quote": {
          "EUR": {
            "price": 0.0006303533529685402,
            "volume_24h": 124899059.23326987,
            "percent_change_1h": 0.3095,
            "percent_change_24h": -3.59,
            "percent_change_7d": -7.6869,
            "market_cap": 133708346.99495135,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 109,
        "name": "DigiByte",
        "symbol": "DGB",
        "slug": "digibyte",
        "circulating_supply": 11700527345.9491,
        "total_supply": 11700527345.9491,
        "max_supply": 21000000000,
        "date_added": "2014-02-06T00:00:00.000Z",
        "num_market_pairs": 57,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 48,
        "last_updated": "2019-04-21T19:57:01.000Z",
        "quote": {
          "EUR": {
            "price": 0.01140178438314807,
            "volume_24h": 1208201.995266326,
            "percent_change_1h": 0.3552,
            "percent_change_24h": -3.4514,
            "percent_change_7d": -1.3586,
            "market_cap": 133406889.96763939,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 2130,
        "name": "Enjin Coin",
        "symbol": "ENJ",
        "slug": "enjin-coin",
        "circulating_supply": 767107985.064264,
        "total_supply": 1000000000,
        "max_supply": null,
        "date_added": "2017-11-01T00:00:00.000Z",
        "num_market_pairs": 45,
        "tags": [],
        "platform": {
          "id": 1027,
          "name": "Ethereum",
          "symbol": "ETH",
          "slug": "ethereum",
          "token_address": "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c"
        },
        "cmc_rank": 49,
        "last_updated": "2019-04-21T19:57:04.000Z",
        "quote": {
          "EUR": {
            "price": 0.1688515135784436,
            "volume_24h": 29900619.71688767,
            "percent_change_1h": -0.4616,
            "percent_change_24h": -8.9406,
            "percent_change_7d": 15.5931,
            "market_cap": 129527344.3562111,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      },
      {
        "id": 1700,
        "name": "Aeternity",
        "symbol": "AE",
        "slug": "aeternity",
        "circulating_supply": 260270211.5,
        "total_supply": 306091155.49932,
        "max_supply": null,
        "date_added": "2017-06-01T00:00:00.000Z",
        "num_market_pairs": 57,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 50,
        "last_updated": "2019-04-21T19:57:03.000Z",
        "quote": {
          "EUR": {
            "price": 0.47844010758555655,
            "volume_24h": 41504638.009880506,
            "percent_change_1h": 0.1364,
            "percent_change_24h": -7.461,
            "percent_change_7d": -4.5861,
            "market_cap": 124523707.99137554,
            "last_updated": "2019-04-21T19:57:00.000Z"
          }
        }
      }
    ]
  }
}
