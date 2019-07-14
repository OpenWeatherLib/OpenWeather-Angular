import WeatherCondition from "@lib/enums/weather-condition.enum";

import { mostWeatherCondition } from "./weather-forecast.extension";
import { WeatherForecastPart, WeatherPart } from "@lib/models";

describe("WeatherForecastExtension", () => {
    test("mostWeatherCondition should return null if list is empty", () => {
        // Arrange + Act
        const actual = mostWeatherCondition(null);

        // Assert
        expect(actual).toBe(WeatherCondition.null);
    });

    test("mostWeatherCondition should return expected value if list is not empty", () => {
        // Arrange
        const list: WeatherForecastPart[] = [
            { weather: [{ description: "snow" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "snow" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "clear" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "rain" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "sun" } as WeatherPart] } as WeatherForecastPart
        ];

        // Act
        const actual = mostWeatherCondition(list);

        // Assert
        expect(actual).toBe(WeatherCondition.snow);
    });
});
