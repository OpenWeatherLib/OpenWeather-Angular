import { isNullOrEmpty, format } from "./string-helper";

describe("StringExtension", () => {
    test("isNullOrEmpty should return true if string is empty", () => {
        // Arrange & Act
        const actual = isNullOrEmpty("");

        // Assert
        expect(actual).toBeTruthy();
    });

    test("isNullOrEmpty should return false if string has value", () => {
        // Arrange & Act
        const actual = isNullOrEmpty("Test");

        // Assert
        expect(actual).toBeFalsy();
    });

    test("format should return value as expected", () => {
        // Arrange & Act
        const actual = format("{0} {1}", "Hello", "World");

        // Assert
        expect(actual).toBe("Hello World");
    });
});
