import { City, UvIndex, WeatherCurrent, WeatherForecast, WeatherForecastPart } from "@lib/models";

export default class MockValues {
    static apiKey(): string {
        return "fdsje423rfsdu";
    }

    static city(): City {
        const city = new City();
        city.id = 420;
        city.name = "Nuremberg";
        city.country = "DE";
        city.population = 499523;
        city.coord = { lat: 45.3452, lon: 23.543 };
        return city;
    }

    static uvIndex(): UvIndex {
        return {
            lat: 45.3452,
            lon: 23.543,
            date_iso: new Date(),
            date: new Date(),
            value: 4.20
        };
    }

    static weatherCurrent(): WeatherCurrent {
        return {};
    }

    static weatherForecast(): WeatherForecast {
        return {};
    }

    static weatherForecastPart(): WeatherForecastPart {
        return {};
    }
}
