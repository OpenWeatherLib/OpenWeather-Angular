import { DownloadResult, DownloadType } from "../enums";
import { City } from "../models";

export class ApiService {
  private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q=%s&units=metric&APPID=%s"
  private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q=%s&units=metric&APPID=%s"
  private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat=%.2f&lon=%.2f&APPID=%s"

  constructor(city: City, apiKey: string) { }

  currentWeather(): DownloadResult {
    //TODO
    return DownloadResult.Null;
  }

  forecastWeather(): DownloadResult {
    //TODO
    return DownloadResult.Null;
  }

  uvIndex(): DownloadResult {
    //TODO
    return DownloadResult.Null;
  }

  private doRestCall(downloadType: DownloadType, url: string): DownloadResult {
    return DownloadResult.Null
  }
}
