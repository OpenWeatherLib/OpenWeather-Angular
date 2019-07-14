import { selectCarbonMonoxide, selectAccuracy, selectDateTime, selectIsLoading, selectError } from "./carbon-monoxide.selectors";
import { CarbonMonoxideState } from "./carbon-monoxide.state";

describe("CarbonMonoxide Selector Tests", () => {

    const initialState: CarbonMonoxideState = {
        carbonMonoxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectCarbonMonoxide", () => {
        test("should return carbon monoxide", () => {
            // Act
            const result = selectCarbonMonoxide.projector(initialState);

            // Assert
            expect(result).toBe(initialState.carbonMonoxide);
        });
    });

    describe("selectAccuracy", () => {
        test("should return accuracy", () => {
            // Act
            const result = selectAccuracy.projector(initialState);

            // Assert
            expect(result).toBe(initialState.accuracy);
        });
    });

    describe("selectDateTime", () => {
        test("should return datetime", () => {
            // Act
            const result = selectDateTime.projector(initialState);

            // Assert
            expect(result).toBe(initialState.dateTime);
        });
    });

    describe("selectIsLoading", () => {
        test("should return isLoading", () => {
            // Act
            const result = selectIsLoading.projector(initialState);

            // Assert
            expect(result).toBe(initialState.isLoading);
        });
    });

    describe("selectError", () => {
        test("should return error", () => {
            // Act
            const result = selectError.projector(initialState);

            // Assert
            expect(result).toBe(initialState.error);
        });
    });
});
