import WeatherCondition from "@lib/enums/weather-condition.enum";
import { ForecastListType } from "@lib/enums";
import { City, GeoLocation, UvIndex, WeatherCurrent, WeatherForecast, WeatherForecastPart } from "@lib/models";

export default class MockValues {
    static apiKey(): string {
        return "fdsje423rfsdu";
    }

    static geoLocation(): GeoLocation {
        const geoLocation = new GeoLocation();
        geoLocation.lat = 45.3452;
        geoLocation.long = 23.543;
        return geoLocation;
    }

    static city(): City {
        const city = new City();
        city.id = 420;
        city.name = "Nuremberg";
        city.country = "DE";
        city.population = 499523;
        city.geoLocation = this.geoLocation();
        return city;
    }

    static uvIndex(): UvIndex {
        const uvIndex = new UvIndex();
        uvIndex.date = new Date();
        uvIndex.geoLocation = this.geoLocation();
        uvIndex.value = 4.20;
        return uvIndex;
    }

    static weatherCurrent(): WeatherCurrent {
        const weatherCurrent = new WeatherCurrent();
        weatherCurrent.icon = "2n";
        weatherCurrent.description = "clear";
        weatherCurrent.weatherCondition = WeatherCondition.clear;
        weatherCurrent.temperature = 21.4;
        weatherCurrent.temperatureMin = 20.8;
        weatherCurrent.temperatureMax = 22.1;
        weatherCurrent.humidity = 65.3;
        weatherCurrent.pressure = 991.2;
        weatherCurrent.visibility = 5000;
        weatherCurrent.cloudsAll = 3;
        weatherCurrent.windSpeed = 1.3;
        weatherCurrent.windDegree = 65.3;
        weatherCurrent.dateTime = new Date();
        weatherCurrent.sunriseTime = new Date();
        weatherCurrent.sunsetTime = new Date();
        weatherCurrent.city = this.city();
        weatherCurrent.lastUpdate = new Date();
        return weatherCurrent;
    }

    static weatherForecast(): WeatherForecast {
        const weatherForecast = new WeatherForecast();
        weatherForecast.city = this.city();
        weatherForecast.list = [this.weatherForecastPart()];
        return weatherForecast;
    }

    static weatherForecastPart(): WeatherForecastPart {
        const weatherForecastPart = new WeatherForecastPart();
        weatherForecastPart.main = "clear";
        weatherForecastPart.weatherCondition = WeatherCondition.clear;
        weatherForecastPart.description = "clear";
        weatherForecastPart.weatherDefaultIcon = "2n";
        weatherForecastPart.temperature = 21.4;
        weatherForecastPart.temperatureMin = 20.8;
        weatherForecastPart.temperatureMax = 22.1;
        weatherForecastPart.temperatureKf = 18.4;
        weatherForecastPart.pressure = 991.2;
        weatherForecastPart.pressureSeaLevel = 998.3;
        weatherForecastPart.pressureGroundLevel = 990.3;
        weatherForecastPart.humidity = 65.3;
        weatherForecastPart.cloudsAll = 3;
        weatherForecastPart.windSpeed = 1.3;
        weatherForecastPart.windDegree = 65.3;
        weatherForecastPart.dateTime = new Date();
        weatherForecastPart.listType = ForecastListType.Null;
        return weatherForecastPart;
    }
}
