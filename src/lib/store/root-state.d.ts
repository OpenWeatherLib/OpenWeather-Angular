import { CarbonMonoxideState } from "./carbon-monoxide-store";
import { CityState } from "./city-store";
import { ImageState } from "./image-store";
import { NitrogenDioxideState } from "./nitrogen-dioxide-store";
import { OzoneState } from "./ozone-store";
import { SulfurDioxideState } from "./sulfur-dioxide-store";
import { UvIndexState } from "./uv-index-store";
import { WeatherCurrentState } from "./weather-current-store";
import { WeatherForecastState } from "./weather-forecast-store";

export interface RootState {
    carbonMonoxideState: CarbonMonoxideState;
    cityState: CityState;
    imageState: ImageState;
    nitrogenDioxideState: NitrogenDioxideState;
    ozoneState: OzoneState;
    sulfurDioxideState: SulfurDioxideState;
    uvIndexState: UvIndexState;
    weatherCurrentState: WeatherCurrentState;
    weatherForecastState: WeatherForecastState;
}
