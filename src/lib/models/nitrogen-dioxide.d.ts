import { NitrogenDioxideData } from "@lib/models/nitrogen-dioxide-data";
import { Coordinates3 } from "@lib/models/coordinates3";

export interface NitrogenDioxide {
    dateTime: Date;
    coordinates: Coordinates3;
    data: NitrogenDioxideData[];
}