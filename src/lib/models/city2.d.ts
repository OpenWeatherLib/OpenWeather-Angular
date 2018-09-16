import { AddressComponent } from "@lib/models/address-component";
import { Geometry } from "@lib/models/geometry";

export interface City2 {
    address_components: AddressComponent[];
    geometry: Geometry;
    types: string[];
}