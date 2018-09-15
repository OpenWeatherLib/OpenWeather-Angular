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
        const expectedJson = "{\"coord\":{\"lon\":11.08,\"lat\":49.45}," +
            "\"weather\":" +
            "[" +
            "{\"id\":802,\"main\":\"Clouds\",\"description\":\"scattered clouds\",\"icon\":\"03d\"}" +
            "]," +
            "\"base\":\"stations\"," +
            "\"main\":" +
            "{\"temp\":21.37,\"pressure\":1021,\"humidity\":56,\"temp_min\":20,\"temp_max\":23}," +
            "\"visibility\":10000," +
            "\"wind\":" +
            "{\"speed\":3.1,\"deg\":90}," +
            "\"clouds\":" +
            "{\"all\":40}," +
            "\"dt\":1527326400," +
            "\"sys\":" +
            "{\"type\":1,\"id\":4888,\"message\":0.0147,\"country\":\"DE\",\"sunrise\":1527304731,\"sunset\":1527361642}," +
            "\"id\":2861650," +
            "\"name\":\"Nuremberg\"," +
            "\"cod\":200}";
        classToTest["apiKey"] = MockValues.apiKey();
        classToTest["city"] = MockValues.city();

        // Act
        classToTest.currentWeather()
            .subscribe(response => {
                // Assert
                expect(response).toBeDefined();
                expect(response.cod).toBe(200);
                expect(response.clouds.all).toBe(40);
                expect(response.sys.country).toBe("DE");
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

        const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/uvi?lat=${MockValues.city().coord.lat.toFixed(2)}&lon=${MockValues.city().coord.lon.toFixed(2)}&APPID=${MockValues.apiKey()}`);
        expect(req.request.method).toEqual("GET");
        req.flush(expectedJson);
        httpMock.verify();
    });
});
