import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";

import { DownloadResult, DownloadType } from "../enums";
import { City } from "../models";

@Injectable()
export class ApiService {
  private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q=%s&units=metric&APPID=%s"
  private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q=%s&units=metric&APPID=%s"
  private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat=%.2f&lon=%.2f&APPID=%s"

  private apiKey = environment.apiKey;

  constructor(city: City) { }

  currentWeather(): DownloadResult {
    // TODO convert url and add lat, long, and apikey
    return this.doRestCall(DownloadType.Current, this.currentWeatherUrl);
  }

  forecastWeather(): DownloadResult {
    // TODO convert url and add lat, long, and apikey
    return this.doRestCall(DownloadType.Forecast, this.forecastWeatherUrl);
  }

  uvIndex(): DownloadResult {
    // TODO convert url and add lat, long, and apikey
    return this.doRestCall(DownloadType.UvIndex, this.uvIndexUrl);
  }

  private doRestCall(downloadType: DownloadType, url: string): DownloadResult {
    return DownloadResult.Null
  }
}
