import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";

import { DownloadResult, DownloadType } from "../enums";
import { City } from "../models";

@Injectable()
export class ApiService {
  private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}"
  private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}"
  private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}"

  private apiKey: string = environment.apiKey;
  private city: City = new City();

  currentWeather(): DownloadResult {
    return this.doRestCall(DownloadType.Current,
      String().format(
        this.currentWeatherUrl,
        this.city.name,
        this.apiKey));
  }

  forecastWeather(): DownloadResult {
    return this.doRestCall(DownloadType.Forecast,
      String().format(
        this.forecastWeatherUrl,
        this.city.name,
        this.apiKey));
  }

  uvIndex(): DownloadResult {
    return this.doRestCall(DownloadType.UvIndex,
      String().format(
        this.uvIndexUrl,
        this.city.geoLocation.lat.toFixed(2),
        this.city.geoLocation.long.toFixed(2),
        this.apiKey));
  }

  private doRestCall(downloadType: DownloadType, url: string): DownloadResult {
    return DownloadResult.Null
  }
}
