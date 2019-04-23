import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencySettingsComponent } from './cryptocurrency-settings.component';

describe('CryptocurrencySettingsComponent', () => {
  let component: CryptocurrencySettingsComponent;
  let fixture: ComponentFixture<CryptocurrencySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocurrencySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
