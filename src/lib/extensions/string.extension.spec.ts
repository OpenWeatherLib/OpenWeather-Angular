describe("StringExtension", () => {
    it("isNullOrEmpty should return true if string is undefined", () => {
        // Arrange
        const stringToTest: string = undefined;

        // Act
        const isNullOrEmpty = stringToTest.isNullOrEmpty();

        // Assert
        expect(isNullOrEmpty).toBeTruthy();
    });

    it("isNullOrEmpty should return true if string is null", () => {
        // Arrange
        const stringToTest: string = null;

        // Act
        const isNullOrEmpty = stringToTest.isNullOrEmpty();

        // Assert
        expect(isNullOrEmpty).toBeTruthy();
    });

    it("isNullOrEmpty should return true if string is empty", () => {
        // Arrange
        const stringToTest: string = String().empty;

        // Act
        const isNullOrEmpty = stringToTest.isNullOrEmpty();

        // Assert
        expect(isNullOrEmpty).toBeTruthy();
    });

    it("isNullOrEmpty should return false if string has value", () => {
        // Arrange
        const stringToTest: string = "Test";

        // Act
        const isNullOrEmpty = stringToTest.isNullOrEmpty();

        // Assert
        expect(isNullOrEmpty).toBeFalsy();
    });

    it("format should return value as expected", () => {
        // Arrange & Act
        const format = String().format("{0} {1}", "Hello", "World");

        // Assert
        expect(format).toBe("Hello World");
    });
});
