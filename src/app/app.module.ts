import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatPaginatorModule, MatSortModule, MatLabel, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CryptocurrencyListComponent } from './components/cryprocurrency-list/cryptocurrency-list.component';
import { TokenInterceptor } from 'src/app/providers/api/token.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CryptocurrencyDetailsComponent } from './components/cryptocurrency-details/cryptocurrency-details.component';
import { CryptocurrencySettingsComponent } from './components/cryptocurrency-settings/cryptocurrency-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: CryptocurrencySettingsComponent },
  { path: 'cryptocurrencies', component: CryptocurrencyListComponent },
  { path: 'cryptocurrencies/:id', component: CryptocurrencyDetailsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CryptocurrencyListComponent,
    PageNotFoundComponent,
    CryptocurrencyDetailsComponent,
    CryptocurrencySettingsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
