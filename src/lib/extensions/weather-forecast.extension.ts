import WeatherCondition from "@lib/enums/weather-condition.enum";
import { WeatherForecastPart } from "@lib/models";

export const mostWeatherCondition = (list: WeatherForecastPart[]): WeatherCondition => {
    if (!list) {
        return WeatherCondition.null;
    }

    let weatherConditionList = WeatherCondition.values;
    list.forEach(x => weatherConditionList.find(y => y === WeatherCondition.getByDescription(x.weather[0].description)).count += 1);
    weatherConditionList = weatherConditionList.sort((x1, x2) => x1.count > x2.count ? -1 : 1);
    const foundMostWeatherCondition = weatherConditionList[0];
    weatherConditionList.forEach(x => x.count = 0);

    return foundMostWeatherCondition;
};
