import { City, CarbonMonoxide } from "@lib/models";
import { loadCarbonMonoxideRequestAction, loadCarbonMonoxideSuccessAction, loadCarbonMonoxideErrorAction } from "./carbon-monoxide.actions";
import { carbonMonoxideReducer } from "./carbon-monoxide.reducer";
import { CarbonMonoxideState } from "./carbon-monoxide.state";

describe("CarbonMonoxide Reducer Tests", () => {

    const initialState: CarbonMonoxideState = {
        carbonMonoxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = carbonMonoxideReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadCarbonMonoxideRequestAction({ city: {} as City });
            const loadSuccess = loadCarbonMonoxideSuccessAction({ carbonMonoxide: {} as CarbonMonoxide });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(carbonMonoxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should save error on error of loading", () => {
            // Arrange
            const loadRequest = loadCarbonMonoxideRequestAction({ city: {} as City });
            const loadError = loadCarbonMonoxideErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(carbonMonoxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
