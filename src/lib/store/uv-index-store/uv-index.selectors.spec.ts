import { selectUvIndex, selectIsLoading, selectError } from "./uv-index.selectors";
import { UvIndexState } from "./uv-index.state";

describe("UvIndex Selector Tests", () => {

    const initialState: UvIndexState = {
        uvIndex: undefined,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectUvIndex", () => {
        test("should return uv index", () => {
            // Act
            const result = selectUvIndex.projector(initialState);

            // Assert
            expect(result).toBe(initialState.uvIndex);
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
