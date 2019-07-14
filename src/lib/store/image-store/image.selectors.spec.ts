import { selectUrl, selectIsLoading, selectError } from "./image.selectors";
import { ImageState } from "./image.state";

describe("Image Selector Tests", () => {

    const initialState: ImageState = {
        url: "Test Url",
        isLoading: true,
        error: "Test Error"
    };

    describe("selectUrl", () => {
        test("should return url", () => {
            // Act
            const result = selectUrl.projector(initialState);

            // Assert
            expect(result).toBe(initialState.url);
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
