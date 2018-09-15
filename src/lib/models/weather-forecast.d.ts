import { City } from "@lib/models/city";
import { WeatherForecastPart } from "@lib/models/weather-forecast-part";

export interface WeatherForecast {
    cod: number;
    message: number;
    cnt: number;
    list: WeatherForecastPart[];
    city: City;
}
