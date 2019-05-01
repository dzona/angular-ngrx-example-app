import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CryptocurrencyListComponent } from './cryptocurrency-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CryptocurrencyState, initialState as baseState } from '../cryptocurrency-store/cryptocurrency.reducers';

describe('CryptocurrencyListComponent', () => {
  let component: CryptocurrencyListComponent;
  let fixture: ComponentFixture<CryptocurrencyListComponent>;
  let store: MockStore<CryptocurrencyState>;
  const initialState = baseState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      declarations: [ CryptocurrencyListComponent ],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
