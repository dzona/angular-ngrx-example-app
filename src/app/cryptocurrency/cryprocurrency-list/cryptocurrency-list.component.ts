import { Cryptocurrency } from '../../models/cryptocurrency';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap, takeWhile, filter, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CryptocurrencyListLoad, CryptocurrencyListClear } from '../cryptocurrency-store/cryptocurrency.actions';
import { CryptocurrencyState } from '../cryptocurrency-store/cryptocurrency.reducers';

@Component({
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.css'],
})
export class CryptocurrencyListComponent implements AfterViewInit {

  private componentActive: boolean = true;

  public pageTitle: string = 'Top cryprocurrencies list';
  public displayedColumns: string[] = ['cmc_rank', 'name', 'symbol', 'price', 'percent_change_24h', 'date_added', 'actions'];
  public isLoadingResults$: Observable<boolean>;
  public cryptocurrencies: Cryptocurrency[] = [];
  public resultsLength: number = 0;
  public pageSize: number = 10;
  public currency: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.pipe(
      select(state => state.cryptocurrency.selectedCurrency),
      takeWhile(() => this.componentActive)
    ).subscribe(cryptocurrency => this.currency = cryptocurrency);

    this.isLoadingResults$ = this.store.pipe(
      select(state => state.cryptocurrency.isListLoading),
      takeWhile(() => this.componentActive)
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeWhile(() => this.componentActive),
        startWith({}),
        delay(0),
        switchMap(() => {
          this.store.dispatch(new CryptocurrencyListLoad(this.currency));

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
          let results: any[] = this.currency in state.cryptocurrencies ?
            this.getCurrentPageSlice(state.cryptocurrencies[this.currency].sort(this.sortBy())) : [];

          return results.map(data => new Cryptocurrency(data));
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

  doRefresh(): void {
    this.store.dispatch(new CryptocurrencyListClear());
    this.store.dispatch(new CryptocurrencyListLoad(this.currency));
  }

  private getCurrentPageSlice(array: []): Array<any> {
    return array.slice(this.paginator.pageIndex * this.pageSize, (this.paginator.pageIndex + 1) * this.pageSize);
  }

  private sortBy() {
    const gt = this.sort.direction === 'desc' ? -1 : 1;
    const lt = this.sort.direction === 'desc' ? 1 : -1;

    return (a, b) => {
      if (a[this.sort.active] < b[this.sort.active]) {
        return lt;
      }
      if (a[this.sort.active] > b[this.sort.active]) {
        return gt;
      }
      return 0;
    };
  }


}
