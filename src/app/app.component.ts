import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { ApiCallState } from "@lib/enums";
import { City, WeatherCurrent, WeatherForecast, UvIndex } from "@lib/models";
import { ImageService, OpenWeatherService } from "@lib/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

  opened: boolean = false;

  city: City = { name: "Nuremberg" } as City;
  newCityName: string = "Nuremberg";
  cityPictureUrl: string = "";
  updatingCity: boolean = true;

  currentWeather: WeatherCurrent = null;
  updatingCurrentWeather: boolean = false;

  forecastWeather: WeatherForecast = null;
  updatingForecastWeather: boolean = false;

  uvIndex: UvIndex = null;
  updatingUvIndex: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly imageService: ImageService,
    private readonly openWeatherService: OpenWeatherService,
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer) {
    this.registerIcons();
  }

  ngOnInit() {
    this.openWeatherService.loadCityData(this.city.name);

    this.subscriptions.push(
      this.openWeatherService.city()
        .subscribe(city => {
          this.updatingCity = false;

          if (city) {
            this.city = city;

            this.receiveImagePictureUrl();

            this.loadCurrentWeather();
            this.loadForecastWeather();
            this.loadUvIndex();
          }
        }));

    this.subscriptions.push(
      this.openWeatherService.currentWeather()
        .subscribe(currentWeather => {
          this.updatingCurrentWeather = false;

          if (currentWeather) {
            this.currentWeather = currentWeather;
          }
        }));

    this.subscriptions.push(
      this.openWeatherService.forecastWeather()
        .subscribe(forecastWeather => {
          this.updatingForecastWeather = false;

          if (forecastWeather) {
            this.forecastWeather = forecastWeather;
          }
        }));

    this.subscriptions.push(
      this.openWeatherService.uvIndex()
        .subscribe(uvIndex => {
          this.updatingUvIndex = false;

          if (uvIndex) {
            this.uvIndex = uvIndex;
          }
        }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  loadCurrentWeather(): void {
    if (this.updatingCurrentWeather) {
      return;
    }
    this.updatingCurrentWeather = true;

    const apiCallState: ApiCallState = this.openWeatherService.loadCurrentWeather();
    if (apiCallState !== ApiCallState.Calling) {
      this.updatingCurrentWeather = false;
      console.warn(`Not downloading: ${apiCallState}`);
    }
  }

  loadForecastWeather(): void {
    if (this.updatingForecastWeather) {
      return;
    }
    this.updatingForecastWeather = true;

    const apiCallState: ApiCallState = this.openWeatherService.loadForecastWeather();
    if (apiCallState !== ApiCallState.Calling) {
      this.updatingForecastWeather = false;
      console.warn(`Not downloading: ${apiCallState}`);
    }
  }

  loadUvIndex(): void {
    if (this.updatingUvIndex) {
      return;
    }
    this.updatingUvIndex = true;

    const apiCallState: ApiCallState = this.openWeatherService.loadUvIndex();
    if (apiCallState !== ApiCallState.Calling) {
      this.updatingUvIndex = false;
      console.warn(`Not downloading: ${apiCallState}`);
    }
  }

  updateCity(): void {
    if (this.updatingCity) {
      return;
    }

    this.updatingCity = true;
    this.openWeatherService.loadCityData(this.newCityName);
  }

  private registerIcons(): void {
    // Icon-Source https://material.io/tools/icons/?style=baseline
    this.iconRegistry.addSvgIcon("city", this.sanitizer.bypassSecurityTrustResourceUrl("assets/city.svg"));
    this.iconRegistry.addSvgIcon("close", this.sanitizer.bypassSecurityTrustResourceUrl("assets/close.svg"));
    this.iconRegistry.addSvgIcon("menu", this.sanitizer.bypassSecurityTrustResourceUrl("assets/menu.svg"));
    this.iconRegistry.addSvgIcon("save", this.sanitizer.bypassSecurityTrustResourceUrl("assets/save.svg"));
  }

  private receiveImagePictureUrl(): void {
    this.imageService.receiveImagePictureUrl(this.city.name)
      .pipe(take(1))
      .subscribe(url => {
        if (url) {
          this.cityPictureUrl = url;
        }
      });
  }
}
