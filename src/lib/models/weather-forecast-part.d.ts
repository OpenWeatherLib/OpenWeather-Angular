import { Clouds } from "@lib/models/clouds";
import { Main } from "@lib/models/main";
import { Rain } from "@lib/models/rain";
import { WeatherPart } from "@lib/models/weather-part";
import { Wind } from "@lib/models/wind";

import WeatherCondition from "@lib/enums/weather-condition.enum";

export interface WeatherForecastPart {
    dt: number;
    main: Main;
    weather: WeatherPart[];
    clouds: Clouds;
    wind: Wind;
    rain: Rain;
    dt_txt: string;
    weatherCondition: WeatherCondition;
}
