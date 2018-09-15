import { classJsonKey } from "@lib/decorator";
import { GeoLocation } from "./geo-location";

@classJsonKey("", "")
export class City {
  id: number = 0;
  name: string = "";
  country: string = "";
  population: number = 0;
  geoLocation: GeoLocation = new GeoLocation();

  isDefault(): boolean {
    return this.id === 0 && this.name === "" && this.country === "" && this.population === 0 && this.geoLocation.isDefault();
  }
}
