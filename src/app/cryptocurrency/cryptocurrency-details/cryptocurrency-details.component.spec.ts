import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CryptocurrencyDetailsComponent } from './cryptocurrency-details.component';
import { ActivatedRoute, convertToParamMap, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CryptocurrencyListComponent } from '../cryprocurrency-list/cryptocurrency-list.component';

class MockActivatedRoute {
  parent = {
    snapshot: { data: { id: 1213 } },
    routeConfig: { children: { filter: () => { } } }
  };
}

describe('CryptocurrencyDetailsComponent', () => {
  let component: CryptocurrencyDetailsComponent;
  let fixture: ComponentFixture<CryptocurrencyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CryptocurrencyDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 1 })
            }
          }
        },
        provideMockStore({})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});

