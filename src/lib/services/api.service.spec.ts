import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { City, UvIndex, WeatherCurrent, WeatherForecast } from "@lib/models";
import { ApiService } from "./api.service";

const apiKey = (): string => "fdsje423rfsdu";

const city = (): City => ({
    id: 420,
    name: "Nuremberg",
    country: "DE",
    population: 499523,
    coord: { lat: 45.3452, lon: 23.543 }
});

describe("ApiService", () => {
    let classToTest: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ApiService
            ]
        });

        classToTest = TestBed.get(ApiService as Type<ApiService>);
        httpTestingController = TestBed.get(HttpTestingController as Type<HttpTestingController>);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    test("should be created", () => {
        // Assert
        expect(classToTest).toBeTruthy();
    });

    describe("get", () => {
        test("currentWeather should return expected json", () => {
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

            // Act
            classToTest.get<WeatherCurrent>(`http://api.openweathermap.org/data/2.5/weather?q=${city().name}&units=metric&APPID=${apiKey()}`)
                .subscribe((response: WeatherCurrent) => {
                    // Assert
                    expect(response).toBeDefined();
                    expect(response.coord.lon).toBe(11.08);
                    expect(response.coord.lat).toBe(49.45);
                    expect(response.weather[0].id).toBe(802);
                    expect(response.weather[0].main).toBe("Clouds");
                    expect(response.weather[0].description).toBe("scattered clouds");
                    expect(response.weather[0].icon).toBe("03d");
                    expect(response.base).toBe("stations");
                    expect(response.main.temp).toBe(21.37);
                    expect(response.main.pressure).toBe(1021);
                    expect(response.main.humidity).toBe(56);
                    expect(response.main.temp_min).toBe(20);
                    expect(response.main.temp_max).toBe(23);
                    expect(response.visibility).toBe(10000);
                    expect(response.wind.speed).toBe(3.1);
                    expect(response.clouds.all).toBe(40);
                    expect(response.dt).toBe(1527326400);
                    expect(response.sys.type).toBe(1);
                    expect(response.sys.id).toBe(4888);
                    expect(response.sys.message).toBe(0.0147);
                    expect(response.sys.country).toBe("DE");
                    expect(response.sys.sunrise).toBe(1527304731);
                    expect(response.sys.sunset).toBe(1527361642);
                    expect(response.id).toBe(2861650);
                    expect(response.name).toBe("Nuremberg");
                    expect(response.cod).toBe(200);
                });

            const req = httpTestingController.expectOne(`http://api.openweathermap.org/data/2.5/weather?q=${city().name}&units=metric&APPID=${apiKey()}`);
            expect(req.request.method).toEqual("GET");
            req.flush(JSON.parse(expectedJson));
        });

        test("forecastWeather should return expected json", () => {
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

            // Act
            classToTest.get<WeatherForecast>(`http://api.openweathermap.org/data/2.5/forecast?q=${city().name}&units=metric&APPID=${apiKey()}`)
                .subscribe((response: WeatherForecast) => {
                    // Assert
                    expect(response).toBeDefined();
                    expect(response.cod).toBe("200");
                    expect(response.message).toBe(0.0026);
                    expect(response.cnt).toBe(3);
                    expect(response.list.length).toBe(3);
                    expect(response.city.id).toBe(2861650);
                    expect(response.city.name).toBe("Nuremberg");
                    expect(response.city.coord.lat).toBe(49.4539);
                    expect(response.city.coord.lon).toBe(11.0773);
                    expect(response.city.country).toBe("DE");
                    expect(response.city.population).toBe(499237);
                });

            const req = httpTestingController.expectOne(`http://api.openweathermap.org/data/2.5/forecast?q=${city().name}&units=metric&APPID=${apiKey()}`);
            expect(req.request.method).toEqual("GET");
            req.flush(JSON.parse(expectedJson));
        });

        test("uvIndex should return expected json", () => {
            // Arrange
            const expectedJson = "{\"lat\":37.75,\"lon\":-122.37,\"date_iso\":\"2018-09-13T12:00:00Z\",\"date\":1536840000,\"value\":6.96}";

            // Act
            classToTest.get<UvIndex>(`http://api.openweathermap.org/data/2.5/uvi?lat=${city().coord.lat.toFixed(2)}&lon=${city().coord.lon.toFixed(2)}&APPID=${apiKey()}`)
                .subscribe((response: UvIndex) => {
                    // Assert
                    expect(response).toBeDefined();
                    expect(response.lat).toBe(37.75);
                    expect(response.lon).toBe(-122.37);
                    expect(response.date_iso).toBe("2018-09-13T12:00:00Z");
                    expect(response.date).toBe(1536840000);
                    expect(response.value).toBe(6.96);
                });

            const req = httpTestingController.expectOne(`http://api.openweathermap.org/data/2.5/uvi?lat=${city().coord.lat.toFixed(2)}&lon=${city().coord.lon.toFixed(2)}&APPID=${apiKey()}`);
            expect(req.request.method).toEqual("GET");
            req.flush(JSON.parse(expectedJson));
        });

        test("error should return undefined", () => {
            // Arrange
            const expectedJson = "{\"cod\":500,\"message\":\"Error\"}";

            // Act
            classToTest.get<number>("http://hello.world")
                .subscribe((response: number) => {
                    // Assert
                    expect(response).toBeUndefined();
                });

            const req = httpTestingController.expectOne("http://hello.world");
            expect(req.request.method).toEqual("GET");
            req.flush(JSON.parse(expectedJson));
        });
    });
});
