import { NitrogenDioxideDataHolder } from "@lib/models/nitrogen-dioxide-data-holder";

export interface NitrogenDioxideData {
    no2: NitrogenDioxideDataHolder;
    no2_strat: NitrogenDioxideDataHolder;
    no2_trop: NitrogenDioxideDataHolder;
}
