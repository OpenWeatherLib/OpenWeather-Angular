import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { environment } from "../../environments/environment";

import { ApiCallState } from "@lib/enums";
import { City, City2, UvIndex, WeatherCurrent, WeatherForecast } from "@lib/models";
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

                    const city = new City();
                    city.name = city2.address_components[0].short_name;
                    city.country = city2.address_components[1].short_name;
                    city.coord = { lat: city2.geometry.location.lat, lon: city2.geometry.location.lng };

                    this.city$.next(city);
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

    searchForecast(searchValue: string): WeatherForecast {
        if (!this.forecastWeather$.value || !this.forecastWeather$.value.cnt) {
            return null;
        }

        const value = this.forecastWeather$.value;
        let list = value.list;
        list = list.filter(x => JSON.stringify(x).includes(searchValue));

        return {
            cod: value.cod,
            message: value.message,
            cnt: list.length,
            list: list,
            city: value.city
        };
    }
}
