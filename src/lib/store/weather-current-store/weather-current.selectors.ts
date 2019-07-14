import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { WeatherCurrent } from "@lib/models";
import { WeatherCurrentState } from "./weather-current.state";

export const selectorKey: string = "weather-current";

export const weatherCurrent = (state: WeatherCurrentState): WeatherCurrent => state.weatherCurrent;
export const isLoading = (state: WeatherCurrentState): boolean => state.isLoading;
export const error = (state: WeatherCurrentState): any => state.error;

export const selectWeatherCurrentState: MemoizedSelector<object, WeatherCurrentState> = createFeatureSelector<WeatherCurrentState>(selectorKey);

export const selectWeatherCurrent: MemoizedSelector<object, WeatherCurrent> = createSelector(selectWeatherCurrentState, weatherCurrent);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectWeatherCurrentState, isLoading);
export const selectError: MemoizedSelector<object, string> = createSelector(selectWeatherCurrentState, error);
