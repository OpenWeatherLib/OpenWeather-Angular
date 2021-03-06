import { selectNitrogenDioxide, selectAccuracy, selectDateTime, selectIsLoading, selectError } from "./nitrogen-dioxide.selectors";
import { NitrogenDioxideState } from "./nitrogen-dioxide.state";

describe("NitrogenDioxide Selector Tests", () => {

    const initialState: NitrogenDioxideState = {
        nitrogenDioxide: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectNitrogenDioxide", () => {
        test("should return nitrogenDioxide", () => {
            // Act
            const result = selectNitrogenDioxide.projector(initialState);

            // Assert
            expect(result).toBe(initialState.nitrogenDioxide);
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
