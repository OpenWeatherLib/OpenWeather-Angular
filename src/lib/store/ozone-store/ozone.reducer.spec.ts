import { City, Ozone } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadOzoneRequestAction, loadOzoneSuccessAction, loadOzoneErrorAction, setAccuracy, setDateTime } from "./ozone.actions";
import { ozoneReducer } from "./ozone.reducer";
import { OzoneState } from "./ozone.state";

describe("Ozone Reducer Tests", () => {

    const initialState: OzoneState = {
        ozone: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: false,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: OzoneState = ozoneReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadOzoneRequestAction({ city: {} as City });
            const loadSuccess = loadOzoneSuccessAction({ ozone: {} as Ozone });

            // Act
            const testState: OzoneState = [loadRequest, loadSuccess].reduce(ozoneReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadOzoneRequestAction({ city: {} as City });
            const loadError = loadOzoneErrorAction({ error: "Error" });

            // Act
            const testState: OzoneState = [loadRequest, loadError].reduce(ozoneReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set loading to true on loadCitySuccessAction", () => {
            // Arrange
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState: OzoneState = [loadSuccess].reduce(ozoneReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set accuracy on setAccuracy", () => {
            // Arrange
            const setAccuracyAction = setAccuracy({ accuracy: 7 });

            // Act
            const testState: OzoneState = [setAccuracyAction].reduce(ozoneReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set dateTime on setDateTime", () => {
            // Arrange
            const setDateTimeAction = setDateTime({ dateTime: "DateTime" });

            // Act
            const testState: OzoneState = [setDateTimeAction].reduce(ozoneReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
