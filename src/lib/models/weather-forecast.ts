import { classJsonKey } from "../decorator";
import { City } from "./city";
import { WeatherForecastPart } from "./weather-forecast-part";

@classJsonKey(String().empty, String().empty)
export class WeatherForecast {
    city: City = new City();
    list: WeatherForecastPart[] = [];

    isDefault(): boolean {
        return this.city.isDefault() && this.list.length === 0;
    }
}
