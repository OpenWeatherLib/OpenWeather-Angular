import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadWeatherCurrentRequestAction, loadWeatherCurrentSuccessAction, loadWeatherCurrentErrorAction } from "./weather-current.actions";
import { initialState, WeatherCurrentState } from "./weather-current.state";

const reducer: ActionReducer<WeatherCurrentState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadWeatherCurrentRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadWeatherCurrentSuccessAction, (state, { weatherCurrent }) => ({
        ...state,
        weatherCurrent: weatherCurrent,
        isLoading: false,
        error: undefined
    })),
    on(loadWeatherCurrentErrorAction, (state, { error }) => ({
        ...state,
        weatherCurrent: undefined,
        isLoading: false,
        error
    }))
);

export function weatherCurrentReducer(state: WeatherCurrentState | undefined, action: Action): WeatherCurrentState {
    return reducer(state, action);
}
