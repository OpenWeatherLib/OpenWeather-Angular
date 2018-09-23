import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { environment } from "../../environments/environment";

import { ApiCallState, ValidationRequiredType } from "@lib/enums";
import { City, City2, UvIndex, WeatherCurrent, WeatherForecast } from "@lib/models";
import { ApiService } from "@lib/services/api.service";
import { validate, required } from "@lib/decorator";
import WeatherCondition from "@lib/enums/weather-condition.enum";

@Injectable()
export class OpenWeatherService {

    private city$ = new BehaviorSubject<City>(null);
    private currentWeather$ = new BehaviorSubject<WeatherCurrent>(null);
    private forecastWeather$ = new BehaviorSubject<WeatherForecast>(null);
    private uvIndex$ = new BehaviorSubject<UvIndex>(null);

    private apiKey: string = environment.openWeatherApiKey;

    private geoCodeForCityUrl: string = "http://www.datasciencetoolkit.org/maps/api/geocode/json?address={0}";
    private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}";
    private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}";
    private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}";

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

    @validate(null)
    loadCityData(@required(ValidationRequiredType.String) cityName: string): void {
        this.apiService.get<any>(String().format(this.geoCodeForCityUrl, cityName), true)
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

        if (!this.apiKey) {
            return ApiCallState.NoOpenWeatherApiKey;
        }

        const city = this.city$.value;
        const url = String().format(this.currentWeatherUrl, city.name, this.apiKey);

        this.apiService.get<WeatherCurrent>(url)
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    response.weatherCondition = WeatherCondition.getByDescription(response.weather[0].description);
                    this.currentWeather$.next(response);
                }
            });

        return ApiCallState.Calling;
    }

    loadForecastWeather(): ApiCallState {
        if (!this.city$.value || !this.city$.value.isCoordSet()) {
            return ApiCallState.CoordNotSet;
        }

        if (!this.apiKey) {
            return ApiCallState.NoOpenWeatherApiKey;
        }

        const city = this.city$.value;
        const url = String().format(this.forecastWeatherUrl, city.name, this.apiKey);

        this.apiService.get<WeatherForecast>(url)
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    response.list.forEach(x => x.weatherCondition = WeatherCondition.getByDescription(x.weather[0].description));
                    this.forecastWeather$.next(response);
                }
            });

        return ApiCallState.Calling;
    }

    loadUvIndex(): ApiCallState {
        if (!this.city$.value || !this.city$.value.isCoordSet()) {
            return ApiCallState.CoordNotSet;
        }

        if (!this.apiKey) {
            return ApiCallState.NoOpenWeatherApiKey;
        }

        const city = this.city$.value;
        const url = String().format(this.uvIndexUrl, city.coord.lat.toFixed(2), city.coord.lon.toFixed(2), this.apiKey);

        this.apiService.get<UvIndex>(url)
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    this.uvIndex$.next(response);
                }
            });

        return ApiCallState.Calling;
    }

    @validate(null)
    searchForecast(@required(ValidationRequiredType.String) searchValue: string): WeatherForecast {
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
