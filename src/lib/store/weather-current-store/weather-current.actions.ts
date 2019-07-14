import { createAction, props } from "@ngrx/store";

import { City, WeatherCurrent } from "@lib/models";

export const loadWeatherCurrentRequestAction = createAction(
    "[WeatherCurrent Api] Request",
    props<{ city: City }>()
);

export const loadWeatherCurrentSuccessAction = createAction(
    "[WeatherCurrent Api] Success",
    props<{ weatherCurrent: WeatherCurrent }>()
);

export const loadWeatherCurrentErrorAction = createAction(
    "[WeatherCurrent Api] Error",
    props<{ error: any }>()
);
