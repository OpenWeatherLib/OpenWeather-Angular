import { City, Ozone } from "@lib/models";
import { loadOzoneRequestAction, loadOzoneSuccessAction, loadOzoneErrorAction } from "./ozone.actions";
import { ozoneReducer } from "./ozone.reducer";
import { OzoneState } from "./ozone.state";

describe("Ozone Reducer Tests", () => {

    const initialState: OzoneState = {
        ozone: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState = ozoneReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadOzoneRequestAction({ city: {} as City });
            const loadSuccess = loadOzoneSuccessAction({ ozone: {} as Ozone });

            // Act
            const testState = [loadRequest, loadSuccess].reduce(ozoneReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadOzoneRequestAction({ city: {} as City });
            const loadError = loadOzoneErrorAction({ error: "Error" });

            // Act
            const testState = [loadRequest, loadError].reduce(ozoneReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
