import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
import MockValues from "@lib/mock/values.mock";

import { WeatherForecast } from "./weather-forecast";

describe("WeatherForecast", () => {
    let classToTest: WeatherForecast;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        classToTest = new WeatherForecast();
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
        const weatherForecast = new WeatherForecast();

        // Act
        const isDefault = weatherForecast.isDefault();

        // Assert
        expect(isDefault).toBeTruthy();
    });

    it("isDefault should return false", () => {
        // Arrange
        const weatherForecast = new WeatherForecast();
        weatherForecast.city = MockValues.city();

        // Act
        const isDefault = weatherForecast.isDefault();

        // Assert
        expect(isDefault).toBeFalsy();
    });
});
