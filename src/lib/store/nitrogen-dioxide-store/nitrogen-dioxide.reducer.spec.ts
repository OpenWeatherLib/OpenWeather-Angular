import { City, NitrogenDioxide } from "@lib/models";
import { loadNitrogenDioxideRequestAction, loadNitrogenDioxideSuccessAction, loadNitrogenDioxideErrorAction } from "./nitrogen-dioxide.actions";
import { nitrogenDioxideReducer } from "./nitrogen-dioxide.reducer";
import { NitrogenDioxideState } from "./nitrogen-dioxide.state";

describe("NitrogenDioxide Reducer Tests", () => {

    const initialState: NitrogenDioxideState = {
        nitrogenDioxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = nitrogenDioxideReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadNitrogenDioxideRequestAction({ city: {} as City });
            const loadSuccess = loadNitrogenDioxideSuccessAction({ nitrogenDioxide: {} as NitrogenDioxide });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(nitrogenDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadNitrogenDioxideRequestAction({ city: {} as City });
            const loadError = loadNitrogenDioxideErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(nitrogenDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
