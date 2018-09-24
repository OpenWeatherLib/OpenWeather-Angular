import { Component, OnInit } from "@angular/core";

import { BaseComponent } from "@lib/components/base-component/base.component";
import { ApiCallState } from "@lib/enums";
import { WeatherCurrent } from "@lib/models";
import { OpenWeatherService } from "@lib/services";

@Component({
  selector: "ga-weather-current",
  templateUrl: "./weather-current.component.html",
  styleUrls: ["./weather-current.component.scss"]
})
export class WeatherCurrentComponent extends BaseComponent implements OnInit {

  currentWeather: WeatherCurrent = null;

  constructor(private readonly openWeatherService: OpenWeatherService) {
    super();
  }

  ngOnInit() {
    this.registerSubscription(
      this.openWeatherService.currentWeather()
        .subscribe(currentWeather => {
          if (currentWeather) {
            this.currentWeather = currentWeather;
          }
        }));
  }
}
