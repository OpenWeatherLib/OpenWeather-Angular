import { City } from "@lib/models";
import { loadCitySuccessAction } from "../city-store/city.actions";
import { loadImageUrlSuccessAction, loadImageUrlErrorAction } from "./image.actions";
import { imageReducer } from "./image.reducer";
import { ImageState } from "./image.state";

describe("Image Reducer Tests", () => {

    const initialState: ImageState = {
        url: "Test Url",
        isLoading: true,
        error: "Test Error"
    };

    describe("State Changes", () => {
        test("should have initial state after invalid action", () => {
            // Arrange & Act
            const testState: ImageState = imageReducer(initialState, { type: "INVALID_ACTION" } as any);

            // Assert
            expect(testState).toBe(initialState);
        });

        test("should load url on success of loading", () => {
            // Arrange
            const loadRequest = loadCitySuccessAction({ city: {} as City });
            const loadSuccess = loadImageUrlSuccessAction({ url: "New URL" });

            // Act
            const testState: ImageState = [loadRequest, loadSuccess].reduce(imageReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });

        test("should set error on error of loading", () => {
            // Arrange
            const loadRequest = loadCitySuccessAction({ city: {} as City });
            const loadError = loadImageUrlErrorAction({ error: "Error" });

            // Act
            const testState: ImageState = [loadRequest, loadError].reduce(imageReducer, initialState);

            // Assert
            expect(testState).toMatchSnapshot();
        });
    });
});
