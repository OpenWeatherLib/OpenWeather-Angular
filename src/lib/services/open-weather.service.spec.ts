import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { substitute } from "@lib/mock";
import { CarbonMonoxide, City, NitrogenDioxide, Ozone, SulfurDioxide, UvIndex, WeatherCurrent, WeatherForecast } from "@lib/models";
import { ApiService } from "@lib/services/api.service";
import { OpenWeatherService } from "./open-weather.service";

describe("OpenWeatherService", () => {
    let classToTest: OpenWeatherService;

    const apiServiceMock = substitute(ApiService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiServiceMock }
            ]
        });

        classToTest = new OpenWeatherService(apiServiceMock);
    });

    test("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });

    describe("loadCarbonMonoxide", () => {
        test("should call apiService and return defined data", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({} as CarbonMonoxide));

            // Act
            classToTest.loadCarbonMonoxide({ coord: { lat: 12, lon: 34 } } as City, "DateTime", 2)
                .subscribe((carbonMonoxide: CarbonMonoxide) => {
                    // Assert
                    expect(carbonMonoxide).toBeDefined();
                    done();
                });
        });
    });

    describe("loadNitrogenDioxide", () => {
        test("should call apiService and return defined data", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({} as NitrogenDioxide));

            // Act
            classToTest.loadNitrogenDioxide({ coord: { lat: 12, lon: 34 } } as City, "DateTime", 2)
                .subscribe((nitrogenDioxide: NitrogenDioxide) => {
                    // Assert
                    expect(nitrogenDioxide).toBeDefined();
                    done();
                });
        });
    });

    describe("loadOzone", () => {
        test("should call apiService and return defined data", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({} as Ozone));

            // Act
            classToTest.loadOzone({ coord: { lat: 12, lon: 34 } } as City, "DateTime", 2)
                .subscribe((ozone: Ozone) => {
                    // Assert
                    expect(ozone).toBeDefined();
                    done();
                });
        });
    });

    describe("loadSulfurDioxide", () => {
        test("should call apiService and return defined data", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({} as SulfurDioxide));

            // Act
            classToTest.loadSulfurDioxide({ coord: { lat: 12, lon: 34 } } as City, "DateTime", 2)
                .subscribe((sulfurDioxide: SulfurDioxide) => {
                    // Assert
                    expect(sulfurDioxide).toBeDefined();
                    done();
                });
        });
    });

    describe("loadUvIndex", () => {
        test("should call apiService and return defined data", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({} as UvIndex));

            // Act
            classToTest.loadUvIndex({ coord: { lat: 12, lon: 34 } } as City)
                .subscribe((uvIndex: UvIndex) => {
                    // Assert
                    expect(uvIndex).toBeDefined();
                    done();
                });
        });
    });

    describe("loadWeatherCurrent", () => {
        test("should call apiService and return defined data", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({ weather: [{ description: "Sun" }] }));

            // Act
            classToTest.loadWeatherCurrent({ coord: { lat: 12, lon: 34 } } as City)
                .subscribe((weatherCurrent: WeatherCurrent) => {
                    // Assert
                    expect(weatherCurrent).toBeDefined();
                    done();
                });
        });
    });

    describe("loadWeatherForecast", () => {
        test("should call apiService and return defined data", (done) => {
            // Arrange
            apiServiceMock.get.mockReturnValue(of({ list: [{ weather: [{ description: "Sun" }] }] }));

            // Act
            classToTest.loadWeatherForecast({ coord: { lat: 12, lon: 34 } } as City)
                .subscribe((weatherForecast: WeatherForecast) => {
                    // Assert
                    expect(weatherForecast).toBeDefined();
                    done();
                });
        });
    });
});
