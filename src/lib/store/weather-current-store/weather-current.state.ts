import { WeatherCurrent } from "@lib/models";

export interface WeatherCurrentState {
    weatherCurrent?: WeatherCurrent;
    isLoading?: boolean;
    error?: any;
}

export const initialState: WeatherCurrentState = {
    weatherCurrent: undefined,
    isLoading: false,
    error: undefined
};
