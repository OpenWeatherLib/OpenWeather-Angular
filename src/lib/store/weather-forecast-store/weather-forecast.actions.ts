import { createAction, props } from "@ngrx/store";

import { City, WeatherForecast } from "@lib/models";

export const loadWeatherForecastRequestAction = createAction(
    "[WeatherForecast Api] Request",
    props<{ city: City }>()
);

export const loadWeatherForecastSuccessAction = createAction(
    "[WeatherForecast Api] Success",
    props<{ weatherForecast: WeatherForecast }>()
);

export const loadWeatherForecastErrorAction = createAction(
    "[WeatherForecast Api] Error",
    props<{ error: any }>()
);

export const setFilterRequestAction = createAction(
    "[WeatherForecast Api] Set Filter",
    props<{ filter: string }>()
);

export const clearFilterRequestAction = createAction(
    "[WeatherForecast Api] Clear Filter"
);
