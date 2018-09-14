import { GeoLocation } from "./geo-location";
import { classJsonKey } from "../decorator";

@classJsonKey("", "")
export class UvIndex {
  geoLocation: GeoLocation = new GeoLocation();
  date: Date = new Date();
  value: number = 0.0;

  isDefault(): boolean {
    return this.geoLocation.isDefault() && this.value === 0.0;
  }
}
