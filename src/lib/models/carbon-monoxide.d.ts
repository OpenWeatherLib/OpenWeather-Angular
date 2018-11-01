import { CarbonMonoxideData } from "@lib/models/carbon-monoxide-data";
import { Coordinates3 } from "@lib/models/coordinates3";

export interface CarbonMonoxide {
    dateTime: Date;
    coordinates: Coordinates3;
    data: CarbonMonoxideData[];
}