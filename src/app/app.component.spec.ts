import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';
import { Component, DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let linkDes;
  let routerLinks;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub
      ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'crypro-stock'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('crypro-stock');
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/dashboard');
    expect(routerLinks[1].linkParams).toBe('/cryptocurrencies');
    expect(routerLinks[2].linkParams).toBe('/settings');
  });
  
  it('can click Settings link in template', () => {
    const settingsLinkDe = linkDes[2]; 
    const settingsLink = routerLinks[2]; 

    expect(settingsLink.navigatedTo).toBeNull('should not have navigated yet');
  
    settingsLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    // expect(settingsLink.navigatedTo).toBe('/settings');
  });

});
