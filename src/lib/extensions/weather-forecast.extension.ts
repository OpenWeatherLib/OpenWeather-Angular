import WeatherCondition from "@lib/enums/weather-condition.enum";
import { any } from "@lib/helper";
import { WeatherForecastPart } from "@lib/models";

export const mostWeatherCondition = (list: WeatherForecastPart[]): WeatherCondition => {
    if (!any(list)) {
        return WeatherCondition.null;
    }

    list.forEach((weatherForecastPart: WeatherForecastPart) =>
        WeatherCondition.values
            .find((condition: any) => condition === WeatherCondition.getByDescription(weatherForecastPart.weather[0].description))
            .count += 1);

    const foundMostWeatherCondition = WeatherCondition.values.sort((x1: any, x2: any) => x1.count > x2.count ? -1 : 1)[0];

    WeatherCondition.values.forEach(x => x.count = 0);

    return foundMostWeatherCondition;
};
