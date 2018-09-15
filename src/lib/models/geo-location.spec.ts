import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
// import MockValues from "@lib/mock/values.mock";

import { GeoLocation } from "./geo-location";

describe("GeoLocation", () => {
    let classToTest: GeoLocation;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        classToTest = new GeoLocation();
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
        const geoLocation = new GeoLocation();

        // Act
        const isDefault = geoLocation.isDefault();

        // Assert
        expect(isDefault).toBeTruthy();
    });

    it("isDefault should return false", () => {
        // Arrange
        const geoLocation = new GeoLocation();
        geoLocation.lat = 42.00;

        // Act
        const isDefault = geoLocation.isDefault();

        // Assert
        expect(isDefault).toBeFalsy();
    });
});
