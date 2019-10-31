import { City, NitrogenDioxide } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadNitrogenDioxideRequestAction, loadNitrogenDioxideSuccessAction, loadNitrogenDioxideErrorAction, setAccuracy, setDateTime } from "./nitrogen-dioxide.actions";
import { nitrogenDioxideReducer } from "./nitrogen-dioxide.reducer";
import { NitrogenDioxideState } from "./nitrogen-dioxide.state";

describe("NitrogenDioxide Reducer Tests", () => {

    const initialState: NitrogenDioxideState = {
        nitrogenDioxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: false,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: NitrogenDioxideState = nitrogenDioxideReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadNitrogenDioxideRequestAction({ city: {} as City });
            const loadSuccess = loadNitrogenDioxideSuccessAction({ nitrogenDioxide: {} as NitrogenDioxide });

            // Act
            const testState: NitrogenDioxideState = [loadRequest, loadSuccess].reduce(nitrogenDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadNitrogenDioxideRequestAction({ city: {} as City });
            const loadError = loadNitrogenDioxideErrorAction({ error: "Error" });

            // Act
            const testState: NitrogenDioxideState = [loadRequest, loadError].reduce(nitrogenDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set loading to true on loadCitySuccessAction", () => {
            // Arrange
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState: NitrogenDioxideState = [loadSuccess].reduce(nitrogenDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set accuracy on setAccuracy", () => {
            // Arrange
            const setAccuracyAction = setAccuracy({ accuracy: 7 });

            // Act
            const testState: NitrogenDioxideState = [setAccuracyAction].reduce(nitrogenDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set dateTime on setDateTime", () => {
            // Arrange
            const setDateTimeAction = setDateTime({ dateTime: "DateTime" });

            // Act
            const testState: NitrogenDioxideState = [setDateTimeAction].reduce(nitrogenDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
