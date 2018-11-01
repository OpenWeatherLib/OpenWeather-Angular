import { SulfurDioxideData } from "@lib/models/sulfur-dioxide-data";
import { Coordinates3 } from "@lib/models/coordinates3";

export interface SulfurDioxide {
    dateTime: Date;
    coordinates: Coordinates3;
    data: SulfurDioxideData[];
}