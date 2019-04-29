import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencySettingsComponent } from './cryptocurrency-settings.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('CryptocurrencySettingsComponent', () => {
  let component: CryptocurrencySettingsComponent;
  let fixture: ComponentFixture<CryptocurrencySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocurrencySettingsComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [provideMockStore({})]
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
