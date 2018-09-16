import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { environment } from "../../environments/environment";

import { ApiCallState } from "@lib/enums";
import { City, City2, Coordinates, UvIndex, WeatherCurrent, WeatherForecast } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

@Injectable()
export class OpenWeatherService {

    private city$ = new BehaviorSubject<City>(null);
    private currentWeather$ = new BehaviorSubject<WeatherCurrent>(null);
    private forecastWeather$ = new BehaviorSubject<WeatherForecast>(null);
    private uvIndex$ = new BehaviorSubject<UvIndex>(null);

    private apiKey: string = environment.apiKey;

    constructor(private readonly apiService: ApiService) { }

    city(): Observable<City> {
        return this.city$;
    }

    setCityData(name: string, coord?: Coordinates): void {
        const city = this.city$.value;
        city.name = name;
        if (coord) {
            city.coord = coord;
        }
        this.city$.next(city);
    }

    currentWeather(): Observable<WeatherCurrent> {
        return this.currentWeather$;
    }

    forecastWeather(): Observable<WeatherForecast> {
        return this.forecastWeather$;
    }

    uvIndex(): Observable<UvIndex> {
        return this.uvIndex$;
    }

    loadCityData(cityName: string): void {
        this.apiService.geoCodeForCity(cityName)
            .pipe(take(1))
            .subscribe(response => {
                if (response && response.status && response.status === "OK" && response.results && response.results.length > 0) {
                    const city2: City2 = response.results[0];
                    this.setCityData(city2.address_components[0].long_name, { lat: city2.geometry.location.lat, lon: city2.geometry.location.lng });
                }
            });
    }

    loadCurrentWeather(): ApiCallState {
        if (!this.city$.value || !this.city$.value.isNameSet()) {
            return ApiCallState.CityNotSet;
        }

        this.apiService.currentWeather(this.apiKey, this.city$.value)
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    this.currentWeather$.next(response);
                }
            });

        return ApiCallState.Calling;
    }

    loadForecastWeather(): ApiCallState {
        if (!this.city$.value || !this.city$.value.isCoordSet()) {
            return ApiCallState.CoordNotSet;
        }

        this.apiService.forecastWeather(this.apiKey, this.city$.value)
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    this.forecastWeather$.next(response);
                }
            });

        return ApiCallState.Calling;
    }

    loadUvIndex(): ApiCallState {
        if (!this.city$.value || !this.city$.value.isCoordSet()) {
            return ApiCallState.CoordNotSet;
        }

        this.apiService.uvIndex(this.apiKey, this.city$.value)
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    this.uvIndex$.next(response);
                }
            });

        return ApiCallState.Calling;
    }
}
