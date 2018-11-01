import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import "@lib/extensions/string.extensions";

import { environment } from "../../environments/environment";

import { validate, required } from "@lib/decorator";
import { AirPollutionType, ApiCallState, ValidationRequiredType } from "@lib/enums";
import WeatherCondition from "@lib/enums/weather-condition.enum";
import { any } from "@lib/helper/array-helper";
import { CarbonMonoxide, City, City2, NitrogenDioxide, Ozone, SulfurDioxide, UvIndex, WeatherCurrent, WeatherForecast } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

@Injectable()
export class OpenWeatherService {

    private city$ = new BehaviorSubject<City>(null);
    private currentWeather$ = new BehaviorSubject<WeatherCurrent>(null);
    private forecastWeather$ = new BehaviorSubject<WeatherForecast>(null);
    private uvIndex$ = new BehaviorSubject<UvIndex>(null);

    private carbonMonoxide$ = new BehaviorSubject<CarbonMonoxide>(null);
    private nitrogenDioxide$ = new BehaviorSubject<NitrogenDioxide>(null);
    private ozone$ = new BehaviorSubject<Ozone>(null);
    private sulfurDioxide$ = new BehaviorSubject<SulfurDioxide>(null);

    private apiKey: string = environment.openWeatherApiKey;

    private geoCodeForCityUrl: string = "http://www.datasciencetoolkit.org/maps/api/geocode/json?address={0}";
    private currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}";
    private forecastWeatherUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}";
    private uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}";

    // e.g. https://samples.openweathermap.org/pollution/v1/co/0.0,10.0/2016-12-25T01:04:08Z.json?appid=b1b15e88fa797225412429c1c50c122a1
    private airPollutionUrl: string = "http://api.openweathermap.org/pollution/v1/%s/%s/%s.json?appid=%s";

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

    carbonMonoxide(): Observable<CarbonMonoxide> {
        return this.carbonMonoxide$;
    }

    nitrogenDioxide(): Observable<NitrogenDioxide> {
        return this.nitrogenDioxide$;
    }

    ozone(): Observable<Ozone> {
        return this.ozone$;
    }

    sulfurDioxide(): Observable<SulfurDioxide> {
        return this.sulfurDioxide$;
    }

    @validate(null)
    loadCityData(@required(ValidationRequiredType.String) cityName: string): void {
        const url = String().format(this.geoCodeForCityUrl, cityName);

        this.apiService.get<any>(url, true)
            .pipe(take(1))
            .subscribe(response => {
                if (response && response.status && response.status === "OK" && any(response.results)) {
                    const city2: City2 = response.results[0];

                    const city = new City();
                    city.name = city2.address_components[0].short_name;
                    city.country = city2.address_components[1].short_name;
                    city.coord = { lat: city2.geometry.location.lat, lon: city2.geometry.location.lng };

                    this.city$.next(city);

                    this.loadCurrentWeather();
                    this.loadForecastWeather();
                    this.loadUvIndex();
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
                    this.updateCity(null, response.coord.lat, response.coord.lon);
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
                    this.updateCity(response.city.population, response.city.coord.lat, response.city.coord.lon);
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
                    this.updateCity(null, response.lat, response.lon);
                }
            });

        return ApiCallState.Calling;
    }

    @validate(ApiCallState.Null)
    loadCarbonMonoxide(@required(ValidationRequiredType.String) dateTime: string, @required(ValidationRequiredType.Int, [0]) accuracy: number): ApiCallState {
        return this.loadAirPollution(AirPollutionType.CarbonMonoxide, dateTime, accuracy);
    }

    @validate(ApiCallState.Null)
    loadNitrogenDioxide(@required(ValidationRequiredType.String) dateTime: string, @required(ValidationRequiredType.Int, [0]) accuracy: number): ApiCallState {
        return this.loadAirPollution(AirPollutionType.NitrogenDioxide, dateTime, accuracy);
    }

    @validate(ApiCallState.Null)
    loadOzone(@required(ValidationRequiredType.String) dateTime: string, @required(ValidationRequiredType.Int, [0]) accuracy: number): ApiCallState {
        return this.loadAirPollution(AirPollutionType.Ozone, dateTime, accuracy);
    }

    @validate(ApiCallState.Null)
    loadSulfurDioxide(@required(ValidationRequiredType.String) dateTime: string, @required(ValidationRequiredType.Int, [0]) accuracy: number): ApiCallState {
        return this.loadAirPollution(AirPollutionType.SulfurDioxide, dateTime, accuracy);
    }

    @validate(ApiCallState.Null)
    private loadAirPollution<T>(
        @required(ValidationRequiredType.Enum) airPollutionType: AirPollutionType,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number): ApiCallState {

        if (!this.city$.value || !this.city$.value.isCoordSet()) {
            return ApiCallState.CoordNotSet;
        }

        if (!this.apiKey) {
            return ApiCallState.NoOpenWeatherApiKey;
        }

        const city = this.city$.value;
        const url = String().format(this.airPollutionUrl,
            airPollutionType.toString(),
            city.coord.lat.toFixed(accuracy), city.coord.lon.toFixed(accuracy),
            dateTime,
            this.apiKey);

        this.apiService.get<T>(url)
            .pipe(take(1))
            .subscribe(response => {
                if (response) {
                    switch (airPollutionType) {
                        case AirPollutionType.CarbonMonoxide: {
                            this.carbonMonoxide$.next(<CarbonMonoxide><any>response);
                            break;
                        }
                        case AirPollutionType.NitrogenDioxide: {
                            this.nitrogenDioxide$.next(<NitrogenDioxide><any>response);
                            break;
                        }
                        case AirPollutionType.Ozone: {
                            this.ozone$.next(<Ozone><any>response);
                            break;
                        }
                        case AirPollutionType.SulfurDioxide: {
                            this.sulfurDioxide$.next(<SulfurDioxide><any>response);
                            break;
                        }
                        default: {
                            throw Error(`${airPollutionType} is not implemented!`);
                        }
                    }
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

    private updateCity(population?: number, lat?: number, lon?: number): void {
        const city = this.city$.value;
        if (population) {
            city.population = population;
        }
        if (lat) {
            city.coord.lat = lat;
        }
        if (lon) {
            city.coord.lon = lon;
        }
        this.city$.next(city);
    }
}
