import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { City } from "@lib/models";
import { selectCity, selectIsLoading as selectCityIsLoading, loadCityRequestAction } from "@lib/store/city-store";
import { selectIsLoading as selectOzoneIsLoading, loadOzoneRequestAction } from "@lib/store/ozone-store";
import { RootState } from "@lib/store/root-state";
import { selectIsLoading as selectUvIndexIsLoading, loadUvIndexRequestAction } from "@lib/store/uv-index-store";
import { selectIsLoading as selectWeatherCurrentIsLoading, loadWeatherCurrentRequestAction } from "@lib/store/weather-current-store";
import { selectIsLoading as selectWeatherForecastIsLoading, loadWeatherForecastRequestAction } from "@lib/store/weather-forecast-store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  newCityName: string = "Nuremberg";

  opened: boolean = false;

  city$: Observable<City>;

  cityIsLoading$: Observable<boolean>;

  ozoneIsLoading$: Observable<boolean>;

  uvIndexIsLoading$: Observable<boolean>;

  weatherCurrentIsLoading$: Observable<boolean>;

  weatherForecastIsLoading$: Observable<boolean>;

  readonly loadOzone = (): void => this.store$.dispatch(loadOzoneRequestAction({ city: undefined }));

  readonly loadUvIndex = (): void => this.store$.dispatch(loadUvIndexRequestAction({ city: undefined }));

  readonly loadWeatherCurrent = (): void => this.store$.dispatch(loadWeatherCurrentRequestAction({ city: undefined }));

  readonly loadWeatherForecast = (): void => this.store$.dispatch(loadWeatherForecastRequestAction({ city: undefined }));

  readonly updateCity = (): void => this.store$.dispatch(loadCityRequestAction({ cityName: this.newCityName }));

  constructor(
    private readonly store$: Store<RootState>,
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer) {
    this.registerIcons();
  }

  ngOnInit(): void {
    this.city$ = this.store$.select(selectCity);

    this.cityIsLoading$ = this.store$.select(selectCityIsLoading);

    this.ozoneIsLoading$ = this.store$.select(selectOzoneIsLoading);

    this.uvIndexIsLoading$ = this.store$.select(selectUvIndexIsLoading);

    this.weatherCurrentIsLoading$ = this.store$.select(selectWeatherCurrentIsLoading);

    this.weatherForecastIsLoading$ = this.store$.select(selectWeatherForecastIsLoading);

    this.store$.dispatch(loadCityRequestAction({ cityName: this.newCityName }));
  }

  private registerIcons(): void {
    // Icon-Source https://material.io/tools/icons/?style=baseline
    this.iconRegistry.addSvgIcon("city", this.sanitizer.bypassSecurityTrustResourceUrl("assets/city.svg"));
    this.iconRegistry.addSvgIcon("close", this.sanitizer.bypassSecurityTrustResourceUrl("assets/close.svg"));
    this.iconRegistry.addSvgIcon("menu", this.sanitizer.bypassSecurityTrustResourceUrl("assets/menu.svg"));
    this.iconRegistry.addSvgIcon("save", this.sanitizer.bypassSecurityTrustResourceUrl("assets/save.svg"));
  }
}
