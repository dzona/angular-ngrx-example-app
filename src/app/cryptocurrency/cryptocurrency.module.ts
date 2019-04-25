import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptocurrencyListComponent } from './cryprocurrency-list/cryptocurrency-list.component';
import { CryptocurrencyDetailsComponent } from './cryptocurrency-details/cryptocurrency-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { CryptocurrencySettingsComponent } from './cryptocurrency-settings/cryptocurrency-settings.component';
import { cryptocurrencyReducer } from './cryptocurrency-store/cryptocurrency.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CryptocurrencyEffects } from './cryptocurrency-store/cryptocurrency.effects';

const routes: Routes = [
  { path: 'settings', component: CryptocurrencySettingsComponent },
  { path: 'cryptocurrencies', component: CryptocurrencyListComponent },
  { path: 'cryptocurrencies/:id', component: CryptocurrencyDetailsComponent },
];

@NgModule({
  declarations: [
    CryptocurrencyListComponent,
    CryptocurrencyDetailsComponent,
    CryptocurrencySettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('cryptocurrency', cryptocurrencyReducer),
    EffectsModule.forFeature([CryptocurrencyEffects])
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CryptocurrencyModule { }
