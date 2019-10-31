import { City, CarbonMonoxide } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadCarbonMonoxideRequestAction, loadCarbonMonoxideSuccessAction, loadCarbonMonoxideErrorAction, setAccuracy, setDateTime } from "./carbon-monoxide.actions";
import { carbonMonoxideReducer } from "./carbon-monoxide.reducer";
import { CarbonMonoxideState } from "./carbon-monoxide.state";

describe("CarbonMonoxide Reducer Tests", () => {

    const initialState: CarbonMonoxideState = {
        carbonMonoxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: false,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: CarbonMonoxideState = carbonMonoxideReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load city on success of loading", () => {
            // Arrange
            const loadRequest = loadCarbonMonoxideRequestAction({ city: {} as City });
            const loadSuccess = loadCarbonMonoxideSuccessAction({ carbonMonoxide: {} as CarbonMonoxide });

            // Act
            const testState: CarbonMonoxideState = [loadRequest, loadSuccess].reduce(carbonMonoxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should save error on error of loading", () => {
            // Arrange
            const loadRequest = loadCarbonMonoxideRequestAction({ city: {} as City });
            const loadError = loadCarbonMonoxideErrorAction({ error: "Error" });

            // Act
            const testState: CarbonMonoxideState = [loadRequest, loadError].reduce(carbonMonoxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set loading to true on loadCitySuccessAction", () => {
            // Arrange
            const loadSuccess = loadCitySuccessAction({ city: {} as City });

            // Act
            const testState: CarbonMonoxideState = [loadSuccess].reduce(carbonMonoxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set accuracy on setAccuracy", () => {
            // Arrange
            const setAccuracyAction = setAccuracy({ accuracy: 7 });

            // Act
            const testState: CarbonMonoxideState = [setAccuracyAction].reduce(carbonMonoxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set dateTime on setDateTime", () => {
            // Arrange
            const setDateTimeAction = setDateTime({ dateTime: "DateTime" });

            // Act
            const testState: CarbonMonoxideState = [setDateTimeAction].reduce(carbonMonoxideReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
