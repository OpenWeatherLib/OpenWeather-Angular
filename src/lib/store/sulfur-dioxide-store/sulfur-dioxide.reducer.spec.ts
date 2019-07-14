import { City, SulfurDioxide } from "@lib/models";
import { loadSulfurDioxideRequestAction, loadSulfurDioxideSuccessAction, loadSulfurDioxideErrorAction } from "./sulfur-dioxide.actions";
import { sulfurDioxideReducer } from "./sulfur-dioxide.reducer";
import { SulfurDioxideState } from "./sulfur-dioxide.state";

describe("SulfurDioxide Reducer Tests", () => {

    const initialState: SulfurDioxideState = {
        sulfurDioxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = sulfurDioxideReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadSulfurDioxideRequestAction({ city: {} as City });
            const loadSuccess = loadSulfurDioxideSuccessAction({ sulfurDioxide: {} as SulfurDioxide });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(sulfurDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadSulfurDioxideRequestAction({ city: {} as City });
            const loadError = loadSulfurDioxideErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(sulfurDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
