import WeatherCondition from "@lib/enums/weather-condition.enum";
import { selectWeatherForecast, selectWeatherForecastList, selectMostWeatherCondition, selectFilter, selectIsLoading, selectError } from "./weather-forecast.selectors";
import { WeatherForecastState } from "./weather-forecast.state";

describe("WeatherForecast Selector Tests", () => {

    const initialState: WeatherForecastState = {
        weatherForecast: undefined,
        weatherForecastList: [],
        mostWeatherCondition: WeatherCondition.null,
        filter: undefined,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectWeatherForecast", () => {
        test("should return weather forecast", () => {
            // Act
            const result = selectWeatherForecast.projector(initialState);

            // Assert
            expect(result).toBe(initialState.weatherForecast);
        });
    });

    describe("selectWeatherForecastList", () => {
        test("should return weather forecast list", () => {
            // Act
            const result = selectWeatherForecastList.projector(initialState);

            // Assert
            expect(result).toBe(initialState.weatherForecastList);
        });
    });

    describe("selectMostWeatherCondition", () => {
        test("should return most weather condtion", () => {
            // Act
            const result = selectMostWeatherCondition.projector(initialState);

            // Assert
            expect(result).toBe(initialState.mostWeatherCondition);
        });
    });

    describe("selectFilter", () => {
        test("should return filter", () => {
            // Act
            const result = selectFilter.projector(initialState);

            // Assert
            expect(result).toBe(initialState.filter);
        });
    });

    describe("selectIsLoading", () => {
        test("should return isLoading", () => {
            // Act
            const result = selectIsLoading.projector(initialState);

            // Assert
            expect(result).toBe(initialState.isLoading);
        });
    });

    describe("selectError", () => {
        test("should return error", () => {
            // Act
            const result = selectError.projector(initialState);

            // Assert
            expect(result).toBe(initialState.error);
        });
    });
});
