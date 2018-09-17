import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { City, UvIndex, WeatherForecast, WeatherCurrent } from "@lib/models";

@Injectable()
export class ApiService {

  // https://medium.freecodecamp.org/client-side-web-scraping-with-javascript-using-jquery-and-regex-5b57a271cb86
  private allOriginsUrl: string = "http://allorigins.me/get?url=";
  private anyOriginUrl: string = "http://anyorigin.com/go?url=";
  private crossOriginUrl: string = "https://crossorigin.me/";
  private whateverOriginUrl: string = "http://www.whateverorigin.org/get?url=";

  private geoCodeForCityUrl: string = "http://www.datasciencetoolkit.org/maps/api/geocode/json?address={0}";
  private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}";
  private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}";
  private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}";

  constructor(private readonly http: HttpClient) { }

  geoCodeForCity(cityName: string): Observable<any> {
    return this.doRestCall<any>(String().format(this.geoCodeForCityUrl, cityName), true);
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

  private doRestCall<T>(url: string, useProxyService: boolean = false): Observable<T> {
    return this.http
      .get(useProxyService ? (this.allOriginsUrl + url) : url)
      .pipe(
        map(response => {
          let value: T = null;

          if (useProxyService && response && response.hasOwnProperty("contents")) {
            value = JSON.parse(response["contents"].toString());
          } else if (response) {
            value = response as T;
          }

          if (value.hasOwnProperty("cod") && (value["cod"] !== 200 && value["cod"] !== "200") && value.hasOwnProperty("message")) {
            console.warn(value["message"]);
            return null;
          }

          return value;
        }),
        catchError(error => {
          return of(null);
        }));
  }
}
