import { selectWeatherCurrent, selectIsLoading, selectError } from "./weather-current.selectors";
import { WeatherCurrentState } from "./weather-current.state";

describe("WeatherCurrent Selector Tests", () => {

    const initialState: WeatherCurrentState = {
        weatherCurrent: undefined,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectWeatherCurrent", () => {
        test("should return weather forecast", () => {
            // Act
            const result = selectWeatherCurrent.projector(initialState);

            // Assert
            expect(result).toBe(initialState.weatherCurrent);
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
