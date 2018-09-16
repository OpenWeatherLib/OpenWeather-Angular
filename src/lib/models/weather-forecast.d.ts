import { City } from "@lib/models/city";
import { WeatherForecastPart } from "@lib/models/weather-forecast-part";

export interface WeatherForecast {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherForecastPart[];
    city: City;
}
