import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

// import MockServices from "@lib/mock/services.mock";
import MockValues from "@lib/mock/values.mock";

import { ApiService } from "./api.service";

describe("ApiService", () => {
    let classToTest: ApiService;
    let httpMock: HttpTestingController;

    const serviceMockList: any[] = [
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ApiService
            ]
        });

        classToTest = TestBed.get(ApiService);
        httpMock = TestBed.get(HttpTestingController);
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

    it("initialize should set apiKey and city", () => {
        // Arrange
        const apiKey = MockValues.apiKey();
        const city = MockValues.city();

        // Act
        classToTest.initialize(apiKey, city);

        // Assert
        expect(classToTest["apiKey"]).toBe(apiKey);
        expect(classToTest["city"]).toBe(city);
    });

    it("currentWeather should return expected json", (done: DoneFn) => {
        // Arrange
        const expectedJson = "{ \"data\": { \"name\": \"testData\" } }";
        classToTest["apiKey"] = MockValues.apiKey();
        classToTest["city"] = MockValues.city();

        // Act
        classToTest.currentWeather()
            .subscribe(response => {
                // Assert
                expect(response).toBeDefined();
                expect(response).toBe(expectedJson);
                done();
            });

        const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/weather?q=${MockValues.city().name}&units=metric&APPID=${MockValues.apiKey()}`);
        expect(req.request.method).toEqual("GET");
        req.flush(expectedJson);
        httpMock.verify();
    });

    it("forecastWeather should return expected json", (done: DoneFn) => {
        // Arrange
        const expectedJson = "{ \"data\": { \"name\": \"testData\" } }";
        classToTest["apiKey"] = MockValues.apiKey();
        classToTest["city"] = MockValues.city();

        // Act
        classToTest.forecastWeather()
            .subscribe(response => {
                // Assert
                expect(response).toBeDefined();
                expect(response).toBe(expectedJson);
                done();
            });

        const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/forecast?q=${MockValues.city().name}&units=metric&APPID=${MockValues.apiKey()}`);
        expect(req.request.method).toEqual("GET");
        req.flush(expectedJson);
        httpMock.verify();
    });

    it("uvIndex should return expected json", (done: DoneFn) => {
        // Arrange
        const expectedJson = "{\"lat\":37.75,\"lon\":-122.37,\"date_iso\":\"2018-09-13T12:00:00Z\",\"date\":1536840000,\"value\":6.96}";
        classToTest["apiKey"] = MockValues.apiKey();
        classToTest["city"] = MockValues.city();

        // Act
        classToTest.uvIndex()
            .subscribe(response => {
                // Assert
                expect(response).toBeDefined();
                expect(response.lat).toBe(37.75);
                expect(response.lon).toBe(-122.37);
                expect(response.value).toBe(6.96);
                done();
            });

        const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/uvi?lat=${MockValues.city().lat.toFixed(2)}&lon=${MockValues.city().long.toFixed(2)}&APPID=${MockValues.apiKey()}`);
        expect(req.request.method).toEqual("GET");
        req.flush(expectedJson);
        httpMock.verify();
    });
});
