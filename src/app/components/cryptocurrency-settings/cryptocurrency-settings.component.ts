import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from 'src/app/providers/cryptocurrency/cryptocurrency-service';

export interface ISelectItem {
  value: string;
  text: string;
}

@Component({
  templateUrl: './cryptocurrency-settings.component.html',
  styleUrls: ['./cryptocurrency-settings.component.css']
})
export class CryptocurrencySettingsComponent implements OnInit {

  public pageTitle: string = 'Cryptocurrency Settings Page';
  public selectedCurrency: string;
  public isSaveDisabled: boolean = true;
  public shouldShowSaveSuccess: boolean = false;

  public availableCurrencies: ISelectItem[] = [
    { value: 'USD', text: 'United States Dollar' },
    { value: 'EUR', text: 'Euro (EUR)' },
    { value: 'CNY', text: 'Chinese Yuan (CNY)' }
  ];

  constructor(private cryptoService: CryptocurrencyService) { }

  ngOnInit() {
    this.selectedCurrency = this.cryptoService.getSelectedCurrency();
  }

  onChange(): void {
    this.isSaveDisabled = this.selectedCurrency == this.cryptoService.getSelectedCurrency();
  }

  doSave(): void {
    this.cryptoService.setSelectedCurrency(this.selectedCurrency);
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
