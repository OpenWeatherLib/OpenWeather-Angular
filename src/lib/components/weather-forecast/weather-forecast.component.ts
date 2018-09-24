import { Component, OnInit } from "@angular/core";

import { BaseComponent } from "@lib/components/base-component/base.component";
import { ApiCallState } from "@lib/enums";
import WeatherCondition from "@lib/enums/weather-condition.enum";
import { mostWeatherCondition } from "@lib/extensions/weather-forecast.extension";
import { WeatherForecast, WeatherForecastPart } from "@lib/models";
import { OpenWeatherService } from "@lib/services";

@Component({
  selector: "ga-weather-forecast",
  templateUrl: "./weather-forecast.component.html",
  styleUrls: ["./weather-forecast.component.scss"]
})
export class WeatherForecasstComponent extends BaseComponent implements OnInit {

  forecastWeather: WeatherForecast = null;
  mostWeatherCondition: WeatherCondition = WeatherCondition.null;
  forecastWeatherList: WeatherForecastPart[] = [];
  forecastWeatherSearch: string = "";

  constructor(private readonly openWeatherService: OpenWeatherService) {
    super();
  }

  ngOnInit() {
    this.registerSubscription(
      this.openWeatherService.forecastWeather()
        .subscribe(forecastWeather => {
          if (forecastWeather) {
            this.forecastWeather = forecastWeather;
            this.searchForecastWeather();
          }
        }));
  }

  searchForecastWeather(): void {
    if (this.forecastWeatherSearch) {
      this.forecastWeatherList = this.forecastWeather.list.filter(x => JSON.stringify(x).includes(this.forecastWeatherSearch));
    } else {
      this.forecastWeatherList = this.forecastWeather.list;
    }
    this.mostWeatherCondition = mostWeatherCondition(this.forecastWeatherList);
  }
}
