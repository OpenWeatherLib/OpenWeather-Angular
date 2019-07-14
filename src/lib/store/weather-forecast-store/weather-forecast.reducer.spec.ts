import WeatherCondition from "@lib/enums/weather-condition.enum";
import { City, WeatherForecast } from "@lib/models";
import { loadWeatherForecastRequestAction, loadWeatherForecastSuccessAction, loadWeatherForecastErrorAction } from "./weather-forecast.actions";
import { weatherForecastReducer } from "./weather-forecast.reducer";
import { WeatherForecastState } from "./weather-forecast.state";

describe("WeatherForecast Reducer Tests", () => {

    const initialState: WeatherForecastState = {
        weatherForecast: undefined,
        weatherForecastList: [],
        mostWeatherCondition: WeatherCondition.null,
        filter: undefined,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = weatherForecastReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadWeatherForecastRequestAction({ city: {} as City });
            const loadSuccess = loadWeatherForecastSuccessAction({ weatherForecast: {} as WeatherForecast });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(weatherForecastReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadWeatherForecastRequestAction({ city: {} as City });
            const loadError = loadWeatherForecastErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(weatherForecastReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
