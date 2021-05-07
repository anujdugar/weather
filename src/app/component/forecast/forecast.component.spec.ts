import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ForecastComponent } from './forecast.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let debugElement;
  const response = {"cod":"200","message":0,"cnt":40,"list":[{"dt":1620043200,"main":{"temp":286.37,"feels_like":284.97,"temp_min":285.12,"temp_max":286.37,"pressure":1016,"sea_level":1016,"grnd_level":1011,"humidity":47,"temp_kf":1.25},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":40},"wind":{"speed":7.27,"deg":211,"gust":11.3},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-05-03 12:00:00"},{"dt":1620054000,"main":{"temp":285.62,"feels_like":284.25,"temp_min":284.13,"temp_max":285.62,"pressure":1014,"sea_level":1014,"grnd_level":1007,"humidity":51,"temp_kf":1.49},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":60},"wind":{"speed":8.09,"deg":212,"gust":15.78},"visibility":10000,"pop":0.19,"sys":{"pod":"d"},"dt_txt":"2021-05-03 15:00:00"},{"dt":1620064800,"main":{"temp":283.23,"feels_like":282.15,"temp_min":281.66,"temp_max":283.23,"pressure":1008,"sea_level":1008,"grnd_level":1001,"humidity":71,"temp_kf":1.57},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":80},"wind":{"speed":9.74,"deg":211,"gust":20.97},"visibility":10000,"pop":0.71,"rain":{"3h":1.26},"sys":{"pod":"d"},"dt_txt":"2021-05-03 18:00:00"},{"dt":1620075600,"main":{"temp":281.83,"feels_like":277.3,"temp_min":281.83,"temp_max":281.83,"pressure":998,"sea_level":998,"grnd_level":995,"humidity":91,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":11.5,"deg":210,"gust":23.17},"visibility":10000,"pop":1,"rain":{"3h":3.54},"sys":{"pod":"n"},"dt_txt":"2021-05-03 21:00:00"},{"dt":1620086400,"main":{"temp":281.69,"feels_like":277.67,"temp_min":281.69,"temp_max":281.69,"pressure":995,"sea_level":995,"grnd_level":992,"humidity":82,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":8.99,"deg":232,"gust":19.9},"visibility":10000,"pop":1,"rain":{"3h":3.81},"sys":{"pod":"n"},"dt_txt":"2021-05-04 00:00:00"},{"dt":1620097200,"main":{"temp":281.89,"feels_like":277.97,"temp_min":281.89,"temp_max":281.89,"pressure":994,"sea_level":994,"grnd_level":990,"humidity":80,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":8.83,"deg":247,"gust":18.27},"visibility":10000,"pop":0.22,"rain":{"3h":0.13},"sys":{"pod":"n"},"dt_txt":"2021-05-04 03:00:00"},{"dt":1620108000,"main":{"temp":280.39,"feels_like":276.15,"temp_min":280.39,"temp_max":280.39,"pressure":996,"sea_level":996,"grnd_level":993,"humidity":70,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":84},"wind":{"speed":8.28,"deg":259,"gust":16.9},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-05-04 06:00:00"},{"dt":1620118800,"main":{"temp":281.38,"feels_like":277.49,"temp_min":281.38,"temp_max":281.38,"pressure":998,"sea_level":998,"grnd_level":995,"humidity":65,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":8.12,"deg":269,"gust":16.21},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-05-04 09:00:00"},{"dt":1620129600,"main":{"temp":284.14,"feels_like":282.73,"temp_min":284.14,"temp_max":284.14,"pressure":1000,"sea_level":1000,"grnd_level":997,"humidity":55,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":87},"wind":{"speed":8.36,"deg":273,"gust":14.02},"visibility":10000,"pop":0.21,"rain":{"3h":0.25},"sys":{"pod":"d"},"dt_txt":"2021-05-04 12:00:00"},{"dt":1620140400,"main":{"temp":284.12,"feels_like":282.92,"temp_min":284.12,"temp_max":284.12,"pressure":1002,"sea_level":1002,"grnd_level":999,"humidity":63,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":78},"wind":{"speed":7.4,"deg":288,"gust":12.49},"visibility":10000,"pop":0.77,"rain":{"3h":0.71},"sys":{"pod":"d"},"dt_txt":"2021-05-04 15:00:00"},{"dt":1620151200,"main":{"temp":281.84,"feels_like":279.03,"temp_min":281.84,"temp_max":281.84,"pressure":1003,"sea_level":1003,"grnd_level":1000,"humidity":70,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":60},"wind":{"speed":5.17,"deg":295,"gust":11.3},"visibility":10000,"pop":0.67,"rain":{"3h":0.52},"sys":{"pod":"d"},"dt_txt":"2021-05-04 18:00:00"},{"dt":1620162000,"main":{"temp":279.25,"feels_like":277.17,"temp_min":279.25,"temp_max":279.25,"pressure":1005,"sea_level":1005,"grnd_level":1001,"humidity":84,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":94},"wind":{"speed":2.73,"deg":293,"gust":8.03},"visibility":10000,"pop":0.23,"rain":{"3h":0.27},"sys":{"pod":"n"},"dt_txt":"2021-05-04 21:00:00"},{"dt":1620172800,"main":{"temp":277.57,"feels_like":274.5,"temp_min":277.57,"temp_max":277.57,"pressure":1005,"sea_level":1005,"grnd_level":1002,"humidity":88,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":77},"wind":{"speed":3.67,"deg":273,"gust":9.83},"visibility":10000,"pop":0.17,"sys":{"pod":"n"},"dt_txt":"2021-05-05 00:00:00"},{"dt":1620183600,"main":{"temp":277.12,"feels_like":273.98,"temp_min":277.12,"temp_max":277.12,"pressure":1006,"sea_level":1006,"grnd_level":1003,"humidity":84,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":63},"wind":{"speed":3.62,"deg":289,"gust":9.3},"visibility":10000,"pop":0.12,"sys":{"pod":"n"},"dt_txt":"2021-05-05 03:00:00"},{"dt":1620194400,"main":{"temp":277.5,"feels_like":275.88,"temp_min":277.5,"temp_max":277.5,"pressure":1007,"sea_level":1007,"grnd_level":1004,"humidity":84,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":76},"wind":{"speed":1.89,"deg":305,"gust":3.31},"visibility":10000,"pop":0.06,"sys":{"pod":"d"},"dt_txt":"2021-05-05 06:00:00"},{"dt":1620205200,"main":{"temp":279.97,"feels_like":279.38,"temp_min":279.97,"temp_max":279.97,"pressure":1009,"sea_level":1009,"grnd_level":1006,"humidity":66,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":1.34,"deg":279,"gust":1.74},"visibility":10000,"pop":0.26,"rain":{"3h":0.16},"sys":{"pod":"d"},"dt_txt":"2021-05-05 09:00:00"},{"dt":1620216000,"main":{"temp":283.1,"feels_like":281.43,"temp_min":283.1,"temp_max":283.1,"pressure":1009,"sea_level":1009,"grnd_level":1006,"humidity":49,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":91},"wind":{"speed":3.31,"deg":270,"gust":4.39},"visibility":10000,"pop":0.67,"rain":{"3h":0.32},"sys":{"pod":"d"},"dt_txt":"2021-05-05 12:00:00"},{"dt":1620226800,"main":{"temp":285.28,"feels_like":283.54,"temp_min":285.28,"temp_max":285.28,"pressure":1008,"sea_level":1008,"grnd_level":1005,"humidity":38,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":93},"wind":{"speed":4.73,"deg":247,"gust":6.48},"visibility":10000,"pop":0.88,"rain":{"3h":0.1},"sys":{"pod":"d"},"dt_txt":"2021-05-05 15:00:00"},{"dt":1620237600,"main":{"temp":281.44,"feels_like":278.66,"temp_min":281.44,"temp_max":281.44,"pressure":1008,"sea_level":1008,"grnd_level":1005,"humidity":78,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":95},"wind":{"speed":4.86,"deg":280,"gust":9.03},"visibility":10000,"pop":1,"rain":{"3h":1.1},"sys":{"pod":"d"},"dt_txt":"2021-05-05 18:00:00"},{"dt":1620248400,"main":{"temp":278.74,"feels_like":276.66,"temp_min":278.74,"temp_max":278.74,"pressure":1009,"sea_level":1009,"grnd_level":1006,"humidity":88,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":2.61,"deg":271,"gust":7.88},"visibility":10000,"pop":0.3,"rain":{"3h":0.25},"sys":{"pod":"n"},"dt_txt":"2021-05-05 21:00:00"},{"dt":1620259200,"main":{"temp":277.1,"feels_like":275.31,"temp_min":277.1,"temp_max":277.1,"pressure":1009,"sea_level":1009,"grnd_level":1006,"humidity":90,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":75},"wind":{"speed":1.99,"deg":250,"gust":5.1},"visibility":10000,"pop":0.04,"sys":{"pod":"n"},"dt_txt":"2021-05-06 00:00:00"},{"dt":1620270000,"main":{"temp":276.56,"feels_like":275.24,"temp_min":276.56,"temp_max":276.56,"pressure":1008,"sea_level":1008,"grnd_level":1005,"humidity":88,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":99},"wind":{"speed":1.53,"deg":220,"gust":2.96},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2021-05-06 03:00:00"},{"dt":1620280800,"main":{"temp":277.45,"feels_like":276.25,"temp_min":277.45,"temp_max":277.45,"pressure":1007,"sea_level":1007,"grnd_level":1004,"humidity":80,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":1.54,"deg":199,"gust":2.79},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-05-06 06:00:00"},{"dt":1620291600,"main":{"temp":280.92,"feels_like":279.23,"temp_min":280.92,"temp_max":280.92,"pressure":1006,"sea_level":1006,"grnd_level":1002,"humidity":65,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":2.64,"deg":188,"gust":4.65},"visibility":10000,"pop":0.29,"sys":{"pod":"d"},"dt_txt":"2021-05-06 09:00:00"},{"dt":1620302400,"main":{"temp":281.43,"feels_like":279.83,"temp_min":281.43,"temp_max":281.43,"pressure":1004,"sea_level":1004,"grnd_level":1000,"humidity":70,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":2.65,"deg":132,"gust":3.3},"visibility":10000,"pop":0.4,"rain":{"3h":0.45},"sys":{"pod":"d"},"dt_txt":"2021-05-06 12:00:00"},{"dt":1620313200,"main":{"temp":280,"feels_like":278.27,"temp_min":280,"temp_max":280,"pressure":1002,"sea_level":1002,"grnd_level":999,"humidity":89,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":2.47,"deg":76,"gust":3.95},"visibility":10000,"pop":0.66,"rain":{"3h":1.31},"sys":{"pod":"d"},"dt_txt":"2021-05-06 15:00:00"},{"dt":1620324000,"main":{"temp":280.4,"feels_like":279.85,"temp_min":280.4,"temp_max":280.4,"pressure":1003,"sea_level":1003,"grnd_level":1000,"humidity":84,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":1.35,"deg":59,"gust":2.76},"visibility":10000,"pop":0.62,"rain":{"3h":0.12},"sys":{"pod":"d"},"dt_txt":"2021-05-06 18:00:00"},{"dt":1620334800,"main":{"temp":278.46,"feels_like":277.3,"temp_min":278.46,"temp_max":278.46,"pressure":1005,"sea_level":1005,"grnd_level":1002,"humidity":93,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":73},"wind":{"speed":1.62,"deg":242,"gust":1.81},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2021-05-06 21:00:00"},{"dt":1620345600,"main":{"temp":277.37,"feels_like":275.44,"temp_min":277.37,"temp_max":277.37,"pressure":1008,"sea_level":1008,"grnd_level":1004,"humidity":92,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":45},"wind":{"speed":2.16,"deg":269,"gust":6.01},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2021-05-07 00:00:00"},{"dt":1620356400,"main":{"temp":276.51,"feels_like":273.8,"temp_min":276.51,"temp_max":276.51,"pressure":1009,"sea_level":1009,"grnd_level":1006,"humidity":92,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":13},"wind":{"speed":2.86,"deg":269,"gust":9.58},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2021-05-07 03:00:00"},{"dt":1620367200,"main":{"temp":277.36,"feels_like":274.91,"temp_min":277.36,"temp_max":277.36,"pressure":1012,"sea_level":1012,"grnd_level":1009,"humidity":87,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":9},"wind":{"speed":2.74,"deg":261,"gust":8.58},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-05-07 06:00:00"},{"dt":1620378000,"main":{"temp":283.17,"feels_like":281.72,"temp_min":283.17,"temp_max":283.17,"pressure":1014,"sea_level":1014,"grnd_level":1010,"humidity":57,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":5},"wind":{"speed":4.14,"deg":285,"gust":6.94},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-05-07 09:00:00"},{"dt":1620388800,"main":{"temp":286.95,"feels_like":285.33,"temp_min":286.95,"temp_max":286.95,"pressure":1014,"sea_level":1014,"grnd_level":1011,"humidity":36,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":6},"wind":{"speed":4.3,"deg":275,"gust":6.09},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-05-07 12:00:00"},{"dt":1620399600,"main":{"temp":288.01,"feels_like":286.41,"temp_min":288.01,"temp_max":288.01,"pressure":1014,"sea_level":1014,"grnd_level":1011,"humidity":33,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":10},"wind":{"speed":3.43,"deg":262,"gust":5.42},"visibility":10000,"pop":0.12,"sys":{"pod":"d"},"dt_txt":"2021-05-07 15:00:00"},{"dt":1620410400,"main":{"temp":284.65,"feels_like":283.61,"temp_min":284.65,"temp_max":284.65,"pressure":1015,"sea_level":1015,"grnd_level":1012,"humidity":67,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":54},"wind":{"speed":3.3,"deg":224,"gust":4.97},"visibility":10000,"pop":0.32,"rain":{"3h":0.37},"sys":{"pod":"d"},"dt_txt":"2021-05-07 18:00:00"},{"dt":1620421200,"main":{"temp":282.32,"feels_like":281.34,"temp_min":282.32,"temp_max":282.32,"pressure":1015,"sea_level":1015,"grnd_level":1012,"humidity":70,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":2.04,"deg":166,"gust":4.87},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2021-05-07 21:00:00"},{"dt":1620432000,"main":{"temp":281.53,"feels_like":279.85,"temp_min":281.53,"temp_max":281.53,"pressure":1014,"sea_level":1014,"grnd_level":1010,"humidity":64,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":2.79,"deg":149,"gust":8.42},"visibility":10000,"pop":0.02,"sys":{"pod":"n"},"dt_txt":"2021-05-08 00:00:00"},{"dt":1620442800,"main":{"temp":280.88,"feels_like":278.14,"temp_min":280.88,"temp_max":280.88,"pressure":1010,"sea_level":1010,"grnd_level":1007,"humidity":97,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":4.45,"deg":126,"gust":12.4},"visibility":7986,"pop":1,"rain":{"3h":2.39},"sys":{"pod":"n"},"dt_txt":"2021-05-08 03:00:00"},{"dt":1620453600,"main":{"temp":282.73,"feels_like":280.03,"temp_min":282.73,"temp_max":282.73,"pressure":1007,"sea_level":1007,"grnd_level":1004,"humidity":97,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":5.5,"deg":158,"gust":14.52},"visibility":5327,"pop":1,"rain":{"3h":5},"sys":{"pod":"d"},"dt_txt":"2021-05-08 06:00:00"},{"dt":1620464400,"main":{"temp":285.66,"feels_like":285.39,"temp_min":285.66,"temp_max":285.66,"pressure":1004,"sea_level":1004,"grnd_level":1001,"humidity":93,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":6.38,"deg":182,"gust":15.83},"visibility":10000,"pop":0.63,"rain":{"3h":0.72},"sys":{"pod":"d"},"dt_txt":"2021-05-08 09:00:00"}],"city":{"id":2643743,"name":"London","coord":{"lat":51.5085,"lon":-0.1257},"country":"GB","population":0,"timezone":3600,"sunrise":1620016100,"sunset":1620069976}}
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ForecastComponent],
      providers: [WeatherService,
        {
          provide: ActivatedRoute,
          useValue: {
             
              paramMap: of(convertToParamMap({ id: 2643743 }))
            
          }
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    debugElement = fixture.debugElement;
    component = fixture.debugElement.componentInstance;
  }));

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
  it('checking weather forecast response ', fakeAsync(() => {
    let apiService = fixture.debugElement.injector.get(WeatherService);
    let s = spyOn(apiService, 'fetchCityForecast').and.callFake(() => {
      return of(response).pipe(delay(3000));
    });
    fixture.detectChanges();
    tick(3000);
    expect(component.cityname).toEqual('London');
  }));

});
