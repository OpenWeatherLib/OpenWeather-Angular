import "@lib/extensions/string.extensions";
import { classJsonKey } from "@lib/decorator";
import { City } from "@lib/models/city";
import { WeatherForecastPart } from "@lib/models/weather-forecast-part";

@classJsonKey(String().empty, String().empty)
export class WeatherForecast {
    city: City = new City();
    list: WeatherForecastPart[] = [];

    isDefault(): boolean {
        return this.city.isDefault() && this.list.length === 0;
    }
}
