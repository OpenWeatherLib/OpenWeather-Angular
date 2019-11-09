import WeatherCondition from "./weather-condition.enum";

describe("values", () => {
    test("should not change unexpected", () => {
        // Arrange + Act
        const actual: WeatherCondition[] = WeatherCondition.values;

        // Assert
        expect(actual).toMatchSnapshot([
            { id: 0, description: "Null", wallpaper: "/assets/weather_wallpaper_dummy.png", icon: "/assets/weather_dummy.png", count: 0 },
            { id: 1, description: "Clear", wallpaper: "/assets/weather_wallpaper_clear.png", icon: "/assets/weather_clear.png", count: 0 },
            { id: 2, description: "Clouds", wallpaper: "/assets/weather_wallpaper_cloud.png", icon: "/assets/weather_cloud.png", count: 0 },
            { id: 3, description: "Drizzle", wallpaper: "/assets/weather_wallpaper_drizzle.png", icon: "/assets/weather_drizzle.png", count: 0 },
            { id: 4, description: "Fog", wallpaper: "/assets/weather_wallpaper_fog.png", icon: "/assets/weather_fog.png", count: 0 },
            { id: 5, description: "Haze", wallpaper: "/assets/weather_wallpaper_haze.png", icon: "/assets/weather_haze.png", count: 0 },
            { id: 6, description: "Mist", wallpaper: "/assets/weather_wallpaper_mist.png", icon: "/assets/weather_mist.png", count: 0 },
            { id: 7, description: "Rain", wallpaper: "/assets/weather_wallpaper_rain.png", icon: "/assets/weather_rain.png", count: 0 },
            { id: 8, description: "Sleet", wallpaper: "/assets/weather_wallpaper_sleet.png", icon: "/assets/weather_sleet.png", count: 0 },
            { id: 9, description: "Snow", wallpaper: "/assets/weather_wallpaper_snow.png", icon: "/assets/weather_snow.png", count: 0 },
            { id: 10, description: "Squalls", wallpaper: "/assets/weather_wallpaper_squalls.png", icon: "/assets/weather_squalls.png", count: 0 },
            { id: 11, description: "Sun", wallpaper: "/assets/weather_wallpaper_sun.png", icon: "/assets/weather_sun.png", count: 0 },
            { id: 12, description: "Thunderstorm", wallpaper: "/assets/weather_wallpaper_thunderstorm.png", icon: "/assets/weather_thunderstorm.png", count: 0 }
        ]);
    });
});

describe("getByDescription", () => {
    test.each([
        [{ id: 0, description: "Null", wallpaper: "/assets/weather_wallpaper_dummy.png", icon: "/assets/weather_dummy.png", count: 0 }, "null"],
        [{ id: 1, description: "Clear", wallpaper: "/assets/weather_wallpaper_clear.png", icon: "/assets/weather_clear.png", count: 0 }, "clear"],
        [{ id: 2, description: "Clouds", wallpaper: "/assets/weather_wallpaper_cloud.png", icon: "/assets/weather_cloud.png", count: 0 }, "clouds"],
        [{ id: 3, description: "Drizzle", wallpaper: "/assets/weather_wallpaper_drizzle.png", icon: "/assets/weather_drizzle.png", count: 0 }, "drizzle"],
        [{ id: 4, description: "Fog", wallpaper: "/assets/weather_wallpaper_fog.png", icon: "/assets/weather_fog.png", count: 0 }, "fog"],
        [{ id: 5, description: "Haze", wallpaper: "/assets/weather_wallpaper_haze.png", icon: "/assets/weather_haze.png", count: 0 }, "haze"],
        [{ id: 6, description: "Mist", wallpaper: "/assets/weather_wallpaper_mist.png", icon: "/assets/weather_mist.png", count: 0 }, "mist"],
        [{ id: 7, description: "Rain", wallpaper: "/assets/weather_wallpaper_rain.png", icon: "/assets/weather_rain.png", count: 0 }, "rain"],
        [{ id: 8, description: "Sleet", wallpaper: "/assets/weather_wallpaper_sleet.png", icon: "/assets/weather_sleet.png", count: 0 }, "sleet"],
        [{ id: 9, description: "Snow", wallpaper: "/assets/weather_wallpaper_snow.png", icon: "/assets/weather_snow.png", count: 0 }, "snow"],
        [{ id: 10, description: "Squalls", wallpaper: "/assets/weather_wallpaper_squalls.png", icon: "/assets/weather_squalls.png", count: 0 }, "squalls"],
        [{ id: 11, description: "Sun", wallpaper: "/assets/weather_wallpaper_sun.png", icon: "/assets/weather_sun.png", count: 0 }, "sun"],
        [{ id: 12, description: "Thunderstorm", wallpaper: "/assets/weather_wallpaper_thunderstorm.png", icon: "/assets/weather_thunderstorm.png", count: 0 }, "thunderstorm"],
        [{ id: 0, description: "Null", wallpaper: "/assets/weather_wallpaper_dummy.png", icon: "/assets/weather_dummy.png", count: 0 }, "fake"],
        [{ id: 0, description: "Null", wallpaper: "/assets/weather_wallpaper_dummy.png", icon: "/assets/weather_dummy.png", count: 0 }, undefined]
    ])("should return WeatherCondition %s for description %s", (expected: WeatherCondition, description: string) => {
        // Arrange & Act
        const actual: WeatherCondition = WeatherCondition.getByDescription(description);

        // Assert
        expect(actual).toStrictEqual(expected);
    })
});