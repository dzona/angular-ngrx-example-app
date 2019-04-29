import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cryptocurrency } from 'src/app/models/cryptocurrency';
import { Observable } from 'rxjs';
import { map, takeWhile, filter, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { CryptocurrencyListLoad, CryptocurrencyListClear } from '../cryptocurrency-store/cryptocurrency.actions';

@Component({
  templateUrl: './cryptocurrency-details.component.html',
  styleUrls: ['./cryptocurrency-details.component.css']
})
export class CryptocurrencyDetailsComponent implements OnInit {

  private id: number;
  private componentActive: boolean = true;

  public currency: string;
  public cryptocurrency: Cryptocurrency;
  public isLoadingResults$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>,
  ) {

  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.store.pipe(
      select(state => state.cryptocurrency.selectedCurrency),
      takeWhile(() => this.componentActive)
    ).subscribe(cryptocurrency => this.currency = cryptocurrency);

    this.isLoadingResults$ = this.store.pipe(
      select(state => state.cryptocurrency.isListLoading),
      takeWhile(() => this.componentActive)
    );

    this.store.dispatch(new CryptocurrencyListLoad(this.currency));

    this.isLoadingResults$.pipe(
      filter((isLoading:boolean) => !isLoading),
      switchMap(() => this.store.pipe(
        select(state => state.cryptocurrency.cryptocurrencies),
        takeWhile(() => this.componentActive)
      )),
      map((cryptocurrencies: Cryptocurrency[]) => this.findCurrent(this.currency in cryptocurrencies ? cryptocurrencies[this.currency] : []))
    ).subscribe((cryptocurrency: Cryptocurrency) => this.cryptocurrency = cryptocurrency);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  goBack():void {
    this.router.navigate(['/cryptocurrencies'])
  }

  doRefresh(): void {
    this.store.dispatch(new CryptocurrencyListClear());
    this.store.dispatch(new CryptocurrencyListLoad(this.currency));
  }

  get logoUrl():string {
    return `https://s2.coinmarketcap.com/static/img/coins/128x128/${this.id}.png`;
  }

  private findCurrent(cryptocurrencies: Cryptocurrency[]): Cryptocurrency {
    return cryptocurrencies.find((el: Cryptocurrency) => el.id == this.id);
  }

}
