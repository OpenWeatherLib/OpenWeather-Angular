import { City, WeatherCurrent, WeatherForecast } from "@lib/models";
import { loadWeatherCurrentSuccessAction } from "../weather-current-store/weather-current.actions";
import { loadWeatherForecastSuccessAction } from "../weather-forecast-store/weather-forecast.actions";
import { loadCityRequestAction, loadCitySuccessAction, loadCityErrorAction } from "./city.actions";
import { cityReducer } from "./city.reducer";
import { CityState } from "./city.state";

describe("Image Reducer Tests", () => {

    const initialState: CityState = {
        city: { coord: { lat: 0, lon: 0 } } as City,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: CityState = cityReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadCityRequestAction({ cityName: "Nuremberg" });
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState: CityState = [loadRequest, loadSuccess].reduce(cityReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should save error on error of loading", () => {
            // Arrange
            const loadRequest = loadCityRequestAction({ cityName: "Nuremberg" });
            const loadError = loadCityErrorAction({ error: "Error" });

            // Act
            const testState: CityState = [loadRequest, loadError].reduce(cityReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set city on loadWeatherCurrentSuccessAction", () => {
            // Arrange
            const loadWeatherCurrentSuccess = loadWeatherCurrentSuccessAction({ weatherCurrent: { coord: { lat: 5, lon: 7 } } as WeatherCurrent });

            // Act
            const testState: CityState = [loadWeatherCurrentSuccess].reduce(cityReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set city on loadWeatherForecastSuccessAction", () => {
            // Arrange
            const loadWeatherForecastSuccess = loadWeatherForecastSuccessAction({ weatherForecast: { city: { population: 27, coord: { lat: 4, lon: 6 } } } as WeatherForecast });

            // Act
            const testState: CityState = [loadWeatherForecastSuccess].reduce(cityReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
