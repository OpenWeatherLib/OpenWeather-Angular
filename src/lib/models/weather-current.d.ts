import { Clouds } from "@lib/models/clouds";
import { Coordinates } from "@lib/models/coordinates";
import { Main } from "@lib/models/main";
import { Sys } from "@lib/models/sys";
import { WeatherPart } from "@lib/models/weather-part";
import { Wind } from "@lib/models/wind";

export interface WeatherCurrent {
    coord: Coordinates;
    weather: WeatherPart[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: Date;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
}
