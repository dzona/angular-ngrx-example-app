import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CryptocurrencyDetailsComponent } from './cryptocurrency-details.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CryptocurrencyState, initialState } from '../cryptocurrency-store/cryptocurrency.reducers';
import { Store } from '@ngrx/store';
import { CryptocurrencyListLoad, CryptocurrencyListClear } from '../cryptocurrency-store/cryptocurrency.actions';

describe('CryptocurrencyDetailsComponent', () => {
  let component: CryptocurrencyDetailsComponent;
  let fixture: ComponentFixture<CryptocurrencyDetailsComponent>;
  let store: MockStore<CryptocurrencyState>;

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
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CryptocurrencyDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an back button', () => {
    const refreshBtnElement = fixture.nativeElement.querySelector('.btn-primary');
    expect(refreshBtnElement).toBeDefined();
    expect(refreshBtnElement.textContent).toContain('Back');
    expect(refreshBtnElement.disabled).toBeFalsy();
  });

  it('should have an refresh button', () => {
    const refreshBtnElement = fixture.nativeElement.querySelector('.btn-secondary');
    expect(refreshBtnElement).toBeDefined();
    expect(refreshBtnElement.textContent).toContain('Refresh');
    expect(refreshBtnElement.disabled).toBeFalsy();
  });

  it('should have loading overlay initialy', () => {
    const loadingOverlayElement: HTMLElement = fixture.nativeElement.querySelector('.loading-overlay');
    expect(loadingOverlayElement).toBeDefined();
  });

  it('refresh should dispatch [ListClear] && [ListLoad] actions', () => {
    const refreshBtnElement = fixture.nativeElement.querySelector('.btn-secondary');
    let dispatchSpy = spyOn(store, 'dispatch');

    refreshBtnElement.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new CryptocurrencyListClear()
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      new CryptocurrencyListLoad(component.currency)
    );
  });

});

