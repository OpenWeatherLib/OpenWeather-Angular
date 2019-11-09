import { City } from "@lib/models";
import { isCoordSet, isNameSet } from "./city-helper";

describe("isNameSet", () => {
    test("should return false", () => {
        // Arrange & Act
        const actual: boolean = isNameSet({} as City);

        // Assert
        expect(actual).toBeFalsy();
    });

    test("should return true", () => {
        // Arrange & Act
        const actual: boolean = isNameSet({ name: "Nuremberg" } as City);

        // Assert
        expect(actual).toBeTruthy();
    });
});

describe("isCoordSet", () => {
    test("should return false", () => {
        // Arrange & Act
        const actual: boolean = isCoordSet({} as City);

        // Assert
        expect(actual).toBeFalsy();
    });

    test("should return true", () => {
        // Arrange & Act
        const actual: boolean = isCoordSet({ coord: { lat: 45.324, lon: 32.1 } } as City);

        // Assert
        expect(actual).toBeTruthy();
    });
});
