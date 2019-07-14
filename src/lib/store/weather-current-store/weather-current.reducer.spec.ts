import { City, WeatherCurrent } from "@lib/models";
import { loadWeatherCurrentRequestAction, loadWeatherCurrentSuccessAction, loadWeatherCurrentErrorAction } from "./weather-current.actions";
import { weatherCurrentReducer } from "./weather-current.reducer";
import { WeatherCurrentState } from "./weather-current.state";

describe("WeatherCurrent Reducer Tests", () => {

    const initialState: WeatherCurrentState = {
        weatherCurrent: undefined,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = weatherCurrentReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadWeatherCurrentRequestAction({ city: {} as City });
            const loadSuccess = loadWeatherCurrentSuccessAction({ weatherCurrent: {} as WeatherCurrent });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(weatherCurrentReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadWeatherCurrentRequestAction({ city: {} as City });
            const loadError = loadWeatherCurrentErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(weatherCurrentReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
