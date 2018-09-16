import {
    AddressComponent,
    City,
    City2,
    Coordinates2,
    Geometry,
    UvIndex,
    Viewport,
    WeatherCurrent,
    WeatherForecast,
    WeatherForecastPart,
    WeatherPart
} from "@lib/models";

export default class MockValues {
    static addressComponentCity(): AddressComponent {
        return {
            short_name: "Nuremberg",
            types: [
                "locality",
                "political"
            ],
            long_name: "Nuremberg, DE"
        };
    }

    static addressComponentCountry(): AddressComponent {
        return {
            short_name: "DE",
            types: [
                "country",
                "political"
            ],
            long_name: "Germany"
        };
    }

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

    static city2(): City2 {
        return {
            address_components: [
                this.addressComponentCity(),
                this.addressComponentCountry()
            ],
            geometry: this.geometry(),
            types: [
                "locality",
                "political"
            ]
        };
    }

    static coordinatesNE(): Coordinates2 {
        return {
            lat: 49.5730438232,
            lng: 11.3236637115
        };
    }

    static coordinatesSW(): Coordinates2 {
        return {
            lat: 49.3166618347,
            lng: 10.9793968201
        };
    }

    static geometry(): Geometry {
        return {
            location_type: "APPROXIMATE",
            viewport: this.viewport(),
            location: this.location()
        };
    }

    static location(): Coordinates2 {
        return {
            lat: 49.45421,
            lng: 11.07752
        };
    }

    static uvIndex(): UvIndex {
        return {
            lat: 45.3452,
            lon: 23.543,
            date_iso: "2018-06-29 03:00:00",
            date: 1530219600,
            value: 4.20
        };
    }

    static viewport(): Viewport {
        return {
            northeast: this.coordinatesNE(),
            southwest: this.coordinatesSW()
        };
    }

    static weatherCurrent(): WeatherCurrent {
        return {} as WeatherCurrent;
    }

    static weatherForecast(): WeatherForecast {
        return {} as WeatherForecast;
    }

    static weatherForecastPart(): WeatherForecastPart {
        return {} as WeatherForecastPart;
    }

    static weatherPart(): WeatherPart {
        return {} as WeatherPart;
    }
}
