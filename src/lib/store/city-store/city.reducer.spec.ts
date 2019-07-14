import { City } from "@lib/models";
import { loadCityRequestAction, loadCitySuccessAction, loadCityErrorAction } from "./city.actions";
import { cityReducer } from "./city.reducer";
import { CityState } from "./city.state";

describe("Image Reducer Tests", () => {

    const initialState: CityState = {
        city: {} as City,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = cityReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadCityRequestAction({ cityName: "Nuremberg" });
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(cityReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should save error on error of loading", () => {
            // Arrange
            const loadRequest = loadCityRequestAction({ cityName: "Nuremberg" });
            const loadError = loadCityErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(cityReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
