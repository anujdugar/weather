import { async, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { CityTemperatureComponent } from "./component/city-temperature/city-temperature.component";
import { ForecastComponent } from "./component/forecast/forecast.component";
import { routes } from './app-routing.module';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

describe('Router: App', () => {

  let location: Location;
  let router: Router;
  let fixture;
  let debugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [
        CityTemperatureComponent,
        ForecastComponent,
        AppComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    router.initialNavigation();
  });

  
  it('navigate to "" redirects you to /weather async', async(() => {
    // fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/weather');
    })
  }));
  it('Checking router link', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    let links = debugElement.queryAll(By.directive(RouterLinkWithHref));
    console.log('LIONKS : ',links);

    
  }));
});