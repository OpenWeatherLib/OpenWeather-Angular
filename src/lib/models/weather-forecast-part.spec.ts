import { TestBed } from "@angular/core/testing";

// import MockServices from "../mock/services.mock";
// import MockValues from "../mock/values.mock";

import { WeatherForecastPart } from "./weather-forecast-part";

describe("WeatherForecastPart", () => {
    let classToTest: WeatherForecastPart;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        classToTest = new WeatherForecastPart();
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
        const weatherForecastPart = new WeatherForecastPart();

        // Act
        const isDefault = weatherForecastPart.isDefault();

        // Assert
        expect(isDefault).toBeTruthy();
    });

    it("isDefault should return false", () => {
        // Arrange
        const weatherForecastPart = new WeatherForecastPart();
        weatherForecastPart.description = "420";

        // Act
        const isDefault = weatherForecastPart.isDefault();

        // Assert
        expect(isDefault).toBeFalsy();
    });
});
