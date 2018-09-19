import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

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
  city: string = "Nuremberg";
  newCity: string = "Nuremberg";

  constructor(
    private readonly openWeatherService: OpenWeatherService,
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon("close", sanitizer.bypassSecurityTrustResourceUrl("assets/close.svg"));
      iconRegistry.addSvgIcon("menu", sanitizer.bypassSecurityTrustResourceUrl("assets/menu.svg"));
  }

  ngOnInit() {
    this.openWeatherService.loadCityData(this.city);

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

  updateCity(): void {
    this.city = this.newCity;
    this.openWeatherService.loadCityData(this.city);
  }
}
