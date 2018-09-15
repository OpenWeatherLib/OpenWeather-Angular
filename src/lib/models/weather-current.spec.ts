import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
import MockValues from "@lib/mock/values.mock";

import { WeatherCurrent } from "./weather-current";

describe("WeatherCurrent", () => {
    let classToTest: WeatherCurrent;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        classToTest = new WeatherCurrent();
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
        const weatherCurrent = new WeatherCurrent();

        // Act
        const isDefault = weatherCurrent.isDefault();

        // Assert
        expect(isDefault).toBeTruthy();
    });

    it("isDefault should return false", () => {
        // Arrange
        const weatherCurrent = new WeatherCurrent();
        weatherCurrent.city = MockValues.city();

        // Act
        const isDefault = weatherCurrent.isDefault();

        // Assert
        expect(isDefault).toBeFalsy();
    });
});
