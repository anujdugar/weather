import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-temperature',
  templateUrl: './city-temperature.component.html',
  styleUrls: ['./city-temperature.component.css']
})
export class CityTemperatureComponent implements OnInit {
  cityList: any = [];
  dataLoaded = false;

  constructor(private weatherService: WeatherService, private route: Router) { }

  ngOnInit(): void {
    this.fetchCityTemperature();
  }

  fetchCityTemperature() {
    this.dataLoaded = false;
    this.weatherService.fetchCityTemperature().subscribe(res => {
      this.dataLoaded = true;
      if (res && Object.keys(res).length > 0) {
        this.cityList = res['list'];
      } else {
        this.cityList = [];
      }
      console.log('CITY LIST : ', this.cityList.length);
    })

  }
  convertToDegree(val) {
    return (val - 273.15).toFixed(2);
  }

  goToForecast(id) {
    console.log('FORECAST ID : ', id);
    this.route.navigate(['/forecast', id]);
    //  window.open('https://www.google.com');
    //window.location.href="https://www.google.com";

  }


}
