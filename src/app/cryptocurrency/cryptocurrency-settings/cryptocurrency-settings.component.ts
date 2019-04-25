import { Component, OnInit } from '@angular/core';
// import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';
import { Store, select } from '@ngrx/store';
import { SelectedCurrencyChanged } from '../cryptocurrency-store/cryptocurrency.actions';

export interface ISelectItem {
  value: string;
  text: string;
}

@Component({
  templateUrl: './cryptocurrency-settings.component.html',
  styleUrls: ['./cryptocurrency-settings.component.css']
})
export class CryptocurrencySettingsComponent implements OnInit {

  private savedCurrency: string;

  public pageTitle: string = 'Cryptocurrency Settings Page';
  public selectedCurrency: string;
  public isSaveDisabled: boolean = true;
  public shouldShowSaveSuccess: boolean = false;

  public availableCurrencies: ISelectItem[] = [
    { value: 'USD', text: 'United States Dollar' },
    { value: 'EUR', text: 'Euro (EUR)' },
    { value: 'CNY', text: 'Chinese Yuan (CNY)' }
  ];

  constructor(
    private store: Store<any>,
    // private cryptoService: CryptocurrencyService
  ) { }

  ngOnInit() {
    // this.selectedCurrency = this.cryptoService.getSelectedCurrency();
    this.store.pipe(select('cryptocurrency')).subscribe(
      cryptocurrency => {
        this.savedCurrency = cryptocurrency.selectedCurrency;
        this.selectedCurrency = this.savedCurrency;
      }
    );
  }

  onChange(): void {
    this.isSaveDisabled = this.selectedCurrency == this.savedCurrency;
  }

  doSave(): void {
    this.store.dispatch(new SelectedCurrencyChanged(this.selectedCurrency));
    // this.store.dispatch({
    //   type: ActionTypes.SelectedCurrencyChanged,
    //   payload: this.selectedCurrency
    // });
    // this.cryptoService.setSelectedCurrency(this.selectedCurrency);
    this.isSaveDisabled = true;
    this.showSaveSuccess();
  }

  protected showSaveSuccess() {
    this.shouldShowSaveSuccess = true;

    setTimeout(() => {
      this.shouldShowSaveSuccess = false;
    }, 2000);
  }
}
