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
            .subscribe(json => {
                const response = json.value;
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
        const expectedJson = "{\"cod\":\"200\",\"message\":0.0026,\"cnt\":3," +
            "\"list\":[" +
            "{\"dt\":1530219600,\"main\":{\"temp\":14.79,\"temp_min\":14.79,\"temp_max\":17.08,\"pressure\":980.7,\"sea_level\":1031.63," +
            "\"grnd_level\":980.7,\"humidity\":71,\"temp_kf\":-2.29},\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\"," +
            "\"icon\":\"10n\"}],\"clouds\":{\"all\":100},\"wind\":{\"speed\":3.36,\"deg\":33.0006},\"rain\":{\"3h\":0.0775},\"sys\":{\"pod\":\"n\"},\"dt_txt\":\"2018-06-28 21:00:00\"}," +
            "{\"dt\":1530230400,\"main\":{\"temp\":15.21,\"temp_min\":15.21,\"temp_max\":16.93,\"pressure\":980.15,\"sea_level\":1031.31," +
            "\"grnd_level\":980.15,\"humidity\":71,\"temp_kf\":-1.72},\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\"," +
            "\"icon\":\"10n\"}],\"clouds\":{\"all\":92},\"wind\":{\"speed\":3.13,\"deg\":34.0042},\"rain\":{\"3h\":0.0575},\"sys\":{\"pod\":\"n\"},\"dt_txt\":\"2018-06-29 00:00:00\"}," +
            "{\"dt\":1530241200,\"main\":{\"temp\":14.94,\"temp_min\":14.94,\"temp_max\":16.08,\"pressure\":979.77,\"sea_level\":1030.91," +
            "\"grnd_level\":979.77,\"humidity\":82,\"temp_kf\":-1.15},\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\"," +
            "\"icon\":\"10n\"}],\"clouds\":{\"all\":88},\"wind\":{\"speed\":2.52,\"deg\":22.001},\"rain\":{\"3h\":0.21},\"sys\":{\"pod\":\"n\"},\"dt_txt\":\"2018-06-29 03:00:00\"}]," +
            "\"city\":{\"id\":2861650,\"name\":\"Nuremberg\",\"coord\":{\"lat\":49.4539,\"lon\":11.0773},\"country\":\"DE\",\"population\":499237}}";
        classToTest["apiKey"] = MockValues.apiKey();
        classToTest["city"] = MockValues.city();

        // Act
        classToTest.forecastWeather()
            .subscribe(json => {
                const response = json.value;
                // Assert
                expect(response).toBeDefined();
                expect(response.cod).toBe(200);
                expect(response.cnt).toBe(3);
                expect(response.list.length).toBe(3);
                expect(response.city.id).toBe(2861650);
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
            .subscribe(json => {
                const response = json.value;
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
