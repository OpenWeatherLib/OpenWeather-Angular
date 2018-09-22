import { Clouds } from "@lib/models/clouds";
import { Coordinates } from "@lib/models/coordinates";
import { Main } from "@lib/models/main";
import { Sys } from "@lib/models/sys";
import { WeatherPart } from "@lib/models/weather-part";
import { Wind } from "@lib/models/wind";

import WeatherCondition from "@lib/enums/weather-condition.enum";

export interface WeatherCurrent {
    coord: Coordinates;
    weather: WeatherPart[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
    weatherCondition: WeatherCondition;
}
