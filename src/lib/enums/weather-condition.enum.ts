export default class WeatherCondition {
    static null = { id: 0, description: "Null", wallpaper: "/assets/weather_wallpaper_dummy.png", icon: "/assets/weather_dummy.png", count: 0 };
    static clear = { id: 1, description: "Clear", wallpaper: "/assets/weather_wallpaper_clear.png", icon: "/assets/weather_clear.png", count: 0 };
    static clouds = { id: 2, description: "Clouds", wallpaper: "/assets/weather_wallpaper_cloud.png", icon: "/assets/weather_cloud.png", count: 0 };
    static drizzle = { id: 3, description: "Drizzle", wallpaper: "/assets/weather_wallpaper_drizzle.png", icon: "/assets/weather_drizzle.png", count: 0 };
    static fog = { id: 4, description: "Fog", wallpaper: "/assets/weather_wallpaper_fog.png", icon: "/assets/weather_fog.png", count: 0 };
    static haze = { id: 5, description: "Haze", wallpaper: "/assets/weather_wallpaper_haze.png", icon: "/assets/weather_haze.png", count: 0 };
    static mist = { id: 6, description: "Mist", wallpaper: "/assets/weather_wallpaper_mist.png", icon: "/assets/weather_mist.png", count: 0 };
    static rain = { id: 7, description: "Rain", wallpaper: "/assets/weather_wallpaper_rain.png", icon: "/assets/weather_rain.png", count: 0 };
    static sleet = { id: 8, description: "Sleet", wallpaper: "/assets/weather_wallpaper_sleet.png", icon: "/assets/weather_sleet.png", count: 0 };
    static snow = { id: 9, description: "Snow", wallpaper: "/assets/weather_wallpaper_snow.png", icon: "/assets/weather_snow.png", count: 0 };
    static squalls = { id: 10, description: "Squalls", wallpaper: "/assets/weather_wallpaper_squalls.png", icon: "/assets/weather_squalls.png", count: 0 };
    static sun = { id: 11, description: "Sun", wallpaper: "/assets/weather_wallpaper_sun.png", icon: "/assets/weather_sun.png", count: 0 };
    static thunderstorm = { id: 12, description: "Thunderstorm", wallpaper: "/assets/weather_wallpaper_thunderstorm.png", icon: "/assets/weather_thunderstorm.png", count: 0 };

    static values: any[] = [
        WeatherCondition.null,
        WeatherCondition.clear,
        WeatherCondition.clouds,
        WeatherCondition.drizzle,
        WeatherCondition.fog,
        WeatherCondition.haze,
        WeatherCondition.mist,
        WeatherCondition.rain,
        WeatherCondition.sleet,
        WeatherCondition.snow,
        WeatherCondition.squalls,
        WeatherCondition.sun,
        WeatherCondition.thunderstorm
    ];

    static getByDescription(description: string): WeatherCondition {
        const weatherCondition = !!description
            ? WeatherCondition.values
                .find((condition: any) =>
                    condition.description.toUpperCase().indexOf(description.toUpperCase()) !== -1
                    || description.toUpperCase().indexOf(condition.description.toUpperCase()) !== -1)
            : WeatherCondition.null;

        return !!weatherCondition ? weatherCondition : WeatherCondition.null;
    }
}
