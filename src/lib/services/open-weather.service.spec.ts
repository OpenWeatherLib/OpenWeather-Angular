import { TestBed } from "@angular/core/testing";
import { of, BehaviorSubject } from "rxjs";

import MockServices from "@lib/mock/services.mock";
import MockValues from "@lib/mock/values.mock";

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

    it("loadCityData should call apiService and set city", (done: DoneFn) => {
        // Arrange
        apiServiceMock.get.and.returnValue(of({ status: "OK", results: [MockValues.city2()] }));
        spyOn(classToTest, "loadCurrentWeather");
        spyOn(classToTest, "loadForecastWeather");
        spyOn(classToTest, "loadUvIndex");

        classToTest.city().subscribe(value => {
            if (value) {
                expect(value.name).toBe("Nuremberg");
                expect(value.coord.lat).toBe(49.45421);
                expect(value.coord.lon).toBe(11.07752);
                done();
            }
        });

        // Act
        classToTest.loadCityData("Nuremberg");
    });

    it("loadCurrentWeather should call apiService and set currentWeather", (done: DoneFn) => {
        // Arrange
        classToTest["city$"] = new BehaviorSubject(MockValues.city());
        classToTest["apiKey"] = MockValues.apiKey();
        const expectedValue = MockValues.weatherCurrent();
        apiServiceMock.get.and.returnValue(of(expectedValue));

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
        classToTest["city$"] = new BehaviorSubject(MockValues.city());
        classToTest["apiKey"] = MockValues.apiKey();
        const expectedValue = MockValues.weatherForecast();
        apiServiceMock.get.and.returnValue(of(expectedValue));

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
        classToTest["city$"] = new BehaviorSubject(MockValues.city());
        classToTest["apiKey"] = MockValues.apiKey();
        const expectedValue = MockValues.uvIndex();
        apiServiceMock.get.and.returnValue(of(expectedValue));

        classToTest.uvIndex().subscribe(value => {
            if (value) {
                expect(value).toBe(expectedValue);
                done();
            }
        });

        // Act
        classToTest.loadUvIndex();
    });

    it("searchForecast should return valid object for rain", () => {
        // Arrange
        classToTest["forecastWeather$"] = new BehaviorSubject(MockValues.weatherForecast());

        // Act
        const actual = classToTest.searchForecast("rain");

        // Assert
        expect(actual).toBeDefined();
        expect(actual.cnt).toBe(2);
    });

    it("searchForecast should return valid object for clear", () => {
        // Arrange
        classToTest["forecastWeather$"] = new BehaviorSubject(MockValues.weatherForecast());

        // Act
        const actual = classToTest.searchForecast("clear");

        // Assert
        expect(actual).toBeDefined();
        expect(actual.cnt).toBe(1);
    });
});
