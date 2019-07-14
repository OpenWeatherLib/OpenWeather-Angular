import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "@environments/environment";
import { validate, required } from "@lib/decorator";
import { AirPollutionType, ApiCallState, ValidationRequiredType } from "@lib/enums";
import WeatherCondition from "@lib/enums/weather-condition.enum";
import { format, isCoordSet, isNameSet } from "@lib/helper";
import { CarbonMonoxide, City, NitrogenDioxide, Ozone, SulfurDioxide, UvIndex, WeatherCurrent, WeatherForecast, WeatherForecastPart } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

@Injectable()
export class OpenWeatherService {

    constructor(private readonly apiService: ApiService) { }

    @validate(of(undefined))
    loadCarbonMonoxide(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number): Observable<CarbonMonoxide> {
        return this.loadAirPollution<CarbonMonoxide>(city, AirPollutionType.CarbonMonoxide, dateTime, accuracy);
    }

    @validate(of(undefined))
    loadNitrogenDioxide(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number): Observable<NitrogenDioxide> {
        return this.loadAirPollution<NitrogenDioxide>(city, AirPollutionType.NitrogenDioxide, dateTime, accuracy);
    }

    @validate(of(undefined))
    loadOzone(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number): Observable<Ozone> {
        return this.loadAirPollution<Ozone>(city, AirPollutionType.Ozone, dateTime, accuracy);
    }

    @validate(of(undefined))
    loadSulfurDioxide(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number): Observable<SulfurDioxide> {
        return this.loadAirPollution<SulfurDioxide>(city, AirPollutionType.SulfurDioxide, dateTime, accuracy);
    }

    @validate(of(undefined))
    loadUvIndex(@required(ValidationRequiredType.Object) city: City): Observable<UvIndex> {
        if (!isCoordSet(city)) {
            throwError(ApiCallState.CoordNotSet);
        }

        if (!environment.keys.openWeatherApi) {
            throwError(ApiCallState.NoOpenWeatherApiKey);
        }

        return this.apiService
            .get<UvIndex>(format(environment.urls.apis.uvIndex, city.coord.lat.toFixed(2), city.coord.lon.toFixed(2), environment.keys.openWeatherApi));
    }

    @validate(of(undefined))
    loadWeatherCurrent(@required(ValidationRequiredType.Object) city: City): Observable<WeatherCurrent> {
        if (!isNameSet(city)) {
            throwError(ApiCallState.CityNotSet);
        }

        if (!environment.keys.openWeatherApi) {
            throwError(ApiCallState.NoOpenWeatherApiKey);
        }

        return this.apiService
            .get<WeatherCurrent>(format(environment.urls.apis.currentWeather, city.name, environment.keys.openWeatherApi))
            .pipe(
                map((response: WeatherCurrent) => {
                    if (!!response) {
                        response.weatherCondition = WeatherCondition.getByDescription(response.weather[0].description);
                    }
                    return response;
                }));
    }

    @validate(of(undefined))
    loadWeatherForecast(@required(ValidationRequiredType.Object) city: City): Observable<WeatherForecast> {
        if (!isCoordSet(city)) {
            throwError(ApiCallState.CoordNotSet);
        }

        if (!environment.keys.openWeatherApi) {
            throwError(ApiCallState.NoOpenWeatherApiKey);
        }

        return this.apiService
            .get<WeatherForecast>(format(environment.urls.apis.weatherForecast, city.name, environment.keys.openWeatherApi))
            .pipe(
                map((response: WeatherForecast) => {
                    if (!!response) {
                        response.list.forEach((weatherForecastPart: WeatherForecastPart) => weatherForecastPart.weatherCondition = WeatherCondition.getByDescription(weatherForecastPart.weather[0].description));
                    }
                    return response;
                }));
    }

    @validate(of(undefined))
    private loadAirPollution<T>(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.Enum) airPollutionType: AirPollutionType,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number): Observable<T> {

        if (!isCoordSet(city)) {
            throwError(ApiCallState.CoordNotSet);
        }

        if (!environment.keys.openWeatherApi) {
            throwError(ApiCallState.NoOpenWeatherApiKey);
        }

        return this.apiService
            .get<T>(format(
                environment.urls.apis.airPollution,
                airPollutionType.toString(),
                `${city.coord.lat.toFixed(accuracy)}, ${city.coord.lon.toFixed(accuracy)}`,
                dateTime,
                environment.keys.openWeatherApi));
    }
}
