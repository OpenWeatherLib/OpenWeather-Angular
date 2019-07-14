import { City, UvIndex } from "@lib/models";
import { loadUvIndexRequestAction, loadUvIndexSuccessAction, loadUvIndexErrorAction } from "./uv-index.actions";
import { uvIndexReducer } from "./uv-index.reducer";
import { UvIndexState } from "./uv-index.state";

describe("UvIndex Reducer Tests", () => {

    const initialState: UvIndexState = {
        uvIndex: undefined,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = uvIndexReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadUvIndexRequestAction({ city: {} as City });
            const loadSuccess = loadUvIndexSuccessAction({ uvIndex: {} as UvIndex });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(uvIndexReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadUvIndexRequestAction({ city: {} as City });
            const loadError = loadUvIndexErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(uvIndexReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
