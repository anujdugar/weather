import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CityTemperatureComponent } from './city-temperature.component';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { routes } from '../../app-routing.module';
import { Location } from '@angular/common';

describe('CityTemperatureComponent', () => {
  let component: CityTemperatureComponent;
  let fixture: ComponentFixture<CityTemperatureComponent>;
  let debugElement;
  let router: Router;
  let location: Location;
  const obj = { "cnt": 5, "list": [{ "coord": { "lon": -0.1257, "lat": 51.5085 }, "sys": { "country": "GB", "timezone": 3600, "sunrise": 1619757233, "sunset": 1619810479 }, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }], "main": { "temp": 276.85, "feels_like": 275.56, "temp_min": 275.93, "temp_max": 278.15, "pressure": 1015, "humidity": 75 }, "visibility": 10000, "wind": { "speed": 1.54, "deg": 0 }, "clouds": { "all": 20 }, "dt": 1619763025, "id": 2643743, "name": "London" }, { "coord": { "lon": 10.45, "lat": 54.0333 }, "sys": { "country": "DE", "timezone": 7200, "sunrise": 1619754204, "sunset": 1619808432 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "main": { "temp": 280.12, "feels_like": 280.12, "temp_min": 279.82, "temp_max": 280.37, "pressure": 1010, "humidity": 93 }, "visibility": 10000, "wind": { "speed": 1.03, "deg": 0 }, "clouds": { "all": 75 }, "dt": 1619763455, "id": 2950158, "name": "Berlin" }, { "coord": { "lon": 2.3486, "lat": 48.8534 }, "sys": { "country": "FR", "timezone": 7200, "sunrise": 1619757098, "sunset": 1619809427 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "main": { "temp": 281.01, "feels_like": 278.46, "temp_min": 280.15, "temp_max": 281.48, "pressure": 1013, "humidity": 70 }, "visibility": 10000, "wind": { "speed": 4.12, "deg": 80 }, "clouds": { "all": 0 }, "dt": 1619763462, "id": 2968815, "name": "Paris" }, { "coord": { "lon": 12.3267, "lat": 45.4386 }, "sys": { "country": "IT", "timezone": 7200, "sunrise": 1619755220, "sunset": 1619806516 }, "weather": [{ "id": 701, "main": "Mist", "description": "mist", "icon": "50d" }], "main": { "temp": 287.64, "feels_like": 287.6, "temp_min": 287.04, "temp_max": 288.15, "pressure": 1011, "humidity": 94 }, "visibility": 4000, "wind": { "speed": 1.03, "deg": 0 }, "clouds": { "all": 20 }, "dt": 1619763041, "id": 3164603, "name": "Venice" }, { "coord": { "lon": -74.2642, "lat": 4.7324 }, "sys": { "country": "CO", "timezone": -18000, "sunrise": 1619779538, "sunset": 1619823758 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }, { "id": 300, "main": "Drizzle", "description": "light intensity drizzle", "icon": "09n" }], "main": { "temp": 285.15, "feels_like": 284.68, "temp_min": 285.15, "temp_max": 285.15, "pressure": 1028, "humidity": 87 }, "visibility": 10000, "wind": { "speed": 1.54, "deg": 30 }, "clouds": { "all": 90 }, "dt": 1619762978, "id": 3675707, "name": "Madrid" }] }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      declarations: [CityTemperatureComponent],
      providers: [WeatherService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityTemperatureComponent);
    debugElement = fixture.debugElement;
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("when API returns detailed response", fakeAsync(() => {
    let apiService = fixture.debugElement.injector.get(WeatherService);
    let s = spyOn(apiService, "fetchCityTemperature").and.callFake(() => {
      return of(obj).pipe(delay(3000));
    });
    component.fetchCityTemperature();
    expect(component.dataLoaded).toEqual(false);
    tick(3000);
    expect(component.dataLoaded).toEqual(true);
    expect(component.cityList.length).toEqual(5);
    fixture.detectChanges();
    let element = debugElement.queryAll(By.css('.weather-header'));
    let button = debugElement.queryAll(By.css('button'));
    let forecasetButton = button[0].nativeElement;
    forecasetButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toContain('/forecast');
    console.log('forecaseBUtoon : ', forecasetButton)
    let el = element[0].queryAll(By.css('p'))[0].nativeElement;
    expect(el.innerHTML).toContain('London');
    fixture.detectChanges();
    tick();
    let links = debugElement.queryAll(By.directive(RouterLinkWithHref));
    console.log('LIONKS adasdas: ',links);
  }))
  it("when API returns empty response", fakeAsync(() => {
    let apiService = fixture.debugElement.injector.get(WeatherService);
    let s = spyOn(apiService, "fetchCityTemperature").and.callFake(() => {
      return of([]).pipe(delay(3000));
    });
    component.fetchCityTemperature();
    expect(component.dataLoaded).toEqual(false);
    tick(3000);
    expect(component.dataLoaded).toEqual(true);
    expect(component.cityList).toEqual([]);
  }))
});
