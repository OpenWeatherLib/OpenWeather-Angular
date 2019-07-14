import { any } from "./array-helper";

describe("any", () => {
    test("should return true if one or more entries in array", () => {
        // Arrange
        const testArray = [0, 1, 2, 3, 4];

        // Act
        const actual = any(testArray);

        // Assert
        expect(actual).toBeTruthy();
    });

    test("should return false if no entry is in array", () => {
        // Arrange
        const testArray = [];

        // Act
        const actual = any(testArray);

        // Assert
        expect(actual).toBeFalsy();
    });

    test("should return false for null", () => {
        // Arrange + Act
        const actual = any(null);

        // Assert
        expect(actual).toBeFalsy();
    });
});
