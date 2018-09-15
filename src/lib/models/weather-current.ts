import "@lib/extensions/string.extensions";
import { classJsonKey } from "@lib/decorator";
import WeatherCondition from "@lib/enums/weather-condition.enum";
import { City } from "./city";

@classJsonKey(String().empty, "sys")
export class WeatherCurrent {
    icon: string = String().empty;
    description: string = String().empty;
    weatherCondition: WeatherCondition = WeatherCondition.null;
    temperature: number = 0.0;
    temperatureMin: number = 0.0;
    temperatureMax: number = 0.0;
    humidity: number = 0.0;
    pressure: number = 0.0;
    visibility: number = 0.0;
    cloudsAll: number = 0.0;
    windSpeed: number = 0.0;
    windDegree: number = 0.0;
    dateTime: Date = new Date();
    sunriseTime: Date = new Date();
    sunsetTime: Date = new Date();
    city: City = new City();
    lastUpdate: Date = new Date();

    isDefault(): boolean {
        return this.icon.isNullOrEmpty()
            && this.description.isNullOrEmpty()
            && this.weatherCondition === WeatherCondition.null
            && this.temperature === 0.0
            && this.temperatureMin === 0.0
            && this.temperatureMax === 0.0
            && this.humidity === 0.0
            && this.pressure === 0.0
            && this.visibility === 0.0
            && this.cloudsAll === 0.0
            && this.windSpeed === 0.0
            && this.windDegree === 0.0
            && this.city.isDefault();
    }
}
