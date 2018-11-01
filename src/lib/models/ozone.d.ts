import { Coordinates3 } from "@lib/models/coordinates3";

export interface Ozone {
    dateTime: Date;
    coordinates: Coordinates3;
    data: number;
}