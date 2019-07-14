import { selectOzone, selectAccuracy, selectDateTime, selectIsLoading, selectError } from "./ozone.selectors";
import { OzoneState } from "./ozone.state";

describe("Ozone Selector Tests", () => {

    const initialState: OzoneState = {
        ozone: undefined,
        dateTime: "2019-07-12",
        accuracy: 2,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectOzone", () => {
        test("should return ozone", () => {
            // Act
            const result = selectOzone.projector(initialState);

            // Assert
            expect(result).toBe(initialState.ozone);
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
