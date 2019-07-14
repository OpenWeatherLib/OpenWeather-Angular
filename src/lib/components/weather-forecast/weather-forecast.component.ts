import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import WeatherCondition from "@lib/enums/weather-condition.enum";
import { WeatherForecastPart } from "@lib/models";
import { selectIsLoading, selectMostWeatherCondition, selectWeatherForecastList, setFilterRequestAction } from "@lib/store/weather-forecast-store";
import { RootState } from "@lib/store/root-state";

@Component({
  selector: "ga-weather-forecast",
  templateUrl: "./weather-forecast.component.html",
  styleUrls: ["./weather-forecast.component.scss"]
})
export class WeatherForecastComponent implements OnInit {

  isLoading$: Observable<boolean>;

  mostWeatherCondition$: Observable<WeatherCondition>;

  weatherForecastList$: Observable<WeatherForecastPart[]>;

  weatherForecastSearch: string = "";

  readonly filterWeatherForecast = (): void => this.store$.dispatch(setFilterRequestAction({ filter: this.weatherForecastSearch }));

  readonly trackByIndex = (index: number, _: WeatherForecastPart) => index;

  constructor(private readonly store$: Store<RootState>) { }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.mostWeatherCondition$ = this.store$.select(selectMostWeatherCondition);

    this.weatherForecastList$ = this.store$.select(selectWeatherForecastList);
  }
}
