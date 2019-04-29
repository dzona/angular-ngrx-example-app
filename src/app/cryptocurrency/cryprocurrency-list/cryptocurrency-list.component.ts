import { Cryptocurrency } from '../../models/cryptocurrency';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap, takeWhile, filter, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CryptocurrencyListLoad } from '../cryptocurrency-store/cryptocurrency.actions';
import { CryptocurrencyState, getCryptocurrencyPage } from '../cryptocurrency-store/cryptocurrency.reducers';
import { CryptocurrencyEffects } from '../cryptocurrency-store/cryptocurrency.effects';

@Component({
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.css'],
})
export class CryptocurrencyListComponent implements AfterViewInit {

  public pageTitle: string = 'Top cryprocurrencies list';
  public displayedColumns: string[] = ['cmc_rank', 'name', 'symbol', 'price', 'percent_change_24h', 'date_added', 'actions'];
  public isLoadingResults$: Observable<boolean>;
  public cryptocurrencies: Cryptocurrency[] = [];
  public resultsLength: number = 0;
  public pageSize: number = 10;
  public currency: string;

  private componentActive: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.isLoadingResults$ = this.store.pipe(
      select(state => state.cryptocurrency.isListLoading),
      takeWhile(() => this.componentActive)
    );
    this.store.pipe(
      select(state => state.cryptocurrency.selectedCurrency),
      takeWhile(() => this.componentActive)
    ).subscribe(cryptocurrency => this.currency = cryptocurrency);
  }


  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeWhile(() => this.componentActive),
        startWith({}),
        delay(0),
        switchMap(() => {
          this.store.dispatch(new CryptocurrencyListLoad(this.getQueryParams()));

          return this.isLoadingResults$.pipe(
            filter((state) => !state),
            switchMap(() => this.store.pipe(
              select(state => state.cryptocurrency),
              takeWhile(() => this.componentActive)
            ))
          );
        }),
        map((state: CryptocurrencyState) => {
          this.resultsLength = state.cryptocurrencyTotal;

          return this.cacheKey in state.cryptocurrencies ? state.cryptocurrencies[this.cacheKey].map(data => new Cryptocurrency(data)) : [];
        }),
        catchError((err) => {
          this.resultsLength = 0;

          return observableOf([]);
        })
      )
      .subscribe((cryptocurrencies: Cryptocurrency[]) => this.cryptocurrencies = cryptocurrencies);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private get cacheKey(): string {
    return JSON.stringify(this.getQueryParams());
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
