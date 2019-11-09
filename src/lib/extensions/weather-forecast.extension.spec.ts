import WeatherCondition from "@lib/enums/weather-condition.enum";

import { mostWeatherCondition } from "./weather-forecast.extension";
import { WeatherForecastPart, WeatherPart } from "@lib/models";

describe("WeatherForecastExtension", () => {
    test.each([
        ["should return WeatherCondition.null for undefined", WeatherCondition.null, undefined],
        ["should return WeatherCondition.null for null", WeatherCondition.null, null],
        ["should return WeatherCondition.null for empty list", WeatherCondition.null, []],
        ["should return WeatherCondition.snow if this is the most in the list", WeatherCondition.snow, [
            { weather: [{ description: "snow" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "snow" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "clear" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "rain" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "sun" } as WeatherPart] } as WeatherForecastPart]
        ],
        ["should return WeatherCondition.sun, if it is the only entry", WeatherCondition.sun, [{ weather: [{ description: "sun" } as WeatherPart] } as WeatherForecastPart]],
        ["should return WeatherCondition.null, if the list as multiple values with same amount", WeatherCondition.null, [
            { weather: [{ description: "clear" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "rain" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "sun" } as WeatherPart] } as WeatherForecastPart]
        ]
    ])("mostWeatherCondition %s", (_: string, expected: WeatherCondition, list: WeatherForecastPart[]) => {
        // Arrange + Act
        const actual: WeatherCondition = mostWeatherCondition(list);

        // Assert
        expect(actual).toBe(expected);
    });
});
