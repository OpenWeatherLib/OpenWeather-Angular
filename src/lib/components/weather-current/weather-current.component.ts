import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { WeatherCurrent } from "@lib/models";
import { selectIsLoading, selectWeatherCurrent } from "@lib/store/weather-current-store";
import { RootState } from "@lib/store/root-state";

@Component({
  selector: "ga-weather-current",
  templateUrl: "./weather-current.component.html",
  styleUrls: ["./weather-current.component.scss"]
})
export class WeatherCurrentComponent implements OnInit {

  isLoading$: Observable<boolean>;

  weatherCurrent$: Observable<WeatherCurrent>;

  constructor(private readonly store$: Store<RootState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.weatherCurrent$ = this.store$.select(selectWeatherCurrent);
  }
}
