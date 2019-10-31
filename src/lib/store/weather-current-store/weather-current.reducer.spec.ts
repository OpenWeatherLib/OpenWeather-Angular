import { City, WeatherCurrent } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadWeatherCurrentRequestAction, loadWeatherCurrentSuccessAction, loadWeatherCurrentErrorAction } from "./weather-current.actions";
import { weatherCurrentReducer } from "./weather-current.reducer";
import { WeatherCurrentState } from "./weather-current.state";

describe("WeatherCurrent Reducer Tests", () => {

    const initialState: WeatherCurrentState = {
        weatherCurrent: undefined,
        isLoading: false,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: WeatherCurrentState = weatherCurrentReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadWeatherCurrentRequestAction({ city: {} as City });
            const loadSuccess = loadWeatherCurrentSuccessAction({ weatherCurrent: {} as WeatherCurrent });

            // Act
            const testState: WeatherCurrentState = [loadRequest, loadSuccess].reduce(weatherCurrentReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadWeatherCurrentRequestAction({ city: {} as City });
            const loadError = loadWeatherCurrentErrorAction({ error: "Error" });

            // Act
            const testState: WeatherCurrentState = [loadRequest, loadError].reduce(weatherCurrentReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set loading to true on loadCitySuccessAction", () => {
            // Arrange
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState: WeatherCurrentState = [loadSuccess].reduce(weatherCurrentReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
