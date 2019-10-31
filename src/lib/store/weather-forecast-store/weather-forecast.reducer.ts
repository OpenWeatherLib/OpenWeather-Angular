import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import WeatherCondition from "@lib/enums/weather-condition.enum";
import { mostWeatherCondition } from "@lib/extensions/weather-forecast.extension";
import { WeatherForecast, WeatherForecastPart } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadWeatherForecastRequestAction, loadWeatherForecastSuccessAction, loadWeatherForecastErrorAction, setFilterRequestAction, clearFilterRequestAction } from "./weather-forecast.actions";
import { initialState, WeatherForecastState } from "./weather-forecast.state";

const filterWeatherForecast = (weatherForecastFilter: string, weatherForecast: WeatherForecast): {
    weatherForecastList: WeatherForecastPart[];
    mostWeatherCondition: WeatherCondition;
} => {

    const weatherForecastList = !!weatherForecast
        ? !!weatherForecastFilter
            ? weatherForecast.list.filter((weatherForecastPart: WeatherForecastPart) => JSON.stringify(weatherForecastPart).indexOf(weatherForecastFilter) !== -1)
            : weatherForecast.list
        : [];

    return { weatherForecastList: weatherForecastList, mostWeatherCondition: mostWeatherCondition(weatherForecastList) };
};

const reducer: ActionReducer<WeatherForecastState, Action> = createReducer(
    initialState,
    on(loadCitySuccessAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadWeatherForecastRequestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadWeatherForecastSuccessAction, (state, { weatherForecast }) => {
        const filteredWeatherForecast = filterWeatherForecast(undefined, weatherForecast);
        return {
            ...state,
            weatherForecast: weatherForecast,
            weatherForecastList: filteredWeatherForecast.weatherForecastList,
            mostWeatherCondition: filteredWeatherForecast.mostWeatherCondition,
            filter: undefined,
            isLoading: false,
            error: undefined
        };
    }),
    on(loadWeatherForecastErrorAction, (state, { error }) => ({
        ...state,
        city: undefined,
        isLoading: false,
        error: error
    })),
    on(setFilterRequestAction, (state, { filter }) => {
        const filteredWeatherForecast = filterWeatherForecast(filter, state.weatherForecast);
        return {
            ...state,
            weatherForecastList: filteredWeatherForecast.weatherForecastList,
            mostWeatherCondition: filteredWeatherForecast.mostWeatherCondition,
            filter
        };
    }),
    on(clearFilterRequestAction, (state) => {
        const filteredWeatherForecast = filterWeatherForecast(undefined, state.weatherForecast);
        return {
            ...state,
            weatherForecastList: filteredWeatherForecast.weatherForecastList,
            mostWeatherCondition: filteredWeatherForecast.mostWeatherCondition,
            filter: undefined
        };
    })
);

export function weatherForecastReducer(state: WeatherForecastState | undefined, action: Action): WeatherForecastState {
    return reducer(state, action);
}
