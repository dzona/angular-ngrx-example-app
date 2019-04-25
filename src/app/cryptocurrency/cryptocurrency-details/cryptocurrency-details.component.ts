import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cryptocurrency } from 'src/app/models/cryptocurrency';
import { ApiResponse } from 'src/app/models/api-response';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  templateUrl: './cryptocurrency-details.component.html',
  styleUrls: ['./cryptocurrency-details.component.css']
})
export class CryptocurrencyDetailsComponent implements OnInit {

  private id: number;
  public currency: string;
  public cryptocurrency: Cryptocurrency;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cryptoService: CryptocurrencyService
  ) {

  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.currency = this.cryptoService.getSelectedCurrency();

    this.cryptoService.get(this.id, this.currency).pipe(
      map(response => {
        let apiResponse = new ApiResponse(response);

        return apiResponse.isSuccess ? new Cryptocurrency(apiResponse.data[this.id]) : null;
      }),
      catchError((err) => {
        return observableOf(new Cryptocurrency(this.dummyResponse.data['1']));
      })
    ).subscribe((cryptocurrency: Cryptocurrency) => {
      return this.cryptocurrency = cryptocurrency
    });

  }

  goBack() {
    this.router.navigate(['/cryptocurrencies'])
  }

  private dummyResponse: ApiResponse = new ApiResponse({
    "status": {
      "timestamp": "2019-04-23T10:48:51.858Z",
      "error_code": 0,
      "error_message": null,
      "elapsed": 11,
      "credit_count": 1
    },
    "data": {
      "1": {
        "id": 1,
        "name": "Bitcoin",
        "symbol": "BTC",
        "slug": "bitcoin",
        "circulating_supply": 17660900,
        "total_supply": 17660900,
        "max_supply": 21000000,
        "date_added": "2013-04-28T00:00:00.000Z",
        "num_market_pairs": 7324,
        "tags": [
          "mineable"
        ],
        "platform": null,
        "cmc_rank": 1,
        "last_updated": "2019-04-23T10:48:27.000Z",
        "quote": {
          "USD": {
            "price": 5569.63921334,
            "volume_24h": 16391714557.0725,
            "percent_change_1h": 0.279646,
            "percent_change_24h": 4.66127,
            "percent_change_7d": 9.36648,
            "market_cap": 98364841182.87642,
            "last_updated": "2019-04-23T10:48:27.000Z"
          },
          "EUR": {
            "price": 4954.278917659111,
            "volume_24h": 14512551351.587482,
            "percent_change_1h": 0.0374,
            "percent_change_24h": 4.5863,
            "percent_change_7d": 9.3497,
            "market_cap": 87497272250.83168,
            "last_updated": "2019-04-23T11:47:00.000Z"
          },
          "CNY": {
            "price": 37447.89649807634,
            "volume_24h": 109695988047.8534,
            "percent_change_1h": 0.0374,
            "percent_change_24h": 4.5863,
            "percent_change_7d": 9.3497,
            "market_cap": 661365427657.7013,
            "last_updated": "2019-04-23T11:48:00.000Z"
          }
        }
      }
    }
  });

}
