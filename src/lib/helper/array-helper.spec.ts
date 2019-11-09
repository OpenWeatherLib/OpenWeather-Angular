import { any } from "./array-helper";

describe("any", () => {
    test.each([
        ["should return true for filled number array", true, [0, 1, 2, 3, 4]],
        ["should return false for empty array", false, []],
        ["should return false for null", false, null],
        ["should return false for undefined", false, undefined]
    ])("%s", (_: string, expected: boolean, array: any[]) => {
        // Arrange & Act
        const actual: boolean = any(array);

        // Assert
        expect(actual).toBe(expected);
    });
});
