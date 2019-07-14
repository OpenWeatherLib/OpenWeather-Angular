import { selectSulfurDioxide, selectAccuracy, selectDateTime, selectIsLoading, selectError } from "./sulfur-dioxide.selectors";
import { SulfurDioxideState } from "./sulfur-dioxide.state";

describe("SulfurDioxide Selector Tests", () => {

    const initialState: SulfurDioxideState = {
        sulfurDioxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectSulfurDioxide", () => {
        test("should return sulfurDioxide", () => {
            // Act
            const result = selectSulfurDioxide.projector(initialState);

            // Assert
            expect(result).toBe(initialState.sulfurDioxide);
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
