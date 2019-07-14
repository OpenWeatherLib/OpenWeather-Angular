import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import WeatherCondition from "@lib/enums/weather-condition.enum";
import { WeatherForecast, WeatherForecastPart } from "@lib/models";
import { WeatherForecastState } from "./weather-forecast.state";

export const selectorKey: string = "weather-forecast";

export const weatherForecast = (state: WeatherForecastState): WeatherForecast => state.weatherForecast;
export const weatherForecastList = (state: WeatherForecastState): WeatherForecastPart[] => state.weatherForecastList;
export const mostWeatherCondition = (state: WeatherForecastState): WeatherCondition => state.mostWeatherCondition;
export const filter = (state: WeatherForecastState): string => state.filter;
export const isLoading = (state: WeatherForecastState): boolean => state.isLoading;
export const error = (state: WeatherForecastState): any => state.error;

export const selectWeatherForecastState: MemoizedSelector<object, WeatherForecastState> = createFeatureSelector<WeatherForecastState>(selectorKey);

export const selectWeatherForecast: MemoizedSelector<object, WeatherForecast> = createSelector(selectWeatherForecastState, weatherForecast);
export const selectWeatherForecastList: MemoizedSelector<object, WeatherForecastPart[]> = createSelector(selectWeatherForecastState, weatherForecastList);
export const selectMostWeatherCondition: MemoizedSelector<object, WeatherCondition> = createSelector(selectWeatherForecastState, mostWeatherCondition);
export const selectFilter: MemoizedSelector<object, string> = createSelector(selectWeatherForecastState, filter);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectWeatherForecastState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectWeatherForecastState, error);
