import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import MockServices from "@lib/mock/services.mock";
import MockValues from "@lib/mock/values.mock";

import { WeatherCurrent, WeatherForecast, UvIndex } from "@lib/models";
import { ApiService } from "@lib/services/api.service";

import { OpenWeatherService } from "./open-weather.service";

describe("OpenWeatherService", () => {
    let classToTest: OpenWeatherService;

    const apiServiceMock = MockServices.substitute(ApiService);

    const serviceMockList: any[] = [
        apiServiceMock
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiServiceMock }
            ]
        });

        classToTest = new OpenWeatherService(apiServiceMock);
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

    it("loadCurrentWeather should call apiService and set currentWeather", (done: DoneFn) => {
        // Arrange
        const expectedValue = MockValues.weatherCurrent();
        apiServiceMock.currentWeather.and.returnValue(of({} as WeatherCurrent));

        classToTest.currentWeather().subscribe(value => {
            if (value) {
                expect(value).toBe(expectedValue);
                done();
            }
        });

        // Act
        classToTest.loadCurrentWeather();
    });

    it("loadForecastWeather should call apiService and set forecastWeather", (done: DoneFn) => {
        // Arrange
        const expectedValue = MockValues.weatherForecast();
        apiServiceMock.forecastWeather.and.returnValue(of({} as WeatherForecast));

        classToTest.forecastWeather().subscribe(value => {
            if (value) {
                expect(value).toBe(expectedValue);
                done();
            }
        });

        // Act
        classToTest.loadForecastWeather();
    });

    it("loadUvIndex should call apiService and set uvIndex", (done: DoneFn) => {
        // Arrange
        const expectedValue = MockValues.uvIndex();
        apiServiceMock.uvIndex.and.returnValue(of({} as UvIndex));

        classToTest.uvIndex().subscribe(value => {
            if (value) {
                expect(value).toBe(expectedValue);
                done();
            }
        });

        // Act
        classToTest.loadUvIndex();
    });
});
