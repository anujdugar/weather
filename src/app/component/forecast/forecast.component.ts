import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  id: any;
  forecastArray: any[];
  cityname = '';
  dataLoaded = false;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private _location: Location) { }

  ngOnInit(): void {
    console.log('ROUTE : ', this.route);
    this.route.paramMap.subscribe(params => {
      this.id = params['params']['id'];
    })
    this.fetchCityForecast();
  //  window.location.href="https://www.google.com";
  }
  fetchCityForecast() {
    this.dataLoaded = false;
    this.forecastArray = [];
    this.weatherService.fetchCityForecast(this.id).subscribe(res => {
      if (res && res['list'] && res['list'].length > 0) {
        this.cityname = res['city']['name'];
        res['list'].forEach(item => {
          const time = new Date(item['dt_txt']).getHours();
          if (time === 9) {
            this.forecastArray.push(item);
          }
        })
        this.dataLoaded = true;
      }
    })
  }
  goBack() {
    this._location.back();
  }

}
