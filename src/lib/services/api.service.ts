import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import "@lib/extensions/string.extensions";
import { City, UvIndex, WeatherForecast, WeatherCurrent } from "@lib/models";

@Injectable()
export class ApiService {
  private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}";
  private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}";
  private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}";

  constructor(private readonly http: HttpClient) { }

  currentWeather(apiKey: string, city: City): Observable<WeatherCurrent> {
    return this.doRestCall<WeatherCurrent>(
      String().format(
        this.currentWeatherUrl,
        city.name,
        apiKey));
  }

  forecastWeather(apiKey: string, city: City): Observable<WeatherForecast> {
    return this.doRestCall<WeatherForecast>(
      String().format(
        this.forecastWeatherUrl,
        city.name,
        apiKey));
  }

  uvIndex(apiKey: string, city: City): Observable<UvIndex> {
    return this.doRestCall<UvIndex>(
      String().format(
        this.uvIndexUrl,
        city.coord.lat.toFixed(2),
        city.coord.lon.toFixed(2),
        apiKey));
  }

  private doRestCall<T>(url: string): Observable<T> {
    return this.http
      .get(url)
      .pipe(
        map(response => {
          const value: T = JSON.parse(response.toString());
          return value;
        }),
        catchError(error => {
          return of(null);
        }));
  }
}
