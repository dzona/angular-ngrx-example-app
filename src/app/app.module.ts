import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';

import { AppComponent } from './app.component';
import { CryptocurrencyListComponent } from './cryprocurrencies/cryptocurrency-list.component';
import { CryptocurrencyService } from 'src/providers/cryptocurrency/cryptocurrency-service';
import { Api } from 'src/providers/api/api';
import { TokenInterceptor } from 'src/providers/api/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CryptocurrencyListComponent,
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
    MatSortModule
  ],
  providers: [
    Api,
    CryptocurrencyService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
