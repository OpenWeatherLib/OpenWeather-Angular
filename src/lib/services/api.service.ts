import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "../../environments/environment";

import "@lib/extensions/string.extensions";
import { City } from "@lib/models";

@Injectable()
export class ApiService {
  private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}";
  private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}";
  private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}";

  private apiKey: string = environment.apiKey;
  private city: City = new City();

  constructor(private readonly http: HttpClient) { }

  initialize(apiKey: string, city: City): void {
    this.apiKey = apiKey;
    this.city = city;
  }

  currentWeather(): Observable<any> {
    return this.doRestCall(String().format(this.currentWeatherUrl, this.city.name, this.apiKey));
  }

  forecastWeather(): Observable<any> {
    return this.doRestCall(String().format(this.forecastWeatherUrl, this.city.name, this.apiKey));
  }

  uvIndex(): Observable<any> {
    return this.doRestCall(String().format(this.uvIndexUrl, this.city.geoLocation.lat.toFixed(2), this.city.geoLocation.long.toFixed(2), this.apiKey));
  }

  private doRestCall(url: string): Observable<any> {
    return this.http
      .get(url)
      .pipe(
        catchError(error => {
          return of({ error: { errorMessage: `unknown server error: ${error.toString()}` } });
        }));
  }
}
