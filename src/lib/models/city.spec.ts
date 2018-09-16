import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { City } from "./city";

describe("City", () => {
    let classToTest: City;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        classToTest = new City();
    });

    afterEach(() => {
        serviceMockList.forEach(serviceMock => {
            for (const propertyName in serviceMock) {
                if (serviceMock.hasOwnProperty(propertyName)) {
                    serviceMock[propertyName].calls.reset();
                    serviceMock[propertyName].and.stub();
                }
            }
        });
    });

    it("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });

    it("isNameSet should return false", () => {
        // Arrange
        const city = new City();

        // Act
        const isNameSet = city.isNameSet();

        // Assert
        expect(isNameSet).toBeFalsy();
    });

    it("isNameSet should return true", () => {
        // Arrange
        const city = new City();
        city.name = "Nuremberg";

        // Act
        const isNameSet = city.isNameSet();

        // Assert
        expect(isNameSet).toBeTruthy();
    });

    it("isCoordSet should return false", () => {
        // Arrange
        const city = new City();

        // Act
        const isCoordSet = city.isCoordSet();

        // Assert
        expect(isCoordSet).toBeFalsy();
    });

    it("isCoordSet should return true", () => {
        // Arrange
        const city = new City();
        city.coord = { lat: 45.324, lon: 32.1 };

        // Act
        const isCoordSet = city.isCoordSet();

        // Assert
        expect(isCoordSet).toBeTruthy();
    });
});
