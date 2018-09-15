import { Injectable } from "@angular/core";

import "@lib/extensions/string.extensions";

import { WeatherCurrent, WeatherForecast, WeatherForecastPart, UvIndex } from "@lib/models";

@Injectable()
export class JsonToDataConverter {
    convertToWeatherCurrent(jsonData: any): WeatherCurrent {
        return null;
    }

    convertToWeatherForecast(jsonData: any): WeatherForecast {
        return null;
    }

    convertToUvIndex(jsonData: any): UvIndex {
        return null;
    }

    private convertToWeatherForecastPart(jsonData: any): WeatherForecastPart {
        return null;
    }
}
