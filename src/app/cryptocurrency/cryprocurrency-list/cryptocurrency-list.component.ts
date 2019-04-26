import { Cryptocurrency } from '../../models/cryptocurrency';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, takeWhile, filter } from 'rxjs/operators';
import { Store, select, Action } from '@ngrx/store';
import { CryptocurrencyListLoad, CryptocurrencyActionTypes } from '../cryptocurrency-store/cryptocurrency.actions';
import { CryptocurrencyState } from '../cryptocurrency-store/cryptocurrency.reducers';
import { CryptocurrencyEffects } from '../cryptocurrency-store/cryptocurrency.effects';

@Component({
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.css'],
})
export class CryptocurrencyListComponent implements AfterViewInit {

  public pageTitle: string = 'Top cryprocurrencies list';
  public displayedColumns: string[] = ['cmc_rank', 'name', 'symbol', 'price', 'percent_change_24h', 'date_added', 'actions'];
  public cryptocurrencies: Cryptocurrency[] = [];
  public isLoadingResults: boolean = true;
  public resultsLength: number = 0;
  public pageSize: number = 10;
  public currency: string;

  private componentActive: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<any>,
    private cryptoEffects: CryptocurrencyEffects
  ) { }

  ngOnInit() {
    this.store.pipe(select('cryptocurrency')).subscribe(
      cryptocurrency => {
        this.currency = cryptocurrency.selectedCurrency;
      }
    );
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeWhile(() => this.componentActive),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.store.dispatch(new CryptocurrencyListLoad(this.getQueryParams()))

          this.cryptoEffects.loadCryptocurrencies.pipe(
            takeWhile(() => this.componentActive),
            filter((action: Action) => action.type === CryptocurrencyActionTypes.CryptocurrencyListLoaded)).subscribe((x) => {
              this.selectCurrentPage().subscribe((cryptocurrencies: Cryptocurrency[]) => {
                return this.cryptocurrencies = cryptocurrencies
              });
            });

          return this.selectCurrentPage(); 
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.resultsLength = 0;

          return observableOf([]);
        })
      )
      .subscribe((cryptocurrencies: Cryptocurrency[]) => {
        return this.cryptocurrencies = cryptocurrencies
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private get cacheKey(): string {
    return JSON.stringify(this.getQueryParams());
  }

  private selectCurrentPage() {
    return this.store.pipe(
      select('cryptocurrency'),
      takeWhile(() => this.componentActive),
      map((state: CryptocurrencyState) => {
        let hasData: boolean = this.cacheKey in state.cryptocurrencies;
        if (hasData) {
          this.isLoadingResults = false;
          this.resultsLength = state.cryptocurrencyTotal;
        }
        return this.cacheKey in state.cryptocurrencies ? state.cryptocurrencies[this.cacheKey].map(data => new Cryptocurrency(data)) : [];
      })
    );
  }

  private getQueryParams() {
    return {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.pageSize,
      currency: this.currency,
      sortDir: this.sort.direction,
      sortAttr: this.sort.active
    };
  }

}
