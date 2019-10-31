import { City, SulfurDioxide } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadSulfurDioxideRequestAction, loadSulfurDioxideSuccessAction, loadSulfurDioxideErrorAction, setAccuracy, setDateTime } from "./sulfur-dioxide.actions";
import { sulfurDioxideReducer } from "./sulfur-dioxide.reducer";
import { SulfurDioxideState } from "./sulfur-dioxide.state";

describe("SulfurDioxide Reducer Tests", () => {

    const initialState: SulfurDioxideState = {
        sulfurDioxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: false,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: SulfurDioxideState = sulfurDioxideReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadSulfurDioxideRequestAction({ city: {} as City });
            const loadSuccess = loadSulfurDioxideSuccessAction({ sulfurDioxide: {} as SulfurDioxide });

            // Act
            const testState: SulfurDioxideState = [loadRequest, loadSuccess].reduce(sulfurDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadSulfurDioxideRequestAction({ city: {} as City });
            const loadError = loadSulfurDioxideErrorAction({ error: "Error" });

            // Act
            const testState: SulfurDioxideState = [loadRequest, loadError].reduce(sulfurDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set loading to true on loadCitySuccessAction", () => {
            // Arrange
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState: SulfurDioxideState = [loadSuccess].reduce(sulfurDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set accuracy on setAccuracy", () => {
            // Arrange
            const setAccuracyAction = setAccuracy({ accuracy: 7 });

            // Act
            const testState: SulfurDioxideState = [setAccuracyAction].reduce(sulfurDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set dateTime on setDateTime", () => {
            // Arrange
            const setDateTimeAction = setDateTime({ dateTime: "DateTime" });

            // Act
            const testState: SulfurDioxideState = [setDateTimeAction].reduce(sulfurDioxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
