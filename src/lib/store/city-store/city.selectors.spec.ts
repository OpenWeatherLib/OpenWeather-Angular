import { selectCity, selectIsLoading, selectError } from "./city.selectors";
import { CityState } from "./city.state";

describe("City Selector Tests", () => {

    const initialState: CityState = {
        city: undefined,
        isLoading: true,
        error: "Test Error"
    };

    describe("selectCity", () => {
        test("should return city", () => {
            // Act
            const result = selectCity.projector(initialState);

            // Assert
            expect(result).toBe(initialState.city);
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
