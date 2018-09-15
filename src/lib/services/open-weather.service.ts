import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { WeatherCurrent, WeatherForecast, UvIndex } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

@Injectable()
export class OpenWeatherService {

    private currentWeather$ = new BehaviorSubject<WeatherCurrent>(null);
    private forecastWeather$ = new BehaviorSubject<WeatherForecast>(null);
    private uvIndex$ = new BehaviorSubject<UvIndex>(null);

    constructor(private readonly apiService: ApiService) { }

    currentWeather(): Observable<WeatherCurrent> {
        return this.currentWeather$;
    }

    forecastWeather(): Observable<WeatherForecast> {
        return this.forecastWeather$;
    }

    uvIndex(): Observable<UvIndex> {
        return this.uvIndex$;
    }

    loadCurrentWeather(): void {
        this.apiService.currentWeather()
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    this.currentWeather$.next(response);
                }
            });
    }

    loadForecastWeather(): void {
        this.apiService.forecastWeather()
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    this.forecastWeather$.next(response);
                }
            });
    }

    loadUvIndex(): void {
        this.apiService.uvIndex()
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    this.uvIndex$.next(response);
                }
            });
    }
}
