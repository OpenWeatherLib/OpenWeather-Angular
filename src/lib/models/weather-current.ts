import { classJsonKey } from "../decorator";
import { WeatherCondition } from "../enums";
import { City } from "./city";

@classJsonKey("", "sys")
export class WeatherCurrent {
    icon: string = "";
    description: string = "";
    weatherCondition: WeatherCondition = WeatherCondition.Null;
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
        // TODO
        return false;
    }
}
