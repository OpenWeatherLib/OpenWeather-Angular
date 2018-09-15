import "@lib/extensions/string.extensions";
import { classJsonKey } from "@lib/decorator";
import { ForecastListType } from "@lib/enums";
import WeatherCondition from "@lib/enums/weather-condition.enum";

@classJsonKey(String().empty, "sys")
export class WeatherForecastPart {
    main: string = String().empty;
    weatherCondition: WeatherCondition = WeatherCondition.null;
    description: string = String().empty;
    weatherDefaultIcon: string = String().empty;
    temperature: number = 0.0;
    temperatureMin: number = 0.0;
    temperatureMax: number = 0.0;
    temperatureKf: number = 0.0;
    pressure: number = 0.0;
    pressureSeaLevel: number = 0.0;
    pressureGroundLevel: number = 0.0;
    humidity: number = 0.0;
    cloudsAll: number = 0.0;
    windSpeed: number = 0.0;
    windDegree: number = 0.0;
    dateTime: Date = new Date();
    listType: ForecastListType = ForecastListType.Null;

    isDefault(): boolean {
        return this.main.isNullOrEmpty()
            && this.weatherCondition === WeatherCondition.null
            && this.description.isNullOrEmpty()
            && this.weatherDefaultIcon.isNullOrEmpty()
            && this.temperature === 0.0
            && this.temperatureMin === 0.0
            && this.temperatureMax === 0.0
            && this.temperatureKf === 0.0
            && this.pressure === 0.0
            && this.pressureSeaLevel === 0.0
            && this.pressureGroundLevel === 0.0
            && this.humidity === 0.0
            && this.cloudsAll === 0.0
            && this.windSpeed === 0.0
            && this.windDegree === 0.0
            && this.listType === ForecastListType.Null;
    }
}
