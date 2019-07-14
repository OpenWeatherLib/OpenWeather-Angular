import WeatherCondition from "@lib/enums/weather-condition.enum";
import { WeatherForecast, WeatherForecastPart } from "@lib/models";

export interface WeatherForecastState {
    weatherForecast?: WeatherForecast;
    weatherForecastList: WeatherForecastPart[];
    mostWeatherCondition: WeatherCondition;
    filter?: string;
    isLoading?: boolean;
    error?: any;
}

export const initialState: WeatherForecastState = {
    weatherForecast: undefined,
    weatherForecastList: [],
    mostWeatherCondition: WeatherCondition.null,
    filter: undefined,
    isLoading: false,
    error: undefined
};
