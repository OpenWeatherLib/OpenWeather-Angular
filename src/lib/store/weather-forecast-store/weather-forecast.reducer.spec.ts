import WeatherCondition from "@lib/enums/weather-condition.enum";
import { City, WeatherForecast } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadWeatherForecastRequestAction, loadWeatherForecastSuccessAction, loadWeatherForecastErrorAction, setFilterRequestAction, clearFilterRequestAction } from "./weather-forecast.actions";
import { weatherForecastReducer } from "./weather-forecast.reducer";
import { WeatherForecastState } from "./weather-forecast.state";

describe("WeatherForecast Reducer Tests", () => {

    const initialState: WeatherForecastState = {
        weatherForecast: undefined,
        weatherForecastList: [],
        mostWeatherCondition: WeatherCondition.null,
        filter: undefined,
        isLoading: false,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: WeatherForecastState = weatherForecastReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadWeatherForecastRequestAction({ city: {} as City });
            const loadSuccess = loadWeatherForecastSuccessAction({ weatherForecast: {} as WeatherForecast });

            // Act
            const testState: WeatherForecastState = [loadRequest, loadSuccess].reduce(weatherForecastReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadWeatherForecastRequestAction({ city: {} as City });
            const loadError = loadWeatherForecastErrorAction({ error: "Error" });

            // Act
            const testState: WeatherForecastState = [loadRequest, loadError].reduce(weatherForecastReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set loading to true on loadCitySuccessAction", () => {
            // Arrange
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState: WeatherForecastState = [loadSuccess].reduce(weatherForecastReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should update state on setFilterRequestAction", () => {
            // Arrange
            const filterAction = setFilterRequestAction({ filter: "Filter" });

            // Act
            const testState: WeatherForecastState = [filterAction].reduce(weatherForecastReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should update state on clearFilterRequestAction", () => {
            // Arrange
            const clearFilterAction = clearFilterRequestAction();

            // Act
            const testState: WeatherForecastState = [clearFilterAction].reduce(weatherForecastReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
