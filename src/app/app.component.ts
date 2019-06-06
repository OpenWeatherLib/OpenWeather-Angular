import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

import { ApiCallState } from "@lib/enums";
import { City } from "@lib/models";
import { OpenWeatherService } from "@lib/services";
import { BaseComponent } from "@lib/components";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent extends BaseComponent implements OnInit {

  opened: boolean = false;

  city: City = { name: "Nuremberg" } as City;
  newCityName: string = "Nuremberg";

  updatingCity: boolean = true;
  updatingCurrentWeather: boolean = false;
  updatingForecastWeather: boolean = false;
  updatingOzone: boolean = false;
  updatingUvIndex: boolean = false;

  constructor(
    private readonly openWeatherService: OpenWeatherService,
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer) {
    super();
    this.registerIcons();
  }

  ngOnInit(): void {
    this.registerSubscription(this.openWeatherService.city().subscribe(city => {
      this.updatingCity = false;
      if (city) {
        this.city = city;
      }
    }));
    this.registerSubscription(this.openWeatherService.currentWeather().subscribe(() => this.updatingCurrentWeather = false));
    this.registerSubscription(this.openWeatherService.forecastWeather().subscribe(() => this.updatingForecastWeather = false));
    this.registerSubscription(this.openWeatherService.ozone().subscribe(() => this.updatingOzone = false));
    this.registerSubscription(this.openWeatherService.uvIndex().subscribe(() => this.updatingUvIndex = false));
  }

  updateCity(): void {
    if (!this.updatingCity) {
      this.updatingCity = true;
      this.openWeatherService.loadCityData(this.newCityName);
    }
  }

  loadCurrentWeather(): void {
    if (!this.updatingCurrentWeather) {
      this.updatingCurrentWeather = true;

      const apiCallState: ApiCallState = this.openWeatherService.loadCurrentWeather();
      if (apiCallState !== ApiCallState.Calling) {
        this.updatingCurrentWeather = false;
        console.warn(`Not downloading: ${apiCallState}`);
      }
    }
  }

  loadForecastWeather(): void {
    if (!this.updatingForecastWeather) {
      this.updatingForecastWeather = true;

      const apiCallState: ApiCallState = this.openWeatherService.loadForecastWeather();
      if (apiCallState !== ApiCallState.Calling) {
        this.updatingForecastWeather = false;
        console.warn(`Not downloading: ${apiCallState}`);
      }
    }
  }

  loadOzone(): void {
    if (!this.updatingOzone) {
      this.updatingOzone = true;

      const apiCallState: ApiCallState = this.openWeatherService.loadOzone("2018-11-01", 2);
      if (apiCallState !== ApiCallState.Calling) {
        this.updatingOzone = false;
        console.warn(`Not downloading: ${apiCallState}`);
      }
    }
  }

  loadUvIndex(): void {
    if (!this.updatingUvIndex) {
      this.updatingUvIndex = true;

      const apiCallState: ApiCallState = this.openWeatherService.loadUvIndex();
      if (apiCallState !== ApiCallState.Calling) {
        this.updatingUvIndex = false;
        console.warn(`Not downloading: ${apiCallState}`);
      }
    }
  }

  private registerIcons(): void {
    // Icon-Source https://material.io/tools/icons/?style=baseline
    this.iconRegistry.addSvgIcon("city", this.sanitizer.bypassSecurityTrustResourceUrl("assets/city.svg"));
    this.iconRegistry.addSvgIcon("close", this.sanitizer.bypassSecurityTrustResourceUrl("assets/close.svg"));
    this.iconRegistry.addSvgIcon("menu", this.sanitizer.bypassSecurityTrustResourceUrl("assets/menu.svg"));
    this.iconRegistry.addSvgIcon("save", this.sanitizer.bypassSecurityTrustResourceUrl("assets/save.svg"));
  }
}
