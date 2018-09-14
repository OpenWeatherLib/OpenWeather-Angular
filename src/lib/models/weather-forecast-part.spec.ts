import { TestBed } from "@angular/core/testing";

import MockServices from "../mock/services.mock";
import MockValues from "../mock/values.mock";

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
});
