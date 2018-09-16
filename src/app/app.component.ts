import { Component, OnInit, OnDestroy } from "@angular/core";
import { OpenWeatherService } from "@lib/services";
import { ApiCallState } from "@lib/enums";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

  mainMenuVisible: boolean = true;
  opened: boolean;

  constructor(private readonly openWeatherService: OpenWeatherService) { }

  ngOnInit() {
    this.openWeatherService.loadCityData("Nuremberg");

    this.openWeatherService.currentWeather()
      .subscribe(currentWeather => {

      });

    this.openWeatherService.forecastWeather()
      .subscribe(forecastWeather => {

      });

    this.openWeatherService.uvIndex()
      .subscribe(uvIndex => {

      });
  }

  ngOnDestroy() {

  }

  currentWeather(): void {
    const apiCallState: ApiCallState = this.openWeatherService.loadCurrentWeather();
    if (apiCallState !== ApiCallState.Calling) {
      console.warn(`Not downloading: ${apiCallState}`);
    }
  }

  forecastWeather(): void {
    const apiCallState: ApiCallState = this.openWeatherService.loadForecastWeather();
    if (apiCallState !== ApiCallState.Calling) {
      console.warn(`Not downloading: ${apiCallState}`);
    }
  }

  uvIndex(): void {
    const apiCallState: ApiCallState = this.openWeatherService.loadUvIndex();
    if (apiCallState !== ApiCallState.Calling) {
      console.warn(`Not downloading: ${apiCallState}`);
    }
  }
}
