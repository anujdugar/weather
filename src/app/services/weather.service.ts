import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { RestEndPoints } from '../app.constant';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  appId = RestEndPoints.API_KEY;

  constructor(private httpClient: HttpClient) {

  }
  fetchCityTemperature() {
    const url = `${RestEndPoints.API_URL}/group?id=2643743,2950158,2968815,3164603,3675707&&appid=${this.appId}`
    // const params = new HttpParams().set('id', 524901, 703448, 2643743).set('appId', this.appId);
    return this.httpClient.get(url).pipe(
      catchError(err => {
        return throwError(err);
      })
    )

  }


  fetchCityForecast(id) {
    const url = `${RestEndPoints.API_URL}/forecast?id=${id}&&appid=${this.appId}`

    return this.httpClient.get(url).pipe(
      catchError(err => {
        return throwError(err);
      })
    )

  }
}
