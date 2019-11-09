import { isNullOrEmpty, format } from "./string-helper";

describe("isNullOrEmpty", () => {
    test("should return true if string is empty", () => {
        // Arrange & Act
        const actual: boolean = isNullOrEmpty("");

        // Assert
        expect(actual).toBeTruthy();
    });

    test("should return false if string has value", () => {
        // Arrange & Act
        const actual: boolean = isNullOrEmpty("Test");

        // Assert
        expect(actual).toBeFalsy();
    });
});

describe("format", () => {
    test("format should return value as expected", () => {
        // Arrange & Act
        const actual: string = format("{0} {1}", "Hello", "World");

        // Assert
        expect(actual).toBe("Hello World");
    });
});
