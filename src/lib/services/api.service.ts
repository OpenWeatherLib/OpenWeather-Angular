import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import "@lib/extensions/string.extensions";
import { City, UvIndex, WeatherForecast, WeatherCurrent } from "@lib/models";

@Injectable()
export class ApiService {

  // TODO
  // To fix api call error
  // https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md

  private geoCodeForCityUrl: string = "http://www.datasciencetoolkit.org/maps/api/geocode/json?address={0}";
  private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}";
  private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}";
  private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}";

  private readonly headers = new HttpHeaders({
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "Sat, 01 Jan 2000 00:00:00 GMT",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  });

  constructor(private readonly http: HttpClient) { }

  geoCodeForCity(cityName: string): Observable<any> {
    return this.doRestCall<any>(String().format(this.geoCodeForCityUrl, cityName));
  }

  currentWeather(apiKey: string, city: City): Observable<WeatherCurrent> {
    return this.doRestCall<WeatherCurrent>(String().format(this.currentWeatherUrl, city.name, apiKey));
  }

  forecastWeather(apiKey: string, city: City): Observable<WeatherForecast> {
    return this.doRestCall<WeatherForecast>(String().format(this.forecastWeatherUrl, city.name, apiKey));
  }

  uvIndex(apiKey: string, city: City): Observable<UvIndex> {
    return this.doRestCall<UvIndex>(String().format(this.uvIndexUrl, city.coord.lat.toFixed(2), city.coord.lon.toFixed(2), apiKey));
  }

  private doRestCall<T>(url: string): Observable<T> {
    return this.http
      .get(url, { headers: this.headers })
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
