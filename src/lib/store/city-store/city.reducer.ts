import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import { City, WeatherCurrent, WeatherForecast } from "@lib/models";
import { loadWeatherCurrentSuccessAction } from "../weather-current-store/weather-current.actions";
import { loadWeatherForecastSuccessAction } from "../weather-forecast-store/weather-forecast.actions";
import { loadCityRequestAction, loadCitySuccessAction, loadCityErrorAction } from "./city.actions";
import { initialState, CityState } from "./city.state";

const updateCityFromWeatherForecast = (state: CityState, weatherForecast: WeatherForecast): City => {
    const city = state.city;
    city.population = weatherForecast.city.population;
    city.coord.lat = weatherForecast.city.coord.lat;
    city.coord.lon = weatherForecast.city.coord.lon;
    return city;
};

const updateCityFromWeatherCurrent = (state: CityState, weatherCurrent: WeatherCurrent): City => {
    const city = state.city;
    city.coord.lat = weatherCurrent.coord.lat;
    city.coord.lon = weatherCurrent.coord.lon;
    return city;
};

const reducer: ActionReducer<CityState, Action> = createReducer(
    initialState,
    on(loadCityRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadCitySuccessAction, (state, { city }) => ({
        ...state,
        city: city,
        isLoading: false,
        error: undefined
    })),
    on(loadCityErrorAction, (state, { error }) => ({
        ...state,
        city: undefined,
        isLoading: false,
        error: error
    })),
    on(loadWeatherForecastSuccessAction, (state, { weatherForecast }) => ({
        ...state,
        city: updateCityFromWeatherForecast(state, weatherForecast)
    })),
    on(loadWeatherCurrentSuccessAction, (state, { weatherCurrent }) => ({
        ...state,
        city: updateCityFromWeatherCurrent(state, weatherCurrent)
    }))
);

export function cityReducer(state: CityState | undefined, action: Action): CityState {
    return reducer(state, action);
}
