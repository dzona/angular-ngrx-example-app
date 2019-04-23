import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyDetailsComponent } from './cryptocurrency-details.component';

describe('CryptocurrencyDetailsComponent', () => {
  let component: CryptocurrencyDetailsComponent;
  let fixture: ComponentFixture<CryptocurrencyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocurrencyDetailsComponent ]
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
