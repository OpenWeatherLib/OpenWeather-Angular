import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
import MockValues from "@lib/mock/values.mock";

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

    it("isDefault should return true", () => {
        // Arrange
        const city = new City();

        // Act
        const isDefault = city.isDefault();

        // Assert
        expect(isDefault).toBeTruthy();
    });

    it("isDefault should return false", () => {
        // Arrange
        const city = new City();
        city.geoLocation = MockValues.geoLocation();

        // Act
        const isDefault = city.isDefault();

        // Assert
        expect(isDefault).toBeFalsy();
    });
});
